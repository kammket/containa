'use client';

import { useState } from 'react';

import { financingTerms, formatPrice, monthlyRate } from '@emc/catalog';

import { cn } from '@/lib/utils';

/**
 * Ratenrechner. Rechnet annuitätisch im Client; die Konditionen stammen aus
 * dem Katalog, damit Produktseite und Finanzierungsseite nie auseinanderlaufen.
 */
export function FinanceCalculator({ priceGross }: { priceGross: number }) {
  const [months, setMonths] = useState<number>(36);

  const term = financingTerms.find((t) => t.months === months) ?? financingTerms[2]!;
  const rate = monthlyRate(priceGross, term.months, term.annualRate);
  const totalPaid = rate * term.months;
  const interest = totalPaid - priceGross;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <h3 className="font-display text-base font-bold text-navy-900">Finanzierung berechnen</h3>
      <p className="mt-1 text-sm text-stone-500">
        Laufzeit wählen – die Monatsrate wird sofort angezeigt.
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Laufzeit in Monaten">
        {financingTerms.map((option) => (
          <button
            key={option.months}
            type="button"
            role="radio"
            aria-checked={option.months === months}
            onClick={() => setMonths(option.months)}
            className={cn(
              'cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors',
              option.months === months
                ? 'border-navy-800 bg-navy-900 text-white'
                : 'border-stone-300 text-navy-800 hover:border-navy-300 hover:bg-stone-50',
            )}
          >
            {option.months} Mon.
          </button>
        ))}
      </div>

      <dl className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-stone-600">Monatsrate</dt>
          <dd className="font-display text-xl font-bold text-navy-900">{formatPrice(rate)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-stone-600">Effektiver Jahreszins</dt>
          <dd className="font-medium text-navy-900">
            {(term.annualRate * 100).toLocaleString('de-DE', { minimumFractionDigits: 1 })} %
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-stone-600">Finanzierungskosten</dt>
          <dd className="font-medium text-navy-900">{formatPrice(interest)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-stone-600">Gesamtbetrag</dt>
          <dd className="font-medium text-navy-900">{formatPrice(totalPaid)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-2xs leading-relaxed text-stone-500">
        Unverbindliches Rechenbeispiel ohne Anzahlung, bezogen auf den Bruttopreis. Die Finanzierung
        läuft über unseren Partner und setzt eine erfolgreiche Bonitätsprüfung voraus. Das
        verbindliche Angebot erhalten Sie im Antragsprozess.
      </p>
    </div>
  );
}
