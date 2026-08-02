import type { Metadata } from 'next';
import { Suspense } from 'react';

import { routes } from '@emc/catalog';

import { TrackOrderForm } from '@/components/order/track-order-form';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata(
  'Sendungsverfolgung',
  'Status Ihrer Bestellung bei EMC Container abrufen – mit Bestellnummer und E-Mail-Adresse.',
  routes.trackOrder,
);

export default function TrackOrderPage() {
  return (
    <div className="container-narrow py-12 lg:py-16">
      <h1 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
        Sendungsverfolgung
      </h1>
      <p className="mt-3 text-base leading-relaxed text-stone-600">
        Geben Sie Bestellnummer und E-Mail-Adresse ein, um den aktuellen Stand Ihrer Bestellung
        abzurufen. Ein Kundenkonto benötigen Sie dafür nicht.
      </p>

      <Suspense
        fallback={
          <div className="mt-8 h-56 animate-pulse rounded-2xl bg-stone-100" aria-busy="true" />
        }
      >
        <TrackOrderForm />
      </Suspense>
    </div>
  );
}
