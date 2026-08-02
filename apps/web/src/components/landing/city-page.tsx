import Link from 'next/link';
import { ArrowRight, Check, MapPin, Phone, Truck } from 'lucide-react';

import {
  bestsellers,
  breadcrumbs,
  contact,
  formatPrice,
  grossFromNet,
  nearbyCities,
  navCategories,
  containerPriceRange,
  quoteDelivery,
  routes,
  type City,
} from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { breadcrumbSchema, citySchema, faqSchema, jsonLdGraph } from '@/lib/schema';
import { formatNumber } from '@/lib/utils';

/**
 * Städteseite unter /seecontainer-[stadt].
 *
 * Jede Seite trägt individuellen Text aus dem Katalog – Einleitung,
 * Anwendungsfälle und Logistikhinweis unterscheiden sich je Stadt. Ein
 * Katalogtest stellt sicher, dass hier kein Duplicate Content entsteht.
 */
export function CityPage({ city }: { city: City }) {
  const crumbs = breadcrumbs(
    { name: 'Standorte', href: routes.cities },
    { name: `Seecontainer ${city.name}`, href: routes.city(city.slug) },
  );

  // Beispielhafte Lieferpauschale für einen 20-Fuß-Container in diese Region
  const samplePostal = `${city.postalPrefix.split('–')[0]?.padEnd(2, '0')}000`.slice(0, 5);
  const delivery = quoteDelivery(samplePostal, 6.06);

  const products = bestsellers(4);
  const neighbours = nearbyCities(city.slug, 6);

  const cityFaqs = [
    {
      question: `Wie lange dauert die Lieferung nach ${city.name}?`,
      answer: `In der Regel ${city.deliveryDays[0]} bis ${city.deliveryDays[1]} Werktage ab Zahlungseingang, sofern der gewünschte Container am Lager ist. Den verbindlichen Termin stimmen wir telefonisch mit Ihnen ab; am Vortag erhalten Sie ein Zeitfenster von zwei Stunden per SMS.`,
    },
    {
      question: `Was kostet die Anlieferung nach ${city.name}?`,
      answer: delivery
        ? `Für einen 20-Fuß-Container liegt die Lieferpauschale in der Region ${city.name} bei rund ${formatPrice(grossFromNet(delivery.priceNet))} inkl. MwSt. (${city.hub} als nächstgelegener Umschlagplatz). Die exakten Kosten berechnen wir im Warenkorb anhand Ihrer Postleitzahl. Ab 9.500 € netto Warenwert liefern wir versandkostenfrei.`
        : `Die Lieferpauschale berechnen wir im Warenkorb transparent anhand Ihrer Postleitzahl. Ab 9.500 € netto Warenwert liefern wir versandkostenfrei.`,
    },
    {
      question: `Liefern Sie auch ins Umland von ${city.name}?`,
      answer: `Ja. Wir beliefern ${city.name} und die umliegenden Gemeinden – unter anderem ${city.districts.slice(0, 4).join(', ')}. Nennen Sie uns einfach Ihre Postleitzahl, dann prüfen wir die Zufahrt vorab.`,
    },
    {
      question: `Worauf muss ich bei der Anlieferung in ${city.name} achten?`,
      answer: city.logisticsNote,
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph(citySchema(city), breadcrumbSchema(crumbs), faqSchema(cityFaqs))} />

      {/* Kopfbereich */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/90 to-navy-950"
          aria-hidden
        />

        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} inverted />

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <MapPin className="size-3.5 text-accent-400" aria-hidden />
            {city.state} · PLZ {city.postalPrefix}
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            Seecontainer kaufen in {city.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Neue, gebrauchte und umgebaute Container – geliefert per Kranfahrzeug in{' '}
            {city.deliveryDays[0]}–{city.deliveryDays[1]} Werktagen.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Lieferzeit"
              value={`${city.deliveryDays[0]}–${city.deliveryDays[1]} Werktage`}
            />
            <Stat
              label="Container ab"
              value={formatPrice(grossFromNet(containerPriceRange.min))}
              hint="inkl. MwSt."
            />
            <Stat label="Nächster Umschlagplatz" value={city.hub} />
            <Stat label="Einwohner" value={formatNumber(city.population)} />
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Container ansehen
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              <a href={contact.phoneHref}>
                <Phone aria-hidden />
                {contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Ortsspezifischer Text */}
      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">
              Container in {city.name} – was Sie wissen sollten
            </h2>
            <div className="prose-de mt-5 space-y-4">
              {city.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-stone-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h3 className="mt-10 font-display text-lg font-bold text-navy-950">
              Typische Anwendungen in {city.name}
            </h3>
            <ul className="mt-5 space-y-4">
              {city.useCases.map((useCase) => (
                <li key={useCase.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-700">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{useCase.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-stone-600">
                      {useCase.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-accent-200 bg-accent-50 p-5">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-accent-900">
                <Truck className="size-4.5" aria-hidden />
                Hinweis zur Anlieferung in {city.name}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-accent-900/85">
                {city.logisticsNote}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <h3 className="font-display text-base font-bold text-navy-900">
                Liefergebiet {city.name}
              </h3>
              <p className="mt-1.5 text-sm text-stone-500">
                Wir beliefern unter anderem diese Stadtteile und Umlandgemeinden:
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {city.districts.map((district) => (
                  <li
                    key={district}
                    className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700"
                  >
                    {district}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h3 className="font-display text-base font-bold">
                Angebot für {city.name} anfordern
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Nennen Sie uns Größe, Zustand und Ihre Postleitzahl – Sie erhalten in einem Werktag
                ein Festpreisangebot inklusive Anlieferung.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={routes.quote}>
                  Kostenloses Angebot
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Produkte */}
      <section className="border-t border-stone-200 bg-stone-50 py-14">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-950">
                Beliebte Container für {city.name}
              </h2>
              <p className="mt-2 text-base text-stone-600">
                Diese Modelle liefern wir in der Region {city.name} am häufigsten aus.
              </p>
            </div>
            <Link
              href={routes.shop}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
            >
              Alle Container
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <nav aria-label="Kategorien" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {navCategories.slice(0, 10).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.href}
                    className="inline-flex rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Häufige Fragen zu Containern in {city.name}
          </h2>
          <dl className="mt-8 grid gap-5 md:grid-cols-2">
            {cityFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-stone-200 bg-white p-5">
                <dt className="font-display text-base font-bold text-navy-900">{faq.question}</dt>
                <dd className="prose-de mt-2 text-sm leading-relaxed text-stone-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Nachbarstädte */}
      <section className="border-t border-stone-200 py-12">
        <div className="container-page">
          <h2 className="font-display text-lg font-bold text-navy-950">
            Container in der Nähe von {city.name}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {neighbours.map((neighbour) => (
              <li key={neighbour.slug}>
                <Link
                  href={routes.city(neighbour.slug)}
                  className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-navy-300 hover:shadow-card"
                >
                  <span>
                    <span className="block text-sm font-semibold text-navy-900">
                      Seecontainer {neighbour.name}
                    </span>
                    <span className="block text-xs text-stone-500">
                      {neighbour.state} · Lieferung in {neighbour.deliveryDays[0]}–
                      {neighbour.deliveryDays[1]} Werktagen
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href={routes.cities}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
            >
              Alle Standorte in Deutschland
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <dt className="text-xs text-white/50">{label}</dt>
      <dd className="mt-1 font-display text-base font-bold text-white">
        {value}
        {hint && <span className="ml-1 text-xs font-normal text-white/50">{hint}</span>}
      </dd>
    </div>
  );
}
