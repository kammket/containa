import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
  breadcrumbs,
  formatPrice,
  getCategory,
  getProduct,
  grossFromNet,
  navCategories,
  containerPriceRange,
  routes,
  type LandingPage,
} from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { breadcrumbSchema, faqSchema, jsonLdGraph } from '@/lib/schema';

/**
 * Landingpage für eine kaufstarke Suchintention (z. B. /seecontainer-kaufen).
 *
 * Aufbau folgt der Suchintention: Antwort zuerst (Preise, Verfügbarkeit),
 * dann Produkte, dann vertiefender Text und FAQ.
 */
export function KeywordLandingPage({ page }: { page: LandingPage }) {
  const crumbs = breadcrumbs({ name: page.seo.focusKeyword, href: routes.landing(page.slug) });

  const products = page.productSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const categories = page.categorySlugs
    .map((slug) => getCategory(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs), faqSchema(page.faqs))} />

      {/* Kopfbereich */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/85 to-navy-950"
          aria-hidden
        />

        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} inverted />

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-success-600" aria-hidden />
            {page.kicker}
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>

          <div className="mt-5 max-w-2xl space-y-3">
            {page.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-white/75">
                {paragraph}
              </p>
            ))}
          </div>

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
              <Link href={routes.quote}>
                Angebot anfordern
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/60">
            Container ab{' '}
            <strong className="font-semibold text-white">
              {formatPrice(grossFromNet(containerPriceRange.min))}
            </strong>{' '}
            inkl. MwSt. · CSC-zertifiziert · Lieferung deutschlandweit
          </p>
        </div>
      </section>

      {/* Produkte */}
      {products.length > 0 && (
        <section className="py-14">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-navy-950">
                Passende Container aus unserem Sortiment
              </h2>
              <Link
                href={routes.shop}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
              >
                Alle ansehen
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard key={product.slug} product={product} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Redaktionelle Abschnitte */}
      <section className="border-t border-stone-200 bg-stone-50 py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl font-bold text-navy-950">{section.heading}</h2>
                <div className="prose-de mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-base leading-relaxed text-stone-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {categories.length > 0 && (
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <h2 className="font-display text-base font-bold text-navy-900">
                  Passende Kategorien
                </h2>
                <ul className="mt-4 space-y-1.5">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={routes.category(category.slug)}
                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-stone-50"
                      >
                        <span className="text-sm font-semibold text-navy-900">{category.name}</span>
                        <ArrowRight
                          className="size-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h2 className="font-display text-base font-bold">Kostenloses Angebot</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Größe, Zustand und Postleitzahl nennen – Sie erhalten in einem Werktag ein
                verbindliches Festpreisangebot inklusive Anlieferung.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={routes.quote}>
                  Angebot anfordern
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="py-14">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <h2 className="font-display text-2xl font-bold text-navy-950">Häufige Fragen</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {page.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Interne Verlinkung */}
      <section className="border-t border-stone-200 py-12">
        <div className="container-page">
          <h2 className="font-display text-lg font-bold text-navy-950">Alle Containerkategorien</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {navCategories.map((category) => (
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
        </div>
      </section>
    </>
  );
}
