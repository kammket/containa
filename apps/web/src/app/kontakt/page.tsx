import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, FileText, Mail, MapPin, type Phone, Printer } from 'lucide-react';

import { address, brand, breadcrumbs, contact, openingHours, routes } from '@emc/catalog';

import { ContactForm } from '@/components/forms/contact-form';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { MapEmbed } from '@/components/layout/map-embed';
import { breadcrumbSchema, jsonLdGraph, localBusinessSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Kontakt – Beratung zu Seecontainern',
    description:
      'Kontakt zu EMC Container: Telefon, E-Mail, Anfahrt und Öffnungszeiten. Kostenlose Beratung zu Seecontainern, Anlieferung und Umbauten – Antwort innerhalb eines Werktages.',
    focusKeyword: 'EMC Container Kontakt',
    secondaryKeywords: ['Container Beratung', 'Seecontainer Ansprechpartner'],
  },
  path: routes.contact,
});

export default function ContactPage() {
  const crumbs = breadcrumbs({ name: 'Kontakt', href: routes.contact });

  return (
    <>
      <JsonLd data={jsonLdGraph(localBusinessSchema(), breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Kontakt
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Ob Größenberatung, Frage zur Zufahrt oder individueller Umbau – schreiben Sie uns oder
            rufen Sie an. Wir antworten in der Regel innerhalb eines Werktages, telefonisch sofort.
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">Schreiben Sie uns</h2>
            <p className="mt-2 text-base text-stone-600">
              Je genauer Sie Ihr Vorhaben beschreiben, desto konkreter fällt unsere Antwort aus.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold text-navy-950">Direkter Draht</h2>

              <ul className="mt-5 space-y-4 text-sm">
                <ContactRow icon={FileText} label="Angebot">
                  <Link
                    href={routes.quote}
                    className="font-semibold text-navy-900 transition-colors hover:text-accent-700"
                  >
                    Angebot anfordern
                  </Link>
                  <span className="mt-1 block text-xs text-stone-500">
                    Maße, Zustand und Lieferort angeben – wir antworten mit einem Festpreis.
                  </span>
                </ContactRow>

                <ContactRow icon={Mail} label="E-Mail">
                  <a
                    href={contact.emailHref}
                    className="font-semibold text-navy-900 transition-colors hover:text-accent-700"
                  >
                    {contact.email}
                  </a>
                  <span className="mt-1 block text-xs text-stone-500">
                    Vertrieb: {contact.salesEmail}
                    <br />
                    Service: {contact.supportEmail}
                  </span>
                </ContactRow>

                <ContactRow icon={Printer} label="Fax">
                  <span className="text-stone-700">{contact.fax}</span>
                </ContactRow>

                <ContactRow icon={MapPin} label="Anschrift">
                  <address className="text-stone-700 not-italic">
                    {brand.legalName}
                    <br />
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}
                    <br />
                    {address.country}
                  </address>
                </ContactRow>
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy-950">
                <Clock className="size-5 text-accent-600" aria-hidden />
                Öffnungszeiten
              </h2>
              <dl className="mt-4 space-y-1.5 text-sm">
                {openingHours.map((day) => (
                  <div key={day.day} className="flex items-baseline justify-between gap-3">
                    <dt className="text-stone-600">{day.day}</dt>
                    <dd className="font-medium text-navy-900">
                      {day.open} – {day.close} Uhr
                    </dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-3 border-t border-stone-100 pt-1.5">
                  <dt className="text-stone-600">Sonntag</dt>
                  <dd className="font-medium text-stone-400">geschlossen</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-stone-500">
                Besichtigungstermine an unserem Standort nach vorheriger telefonischer Absprache.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Anfahrt */}
      <section className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Anfahrt</h2>
          <p className="mt-2 max-w-3xl text-base text-stone-600">
            Unser Lager- und Werkstattgelände liegt in {address.city} im Westerwald –
            verkehrsgünstig zwischen Köln, Bonn und Koblenz.
          </p>
          <div className="mt-6">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-navy-800">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-wider text-stone-400 uppercase">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </li>
  );
}
