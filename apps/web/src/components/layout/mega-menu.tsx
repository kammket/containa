'use client';

import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { formatPriceCompact, navigation, routes } from '@emc/catalog';

import { cn } from '@/lib/utils';

/**
 * Mega-Menü für die Kategorie-Navigation. Öffnet bei Hover und Fokus, schließt
 * bei Escape und Klick außerhalb. Die Inhalte sind reines HTML mit Links –
 * crawlbar und ohne Layout-Shift.
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex h-10 cursor-pointer items-center gap-1 rounded-lg px-3.5 text-sm font-semibold transition-colors',
          open
            ? 'bg-stone-100 text-navy-950'
            : 'text-navy-800 hover:bg-stone-100 hover:text-navy-950',
        )}
      >
        Container
        <ChevronDown
          className={cn('size-4 text-stone-400 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {/* Menüfläche */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className={cn(
          'absolute inset-x-0 top-full z-40 origin-top border-b border-stone-200 bg-white shadow-menu transition-all duration-200',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="container-page grid grid-cols-4 gap-8 py-8">
          {navigation.map((group) => (
            <div key={group.key}>
              <p className="mb-1 text-xs font-bold tracking-wider text-stone-400 uppercase">
                {group.label}
              </p>
              <p className="mb-3 text-xs text-stone-500">{group.description}</p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? 0 : -1}
                      className="group flex items-baseline justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-stone-50"
                    >
                      <span className="text-sm font-semibold text-navy-900 group-hover:text-navy-950">
                        {item.label}
                      </span>
                      <span className="text-xs font-medium text-stone-400 group-hover:text-stone-500">
                        {item.fromGross === null ? '' : `ab ${formatPriceCompact(item.fromGross)}`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-100 bg-stone-50">
          <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3.5">
            <p className="text-sm text-stone-600">
              Nicht sicher, welcher Container passt? Wir beraten kostenlos und unverbindlich.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={routes.shop}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition-colors hover:text-navy-950"
              >
                Alle Container ansehen
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={routes.quote}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
              >
                Angebot anfordern
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
