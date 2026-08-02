import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';

import { breadcrumbs, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Downloads – Maßblätter, Checklisten & Datenblätter',
    description:
      'Kostenlose Downloads von EMC Container: Maßblätter aller Containergrößen, Checkliste für Stellplatz und Anlieferung, Garantiebedingungen und technische Datenblätter.',
    focusKeyword: 'Container Maßblatt',
    secondaryKeywords: ['Container Abmessungen PDF', 'Seecontainer Datenblatt'],
  },
  path: routes.downloads,
});

const groups = [
  {
    title: 'Technische Unterlagen',
    description: 'Maße, Gewichte und Zeichnungen für Ihre Planung.',
    files: [
      {
        label: 'Maßblatt alle Containergrößen',
        description:
          'Außen- und Innenmaße, Türöffnungen, Volumina und Gewichte für 10, 20, 40 und 45 Fuß – Standard und High Cube.',
        href: '/downloads/emc-massblatt-seecontainer.pdf',
        size: '480 KB',
      },
      {
        label: 'Technische Zeichnung 20 Fuß',
        description: 'Bemaßte Ansichten und Schnitte des 20-Fuß-Standardcontainers.',
        href: '/downloads/emc-zeichnung-20ft.pdf',
        size: '320 KB',
      },
      {
        label: 'Technische Zeichnung 40 Fuß High Cube',
        description: 'Bemaßte Ansichten und Schnitte des 40-Fuß-High-Cube-Containers.',
        href: '/downloads/emc-zeichnung-40ft-hc.pdf',
        size: '340 KB',
      },
    ],
  },
  {
    title: 'Planung & Vorbereitung',
    description: 'Damit am Liefertag alles glattgeht.',
    files: [
      {
        label: 'Checkliste Stellplatz & Anlieferung',
        description:
          'Zufahrtsmaße, Untergrund, Kranstellung und was Sie am Liefertag bereithalten sollten.',
        href: '/downloads/emc-checkliste-anlieferung.pdf',
        size: '260 KB',
      },
      {
        label: 'Leitfaden Kondenswasser vermeiden',
        description:
          'Ursachen von Kondensat im Container und die drei wirksamsten Gegenmaßnahmen im Vergleich.',
        href: '/downloads/emc-leitfaden-kondenswasser.pdf',
        size: '410 KB',
      },
      {
        label: 'Übersicht Baugenehmigung nach Bundesland',
        description:
          'Wann ein Container verfahrensfrei ist und wann nicht – als Orientierung für die Anfrage beim Bauamt.',
        href: '/downloads/emc-uebersicht-baugenehmigung.pdf',
        size: '380 KB',
      },
    ],
  },
  {
    title: 'Kaufmännische Unterlagen',
    description: 'Bedingungen und Nachweise zum Nachlesen.',
    files: [
      {
        label: 'Garantiebedingungen',
        description: 'Umfang, Laufzeiten und Ausschlüsse unserer Garantieleistungen.',
        href: '/downloads/emc-garantiebedingungen.pdf',
        size: '180 KB',
      },
      {
        label: 'Allgemeine Geschäftsbedingungen',
        description: 'Unsere AGB als PDF zum Ausdrucken und Archivieren.',
        href: '/downloads/emc-agb.pdf',
        size: '210 KB',
      },
      {
        label: 'Muster-Widerrufsformular',
        description: 'Formular zur Ausübung des gesetzlichen Widerrufsrechts.',
        href: '/downloads/emc-widerrufsformular.pdf',
        size: '95 KB',
      },
    ],
  },
];

export default function DownloadsPage() {
  const crumbs = breadcrumbs({ name: 'Downloads', href: routes.downloads });

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Downloads
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Maßblätter, Checklisten und Bedingungen als PDF – kostenlos und ohne Registrierung.
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="font-display text-2xl font-bold text-navy-950">{group.title}</h2>
              <p className="mt-1.5 text-base text-stone-600">{group.description}</p>

              <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.files.map((file) => (
                  <li key={file.href}>
                    <a
                      href={file.href}
                      download
                      className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card-hover"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-100 text-navy-800">
                          <FileText className="size-5" aria-hidden />
                        </span>
                        <Download
                          className="size-4 shrink-0 text-stone-300 transition-colors group-hover:text-accent-600"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-4 block font-display text-base font-bold text-navy-900">
                        {file.label}
                      </span>
                      <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-stone-600">
                        {file.description}
                      </span>
                      <span className="mt-4 block text-2xs font-bold tracking-wider text-stone-400 uppercase">
                        PDF · {file.size}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center text-white">
          <h2 className="font-display text-xl font-bold">Unterlage nicht gefunden?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            Brauchen Sie ein bestimmtes Datenblatt, eine CAD-Zeichnung oder Nachweise für Ihren
            Bauantrag? Schreiben Sie uns kurz – wir senden es Ihnen zu.
          </p>
          <Button asChild className="mt-6">
            <Link href={routes.contact}>Unterlage anfragen</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
