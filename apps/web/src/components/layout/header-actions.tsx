'use client';

import Link from 'next/link';
import { Heart, Search, ShoppingCart } from 'lucide-react';

import { routes } from '@emc/catalog';

import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { SearchDialog } from '@/components/search/search-dialog';

/** Suche, Merkzettel und Warenkorb rechts im Header. */
export function HeaderActions() {
  const { totals, wishlist, ready } = useStore();

  return (
    <div className="flex items-center gap-0.5">
      <SearchDialog>
        <button
          type="button"
          aria-label="Suche öffnen"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl text-navy-800 transition-colors hover:bg-stone-100 lg:w-auto lg:gap-2 lg:px-3.5"
        >
          <Search className="size-5" aria-hidden />
          <span className="hidden text-sm font-medium text-stone-400 lg:inline">Suchen …</span>
          <kbd className="hidden rounded-md border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-2xs font-semibold text-stone-400 xl:inline">
            ⌘K
          </kbd>
        </button>
      </SearchDialog>

      <ActionLink href={routes.wishlist} label="Merkzettel" count={ready ? wishlist.length : 0}>
        <Heart className="size-5" aria-hidden />
      </ActionLink>

      <ActionLink
        href={routes.cart}
        label="Warenkorb"
        count={ready ? totals.itemCount : 0}
        highlight
      >
        <ShoppingCart className="size-5" aria-hidden />
      </ActionLink>
    </div>
  );
}

function ActionLink({
  href,
  label,
  count,
  highlight = false,
  className,
  children,
}: {
  href: string;
  label: string;
  count?: number;
  highlight?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={count ? `${label} (${count})` : label}
      className={cn(
        'relative inline-flex size-11 items-center justify-center rounded-xl text-navy-800 transition-colors hover:bg-stone-100',
        className,
      )}
    >
      {children}
      {/*
        Der Zähler bleibt dauerhaft im DOM und wird nur ein- und ausgeblendet.
        Würde er beim ersten Artikel neu eingefügt, müsste React einen Knoten
        zwischen bestehende Geschwister setzen – genau dort scheitert die
        Aktualisierung, sobald eine Übersetzungserweiterung das Markup des
        Headers zuvor umgebaut hat.
      */}
      <span
        aria-hidden
        className={cn(
          'absolute top-1 right-1 flex size-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-2xs font-bold text-white',
          highlight ? 'bg-accent-600' : 'bg-navy-800',
          !count && 'hidden',
        )}
      >
        {!count ? '' : count > 9 ? '9+' : count}
      </span>
    </Link>
  );
}
