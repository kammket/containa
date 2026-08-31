import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Euro, MapPin } from 'lucide-react';

import { address, breadcrumbs, contact, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { HeroPhoto } from '@/components/layout/hero-photo';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Karriere – offene Stellen bei EMC Container',
    description:
      'Arbeiten bei EMC Container in Altenkirchen: offene Stellen in Werkstatt, Disposition und Vertrieb. Kleines Team, kurze Wege, unbefristete Verträge.',
    focusKeyword: 'EMC Container Jobs',
    secondaryKeywords: ['Stellenangebote Altenkirchen', 'Job Containerhandel'],
  },
  path: routes.careers,
});

const openings = [
  {
    title: 'Schlosser / Metallbauer (m/w/d) für Containerumbau',
    type: 'Vollzeit',
    location: `${address.city} (vor Ort)`,
    salary: '38.000 – 48.000 € brutto p. a.',
    intro:
      'Sie schneiden Fenster und Türen ein, setzen Verstärkungsrahmen, montieren Rolltore und bauen Container zu Werkstätten und Büros aus.',
    tasks: [
      'Zuschnitt und Einbau von Fenstern, Türen und Toren',
      'Schweiß- und Schlosserarbeiten an Containerrahmen und Aufbauten',
      'Instandsetzung von Türdichtungen, Verriegelungen und Bodenplatten',
      'Endkontrolle vor Auslieferung inklusive Dichtheitsprüfung',
    ],
    profile: [
      'Abgeschlossene Ausbildung als Metallbauer, Schlosser, Konstruktionsmechaniker oder vergleichbar',
      'Sicherer Umgang mit Schweißgerät, Trennschleifer und Handwerkzeug',
      'Sorgfältige, eigenständige Arbeitsweise',
      'Führerschein Klasse B',
    ],
  },
  {
    title: 'Mitarbeiter Disposition & Kundenberatung (m/w/d)',
    type: 'Vollzeit',
    location: `${address.city} (teilweise mobil)`,
    salary: '36.000 – 46.000 € brutto p. a.',
    intro:
      'Sie planen Liefertermine, prüfen Zufahrten anhand von Kartenmaterial und beraten Kundinnen und Kunden telefonisch zur passenden Containerlösung.',
    tasks: [
      'Terminplanung mit eigenen Fahrzeugen und Partnerspediteuren',
      'Prüfung der Anlieferbarkeit und Disposition von Autokranen',
      'Telefonische Beratung zu Größe, Zustand und Ausstattung',
      'Erstellung von Angeboten und Auftragsbestätigungen',
    ],
    profile: [
      'Kaufmännische Ausbildung, gern in Spedition oder Logistik',
      'Gutes räumliches Vorstellungsvermögen',
      'Freude am Telefonkontakt und an ehrlicher Beratung',
      'Sicherer Umgang mit gängiger Bürosoftware',
    ],
  },
  {
    title: 'Berufskraftfahrer (m/w/d) CE mit Ladekran',
    type: 'Vollzeit',
    location: 'Deutschlandweit im Tagesverkehr',
    salary: '42.000 – 52.000 € brutto p. a.',
    intro:
      'Sie liefern Container zu unseren Kundinnen und Kunden und setzen sie punktgenau ab – überwiegend im Tagesverkehr mit Rückkehr zum Standort.',
    tasks: [
      'Transport von Containern mit Absetzkipper und Ladekran',
      'Punktgenaues Absetzen unter beengten Verhältnissen',
      'Übergabe und Dokumentation beim Kunden',
      'Ladungssicherung und Fahrzeugpflege',
    ],
    profile: [
      'Führerschein CE mit gültiger Fahrerkarte und Modul 95',
      'Erfahrung mit Ladekran, idealerweise Kranschein',
      'Kundenorientiertes Auftreten',
      'Zuverlässigkeit und Umsicht auf engen Baustellen',
    ],
  },
];

const benefits = [
  'Unbefristete Verträge – wir stellen ein, um zu bleiben',
  'Kleines Team mit kurzen Wegen und direkter Ansprache',
  'Überwiegend Tagesverkehr, Rückkehr zum Standort',
  '30 Tage Urlaub und geregelte Arbeitszeiten',
  'Betriebliche Altersvorsorge mit Arbeitgeberzuschuss',
  'Hochwertige Arbeitskleidung und Werkzeug werden gestellt',
];

export default function CareersPage() {
  const crumbs = breadcrumbs({ name: 'Karriere', href: routes.careers });

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <HeroPhoto />
        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} inverted />
          <h1 className="mt-6 max-w-3xl font-display text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            Arbeiten bei EMC Container
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Wir sind ein kleines Team in {address.city} – rund 20 Personen in Werkstatt,
            Disposition, Fuhrpark und Vertrieb. Kurze Wege, klare Zuständigkeiten und Kolleginnen
            und Kollegen, die man beim Vornamen kennt.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Offene Stellen</h2>

          <ul className="mt-8 space-y-6">
            {openings.map((job) => (
              <li
                key={job.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
              >
                <h3 className="font-display text-xl font-bold text-navy-950">{job.title}</h3>

                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-600">
                  <li className="flex items-center gap-1.5">
                    <Clock className="size-4 text-stone-400" aria-hidden />
                    {job.type}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-stone-400" aria-hidden />
                    {job.location}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Euro className="size-4 text-stone-400" aria-hidden />
                    {job.salary}
                  </li>
                </ul>

                <p className="mt-4 text-base leading-relaxed text-stone-700">{job.intro}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-stone-400 uppercase">
                      Ihre Aufgaben
                    </h4>
                    <ul className="mt-2.5 space-y-1.5">
                      {job.tasks.map((task) => (
                        <li
                          key={task}
                          className="flex gap-2.5 text-sm leading-relaxed text-stone-700"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500"
                            aria-hidden
                          />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-stone-400 uppercase">
                      Ihr Profil
                    </h4>
                    <ul className="mt-2.5 space-y-1.5">
                      {job.profile.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-stone-700"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-stone-300"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button asChild className="mt-6">
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`Bewerbung: ${job.title}`)}`}
                  >
                    Auf diese Stelle bewerben
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">Was wir bieten</h2>
            <ul className="mt-5 space-y-2.5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2.5 text-sm leading-relaxed text-stone-700">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-success-600"
                    aria-hidden
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">Initiativbewerbung</h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Keine passende Stelle dabei? Wir schauen uns jede Bewerbung an. Schreiben Sie kurz,
              was Sie können und wo Sie sich einbringen möchten – ein formeller Lebenslauf reicht,
              ein Anschreiben in drei Sätzen genügt.
            </p>
            <Button asChild variant="secondary" className="mt-5">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Initiativbewerbung')}`}
              >
                Initiativ bewerben
              </a>
            </Button>
            <p className="mt-4 text-sm text-stone-500">
              Fragen vorab?{' '}
              <Link href={routes.contact} className="font-semibold text-navy-800">
                Schreiben Sie uns
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
