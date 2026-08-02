'use client';

import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

import { routes } from '@emc/catalog';

import { useStore } from '@/lib/store';
import type { CartSnapshot } from '@/lib/cart-snapshot';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

/**
 * Kompakter „In den Warenkorb"-Button für Produktkarten.
 *
 * Erhält die Momentaufnahme vom Server-Rendering statt das vollständige
 * Produktobjekt – so bleibt der Produktkatalog aus dem Client-Bundle heraus.
 */
export function QuickAddButton({
  snapshot,
  soldOut = false,
  className,
}: {
  snapshot: CartSnapshot;
  soldOut?: boolean;
  className?: string;
}) {
  const { addToCart } = useStore();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  if (soldOut) {
    return (
      <span
        className={cn(
          'inline-flex h-10 items-center rounded-xl bg-stone-100 px-3 text-xs font-semibold text-stone-400',
          className,
        )}
      >
        Ausverkauft
      </span>
    );
  }

  const onClick = () => {
    addToCart(snapshot);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    toast({
      variant: 'success',
      title: 'In den Warenkorb gelegt',
      description: snapshot.name,
      action: { label: 'Zum Warenkorb', href: routes.cart },
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${snapshot.name} in den Warenkorb legen`}
      className={cn(
        'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-all active:scale-95',
        added
          ? 'bg-success-600 text-white'
          : 'bg-navy-900 text-white hover:bg-accent-600 hover:shadow-card',
        className,
      )}
    >
      <span className="contents">
        {added ? (
          <Check className="size-4.5" aria-hidden />
        ) : (
          <Plus className="size-4.5" aria-hidden />
        )}
      </span>
    </button>
  );
}
