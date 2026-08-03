'use client';

import { useEffect, useState } from 'react';

import { searchIndex, type SearchEntry } from '@emc/catalog';

/**
 * Suchindex mit aktuellen Produktdaten.
 *
 * Der Index aus `@emc/catalog` ist zur Bauzeit eingefroren. Produkte pflegt
 * aber der Adminbereich, deshalb werden die Produkteinträge einmal je
 * Browsersitzung von `/api/suchindex` nachgeladen. Alles andere – Kategorien,
 * Städte, Ratgeber – bleibt statisch.
 *
 * Der Anfangswert ist immer der statische Index: Die Suche funktioniert
 * dadurch sofort und auch dann, wenn der Abruf fehlschlägt.
 */

const staticEntries = searchIndex.filter((entry) => entry.type !== 'produkt');

let cached: SearchEntry[] | null = null;
let pending: Promise<SearchEntry[] | null> | null = null;

async function load(): Promise<SearchEntry[] | null> {
  if (cached) return cached;
  if (pending) return pending;

  pending = (async () => {
    try {
      const response = await fetch('/api/suchindex', {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(5_000),
      });
      if (!response.ok) return null;

      const products = (await response.json()) as SearchEntry[];
      if (!Array.isArray(products) || products.length === 0) return null;

      cached = [...products, ...staticEntries];
      return cached;
    } catch {
      return null;
    } finally {
      pending = null;
    }
  })();

  return pending;
}

export function useSearchIndex(): SearchEntry[] {
  const [index, setIndex] = useState<SearchEntry[]>(() => cached ?? searchIndex);

  useEffect(() => {
    let active = true;
    void load().then((entries) => {
      if (active && entries) setIndex(entries);
    });
    return () => {
      active = false;
    };
  }, []);

  return index;
}
