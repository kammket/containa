/**
 * Aufmacherbilder aus echten Angeboten.
 *
 * Kategorien, Referenzen und Ratgeberbeiträge führen im Katalog jeweils eine
 * eigene `publicId` für ihr Aufmacherbild – etwa `emc/categories/20ft-container`.
 * Diese Dateien wurden nie nach Cloudinary hochgeladen: Sie antworten mit 404,
 * und ausgeliefert wird der graue Ersatzplatzhalter. Redaktionelle Fotos gibt
 * es schlicht nicht; die einzigen echten Aufnahmen im Bestand sind die
 * Produktfotos, die im Adminbereich zu den Angeboten hochgeladen werden.
 *
 * Dieses Modul leitet die Aufmacher deshalb aus dem echten Bestand ab: Jede
 * Seite zeigt das Titelfoto eines Containers, um den es dort tatsächlich geht.
 * Das hat zwei Vorteile gegenüber fest eingetragenen IDs – es ist ohne einen
 * Fotografen sofort korrekt, und es bleibt korrekt, wenn im Adminbereich
 * andere Fotos hinterlegt werden.
 *
 * Findet sich nichts (API nicht erreichbar, Produkt ohne Foto), liefern die
 * Funktionen `null`. Die Aufrufer fallen dann auf das Katalogbild zurück und
 * damit auf das bisherige Verhalten – die Seite bleibt in jedem Fall
 * vollständig.
 */

import { cache } from 'react';

import type { Product, ProductImage } from '@emc/catalog';

import { getProducts } from './live-catalog';

/** Titelfoto eines Produkts, sofern eines hinterlegt ist. */
function cover(product: Product | undefined): ProductImage | null {
  return product?.images[0] ?? null;
}

/**
 * Erstes Produkt der Liste, zu dem es ein Foto gibt.
 *
 * Die Reihenfolge ist die redaktionelle Katalogreihenfolge, nicht dem Zufall
 * überlassen: Dasselbe Aufmacherbild soll über Builds hinweg stabil bleiben.
 */
function firstWithPhoto(products: Product[]): ProductImage | null {
  for (const product of products) {
    const image = cover(product);
    if (image) return image;
  }
  return null;
}

/**
 * Irgendein echtes Containerfoto aus dem Bestand – der letzte Rückfall, wenn
 * sich kein thematisch passendes Angebot ermitteln lässt.
 *
 * Bevorzugt Bestseller: Sie repräsentieren den Shop am ehesten. Zubehör bleibt
 * außen vor, ein Lüftungsgitter taugt nicht als Aufmacher.
 */
export const anyListingImage = cache(async (): Promise<ProductImage | null> => {
  const products = (await getProducts()).filter((product) => product.size !== 'sonder');

  return (
    firstWithPhoto(products.filter((product) => product.bestseller)) ??
    firstWithPhoto(products.filter((product) => product.featured)) ??
    firstWithPhoto(products)
  );
});

/**
 * Aufmacher einer Kategorieseite – ein Container aus genau dieser Kategorie.
 *
 * Zubehör bleibt außen vor, solange die Kategorie auch Container enthält: Ein
 * Lüftungsgitter als Aufmacher der Kategorie „20 Fuß Container" wäre
 * irreführend.
 */
export const categoryHeroImage = cache(
  async (categorySlug: string): Promise<ProductImage | null> => {
    const products = await getProducts();
    const inCategory = products.filter((product) => product.categorySlugs.includes(categorySlug));

    const containers = inCategory.filter((product) => product.size !== 'sonder');

    return firstWithPhoto(containers.length > 0 ? containers : inCategory);
  },
);

/**
 * Aufmacher für Inhalte, die auf konkrete Produkte verweisen – Referenzen über
 * `productSlugs`, Ratgeberbeiträge über `relatedProducts`. Gezeigt wird das
 * erste dieser Produkte, zu dem ein Foto vorliegt.
 */
export const productHeroImage = cache(
  async (slugs: readonly string[]): Promise<ProductImage | null> => {
    if (slugs.length === 0) return null;

    const products = await getProducts();
    const referenced = slugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is Product => product !== undefined);

    return firstWithPhoto(referenced);
  },
);
