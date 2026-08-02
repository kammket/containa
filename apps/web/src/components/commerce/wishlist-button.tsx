'use client';

import { Heart } from 'lucide-react';

import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { routes } from '@emc/catalog';

export function WishlistButton({
  slug,
  name,
  className,
  variant = 'floating',
}: {
  slug: string;
  name: string;
  className?: string;
  variant?: 'floating' | 'inline';
}) {
  const { isWishlisted, toggleWishlist, ready } = useStore();
  const { toast } = useToast();
  const active = ready && isWishlisted(slug);

  const onClick = () => {
    toggleWishlist(slug);
    toast({
      variant: 'success',
      title: active ? 'Vom Merkzettel entfernt' : 'Zum Merkzettel hinzugefügt',
      description: name,
      ...(!active && { action: { label: 'Merkzettel ansehen', href: routes.wishlist } }),
    });
  };

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          'inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors',
          active
            ? 'border-accent-300 bg-accent-50 text-accent-700'
            : 'border-stone-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-stone-50',
          className,
        )}
      >
        <Heart className={cn('size-4', active && 'fill-current')} aria-hidden />
        <span>{active ? 'Gemerkt' : 'Merken'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `${name} vom Merkzettel entfernen` : `${name} merken`}
      className={cn(
        'z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur-sm transition-all hover:bg-white hover:shadow-card',
        active ? 'text-accent-600' : 'text-stone-500 hover:text-navy-800',
        className,
      )}
    >
      <Heart className={cn('size-4', active && 'fill-current')} aria-hidden />
    </button>
  );
}
