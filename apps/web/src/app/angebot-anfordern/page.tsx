import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock, ShieldCheck } from 'lucide-react';

import { breadcrumbs, routes } from '@emc/catalog';

import { QuoteForm } from '@/components/forms/quote-form';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Angebot anfordern – Festpreis in einem Werktag',
    description:
      'Kostenloses Containerangebot anfordern: Größe, Zustand und Lieferort angeben – Sie erhalten in einem Werktag ein verbindliches Festpreisangebot inklusive Anlieferung.',
    focusKeyword: 'Container Angebot anfordern',
    secondaryKeywords: ['Containerpreis anfragen', 'Seecontainer Angebot'],
  },
  path: routes.quote,
});

const promises = [
  {
    icon: Clock,
    title: 'Antwort in einem Werktag',
    text: 'Wir prüfen Verfügbarkeit und Zufahrt und melden uns mit einem konkreten Preis zurück.',
  },
  {
    icon: ShieldCheck,
    title: 'Verbindlicher Festpreis',
    text: 'Container, Lieferung und – falls nötig – Kranstellung in einer Summe. Keine Nachträge.',
  },
  {
    icon: Check,
    title: 'Unverbindlich und kostenlos',
    text: 'Aus einer Anfrage entsteht keine Verpflichtung. Wir rufen auch nicht wiederholt an.',
  },
];

export default function QuotePage() {
  const crumbs = breadcrumbs({ name: 'Angebot anfordern', href: routes.quote });

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Kostenloses Angebot anfordern
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Sagen Sie uns, was Sie vorhaben – wir sagen Ihnen, welcher Container passt, was er
            kostet und ob die Anlieferung bei Ihnen funktioniert. Auch wenn die Antwort lautet:
            „Nehmen Sie den günstigeren.&ldquo;
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <QuoteForm />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <ul className="space-y-4">
              {promises.map((promise) => (
                <li
                  key={promise.title}
                  className="flex gap-3.5 rounded-2xl border border-stone-200 bg-white p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                    <promise.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-bold text-navy-900">
                      {promise.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{promise.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h2 className="font-display text-base font-bold">Lieber frei formulieren?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Bei komplexen Vorhaben – Umbauten, mehrere Standorte, enge Zufahrt – beschreiben Sie
                uns Ihr Projekt einfach im Kontaktformular.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={routes.contact}>Zum Kontaktformular</Link>
              </Button>
              <p className="mt-3 text-center text-2xs text-white/50">
                Mo–Do 8–17 Uhr · Fr 8–16 Uhr · Sa 9–13 Uhr
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
