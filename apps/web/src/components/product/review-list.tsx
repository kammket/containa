import { BadgeCheck } from 'lucide-react';

import type { Review } from '@emc/catalog';

import { RatingStars } from '@/components/ui/rating';
import { formatDate } from '@/lib/utils';

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="rounded-xl bg-stone-50 p-5 text-sm text-stone-600">
        Für dieses Produkt liegen noch keine Bewertungen vor. Haben Sie es gekauft? Wir freuen uns
        über Ihre Erfahrung.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <RatingStars value={review.rating} />
              <p className="text-sm font-bold text-navy-900">{review.title}</p>
            </div>
            <time dateTime={review.date} className="text-xs text-stone-400">
              {formatDate(review.date)}
            </time>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-stone-700">{review.body}</p>

          <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-500">
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
        </li>
      ))}
    </ul>
  );
}

/** Bewertungsübersicht mit Verteilung nach Sternen. */
export function ReviewSummary({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:items-center">
      <div className="shrink-0 text-center sm:w-40">
        <p className="font-display text-4xl font-extrabold text-navy-900">
          {average.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </p>
        <RatingStars value={average} size="md" className="mt-2 justify-center" />
        <p className="mt-1.5 text-xs text-stone-500">
          {reviews.length} {reviews.length === 1 ? 'Bewertung' : 'Bewertungen'}
        </p>
      </div>

      <ul className="flex-1 space-y-1.5">
        {distribution.map(({ stars, count }) => {
          const percent = Math.round((count / reviews.length) * 100);
          return (
            <li key={stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 shrink-0 text-stone-600">{stars} Sterne</span>
              <span
                className="h-2 flex-1 overflow-hidden rounded-full bg-stone-150"
                role="img"
                aria-label={`${percent} % der Bewertungen mit ${stars} Sternen`}
              >
                <span
                  className="block h-full rounded-full bg-accent-500"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right font-medium text-stone-500">{count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
