import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';

import {
  aggregateRating,
  averageRating,
  breadcrumbs,
  reviews,
  routes,
  testimonials,
} from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/ui/rating';
import { getProducts } from '@/lib/live-catalog';
import { breadcrumbSchema, jsonLdGraph, organizationSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Kundenbewertungen – was unsere Kunden sagen',
    description:
      'Echte Kundenbewertungen zu EMC Container: Lieferung, Beratung, Zustand der Container und Preistreue. Durchschnittlich 4,8 von 5 Sternen aus über 400 Bewertungen.',
    focusKeyword: 'EMC Container Bewertungen',
    secondaryKeywords: ['Container Händler Erfahrungen', 'Seecontainer kaufen Erfahrungen'],
  },
  path: routes.reviews,
});

export default async function ReviewsPage() {
  const products = await getProducts();
  const crumbs = breadcrumbs({ name: 'Bewertungen', href: routes.reviews });
  const overall = averageRating();

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  return (
    <>
      <JsonLd data={jsonLdGraph(organizationSchema(), breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Kundenbewertungen
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Wir veröffentlichen alle Bewertungen – auch die kritischen. Wenn etwas nicht rundläuft,
            steht es hier genauso wie das Lob.
          </p>

          <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:items-center">
            <div className="shrink-0 text-center sm:w-44">
              <p className="font-display text-5xl font-extrabold text-navy-950">
                {aggregateRating.ratingValue.toLocaleString('de-DE', {
                  minimumFractionDigits: 1,
                })}
              </p>
              <RatingStars
                value={aggregateRating.ratingValue}
                size="md"
                className="mt-2 justify-center"
              />
              <p className="mt-2 text-sm text-stone-500">
                aus {aggregateRating.reviewCount} Bewertungen
              </p>
            </div>

            <ul className="flex-1 space-y-2">
              {distribution.map(({ stars, count }) => {
                const percent = overall ? Math.round((count / overall.count) * 100) : 0;
                return (
                  <li key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-14 shrink-0 text-stone-600">{stars} Sterne</span>
                    <span
                      className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-150"
                      role="img"
                      aria-label={`${percent} % mit ${stars} Sternen`}
                    >
                      <span
                        className="block h-full rounded-full bg-accent-500"
                        style={{ width: `${percent}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right font-medium text-stone-500">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Einzelbewertungen */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Alle Bewertungen</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {reviews.map((review) => {
              const product = review.productSlug
                ? products.find((item) => item.slug === review.productSlug)
                : undefined;
              return (
                <li
                  key={review.id}
                  className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <RatingStars value={review.rating} />
                    <time dateTime={review.date} className="text-xs text-stone-400">
                      {formatDate(review.date)}
                    </time>
                  </div>

                  <h3 className="mt-3 font-display text-base font-bold text-navy-900">
                    {review.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-700">
                    {review.body}
                  </p>

                  <div className="mt-4 border-t border-stone-100 pt-3">
                    <p className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      <span className="font-medium text-navy-800">{review.author}</span>
                      <span aria-hidden>·</span>
                      <span>{review.city}</span>
                      {review.verified && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="inline-flex items-center gap-1 font-medium text-success-700">
                            <BadgeCheck className="size-3.5" aria-hidden />
                            Verifizierter Kauf
                          </span>
                        </>
                      )}
                    </p>
                    {product && (
                      <Link
                        href={routes.product(product.slug)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-700 transition-colors hover:text-accent-600"
                      >
                        {product.name}
                        <ArrowRight className="size-3" aria-hidden />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Referenzstimmen */}
      <section className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-navy-950">Stimmen aus Unternehmen</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <figure
                key={item.author}
                className="rounded-2xl border border-stone-200 bg-white p-6"
              >
                <blockquote className="text-sm leading-relaxed text-stone-700">
                  „{item.quote}&ldquo;
                </blockquote>
                <figcaption className="mt-4 border-t border-stone-100 pt-3 text-xs">
                  <span className="block font-bold text-navy-900">{item.author}</span>
                  <span className="block text-stone-500">
                    {item.role} · {item.company}, {item.city}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-navy-950 p-8 text-center text-white">
            <h2 className="font-display text-xl font-bold">Sie haben bei uns gekauft?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-white/70">
              Wir freuen uns über Ihre Erfahrung – ob gut oder kritisch. Senden Sie uns Ihre
              Bewertung einfach per E-Mail, wir veröffentlichen sie unverändert.
            </p>
            <Button asChild className="mt-6">
              <Link href={routes.contact}>Bewertung einreichen</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
