'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, ShoppingCart, Trash2, Truck } from 'lucide-react';

import { formatPrice, routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';
import { imageSrc } from '@/lib/images';
import { QuantityStepper } from './quantity-stepper';

export function CartView() {
  const { cart, totals, ready, removeFromCart, setQuantity, postalCode, setPostalCode } =
    useStore();

  if (!ready) {
    return (
      <div className="mt-8 space-y-4" aria-busy="true" aria-label="Warenkorb wird geladen">
        {[0, 1].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-stone-100" />
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
          <ShoppingCart className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-navy-900">
          Ihr Warenkorb ist leer
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
          Stöbern Sie im Sortiment oder lassen Sie sich beraten – wir sagen Ihnen, welcher Container
          zu Ihrem Vorhaben passt.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href={routes.shop}>
              Container ansehen
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.quote}>Beratung anfordern</Link>
          </Button>
        </div>
      </div>
    );
  }

  const freeDeliveryProgress = totals.freeDeliveryRemainingNet > 0;

  return (
    <div translate="no" className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
      {/* Positionen */}
      <section aria-label="Positionen">
        <ul className="space-y-4">
          {cart.map((line) => (
            <li
              key={line.slug}
              className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4"
            >
              <Link
                href={routes.product(line.slug)}
                className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:size-28"
              >
                {line.image && (
                  <Image
                    src={imageSrc(line.image, { width: 224, height: 224 })}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-display text-base leading-snug font-bold text-navy-900">
                      <Link
                        href={routes.product(line.slug)}
                        className="transition-colors hover:text-accent-700"
                      >
                        {line.name}
                      </Link>
                    </h2>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Art.-Nr. {line.sku} · Lieferung in {line.leadTimeDays[0]}–
                      {line.leadTimeDays[1]} Werktagen
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.slug)}
                    aria-label={`${line.name} aus dem Warenkorb entfernen`}
                    className="shrink-0 cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-danger-50 hover:text-danger-600"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(next) => setQuantity(line.slug, next)}
                    label={`Menge für ${line.name}`}
                  />
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-navy-900">
                      {formatPrice(line.lineNet)}
                    </p>
                    {line.quantity > 1 && (
                      <p className="text-2xs text-stone-500">
                        {formatPrice(line.priceNet)} je Stück
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={routes.shop}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
          >
            Weiter einkaufen
          </Link>
        </div>
      </section>

      {/* Zusammenfassung */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-navy-900">Zusammenfassung</h2>

          {/* Lieferkosten */}
          <div className="mt-5">
            <label htmlFor="cart-plz" className="mb-1.5 block text-sm font-medium text-navy-800">
              Lieferpostleitzahl
            </label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400"
                aria-hidden
              />
              <Input
                id="cart-plz"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="z. B. 50667"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="pl-9"
                aria-describedby="plz-hint"
              />
            </div>
            <p id="plz-hint" className="mt-1.5 text-2xs text-stone-500">
              Für die Berechnung der Lieferpauschale.
            </p>
          </div>

          <dl className="mt-5 space-y-2.5 border-t border-stone-100 pt-5 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-600">Zwischensumme (netto)</dt>
              <dd className="font-medium text-navy-900">{formatPrice(totals.subtotalNet)}</dd>
            </div>

            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-600">Lieferung</dt>
              <dd className="text-right font-medium text-navy-900">
                {totals.deliveryNet === null ? (
                  <span className="text-stone-400">PLZ eingeben</span>
                ) : totals.deliveryFree ? (
                  <span className="font-semibold text-success-700">kostenlos</span>
                ) : (
                  formatPrice(totals.deliveryNet)
                )}
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-3 border-t border-stone-100 pt-3">
              <dt className="font-display text-base font-bold text-navy-900">Gesamt (netto)</dt>
              <dd className="font-display text-xl font-extrabold text-navy-950">
                {totals.totalNet !== null
                  ? formatPrice(totals.totalNet)
                  : formatPrice(totals.subtotalNet)}
                <span className="block text-2xs font-normal text-stone-500">
                  {totals.totalNet === null ? 'zzgl. Lieferung · zzgl. MwSt.' : 'zzgl. MwSt.'}
                </span>
              </dd>
            </div>
          </dl>

          {freeDeliveryProgress && (
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-accent-50 p-3 text-xs leading-relaxed text-accent-900">
              <Truck className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                Noch{' '}
                <strong className="font-semibold">
                  {formatPrice(totals.freeDeliveryRemainingNet)}
                </strong>{' '}
                netto bis zur versandkostenfreien Lieferung.
              </span>
            </p>
          )}

          <Button asChild size="lg" className="mt-5 w-full">
            <Link href={routes.checkout}>
              Zur Kasse
              <ArrowRight aria-hidden />
            </Link>
          </Button>

          <p className="mt-3 text-center text-2xs leading-relaxed text-stone-500">
            Bezahlung per Vorkasse, SEPA-Lastschrift oder auf Rechnung. Endgültige Preise und
            Lieferkosten werden im nächsten Schritt bestätigt.
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-stone-50 p-5">
          <h3 className="text-sm font-bold text-navy-900">Lieber ein Angebot?</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
            Bei mehreren Containern oder Sonderwünschen erstellen wir Ihnen ein individuelles
            Festpreisangebot.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full">
            <Link href={routes.quote}>Angebot anfordern</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
