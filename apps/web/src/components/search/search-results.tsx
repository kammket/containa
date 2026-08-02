'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, FileText, MapPin, Package, Search as SearchIcon, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  formatPrice,
  grossFromNet,
  popularSearches,
  routes,
  search,
  type SearchEntryType,
} from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const typeMeta: Record<SearchEntryType, { label: string; plural: string; icon: typeof Package }> = {
  produkt: { label: 'Produkt', plural: 'Produkte', icon: Package },
  kategorie: { label: 'Kategorie', plural: 'Kategorien', icon: Tag },
  standort: { label: 'Standort', plural: 'Standorte', icon: MapPin },
  ratgeber: { label: 'Ratgeber', plural: 'Ratgeber', icon: FileText },
  seite: { label: 'Seite', plural: 'Seiten', icon: Building2 },
};

const filterOrder: SearchEntryType[] = ['produkt', 'kategorie', 'seite', 'standort', 'ratgeber'];

/** Vollständige Suchergebnisseite mit Typfilter. */
export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get('q') ?? '';

  const [query, setQuery] = useState(initial);
  const [typeFilter, setTypeFilter] = useState<SearchEntryType | null>(null);

  const allResults = useMemo(() => (query.trim() ? search(query, { limit: 60 }) : []), [query]);

  const results = typeFilter ? allResults.filter((r) => r.type === typeFilter) : allResults;

  const counts = useMemo(() => {
    const map = new Map<SearchEntryType, number>();
    for (const entry of allResults) {
      map.set(entry.type, (map.get(entry.type) ?? 0) + 1);
    }
    return map;
  }, [allResults]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`${routes.search}?q=${encodeURIComponent(query)}`, { scroll: false });
  };

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit} className="flex max-w-2xl gap-2">
        <div className="relative flex-1">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400"
            aria-hidden
          />
          <label htmlFor="search-input" className="sr-only">
            Suchbegriff
          </label>
          <Input
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Container, Größe, Stadt oder Thema …"
            className="h-12 pl-10"
            autoFocus={!initial}
          />
        </div>
        <Button type="submit" size="lg">
          Suchen
        </Button>
      </form>

      {query.trim() === '' ? (
        <div className="mt-10">
          <h2 className="text-sm font-bold tracking-wider text-stone-400 uppercase">
            Häufig gesucht
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="cursor-pointer rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-stone-50"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <FilterPill
              active={typeFilter === null}
              onClick={() => setTypeFilter(null)}
              label={`Alle (${allResults.length})`}
            />
            {filterOrder.map((type) => {
              const count = counts.get(type) ?? 0;
              if (count === 0) return null;
              return (
                <FilterPill
                  key={type}
                  active={typeFilter === type}
                  onClick={() => setTypeFilter(type)}
                  label={`${typeMeta[type].plural} (${count})`}
                />
              );
            })}
          </div>

          <p className="mt-5 text-sm text-stone-600" aria-live="polite">
            <strong className="font-semibold text-navy-900">{results.length}</strong>{' '}
            {results.length === 1 ? 'Ergebnis' : 'Ergebnisse'} für „{query}&ldquo;
          </p>

          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-12 text-center">
              <p className="font-display text-lg font-bold text-navy-900">Keine Treffer</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
                Zu „{query}&ldquo; haben wir nichts gefunden. Versuchen Sie einen kürzeren Begriff –
                oder fragen Sie uns direkt, wir helfen gern weiter.
              </p>
              <Button asChild className="mt-6">
                <Link href={routes.contact}>Kontakt aufnehmen</Link>
              </Button>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white">
              {results.map((entry) => {
                const meta = typeMeta[entry.type];
                const Icon = meta.icon;
                return (
                  <li key={entry.id}>
                    <Link
                      href={entry.href}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-stone-50"
                    >
                      <span
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-lg',
                          entry.type === 'produkt'
                            ? 'bg-accent-100 text-accent-700'
                            : 'bg-navy-100 text-navy-700',
                        )}
                      >
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-navy-900">
                          {entry.title}
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-sm text-stone-500">
                          {entry.subtitle}
                        </span>
                      </span>
                      {entry.priceNet !== undefined ? (
                        <span className="shrink-0 text-right">
                          <span className="block font-display text-base font-bold text-navy-900">
                            {formatPrice(grossFromNet(entry.priceNet))}
                          </span>
                          <span className="block text-2xs text-stone-500">inkl. MwSt.</span>
                        </span>
                      ) : (
                        <span className="hidden shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-2xs font-semibold text-stone-500 sm:inline">
                          {meta.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors',
        active
          ? 'bg-navy-900 text-white'
          : 'border border-stone-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-stone-50',
      )}
    >
      {label}
    </button>
  );
}
