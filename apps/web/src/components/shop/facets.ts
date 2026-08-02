import type { Product } from '@emc/catalog';

/**
 * Schlanke Filter-Metadaten.
 *
 * Bewusst **kein** `'use client'`: Server Components erzeugen die Facetten und
 * übergeben sie als Prop. Der Client filtert nur auf diesen wenigen Feldern,
 * während die Produktkarten fertig gerendert vom Server kommen.
 */
export interface FilterFacet {
  slug: string;
  size: Product['size'];
  condition: Product['condition'];
  availability: Product['availability'];
  priceNet: number;
  bestseller: boolean;
  updatedAt: string;
}

export function toFacet(product: Product): FilterFacet {
  return {
    slug: product.slug,
    size: product.size,
    condition: product.condition,
    availability: product.availability,
    priceNet: product.priceNet,
    bestseller: product.bestseller,
    updatedAt: product.updatedAt,
  };
}
