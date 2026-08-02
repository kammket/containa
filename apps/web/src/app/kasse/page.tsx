import type { Metadata } from 'next';
import { Lock } from 'lucide-react';

import { routes } from '@emc/catalog';

import { CheckoutForm } from '@/components/checkout/checkout-form';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata(
  'Kasse',
  'Bestellung abschließen bei EMC Container – Zahlung per Vorkasse, SEPA-Lastschrift oder auf Rechnung.',
  routes.checkout,
);

export default function CheckoutPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">Kasse</h1>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1.5 text-xs font-semibold text-success-700">
          <Lock className="size-3.5" aria-hidden />
          SSL-verschlüsselte Verbindung
        </p>
      </div>
      <CheckoutForm />
    </div>
  );
}
