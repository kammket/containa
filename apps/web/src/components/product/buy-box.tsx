'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { formatPrice, grossFromNet, routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/commerce/wishlist-button';
import { useToast } from '@/components/ui/toast';
import { useStore } from '@/lib/store';
import type { CartSnapshot } from '@/lib/cart-snapshot';

/**
 * Mengenwahl und Kaufaktionen. Erhält nur die Momentaufnahme, damit das
 * Produktobjekt nicht im Client-Bundle landet.
 */
export function BuyBox({
  snapshot,
  soldOut,
  maxStock,
}: {
  snapshot: CartSnapshot;
  soldOut: boolean;
  maxStock: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const limit = Math.max(1, Math.min(maxStock, 99));

  const add = () => {
    addToCart(snapshot, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast({
      variant: 'success',
      title: `${quantity} × in den Warenkorb gelegt`,
      description: snapshot.name,
      action: { label: 'Zum Warenkorb', href: routes.cart },
    });
  };

  const buyNow = () => {
    addToCart(snapshot, quantity);
    router.push(routes.checkout);
  };

  if (soldOut) {
    return (
      <div className="rounded-xl bg-stone-100 p-5 text-center">
        <p className="text-sm font-semibold text-navy-900">Derzeit nicht verfügbar</p>
        <p className="mt-1 text-sm text-stone-600">
          Wir informieren Sie, sobald dieses Modell wieder lieferbar ist.
        </p>
        <Button asChild variant="secondary" className="mt-4 w-full">
          <Link href={routes.quote}>Verfügbarkeit anfragen</Link>
        </Button>
      </div>
    );
  }

  return (
    <div translate="no" className="space-y-3">
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-xl border border-stone-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Menge verringern"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-l-xl text-navy-800 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:text-stone-300"
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <label htmlFor="quantity" className="sr-only">
            Menge
          </label>
          <input
            id="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={limit}
            value={quantity}
            onChange={(e) => {
              const next = Number.parseInt(e.target.value, 10);
              setQuantity(Number.isNaN(next) ? 1 : Math.min(Math.max(1, next), limit));
            }}
            className="h-11 w-12 [appearance:textfield] border-x border-stone-300 text-center text-sm font-semibold text-navy-900 focus:ring-2 focus:ring-navy-500/20 focus:outline-none focus:ring-inset [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(limit, q + 1))}
            disabled={quantity >= limit}
            aria-label="Menge erhöhen"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-r-xl text-navy-800 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:text-stone-300"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>

        <Button onClick={add} size="md" className="flex-1">
          <span className="contents">
            {added ? <Check aria-hidden /> : <ShoppingCart aria-hidden />}
          </span>
          <span>{added ? 'Hinzugefügt' : 'In den Warenkorb'}</span>
        </Button>
      </div>

      <div className="flex gap-3">
        <Button onClick={buyNow} variant="secondary" size="md" className="flex-1">
          Jetzt kaufen
        </Button>
        <WishlistButton slug={snapshot.slug} name={snapshot.name} variant="inline" />
      </div>

      {quantity > 1 && (
        <p className="text-center text-sm text-stone-600">
          Zwischensumme:{' '}
          <strong className="font-semibold text-navy-900">
            {formatPrice(grossFromNet(snapshot.priceNet * quantity))}
          </strong>{' '}
          inkl. MwSt.
        </p>
      )}
    </div>
  );
}
