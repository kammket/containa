'use client';

import { Minus, Plus } from 'lucide-react';

export function QuantityStepper({
  value,
  onChange,
  label,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  max?: number;
}) {
  return (
    <div className="flex items-center rounded-lg border border-stone-300">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label="Menge verringern"
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-l-lg text-navy-800 transition-colors hover:bg-stone-50"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => {
          const next = Number.parseInt(e.target.value, 10);
          onChange(Number.isNaN(next) ? 1 : Math.min(Math.max(1, next), max));
        }}
        className="h-9 w-11 [appearance:textfield] border-x border-stone-300 text-center text-sm font-semibold text-navy-900 focus:ring-2 focus:ring-navy-500/20 focus:outline-none focus:ring-inset [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Menge erhöhen"
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-r-lg text-navy-800 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:text-stone-300"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
