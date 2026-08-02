import Image from 'next/image';
import Link from 'next/link';
import { Truck } from 'lucide-react';

import { discountPercent, formatPrice, grossFromNet, routes, type Product } from '@emc/catalog';

import { AvailabilityDot } from './availability';
import { WishlistButton } from './wishlist-button';
import { QuickAddButton } from './quick-add-button';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { toSnapshot } from '@/lib/cart-snapshot';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  /** Bild des ersten sichtbaren Produkts nicht lazy laden (LCP-Optimierung) */
  priority?: boolean;
  className?: string;
  /** Kompakte Darstellung für Sidebars und Karussells */
  compact?: boolean;
}

export function ProductCard({ product, priority = false, className, compact }: ProductCardProps) {
  const gross = grossFromNet(product.priceNet);
  const compareGross = product.compareAtNet ? grossFromNet(product.compareAtNet) : undefined;
  const discount = discountPercent(product.priceNet, product.compareAtNet);
  const cover = product.images[0];

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Link
          href={routes.product(product.slug)}
          tabIndex={-1}
          aria-hidden
          className="block h-full"
        >
          {cover && (
            <Image
              src={imageSrc(cover.publicId, { width: 640, height: 480 })}
              alt=""
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 24vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              placeholder="blur"
              blurDataURL={blurDataUrl(cover.publicId)}
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          )}
        </Link>

        {/* Auszeichnungen */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {discount !== null && (
            <span className="rounded-full bg-accent-600 px-2.5 py-1 text-2xs font-bold text-white shadow-soft">
              −{discount} %
            </span>
          )}
          {product.bestseller && (
            <span className="rounded-full bg-navy-900 px-2.5 py-1 text-2xs font-bold text-white shadow-soft">
              Bestseller
            </span>
          )}
          {product.condition === 'one-trip' && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold text-navy-800 shadow-soft">
              One-Trip
            </span>
          )}
        </div>

        <WishlistButton
          slug={product.slug}
          name={product.name}
          className="absolute top-3 right-3"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-2xs font-bold tracking-wider text-stone-400 uppercase">
          {product.size === 'sonder' ? 'Zubehör' : product.size.replace('ft', ' Fuß')} ·{' '}
          {product.specs.volume
            ? `${product.specs.volume.toLocaleString('de-DE')} m³`
            : product.sku}
        </p>

        <h3 className="font-display text-base leading-snug font-bold text-navy-900">
          {/* Ganze Karte klickbar, ohne verschachtelte interaktive Elemente */}
          <Link href={routes.product(product.slug)} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        {!compact && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
            {product.tagline}
          </p>
        )}

        <div className="mt-3 flex items-center gap-3 text-xs">
          <AvailabilityDot availability={product.availability} />
          <span className="flex items-center gap-1 text-stone-500">
            <Truck className="size-3.5" aria-hidden />
            {product.leadTimeDays[0]}–{product.leadTimeDays[1]} Werktage
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-navy-900">
                {formatPrice(gross)}
              </span>
              {compareGross && (
                <span className="text-sm text-stone-400 line-through">
                  {formatPrice(compareGross)}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-2xs text-stone-500">
              inkl. MwSt. · {formatPrice(product.priceNet)} netto
            </p>
          </div>

          {/* Über der klickbaren Kartenfläche, damit der Button erreichbar bleibt */}
          <QuickAddButton
            snapshot={toSnapshot(product)}
            soldOut={product.availability === 'ausverkauft'}
            className="relative z-10"
          />
        </div>
      </div>
    </article>
  );
}
