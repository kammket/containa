import type { Metadata } from 'next';
import Link from 'next/link';

import { breadcrumbs, navCategories, products, routes } from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { ProductFilters } from '@/components/shop/product-filters';
import { toFacet } from '@/components/shop/facets';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Alle Container kaufen – Shop',
    description:
      'Alle Seecontainer im Überblick: 10, 20, 40 und 45 Fuß, neu, One-Trip und gebraucht. Nach Größe, Zustand und Preis filtern. CSC-zertifiziert, deutschlandweite Lieferung.',
    focusKeyword: 'Container Shop',
    secondaryKeywords: ['Seecontainer kaufen', 'Container Übersicht'],
  },
  path: routes.shop,
});

export default function ShopPage() {
  const crumbs = breadcrumbs({ name: 'Container', href: routes.shop });

  // Karten serverseitig rendern, Filterung arbeitet nur auf den Metadaten.
  const cards = Object.fromEntries(
    products.map((product) => [product.slug, <ProductCard key={product.slug} product={product} />]),
  );

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <div className="border-b border-stone-200 bg-stone-50">
        <div className="container-page py-4">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <h1 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Alle Container im Überblick
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            {products.length} Modelle vom 10-Fuß-Lagercontainer bis zum ausgebauten Wohncontainer.
            Alle Preise sind Festpreise – die Lieferpauschale berechnen wir transparent nach Ihrer
            Postleitzahl.
          </p>

          <nav aria-label="Kategorien" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {navCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.href}
                    className="inline-flex rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="container-page py-10">
        <ProductFilters facets={products.map(toFacet)} cards={cards} />
      </div>
    </>
  );
}
