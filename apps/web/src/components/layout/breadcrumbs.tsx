import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import type { BreadcrumbItem } from '@emc/catalog';

import { cn } from '@/lib/utils';

/**
 * Breadcrumb-Navigation. Das zugehörige BreadcrumbList-Schema wird über
 * `breadcrumbSchema()` separat als JSON-LD ausgegeben.
 */
export function Breadcrumbs({
  items,
  className,
  inverted = false,
}: {
  items: BreadcrumbItem[];
  className?: string;
  inverted?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs',
          inverted ? 'text-white/60' : 'text-stone-500',
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className={cn('size-3 shrink-0', inverted ? 'text-white/30' : 'text-stone-300')}
                  aria-hidden
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn('font-medium', inverted ? 'text-white' : 'text-navy-800')}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'transition-colors',
                    inverted ? 'hover:text-white' : 'hover:text-navy-800',
                  )}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
