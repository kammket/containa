import { NextResponse } from 'next/server';

import { productSearchEntries } from '@emc/catalog';

import { getProducts } from '@/lib/live-catalog';

/**
 * Produkteinträge der Instant-Suche aus den Live-Daten.
 *
 * Die Suche liegt vollständig im Browser – ohne diesen Endpunkt käme sie aus
 * dem einkompilierten Katalog und zeigte nach einer Preisänderung im
 * Adminbereich weiterhin den alten Preis. Kategorien, Städte und
 * Ratgeberbeiträge bleiben statisch, sie ändern sich nur mit einem Deployment.
 *
 * Die Antwort stammt aus demselben zwischengespeicherten Abruf wie die Seiten;
 * ein zusätzlicher Datenbankzugriff entsteht dadurch nicht.
 */
export async function GET() {
  const products = await getProducts();

  return NextResponse.json(productSearchEntries(products), {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=600' },
  });
}
