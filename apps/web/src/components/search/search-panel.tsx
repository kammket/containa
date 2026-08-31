'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, FileText, MapPin, Package, Tag } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  formatPrice,
  popularSearches,
  routes,
  search,
  type SearchEntry,
  type SearchEntryType,
} from '@emc/catalog';

import { SearchHeader } from './search-dialog';
import { useSearchIndex } from '@/lib/use-search-index';
import { cn } from '@/lib/utils';

const typeMeta: Record<SearchEntryType, { label: string; icon: typeof Package }> = {
  produkt: { label: 'Produkt', icon: Package },
  kategorie: { label: 'Kategorie', icon: Tag },
  standort: { label: 'Standort', icon: MapPin },
  ratgeber: { label: 'Ratgeber', icon: FileText },
  seite: { label: 'Seite', icon: Building2 },
};

/**
 * Inhalt der Instant-Suche. Wird per dynamic import nachgeladen; erst hier
 * kommt der Suchindex aus `@emc/catalog` ins Bundle.
 */
export function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const index = useSearchIndex();

  const results = useMemo(
    () => (query.trim() ? search(query, { limit: 8, index }) : []),
    [query, index],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const go = useCallback(
    (href: string) => {
      onNavigate();
      router.push(href);
    },
    [onNavigate, router],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const target = results[activeIndex];
      if (target) go(target.href);
    }
  };

  return (
    <>
      <SearchHeader value={query} onChange={setQuery} onKeyDown={onKeyDown} />

      <div className="max-h-[55vh] overflow-y-auto overscroll-contain p-2">
        {query.trim() === '' ? (
          <div className="p-3">
            <p className="mb-2.5 px-1 text-xs font-bold tracking-wider text-stone-400 uppercase">
              Häufig gesucht
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="cursor-pointer rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-navy-800 transition-colors hover:border-navy-300 hover:bg-stone-50"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-semibold text-navy-900">Keine Treffer für „{query}&ldquo;</p>
            <p className="mt-1.5 text-sm text-stone-500">
              Versuchen Sie es mit einem anderen Begriff – oder{' '}
              <button
                type="button"
                onClick={() => go(routes.contact)}
                className="cursor-pointer font-semibold text-accent-700 underline underline-offset-2"
              >
                fragen Sie uns direkt
              </button>
              .
            </p>
          </div>
        ) : (
          <ul role="listbox" aria-label="Suchergebnisse">
            {results.map((entry, index) => (
              <SearchResultRow
                key={entry.id}
                entry={entry}
                active={index === activeIndex}
                onSelect={() => go(entry.href)}
                onHover={() => setActiveIndex(index)}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-4 py-2.5">
        <p className="flex items-center gap-3 text-2xs text-stone-500">
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigieren
          </span>
          <span>
            <Kbd>↵</Kbd> öffnen
          </span>
          <span className="hidden sm:inline">
            <Kbd>Esc</Kbd> schließen
          </span>
        </p>
        {query.trim() !== '' && (
          <button
            type="button"
            onClick={() => go(`${routes.search}?q=${encodeURIComponent(query)}`)}
            className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-navy-800 transition-colors hover:text-navy-950"
          >
            Alle Ergebnisse
            <ArrowRight className="size-3.5" aria-hidden />
          </button>
        )}
      </div>
    </>
  );
}

function SearchResultRow({
  entry,
  active,
  onSelect,
  onHover,
}: {
  entry: SearchEntry;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  const meta = typeMeta[entry.type];
  const Icon = meta.icon;

  return (
    <li role="option" aria-selected={active}>
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onHover}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
          active ? 'bg-stone-100' : 'hover:bg-stone-50',
        )}
      >
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-lg',
            entry.type === 'produkt'
              ? 'bg-accent-100 text-accent-700'
              : 'bg-navy-100 text-navy-700',
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-navy-900">{entry.title}</span>
          <span className="block truncate text-xs text-stone-500">{entry.subtitle}</span>
        </span>
        {entry.priceNet !== undefined ? (
          <span className="shrink-0 text-sm font-bold text-navy-900">
            {formatPrice(entry.priceNet)}
          </span>
        ) : (
          <span className="hidden shrink-0 text-2xs font-semibold tracking-wide text-stone-400 uppercase sm:inline">
            {meta.label}
          </span>
        )}
      </button>
    </li>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-stone-300 bg-white px-1 py-0.5 font-sans text-2xs font-semibold text-stone-500">
      {children}
    </kbd>
  );
}
