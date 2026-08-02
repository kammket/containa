'use client';

import { X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { formatPriceCompact, grossFromNet } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FilterFacet } from './facets';

/**
 * Filter- und Sortierleiste für Shop- und Kategorieseiten.
 *
 * Die Produktkarten werden vom Server als fertig gerenderte Elemente
 * übergeben (`cards`), die Filterung arbeitet nur auf einer schlanken
 * Metadatenliste. So bleibt der Produktkatalog aus dem Client-Bundle heraus
 * und die Karten müssen nicht neu gerendert werden.
 */

type SortKey = 'empfohlen' | 'preis-auf' | 'preis-ab' | 'neu';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'empfohlen', label: 'Empfohlen' },
  { key: 'preis-auf', label: 'Preis aufsteigend' },
  { key: 'preis-ab', label: 'Preis absteigend' },
  { key: 'neu', label: 'Neueste zuerst' },
];

const sizeLabels: Record<string, string> = {
  '8ft': '8 Fuß',
  '10ft': '10 Fuß',
  '20ft': '20 Fuß',
  '40ft': '40 Fuß',
  '45ft': '45 Fuß',
  sonder: 'Zubehör',
};

const conditionLabels: Record<string, string> = {
  neu: 'Neu',
  'one-trip': 'One-Trip',
  generalueberholt: 'Generalüberholt',
  gebraucht: 'Gebraucht',
};

export function ProductFilters({
  facets,
  cards,
}: {
  facets: FilterFacet[];
  cards: Record<string, React.ReactNode>;
}) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [conditionFilters, setConditionFilters] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>('empfohlen');

  const priceBounds = useMemo(() => {
    const values = facets.map((f) => grossFromNet(f.priceNet));
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [facets]);

  const availableSizes = useMemo(() => [...new Set(facets.map((f) => f.size))].sort(), [facets]);
  const availableConditions = useMemo(() => [...new Set(facets.map((f) => f.condition))], [facets]);

  const visible = useMemo(() => {
    const filtered = facets.filter((facet) => {
      if (sizes.length > 0 && !sizes.includes(facet.size)) return false;
      if (conditionFilters.length > 0 && !conditionFilters.includes(facet.condition)) return false;
      if (inStockOnly && facet.availability !== 'auf-lager') return false;
      if (maxPrice !== null && grossFromNet(facet.priceNet) > maxPrice) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case 'preis-auf':
        sorted.sort((a, b) => a.priceNet - b.priceNet);
        break;
      case 'preis-ab':
        sorted.sort((a, b) => b.priceNet - a.priceNet);
        break;
      case 'neu':
        sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.bestseller) - Number(a.bestseller) || a.priceNet - b.priceNet,
        );
    }
    return sorted;
  }, [facets, sizes, conditionFilters, inStockOnly, maxPrice, sort]);

  const activeCount =
    sizes.length + conditionFilters.length + (inStockOnly ? 1 : 0) + (maxPrice !== null ? 1 : 0);

  const reset = () => {
    setSizes([]);
    setConditionFilters([]);
    setInStockOnly(false);
    setMaxPrice(null);
  };

  const toggle = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-navy-900">Filter</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-700 transition-colors hover:text-accent-600"
            >
              <X className="size-3.5" aria-hidden />
              Zurücksetzen ({activeCount})
            </button>
          )}
        </div>

        <div className="mt-5 space-y-6">
          <FilterGroup label="Größe">
            {availableSizes.map((size) => (
              <FilterCheckbox
                key={size}
                label={sizeLabels[size] ?? size}
                count={facets.filter((f) => f.size === size).length}
                checked={sizes.includes(size)}
                onChange={() => toggle(size, sizes, setSizes)}
              />
            ))}
          </FilterGroup>

          <FilterGroup label="Zustand">
            {availableConditions.map((condition) => (
              <FilterCheckbox
                key={condition}
                label={conditionLabels[condition] ?? condition}
                count={facets.filter((f) => f.condition === condition).length}
                checked={conditionFilters.includes(condition)}
                onChange={() => toggle(condition, conditionFilters, setConditionFilters)}
              />
            ))}
          </FilterGroup>

          <FilterGroup label="Verfügbarkeit">
            <FilterCheckbox
              label="Nur sofort lieferbar"
              count={facets.filter((f) => f.availability === 'auf-lager').length}
              checked={inStockOnly}
              onChange={() => setInStockOnly((v) => !v)}
            />
          </FilterGroup>

          <FilterGroup label="Preis (inkl. MwSt.)">
            <label htmlFor="price-range" className="sr-only">
              Maximalpreis
            </label>
            <input
              id="price-range"
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={10000}
              value={maxPrice ?? priceBounds.max}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPrice(value >= priceBounds.max ? null : value);
              }}
              className="w-full accent-accent-600"
            />
            <p className="mt-1 flex justify-between text-xs text-stone-500">
              <span>{formatPriceCompact(priceBounds.min)}</span>
              <span className="font-semibold text-navy-800">
                bis {formatPriceCompact(maxPrice ?? priceBounds.max)}
              </span>
            </p>
          </FilterGroup>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-600" aria-live="polite">
            <strong className="font-semibold text-navy-900">{visible.length}</strong>{' '}
            {visible.length === 1 ? 'Produkt' : 'Produkte'}
            {activeCount > 0 && ` von ${facets.length}`}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-stone-600">
              Sortieren:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 cursor-pointer rounded-lg border border-stone-300 bg-white px-3 pr-8 text-sm font-medium text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center">
            <p className="font-display text-lg font-bold text-navy-900">Keine Treffer</p>
            <p className="mt-2 text-sm text-stone-600">
              Mit dieser Filterkombination haben wir nichts gefunden. Setzen Sie die Filter zurück
              oder erweitern Sie die Preisgrenze.
            </p>
            <Button onClick={reset} variant="outline" className="mt-5">
              Filter zurücksetzen
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((facet) => (
              <div key={facet.slug}>{cards[facet.slug]}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-xs font-bold tracking-wider text-stone-400 uppercase">
        {label}
      </legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-stone-50',
        checked ? 'text-navy-900' : 'text-stone-700',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 cursor-pointer rounded border-stone-300 accent-accent-600"
      />
      <span className="flex-1 font-medium">{label}</span>
      <span className="text-xs text-stone-400">{count}</span>
    </label>
  );
}
