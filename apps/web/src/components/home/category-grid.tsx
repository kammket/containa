import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import {
  categories,
  formatPriceCompact,
  lowestPriceInCategory,
  productsInCategory,
  routes,
} from '@emc/catalog';

import { categoryHeroImage } from '@/lib/hero-images';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { cn } from '@/lib/utils';

/**
 * Kategorieübersicht. Die ersten beiden Kacheln sind hervorgehoben, weil
 * 20- und 40-Fuß-Container zusammen den Großteil der Nachfrage ausmachen.
 *
 * Nur diese beiden Kacheln tragen ein Bild – gezeigt wird das Titelfoto eines
 * lieferbaren Containers aus der jeweiligen Kategorie, damit sie zum Hero
 * darüber passen und keinen grauen Platzhalter zeigen.
 */
export async function CategoryGrid() {
  const featured = categories.filter((c) =>
    ['20-fuss-container', '40-fuss-container'].includes(c.slug),
  );
  const rest = categories.filter((c) => !featured.includes(c)).slice(0, 8);

  const featuredImages = await Promise.all(
    featured.map(async (category) => (await categoryHeroImage(category.slug)) ?? category.image),
  );

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {featured.map((category, index) => {
        const from = lowestPriceInCategory(category.slug);
        const image = featuredImages[index] ?? category.image;
        return (
          <Link
            key={category.slug}
            href={routes.category(category.slug)}
            className="group relative col-span-1 flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl bg-navy-900 p-5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:col-span-2 lg:min-h-72"
          >
            <Image
              src={imageSrc(image.publicId, { width: 800, height: 600 })}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 96vw, 48vw"
              placeholder="blur"
              blurDataURL={blurDataUrl(image.publicId)}
              className="object-cover opacity-45 transition-all duration-500 group-hover:scale-105 group-hover:opacity-55"
              priority={index === 0}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent"
              aria-hidden
            />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">{category.name}</h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/70">
                {category.tagline}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-accent-400">
                {from !== null && <>ab {formatPriceCompact(from)} zzgl. MwSt.</>}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </p>
            </div>
          </Link>
        );
      })}

      {rest.map((category) => {
        const from = lowestPriceInCategory(category.slug);
        const count = productsInCategory(category.slug).length;
        return (
          <Link
            key={category.slug}
            href={routes.category(category.slug)}
            className={cn(
              'group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300',
              'hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-card-hover',
            )}
          >
            <div>
              <h3 className="font-display text-base font-bold text-navy-900">{category.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
                {category.tagline}
              </p>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-navy-900">
                {from !== null ? `ab ${formatPriceCompact(from)}` : 'Auf Anfrage'}
              </span>
              <span className="text-xs text-stone-400">
                {count} {count === 1 ? 'Modell' : 'Modelle'}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
