import { brand } from './brand.ts';
import type { DeliveryZone } from './types.ts';

/**
 * Preislogik. Alle Beträge werden intern als Nettobetrag in Cent geführt,
 * um Rundungsfehler bei Fließkommazahlen auszuschließen.
 */

export const VAT_RATE = brand.vatRate;

/** Netto-Cent → Brutto-Cent (kaufmännisch gerundet). */
export function grossFromNet(netCents: number, rate: number = VAT_RATE): number {
  return Math.round(netCents * (1 + rate));
}

/** Brutto-Cent → Netto-Cent. */
export function netFromGross(grossCents: number, rate: number = VAT_RATE): number {
  return Math.round(grossCents / (1 + rate));
}

/** Enthaltener MwSt.-Anteil eines Bruttobetrags in Cent. */
export function vatAmount(netCents: number, rate: number = VAT_RATE): number {
  return grossFromNet(netCents, rate) - netCents;
}

const priceFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formatiert Cent als deutschen Währungsstring, z. B. "1.190,00 €". */
export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}

/** Formatiert Cent ohne Nachkommastellen, z. B. "1.190 €" – für Karten und Hero. */
export function formatPriceCompact(cents: number): string {
  return compactFormatter.format(Math.round(cents / 100));
}

/** Rohwert für schema.org/Offer (Punkt als Dezimaltrenner). */
export function schemaPrice(cents: number): string {
  return (cents / 100).toFixed(2);
}

/** Rabatt in Prozent zwischen Streich- und Aktionspreis. */
export function discountPercent(priceNet: number, compareAtNet?: number): number | null {
  if (!compareAtNet || compareAtNet <= priceNet) return null;
  return Math.round(((compareAtNet - priceNet) / compareAtNet) * 100);
}

/**
 * Referenzlänge für den Grundpreis: die tatsächliche Außenlänge eines
 * 20-Fuß-Containers nach ISO 668 (6.058 mm).
 *
 * Der Wert darf nicht auf glatte 6 m gerundet werden – sonst löst schon ein
 * gewöhnlicher 20-Fuß-Container den Längenzuschlag aus, obwohl der Grundpreis
 * genau für ihn gilt.
 */
export const STANDARD_LENGTH_METERS = 6.058;

/**
 * Lieferzonen nach PLZ-Leitregion. Der Grundpreis gilt für einen 20-Fuß-Container;
 * längere Einheiten werden über `perExtraMeterNet` aufgeschlagen.
 */
export const deliveryZones: DeliveryZone[] = [
  {
    prefixes: ['5', '6'],
    name: 'Zone 1 – West & Mitte',
    baseNet: 39000,
    perExtraMeterNet: 4500,
    days: [2, 4],
  },
  {
    prefixes: ['3', '4', '7'],
    name: 'Zone 2 – Nordwest, Südwest & Ruhrgebiet',
    baseNet: 49000,
    perExtraMeterNet: 5200,
    days: [3, 5],
  },
  {
    prefixes: ['0', '1', '2', '8', '9'],
    name: 'Zone 3 – Nord, Ost & Süd',
    baseNet: 59000,
    perExtraMeterNet: 6000,
    days: [4, 7],
  },
];

/** Ab diesem Netto-Warenwert liefern wir versandkostenfrei. */
export const FREE_DELIVERY_THRESHOLD_NET = 950000;

export interface DeliveryQuote {
  zone: DeliveryZone;
  priceNet: number;
  free: boolean;
  days: [number, number];
}

/**
 * Berechnet die Lieferpauschale für eine PLZ und Containerlänge.
 * @param postalCode Fünfstellige deutsche Postleitzahl
 * @param lengthMeters Außenlänge des Containers in Metern (Standard: 20 Fuß)
 * @param orderValueNet Netto-Warenwert für die Freigrenze
 */
export function quoteDelivery(
  postalCode: string,
  lengthMeters = STANDARD_LENGTH_METERS,
  orderValueNet = 0,
): DeliveryQuote | null {
  const normalized = postalCode.trim();
  if (!/^\d{5}$/.test(normalized)) return null;

  const leading = normalized.charAt(0);
  const zone = deliveryZones.find((z) => z.prefixes.includes(leading));
  if (!zone) return null;

  // Angefangene Meter über der Referenzlänge; ein 20-Fuß-Container liegt
  // damit exakt bei null Zuschlagsmetern.
  const extraMeters = Math.max(0, Math.ceil(lengthMeters - STANDARD_LENGTH_METERS));
  const priceNet = zone.baseNet + extraMeters * zone.perExtraMeterNet;
  const free = orderValueNet >= FREE_DELIVERY_THRESHOLD_NET;

  return { zone, priceNet: free ? 0 : priceNet, free, days: zone.days };
}
