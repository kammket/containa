import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { address, aggregateRating, brand, breadcrumbs, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { breadcrumbSchema, jsonLdGraph, organizationSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Über uns – Ihr Containerhändler im Westerwald',
    description:
      'EMC Container aus Altenkirchen: seit 2014 Handel, Umbau und Lieferung von Seecontainern in ganz Deutschland. Eigene Werkstatt, eigener Fuhrpark, ehrliche Beratung.',
    focusKeyword: 'EMC Container Unternehmen',
    secondaryKeywords: ['Containerhändler Deutschland', 'Seecontainer Fachhändler'],
  },
  path: routes.about,
});

const values = [
  {
    title: 'Festpreis heißt Festpreis',
    text: 'Was im Angebot steht, steht auch auf der Rechnung. Kranstellung und Wartezeiten kalkulieren wir vorher – nicht hinterher als Nachtrag.',
  },
  {
    title: 'Ehrliche Beratung',
    text: 'Wenn ein gebrauchter Container für Ihren Zweck reicht, sagen wir das – auch wenn der neue mehr Marge bringt. Wiederkehrende Kunden sind uns lieber als eine einmalige Spitze.',
  },
  {
    title: 'Wir prüfen vor der Lieferung',
    text: 'Jeder Gebrauchtcontainer durchläuft den Lichttest. Was nicht dicht ist, geht nicht raus – sondern in die Werkstatt.',
  },
  {
    title: 'Alles aus einer Hand',
    text: 'Handel, Umbau, Transport und Service liegen bei uns. Ein Ansprechpartner, ein Termin, keine Schnittstellenverluste.',
  },
];

const milestones = [
  {
    year: '2014',
    title: 'Gründung in Altenkirchen',
    text: 'Start mit zwei Mitarbeitern und einem gemieteten Lagerplatz. Die ersten Container gehen an Handwerksbetriebe in der Region.',
  },
  {
    year: '2017',
    title: 'Eigene Werkstatt',
    text: 'Mit der eigenen Schlosserei beginnt das Umbaugeschäft: Fenster, Türen, Belüftung und die ersten Bürocontainer.',
  },
  {
    year: '2019',
    title: 'Bundesweite Lieferung',
    text: 'Aufbau eines Partnernetzes aus Speditionen und Autokranbetrieben. Seitdem liefern wir in ganz Deutschland.',
  },
  {
    year: '2022',
    title: 'Kühlcontainer im Programm',
    text: 'Aufnahme von Reefer-Containern samt eigener PTI-Prüfung – vor allem für Landwirtschaft und Lebensmittelhandel.',
  },
  {
    year: '2026',
    title: 'Neuer Onlineshop',
    text: 'Preise, Verfügbarkeit und Lieferkosten transparent online – ohne dass man erst anrufen muss, um einen Preis zu erfahren.',
  },
];

export default function AboutPage() {
  const crumbs = breadcrumbs({ name: 'Über uns', href: routes.about });

  return (
    <>
      <JsonLd data={jsonLdGraph(organizationSchema(), breadcrumbSchema(crumbs))} />

      {/* Kopfbereich */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} inverted />
          <h1 className="mt-6 max-w-4xl font-display text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            Container sind unser Handwerk – seit {brand.foundingYear}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Wir sind ein inhabergeführter Fachhändler aus {address.city} im Westerwald. Wir kaufen,
            prüfen, bauen um und liefern – mit eigener Werkstatt und festen Transportpartnern in
            ganz Deutschland.
          </p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              value={`${new Date().getFullYear() - brand.foundingYear}+`}
              label="Jahre Erfahrung"
            />
            <Stat value={formatNumber(aggregateRating.reviewCount)} label="Bewertungen" />
            <Stat
              value={aggregateRating.ratingValue.toLocaleString('de-DE')}
              label="Durchschnittsbewertung"
            />
            <Stat value="16" label="Bundesländer beliefert" />
          </dl>
        </div>
      </section>

      {/* Geschichte */}
      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">Wie wir arbeiten</h2>
            <div className="prose-de mt-5 space-y-4 text-base leading-relaxed text-stone-700">
              <p>
                Der Containerhandel hat einen zweifelhaften Ruf – zu Recht. Viele Anbieter locken
                mit Preisen, die die Lieferung nicht enthalten, und rechnen Kranstellung, Wartezeit
                und Rangieren nachträglich ab. Am Ende zahlt der Kunde deutlich mehr, als er geplant
                hatte.
              </p>
              <p>
                Wir machen das anders. Bevor wir ein Angebot abgeben, klären wir die Zufahrt – wenn
                nötig anhand von Fotos und Kartenmaterial. Ist ein Autokran erforderlich, steht er
                im Angebot. Was Sie zusagen, ist der Preis, den Sie zahlen.
              </p>
              <p>
                Genauso halten wir es beim Zustand. Ein gebrauchter Container ist kein neuer, und
                wir beschreiben ihn auch nicht so. Wer eine makellose Optik erwartet, bekommt von
                uns die Empfehlung zum One-Trip-Container – und wer nur trockenen Stauraum hinter
                der Halle braucht, spart mit dem Gebrauchtcontainer über tausend Euro.
              </p>
              <p>
                Unsere eigene Werkstatt in {address.city} ist dabei der Unterschied zum reinen
                Zwischenhändler: Wir sehen jeden Container, den wir verkaufen. Was nicht dicht ist,
                wird instand gesetzt oder aussortiert – nicht weitergereicht.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">Wofür wir stehen</h2>
            <ul className="mt-5 space-y-4">
              {values.map((value) => (
                <li key={value.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-700">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{value.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-stone-600">
                      {value.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Meilensteine */}
      <section className="border-t border-stone-200 bg-stone-50 py-14">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Unsere Entwicklung</h2>
          <ol className="mt-8 space-y-6 border-l-2 border-stone-200 pl-6">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative">
                <span
                  className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full border-2 border-white bg-accent-600"
                  aria-hidden
                />
                <p className="font-display text-sm font-bold text-accent-700">{milestone.year}</p>
                <h3 className="mt-0.5 font-display text-base font-bold text-navy-900">
                  {milestone.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-600">
                  {milestone.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="container-page">
          <div className="rounded-2xl bg-navy-950 p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Sprechen Sie mit uns – nicht mit einem Formular
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/75">
              Beschreiben Sie kurz Ihr Vorhaben. Wir sagen Ihnen, welcher Container passt, was er
              kostet und ob die Anlieferung bei Ihnen funktioniert.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={routes.quote}>
                  Angebot anfordern
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/15"
              >
                <Link href={routes.contact}>Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-display text-3xl font-extrabold text-white">{value}</span>
        <span className="mt-1 block text-sm text-white/60">{label}</span>
      </dd>
    </div>
  );
}
