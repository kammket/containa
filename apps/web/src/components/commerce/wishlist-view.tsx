'use client';

import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

import { routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

export function WishlistView({ cards }: { cards: Record<string, React.ReactNode> }) {
  const { wishlist, ready } = useStore();

  if (!ready) {
    return (
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-stone-100" />
        ))}
      </div>
    );
  }

  const items = wishlist.filter((slug) => cards[slug]);

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
          <Heart className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-navy-900">Noch nichts gemerkt</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
          Tippen Sie auf einer Produktkarte auf das Herz, um einen Container hier zu sammeln und
          später zu vergleichen.
        </p>
        <Button asChild className="mt-7">
          <Link href={routes.shop}>
            Container ansehen
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 text-sm text-stone-600" aria-live="polite">
        <strong className="font-semibold text-navy-900">{items.length}</strong>{' '}
        {items.length === 1 ? 'gemerkter Container' : 'gemerkte Container'}
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((slug) => (
          <div key={slug}>{cards[slug]}</div>
        ))}
      </div>
    </>
  );
}
