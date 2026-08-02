import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BadgeCheck, Check, Download, Phone, ShieldCheck, Truck } from 'lucide-react';

import {
  averageRating,
  breadcrumbs,
  conditions,
  contact,
  discountPercent,
  formatPrice,
  getCategory,
  getProduct,
  grossFromNet,
  lowestMonthlyRate,
  products,
  relatedProducts,
  reviewsForProduct,
  routes,
  vatAmount,
} from '@emc/catalog';

import { AvailabilityDot } from '@/components/commerce/availability';
import { ProductCard } from '@/components/commerce/product-card';
import { DeliveryChecker } from '@/components/home/delivery-checker';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { BuyBox } from '@/components/product/buy-box';
import { FinanceCalculator } from '@/components/product/finance-calculator';
import { ProductGallery } from '@/components/product/gallery';
import { ReviewList, ReviewSummary } from '@/components/product/review-list';
import { SpecTable } from '@/components/product/spec-table';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/ui/rating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toSnapshot } from '@/lib/cart-snapshot';
import { breadcrumbSchema, faqSchema, jsonLdGraph, productSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Alle Produktseiten werden zur Bauzeit statisch erzeugt. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return buildMetadata({
    seo: product.seo,
    path: routes.product(product.slug),
    image: product.images[0]?.publicId,
    type: 'product',
    modifiedTime: product.updatedAt,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.primaryCategory);
  const reviews = reviewsForProduct(product.slug);
  const rating = averageRating(product.slug);
  const related = relatedProducts(product.slug, 4);
  const condition = conditions.find((c) => c.slug === product.condition);

  const gross = grossFromNet(product.priceNet);
  const compareGross = product.compareAtNet ? grossFromNet(product.compareAtNet) : undefined;
  const discount = discountPercent(product.priceNet, product.compareAtNet);
  const financing = lowestMonthlyRate(gross);

  const crumbs = breadcrumbs(
    { name: 'Container', href: routes.shop },
    ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
    { name: product.name, href: routes.product(product.slug) },
  );

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          productSchema(product, reviews),
          breadcrumbSchema(crumbs),
          faqSchema(product.faqs),
        )}
      />

      <div className="border-b border-stone-200 bg-stone-50">
        <div className="container-page py-4">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <Link
                  href={routes.category(category.slug)}
                  className="rounded-full bg-navy-100 px-2.5 py-1 text-2xs font-bold text-navy-800 transition-colors hover:bg-navy-200"
                >
                  {category.name}
                </Link>
              )}
              {condition && (
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-2xs font-bold text-stone-600">
                  {condition.short}
                </span>
              )}
              {product.bestseller && (
                <span className="rounded-full bg-accent-100 px-2.5 py-1 text-2xs font-bold text-accent-800">
                  Bestseller
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-stone-600">{product.tagline}</p>

            {rating && (
              <Link
                href="#bewertungen"
                className="mt-4 inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-navy-900"
              >
                <RatingStars value={rating.value} />
                <span>
                  {rating.value.toLocaleString('de-DE')} · {rating.count}{' '}
                  {rating.count === 1 ? 'Bewertung' : 'Bewertungen'}
                </span>
              </Link>
            )}

            {/* Preisblock */}
            <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-3xl font-extrabold text-navy-950">
                  {formatPrice(gross)}
                </span>
                {compareGross && (
                  <span className="text-lg text-stone-400 line-through">
                    {formatPrice(compareGross)}
                  </span>
                )}
                {discount !== null && (
                  <span className="rounded-full bg-accent-600 px-2.5 py-1 text-2xs font-bold text-white">
                    Sie sparen {discount} %
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-sm text-stone-500">
                inkl. {(0.19 * 100).toLocaleString('de-DE')} % MwSt. (
                {formatPrice(vatAmount(product.priceNet))}) ·{' '}
                <strong className="font-semibold text-stone-700">
                  {formatPrice(product.priceNet)}
                </strong>{' '}
                netto
              </p>
              <p className="mt-1 text-sm text-stone-500">
                zzgl. Lieferung –{' '}
                <Link
                  href="#lieferung"
                  className="font-medium text-navy-800 underline underline-offset-2"
                >
                  Kosten für Ihre PLZ berechnen
                </Link>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-100 pt-4 text-sm">
                <AvailabilityDot availability={product.availability} />
                <span className="flex items-center gap-1.5 text-stone-600">
                  <Truck className="size-4 text-stone-400" aria-hidden />
                  Lieferung in {product.leadTimeDays[0]}–{product.leadTimeDays[1]} Werktagen
                </span>
                <span className="text-stone-600">
                  Art.-Nr. <span className="font-medium text-navy-800">{product.sku}</span>
                </span>
              </div>

              <div className="mt-5">
                <BuyBox
                  snapshot={toSnapshot(product)}
                  soldOut={product.availability === 'ausverkauft'}
                  maxStock={product.stock}
                />
              </div>

              <p className="mt-4 text-center text-sm text-stone-600">
                oder ab{' '}
                <strong className="font-semibold text-navy-900">
                  {formatPrice(financing.cents)}
                </strong>{' '}
                /Monat bei {financing.months} Monaten Laufzeit ·{' '}
                <Link
                  href="#finanzierung"
                  className="font-medium text-navy-800 underline underline-offset-2"
                >
                  Finanzierung
                </Link>
              </p>
            </div>

            {/* Kernvorteile */}
            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-success-600" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Servicehinweise */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ServiceNote
                icon={ShieldCheck}
                title={`${product.warrantyMonths} Monate Garantie`}
                text="auf Wind- und Wasserdichtheit"
              />
              <ServiceNote
                icon={BadgeCheck}
                title={product.specs.csc ? 'CSC-zertifiziert' : 'Geprüfte Qualität'}
                text={product.specs.csc ? 'nach ISO 668 & 6346' : 'werkseitig geprüft'}
              />
              <ServiceNote icon={Truck} title="Festpreis" text="inkl. Anlieferung" />
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-xl bg-navy-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Fragen zu diesem Container?</p>
                <p className="mt-0.5 text-sm text-white/70">
                  Wir beraten kostenlos – auch zur Zufahrt vor Ort.
                </p>
              </div>
              <Button asChild variant="primary" size="sm" className="shrink-0">
                <a href={contact.phoneHref}>
                  <Phone aria-hidden />
                  Anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Beschreibung und technische Daten */}
      <section className="border-t border-stone-200 bg-stone-50 py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">Produktbeschreibung</h2>
            <div className="prose-de mt-5 space-y-4">
              {product.description.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-stone-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {condition && (
              <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="font-display text-base font-bold text-navy-900">
                  Zustand: {condition.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {condition.description}
                </p>
              </div>
            )}

            <div className="mt-10" id="technische-daten">
              <h2 className="mb-6 font-display text-2xl font-bold text-navy-950">
                Technische Daten
              </h2>
              <SpecTable rows={product.specRows} />
            </div>

            {product.downloads.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-5 font-display text-2xl font-bold text-navy-950">Downloads</h2>
                <ul className="space-y-2.5">
                  {product.downloads.map((download) => (
                    <li key={download.href}>
                      <a
                        href={download.href}
                        download
                        className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-all hover:border-navy-300 hover:shadow-card"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-navy-800">
                          <Download className="size-4.5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-navy-900">
                            {download.label}
                          </span>
                          <span className="block text-xs text-stone-500">
                            {download.description}
                          </span>
                        </span>
                        <span className="shrink-0 text-2xs font-bold text-stone-400 uppercase">
                          {download.type} · {download.sizeLabel}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div id="lieferung" className="scroll-mt-28">
              <DeliveryChecker lengthMeters={product.specs.exterior.length / 1000} />
            </div>
            <div id="finanzierung" className="scroll-mt-28">
              <FinanceCalculator priceGross={gross} />
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">
              Häufige Fragen zu diesem Container
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns – wir antworten in
              der Regel am selben Werktag.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link href={routes.contact}>Frage stellen</Link>
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {product.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bewertungen */}
      <section
        id="bewertungen"
        className="scroll-mt-24 border-t border-stone-200 bg-stone-50 py-14"
      >
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Kundenbewertungen</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ReviewSummary reviews={reviews} />
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href={routes.reviews}>Alle Bewertungen ansehen</Link>
              </Button>
            </div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </section>

      {/* Verwandte Produkte */}
      {related.length > 0 && (
        <section className="py-14">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-navy-950">
                Das könnte Sie auch interessieren
              </h2>
              <Link
                href={routes.shop}
                className="group hidden items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700 sm:inline-flex"
              >
                Alle Container
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ServiceNote({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-3.5">
      <Icon className="size-4.5 text-accent-600" aria-hidden />
      <p className="mt-2 text-xs font-bold text-navy-900">{title}</p>
      <p className="text-2xs text-stone-500">{text}</p>
    </div>
  );
}
