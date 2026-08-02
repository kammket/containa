import { Star, StarHalf } from 'lucide-react';

import { cn } from '@/lib/utils';

interface RatingStarsProps {
  value: number;
  size?: 'sm' | 'md';
  className?: string;
  /** Anzahl der Bewertungen – wird als Text mit ausgegeben */
  count?: number;
}

/** Sternebewertung, rein dekorativ – der Wert steht für Screenreader im Label. */
export function RatingStars({ value, size = 'sm', className, count }: RatingStarsProps) {
  const rounded = Math.round(value * 2) / 2;
  const sizeClass = size === 'sm' ? 'size-4' : 'size-5';

  return (
    <span
      className={cn('inline-flex items-center gap-1.5', className)}
      aria-label={`Bewertung: ${value.toLocaleString('de-DE')} von 5 Sternen${count ? ` bei ${count} Bewertungen` : ''}`}
    >
      <span className="inline-flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((position) => {
          const filled = rounded >= position;
          const half = !filled && rounded >= position - 0.5;
          return (
            <span key={position} className="relative inline-flex">
              <Star
                className={cn(sizeClass, 'text-stone-300')}
                fill="currentColor"
                strokeWidth={0}
              />
              {(filled || half) && (
                <span className="absolute inset-0">
                  {filled ? (
                    <Star
                      className={cn(sizeClass, 'text-accent-500')}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ) : (
                    <StarHalf
                      className={cn(sizeClass, 'text-accent-500')}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  )}
                </span>
              )}
            </span>
          );
        })}
      </span>
      {count !== undefined && <span className="text-xs font-medium text-stone-500">({count})</span>}
    </span>
  );
}
