'use client';

import Image from 'next/image';
import { Tag } from 'lucide-react';
import { useState } from 'react';

import { formatPrice } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiError, validateCoupon, type CouponResult } from '@/lib/api';
import { imageSrc } from '@/lib/images';
import { useStore } from '@/lib/store';

/** Bestellübersicht in der Kasse inklusive Gutscheinprüfung. */
export function OrderSummary() {
  const { cart, totals } = useStore();
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  const applyCoupon = async () => {
    if (!code.trim()) return;
    setChecking(true);
    setCouponError(null);
    try {
      const result = await validateCoupon(code.trim(), totals.subtotalNet);
      if (result.valid) {
        setCoupon(result);
      } else {
        setCoupon(null);
        setCouponError(result.message || 'Dieser Gutscheincode ist nicht gültig.');
      }
    } catch (error) {
      setCoupon(null);
      setCouponError(
        error instanceof ApiError
          ? error.message
          : 'Der Gutschein konnte nicht geprüft werden. Bitte versuchen Sie es später erneut.',
      );
    } finally {
      setChecking(false);
    }
  };

  const discountNet = coupon
    ? coupon.type === 'percent'
      ? Math.round((totals.subtotalNet * coupon.value) / 100)
      : coupon.value
    : 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-card">
      <h2 className="font-display text-lg font-bold text-navy-900">Ihre Bestellung</h2>

      <ul className="mt-4 space-y-3 border-b border-stone-100 pb-4">
        {cart.map((line) => (
          <li key={line.slug} className="flex items-center gap-3">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-stone-100">
              {line.image && (
                <Image
                  src={imageSrc(line.image, { width: 112, height: 112 })}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-navy-900 text-2xs font-bold text-white">
                {line.quantity}
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-navy-900">
                {line.name}
              </span>
              <span className="block text-xs text-stone-500">Art.-Nr. {line.sku}</span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-navy-900">
              {formatPrice(line.lineNet)}
            </span>
          </li>
        ))}
      </ul>

      {/* Gutschein */}
      <div className="border-b border-stone-100 py-4">
        <label htmlFor="coupon" className="mb-1.5 block text-sm font-medium text-navy-800">
          Gutscheincode
        </label>
        <div className="flex gap-2">
          <Input
            id="coupon"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="z. B. WINTER24"
            className="flex-1"
            aria-describedby={couponError ? 'coupon-error' : undefined}
          />
          <Button
            type="button"
            variant="outline"
            onClick={applyCoupon}
            disabled={checking || !code.trim()}
          >
            <span>{checking ? 'Prüfe …' : 'Einlösen'}</span>
          </Button>
        </div>
        {couponError && (
          <p id="coupon-error" role="alert" className="mt-1.5 text-xs font-medium text-danger-600">
            {couponError}
          </p>
        )}
        {coupon && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-success-700">
            <Tag className="size-3.5" aria-hidden />
            Gutschein {coupon.code} angewendet
          </p>
        )}
      </div>

      <dl className="space-y-2.5 py-4 text-sm">
        <Row label="Zwischensumme (netto)" value={formatPrice(totals.subtotalNet)} />

        {discountNet > 0 && (
          <Row
            label={`Rabatt${coupon?.type === 'percent' ? ` (${coupon.value} %)` : ''}`}
            value={`− ${formatPrice(discountNet)}`}
            highlight
          />
        )}

        <Row
          label="Lieferung"
          value={
            totals.deliveryNet === null
              ? 'wird berechnet'
              : totals.deliveryFree
                ? 'kostenlos'
                : formatPrice(totals.deliveryNet)
          }
        />

      </dl>

      <div className="flex items-baseline justify-between gap-3 border-t border-stone-100 pt-4">
        <span className="font-display text-base font-bold text-navy-900">Gesamtbetrag (netto)</span>
        <span className="font-display text-xl font-extrabold text-navy-950">
          {formatPrice((totals.totalNet ?? totals.subtotalNet) - discountNet)}
          <span className="block text-right text-2xs font-normal text-stone-500">
            zzgl. MwSt. – ausgewiesen auf der Rechnung
          </span>
        </span>
      </div>

      <p className="mt-3 text-2xs leading-relaxed text-stone-500">
        Endgültige Lieferkosten bestätigen wir nach Prüfung der Zufahrt. Sollte ein Autokran
        erforderlich sein, informieren wir Sie vor Auftragsbestätigung über den Aufpreis – Sie
        können die Bestellung dann kostenfrei stornieren.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-stone-600">{label}</dt>
      <dd className={highlight ? 'font-semibold text-success-700' : 'font-medium text-navy-900'}>
        {value}
      </dd>
    </div>
  );
}
