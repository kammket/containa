import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Mail, Phone, Truck } from 'lucide-react';

import { contact, routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { privateMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

export const metadata: Metadata = privateMetadata(
  'Bestellung bestätigt',
  'Vielen Dank für Ihre Bestellung bei EMC Container.',
  routes.checkout,
);

const steps = [
  {
    icon: Mail,
    title: 'Bestellbestätigung per E-Mail',
    text: 'Sie erhalten innerhalb weniger Minuten eine Bestätigung mit allen Positionen und der Rechnung als PDF – ohne Registrierung.',
  },
  {
    icon: Phone,
    title: 'Wir prüfen die Anlieferung',
    text: 'Unsere Disposition prüft die Zufahrt zu Ihrer Adresse und meldet sich telefonisch zur Terminabstimmung – in der Regel am nächsten Werktag.',
  },
  {
    icon: Truck,
    title: 'Anlieferung mit Zeitfenster',
    text: 'Am Vortag erhalten Sie ein Zeitfenster von zwei Stunden per SMS. Der Fahrer setzt den Container an der vereinbarten Position ab.',
  },
];

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { orderNumber } = await params;

  return (
    <div className="container-narrow py-14 lg:py-20">
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-success-50 text-success-600">
          <Check className="size-8" aria-hidden strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
          Vielen Dank für Ihre Bestellung
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          Ihre Bestellung ist bei uns eingegangen und wird bearbeitet.
        </p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5">
          <span className="text-sm text-stone-600">Bestellnummer:</span>
          <span className="font-display text-base font-bold text-navy-950">{orderNumber}</span>
        </p>
      </div>

      <ol className="mt-12 space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-100 text-navy-800">
              <step.icon className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-base font-bold text-navy-900">
                <span className="text-stone-400">{index + 1}.</span> {step.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="flex-1">
          <Link href={`${routes.trackOrder}?nr=${orderNumber}`}>Bestellstatus verfolgen</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="flex-1">
          <Link href={routes.shop}>Weiter einkaufen</Link>
        </Button>
      </div>

      <p className="mt-4 text-center text-sm text-stone-500">
        Ihre Rechnung als PDF erhalten Sie mit der Bestellbestätigung per E-Mail. Ein Kundenkonto
        benötigen Sie dafür nicht.
      </p>

      <div className="mt-10 rounded-2xl bg-navy-950 p-6 text-center text-white">
        <h2 className="font-display text-lg font-bold">Fragen zu Ihrer Bestellung?</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-white/70">
          Geben Sie Ihre Bestellnummer an – dann können wir Ihnen sofort weiterhelfen.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary">
            <Link href={routes.contact}>
              Nachricht senden
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/25 bg-white/10 text-white hover:bg-white/15"
          >
            <a href={contact.emailHref}>
              <Mail aria-hidden />
              {contact.email}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
