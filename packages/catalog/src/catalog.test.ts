import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { blogPosts, blogCategoriesBySlug, relatedPosts } from './blog.ts';
import { categories, categoriesBySlug } from './categories.ts';
import { cities, nearbyCities } from './cities.ts';
import { faqs, faqCategories } from './faqs.ts';
import { landingPages } from './landing-pages.ts';
import {
  deliveryZones,
  discountPercent,
  formatPrice,
  grossFromNet,
  netFromGross,
  quoteDelivery,
  vatAmount,
} from './pricing.ts';
import {
  containerPriceRange,
  lowestPriceInCategory,
  priceRange,
  products,
  productsBySlug,
  productsInCategory,
  relatedProducts,
} from './products.ts';
import { reservedRootSlugs, routes } from './routes.ts';
import { normalize, search, searchIndex } from './search.ts';
import { caseStudies, reviews } from './social-proof.ts';

describe('Preislogik', () => {
  it('rechnet netto → brutto mit 19 % MwSt.', () => {
    assert.equal(grossFromNet(100000), 119000);
    assert.equal(grossFromNet(119000), 141610);
  });

  it('ist bei brutto → netto → brutto verlustfrei genug', () => {
    for (const net of [119000, 259000, 449000, 8900]) {
      assert.equal(netFromGross(grossFromNet(net)), net);
    }
  });

  it('berechnet den MwSt.-Anteil', () => {
    assert.equal(vatAmount(100000), 19000);
  });

  it('formatiert Preise im deutschen Format', () => {
    // Intl nutzt ein schmales geschütztes Leerzeichen vor dem Währungszeichen
    assert.match(formatPrice(119000), /^1\.190,00\s€$/u);
  });

  it('berechnet Rabatte nur bei höherem Streichpreis', () => {
    assert.equal(discountPercent(119000, 145000), 18);
    assert.equal(discountPercent(119000, 119000), null);
    assert.equal(discountPercent(119000), null);
  });
});

describe('Lieferzonen', () => {
  it('ordnet Postleitzahlen einer Zone zu', () => {
    assert.equal(quoteDelivery('57610')?.zone.name, 'Zone 1 – West & Mitte');
    assert.equal(quoteDelivery('10115')?.zone.name, 'Zone 3 – Nord, Ost & Süd');
    assert.equal(quoteDelivery('44135')?.zone.name, 'Zone 2 – Nordwest, Südwest & Ruhrgebiet');
  });

  it('weist ungültige Postleitzahlen zurück', () => {
    assert.equal(quoteDelivery('1234'), null);
    assert.equal(quoteDelivery('ABCDE'), null);
    assert.equal(quoteDelivery(''), null);
  });

  it('berechnet für einen 20-Fuß-Container keinen Längenzuschlag', () => {
    const zone = deliveryZones[0]!;
    // 6.058 m ist die reale ISO-Außenlänge – der Grundpreis gilt genau dafür.
    assert.equal(quoteDelivery('57610', 6.058)!.priceNet, zone.baseNet);
    assert.equal(quoteDelivery('57610')!.priceNet, zone.baseNet);
  });

  it('schlägt Mehrlänge über die Referenzlänge auf', () => {
    const zone = deliveryZones[0]!;
    const standard = quoteDelivery('57610', 6.058)!;
    const fortyFoot = quoteDelivery('57610', 12.192)!;

    assert.ok(fortyFoot.priceNet > standard.priceNet);
    // ceil(12.192 − 6.058) = 7 angefangene Zusatzmeter
    assert.equal(fortyFoot.priceNet, zone.baseNet + 7 * zone.perExtraMeterNet);
  });

  it('liefert ab der Freigrenze kostenlos', () => {
    const quote = quoteDelivery('10115', 12.2, 1000000)!;
    assert.equal(quote.priceNet, 0);
    assert.equal(quote.free, true);
  });
});

describe('Katalogintegrität', () => {
  it('hat eindeutige Produkt-Slugs und SKUs', () => {
    assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
    assert.equal(new Set(products.map((p) => p.sku)).size, products.length);
    assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  });

  it('verweist nur auf existierende Kategorien', () => {
    for (const product of products) {
      for (const slug of product.categorySlugs) {
        assert.ok(categoriesBySlug.has(slug), `Unbekannte Kategorie "${slug}" in ${product.slug}`);
      }
      assert.ok(
        product.categorySlugs.includes(product.primaryCategory),
        `${product.slug}: primaryCategory nicht in categorySlugs`,
      );
    }
  });

  it('verweist nur auf existierende verwandte Produkte', () => {
    for (const product of products) {
      for (const slug of product.related) {
        assert.ok(productsBySlug.has(slug), `Unbekanntes related "${slug}" in ${product.slug}`);
      }
    }
  });

  it('hat für jede Kategorie mindestens ein Produkt', () => {
    for (const category of categories) {
      const count = products.filter((p) => p.categorySlugs.includes(category.slug)).length;
      assert.ok(count > 0, `Kategorie "${category.slug}" ist leer`);
    }
  });

  it('hat plausible Preise', () => {
    for (const product of products) {
      assert.ok(product.priceNet > 0, `${product.slug}: Preis muss positiv sein`);
      if (product.compareAtNet !== undefined) {
        assert.ok(
          product.compareAtNet > product.priceNet,
          `${product.slug}: Streichpreis muss über dem Verkaufspreis liegen`,
        );
      }
    }
  });

  it('hat mindestens ein Bild und vollständige SEO-Daten je Produkt', () => {
    for (const product of products) {
      assert.ok(product.images.length > 0, `${product.slug}: kein Bild`);
      assert.ok(product.seo.title.length <= 70, `${product.slug}: SEO-Titel zu lang`);
      assert.ok(
        product.seo.description.length >= 80 && product.seo.description.length <= 175,
        `${product.slug}: Meta-Description ${product.seo.description.length} Zeichen`,
      );
    }
  });

  it('schließt Zubehör aus den „ab"-Preisen von Containerkategorien aus', () => {
    // Der Lagercontainer-Kategorie ist auch Zubehör zugeordnet (Regalsystem,
    // Auffahrrampe, Luftentfeuchter). Der Einstiegspreis muss trotzdem der
    // eines Containers sein – sonst entstünde eine irreführende Preisangabe.
    const lowest = lowestPriceInCategory('lagercontainer');
    assert.ok(lowest !== null);

    const cheapestContainer = Math.min(
      ...productsInCategory('lagercontainer')
        .filter((p) => p.size !== 'sonder')
        .map((p) => p.priceNet),
    );
    assert.equal(lowest, cheapestContainer);

    // In der reinen Zubehörkategorie zählt Zubehör dagegen normal mit.
    const accessories = productsInCategory('container-zubehoer');
    assert.ok(accessories.every((p) => p.size === 'sonder'));
    assert.equal(
      lowestPriceInCategory('container-zubehoer'),
      Math.min(...accessories.map((p) => p.priceNet)),
    );
  });

  it('weist eine Container-Preisspanne ohne Zubehör aus', () => {
    // containerPriceRange trägt alle „Container ab X €"-Aussagen der Website.
    assert.ok(containerPriceRange.min > priceRange.min);
    const cheapestContainer = Math.min(
      ...products.filter((p) => p.size !== 'sonder').map((p) => p.priceNet),
    );
    assert.equal(containerPriceRange.min, cheapestContainer);
  });

  it('liefert verwandte Produkte ohne Selbstreferenz', () => {
    for (const product of products) {
      const related = relatedProducts(product.slug, 4);
      assert.ok(related.length > 0, `${product.slug}: keine verwandten Produkte`);
      assert.ok(!related.some((r) => r.slug === product.slug));
    }
  });
});

describe('SEO-Struktur', () => {
  it('kollidiert nicht mit reservierten Root-Pfaden', () => {
    for (const page of landingPages) {
      assert.ok(!reservedRootSlugs.has(page.slug), `Landingpage "${page.slug}" ist reserviert`);
    }
    for (const city of cities) {
      const slug = `seecontainer-${city.slug}`;
      assert.ok(!reservedRootSlugs.has(slug), `Städteseite "${slug}" ist reserviert`);
    }
  });

  it('hat eindeutige Root-Slugs über Landingpages und Städte hinweg', () => {
    const all = [
      ...landingPages.map((p) => p.slug),
      ...cities.map((c) => `seecontainer-${c.slug}`),
    ];
    assert.equal(new Set(all).size, all.length);
  });

  it('hat für jede Stadt individuellen Text', () => {
    const intros = cities.map((c) => c.intro[0]);
    assert.equal(new Set(intros).size, cities.length, 'Duplicate Content in Städte-Intros');

    const notes = cities.map((c) => c.logisticsNote);
    assert.equal(new Set(notes).size, cities.length, 'Duplicate Content in Logistikhinweisen');
  });

  it('hält Meta-Descriptions in sinnvoller Länge', () => {
    const pages = [
      ...categories.map((c) => ({ id: c.slug, seo: c.seo })),
      ...landingPages.map((p) => ({ id: p.slug, seo: p.seo })),
      ...cities.map((c) => ({ id: c.slug, seo: c.seo })),
      ...blogPosts.map((p) => ({ id: p.slug, seo: p.seo })),
    ];
    for (const page of pages) {
      assert.ok(
        page.seo.description.length >= 80 && page.seo.description.length <= 175,
        `${page.id}: Meta-Description ${page.seo.description.length} Zeichen`,
      );
      assert.ok(
        page.seo.title.length <= 70,
        `${page.id}: SEO-Titel ${page.seo.title.length} Zeichen`,
      );
    }
  });

  it('erzeugt korrekte Routen', () => {
    assert.equal(routes.product('test'), '/produkt/test');
    assert.equal(routes.category('test'), '/container/test');
    assert.equal(routes.city('berlin'), '/seecontainer-berlin');
  });
});

describe('Blog', () => {
  it('verweist auf existierende Blogkategorien', () => {
    for (const post of blogPosts) {
      assert.ok(
        blogCategoriesBySlug.has(post.categorySlug),
        `Unbekannte Kategorie in ${post.slug}`,
      );
    }
  });

  it('verweist nur auf existierende Produkte und Kategorien', () => {
    for (const post of blogPosts) {
      for (const slug of post.relatedProducts) {
        assert.ok(productsBySlug.has(slug), `${post.slug}: unbekanntes Produkt "${slug}"`);
      }
      for (const slug of post.relatedCategories) {
        assert.ok(categoriesBySlug.has(slug), `${post.slug}: unbekannte Kategorie "${slug}"`);
      }
    }
  });

  it('liefert verwandte Beiträge ohne Selbstreferenz', () => {
    for (const post of blogPosts) {
      const related = relatedPosts(post.slug, 3);
      assert.ok(!related.some((r) => r.slug === post.slug));
    }
  });

  it('hat konsistente Datumsangaben', () => {
    for (const post of blogPosts) {
      assert.ok(
        post.updatedAt >= post.publishedAt,
        `${post.slug}: updatedAt liegt vor publishedAt`,
      );
    }
  });
});

describe('Suche', () => {
  it('normalisiert Umlaute und ß', () => {
    assert.equal(normalize('München'), 'muenchen');
    assert.equal(normalize('20 Fuß Container'), '20 fuss container');
    assert.equal(normalize('Öl-Größe'), 'oel groesse');
  });

  it('findet Produkte über Größenangaben in beiden Schreibweisen', () => {
    assert.ok(search('20ft').length > 0);
    assert.ok(search('20 fuß').length > 0);
    assert.ok(search('40 fuss').length > 0);
  });

  it('findet Städte mit und ohne Umlaut', () => {
    assert.ok(search('münchen').some((e) => e.type === 'standort'));
    assert.ok(search('muenchen').some((e) => e.type === 'standort'));
  });

  it('respektiert Typfilter und Limit', () => {
    const results = search('container', { types: ['kategorie'], limit: 3 });
    assert.ok(results.length <= 3);
    assert.ok(results.every((r) => r.type === 'kategorie'));
  });

  it('liefert nichts bei leerer Eingabe', () => {
    assert.deepEqual(search(''), []);
    assert.deepEqual(search('   '), []);
  });

  it('indiziert alle Inhaltstypen', () => {
    const types = new Set(searchIndex.map((e) => e.type));
    for (const type of ['produkt', 'kategorie', 'ratgeber', 'standort', 'seite']) {
      assert.ok(types.has(type as never), `Typ "${type}" fehlt im Index`);
    }
  });
});

describe('Städte', () => {
  it('liefert benachbarte Städte ohne Selbstreferenz', () => {
    for (const city of cities) {
      const nearby = nearbyCities(city.slug, 5);
      assert.equal(nearby.length, 5);
      assert.ok(!nearby.some((c) => c.slug === city.slug));
    }
  });

  it('hat plausible Geokoordinaten innerhalb Deutschlands', () => {
    for (const city of cities) {
      assert.ok(city.lat > 47 && city.lat < 55, `${city.slug}: Breitengrad außerhalb DE`);
      assert.ok(city.lng > 5 && city.lng < 16, `${city.slug}: Längengrad außerhalb DE`);
    }
  });
});

describe('FAQ und Social Proof', () => {
  it('ordnet jede FAQ einer bekannten Kategorie zu', () => {
    const known = new Set(faqCategories.map((c) => c.slug));
    for (const faq of faqs) {
      assert.ok(known.has(faq.category as never), `Unbekannte FAQ-Kategorie: ${faq.category}`);
    }
  });

  it('hat gültige Bewertungen', () => {
    for (const review of reviews) {
      assert.ok(review.rating >= 1 && review.rating <= 5);
      if (review.productSlug) {
        assert.ok(productsBySlug.has(review.productSlug), `Unbekanntes Produkt in ${review.id}`);
      }
    }
  });

  it('verweist in Referenzen nur auf existierende Produkte', () => {
    for (const study of caseStudies) {
      for (const slug of study.productSlugs) {
        assert.ok(productsBySlug.has(slug), `${study.slug}: unbekanntes Produkt "${slug}"`);
      }
    }
  });
});
