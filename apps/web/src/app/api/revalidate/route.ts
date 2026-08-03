import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { PRODUCTS_CACHE_TAG } from '@/lib/live-catalog';

/**
 * Sofortige Aktualisierung der Storefront nach einer Änderung im Adminbereich.
 *
 * Die API ruft diesen Endpunkt auf, sobald ein Produkt angelegt, bearbeitet,
 * ein- oder ausgeblendet wird oder sich seine Bilder ändern. Ohne den Aufruf
 * erneuern sich die Seiten von selbst – nur eben erst nach einer Minute.
 *
 * Abgesichert über ein gemeinsames Geheimnis im Header. Ist keines gesetzt,
 * bleibt der Endpunkt geschlossen: ein offener Cache-Invalidierer wäre eine
 * kostenlose Möglichkeit, die Seite unter Last zu setzen.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: 'Revalidierung ist nicht konfiguriert.' },
      { status: 501 },
    );
  }

  if (request.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json(
      { revalidated: false, message: 'Nicht berechtigt.' },
      { status: 401 },
    );
  }

  revalidateTag(PRODUCTS_CACHE_TAG);

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
