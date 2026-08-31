'use client';

import { MapPin, Truck } from 'lucide-react';
import { useState } from 'react';

import { formatPrice, quoteDelivery, type DeliveryQuote } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { deliveryWindow } from '@/lib/utils';

/**
 * Lieferkostenrechner. Rechnet vollständig im Client aus den Zonendaten des
 * Katalogs – ohne API-Aufruf, damit das Ergebnis unmittelbar erscheint.
 */
export function DeliveryChecker({ lengthMeters = 6.06 }: { lengthMeters?: number }) {
  const [postalCode, setPostalCode] = useState('');
  const [result, setResult] = useState<DeliveryQuote | null | 'invalid'>(null);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const quote = quoteDelivery(postalCode, lengthMeters);
    setResult(quote ?? 'invalid');
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
          <Truck className="size-5" aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-navy-900">
            Lieferkosten sofort berechnen
          </h3>
          <p className="mt-0.5 text-sm text-stone-500">
            Postleitzahl eingeben – Sie sehen Pauschale und Lieferzeit direkt.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-5 flex gap-2">
        <div className="relative flex-1">
          <MapPin
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400"
            aria-hidden
          />
          <label htmlFor="plz-check" className="sr-only">
            Postleitzahl
          </label>
          <Input
            id="plz-check"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="z. B. 50667"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 5));
              setResult(null);
            }}
            className="pl-9"
          />
        </div>
        <Button type="submit" disabled={postalCode.length !== 5}>
          Prüfen
        </Button>
      </form>

      {result === 'invalid' && (
        <p role="alert" className="mt-3 text-sm font-medium text-danger-600">
          Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.
        </p>
      )}

      {result && result !== 'invalid' && (
        <div className="mt-4 animate-fade-up rounded-xl bg-stone-50 p-4">
          <dl className="space-y-2 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-600">Lieferzone</dt>
              <dd className="text-right font-medium text-navy-900">{result.zone.name}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-600">Lieferpauschale</dt>
              <dd className="text-right font-bold text-navy-900">
                {formatPrice(result.priceNet)}
                <span className="block text-2xs font-normal text-stone-500">zzgl. MwSt.</span>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-600">Voraussichtliche Lieferung</dt>
              <dd className="text-right font-medium text-navy-900">
                {deliveryWindow(result.days)}
                <span className="block text-2xs font-normal text-stone-500">
                  {result.days[0]}–{result.days[1]} Werktage
                </span>
              </dd>
            </div>
          </dl>
          <p className="mt-3 border-t border-stone-200 pt-3 text-2xs text-stone-500">
            Gilt für einen Container bis {lengthMeters.toLocaleString('de-DE')} m Außenlänge bei
            befestigter, frei anfahrbarer Stellfläche. Ist ein Autokran erforderlich, nennen wir den
            Aufpreis vor Auftragsbestätigung.
          </p>
        </div>
      )}
    </div>
  );
}
