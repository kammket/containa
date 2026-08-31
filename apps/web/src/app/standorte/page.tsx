import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Truck } from 'lucide-react';

import { breadcrumbs, citiesByPopulation, deliveryZones, formatPrice, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Standorte – Seecontainer deutschlandweit geliefert',
    description:
      'EMC Container liefert Seecontainer in ganz Deutschland. Übersicht aller Standorte mit Lieferzeiten, Lieferzonen und regionalen Hinweisen zur Anlieferung.',
    focusKeyword: 'Container Standorte Deutschland',
    secondaryKeywords: ['Seecontainer Lieferung Deutschland', 'Container Liefergebiet'],
  },
  path: routes.cities,
});

export default function CitiesPage() {
  const crumbs = breadcrumbs({ name: 'Standorte', href: routes.cities });

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Seecontainer deutschlandweit
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Wir liefern in ganz Deutschland – per Absetzkipper oder Kranfahrzeug, auf Wunsch
            inklusive Autokran für schwer zugängliche Stellflächen. Wählen Sie Ihre Stadt für
            regionale Hinweise zu Lieferzeit, Zufahrt und typischen Einsatzzwecken.
          </p>
        </div>
      </section>

      {/* Lieferzonen */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Lieferzonen und Preise</h2>
          <p className="mt-2 max-w-3xl text-base text-stone-600">
            Die Lieferpauschale richtet sich nach der Leitregion Ihrer Postleitzahl und der
            Containerlänge. Ab 9.500 € netto Warenwert liefern wir versandkostenfrei.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-sm">
              <caption className="sr-only">Lieferzonen mit Grundpreis und Lieferzeit</caption>
              <thead className="bg-stone-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-bold text-navy-900">
                    Zone
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-bold text-navy-900">
                    PLZ-Bereich
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-bold text-navy-900">
                    20 Fuß (netto)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-bold text-navy-900">
                    Lieferzeit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {deliveryZones.map((zone) => (
                  <tr key={zone.name} className="even:bg-stone-50/50">
                    <th scope="row" className="px-4 py-3 text-left font-medium text-navy-900">
                      {zone.name}
                    </th>
                    <td className="px-4 py-3 text-stone-700">
                      {zone.prefixes.map((p) => `${p}0000–${p}9999`).join(', ')}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy-900">
                      {formatPrice(zone.baseNet)}
                    </td>
                    <td className="px-4 py-3 text-stone-700">
                      {zone.days[0]}–{zone.days[1]} Werktage
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 flex items-start gap-2 text-sm text-stone-500">
            <Truck className="mt-0.5 size-4 shrink-0 text-stone-400" aria-hidden />
            Für Container über 6 m Außenlänge kommt ein Längenzuschlag hinzu. Ist ein Autokran
            erforderlich, nennen wir den Aufpreis vor Auftragsbestätigung.
          </p>
        </div>
      </section>

      {/* Städte */}
      <section className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Unsere Lieferstädte im Detail
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {citiesByPopulation.map((city) => (
              <li key={city.slug}>
                <Link
                  href={routes.city(city.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-bold text-navy-900">
                        Seecontainer {city.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500">
                        <MapPin className="size-3.5" aria-hidden />
                        {city.state} · PLZ {city.postalPrefix}
                      </p>
                    </div>
                    <ArrowRight
                      className="size-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
                      aria-hidden
                    />
                  </div>

                  <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
                    <div>
                      <dt className="inline text-stone-500">Lieferzeit: </dt>
                      <dd className="inline font-semibold text-navy-800">
                        {city.deliveryDays[0]}–{city.deliveryDays[1]} Werktage
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-stone-500">Einwohner: </dt>
                      <dd className="inline font-semibold text-navy-800">
                        {formatNumber(city.population)}
                      </dd>
                    </div>
                  </dl>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-stone-600">
            Ihre Stadt ist nicht dabei? Kein Problem – wir liefern deutschlandweit.{' '}
            <Link
              href={routes.quote}
              className="font-semibold text-accent-700 underline underline-offset-2"
            >
              Fordern Sie ein Angebot für Ihre Postleitzahl an.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
