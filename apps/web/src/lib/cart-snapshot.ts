import type { Product } from '@emc/catalog';

/**
 * Warenkorb-Momentaufnahme.
 *
 * Bewusst **kein** `'use client'`: Server Components erzeugen den Snapshot beim
 * Rendern und übergeben ihn als Prop an den Client. Dadurch bleibt der
 * vollständige Produktkatalog aus dem Client-Bundle heraus – der Client kennt
 * nur die Artikel, die tatsächlich im Warenkorb liegen.
 */
export interface CartSnapshot {
  slug: string;
  sku: string;
  name: string;
  /** Nettopreis in Cent zum Zeitpunkt des Hinzufügens */
  priceNet: number;
  image?: string;
  size: Product['size'];
  /** Außenlänge in Metern – bestimmt die Lieferpauschale */
  lengthMeters: number;
  leadTimeDays: [number, number];
}

export function toSnapshot(product: Product): CartSnapshot {
  return {
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    priceNet: product.priceNet,
    image: product.images[0]?.publicId,
    size: product.size,
    lengthMeters: product.specs.exterior.length / 1000,
    leadTimeDays: product.leadTimeDays,
  };
}
