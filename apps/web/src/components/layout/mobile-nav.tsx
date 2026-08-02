'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, FileText, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { contact, formatPriceCompact, navigation, routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const flatLinks = [
  { href: routes.landing('container-preise'), label: 'Container Preise' },
  { href: routes.modifications, label: 'Container Umbau' },
  { href: routes.landing('container-mieten'), label: 'Container mieten' },
  { href: routes.blog, label: 'Ratgeber' },
  { href: routes.cities, label: 'Standorte' },
  { href: routes.about, label: 'Über uns' },
  { href: routes.faq, label: 'Häufige Fragen' },
  { href: routes.contact, label: 'Kontakt' },
];

/** Vollflächige Navigation für Smartphone und Tablet. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>('groessen');
  const pathname = usePathname();

  // Beim Seitenwechsel schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Menü öffnen"
          className="-ml-1 inline-flex size-11 cursor-pointer items-center justify-center rounded-xl text-navy-800 transition-colors hover:bg-stone-100 lg:hidden"
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-navy-950/40 backdrop-blur-sm data-[state=open]:animate-fade-in lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-[90] flex w-[min(22rem,88vw)] flex-col bg-white shadow-float focus:outline-none data-[state=open]:animate-[fade-in_0.25s_ease-out] lg:hidden">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>

          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
            <Logo withTagline={false} />
            <Dialog.Close
              aria-label="Menü schließen"
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-stone-100"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile Navigation" className="flex-1 overflow-y-auto overscroll-contain">
            <div className="border-b border-stone-100 p-3">
              {navigation.map((group) => {
                const isOpen = expanded === group.key;
                return (
                  <div key={group.key}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : group.key)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-stone-50"
                    >
                      <span className="text-sm font-bold text-navy-900">{group.label}</span>
                      <ChevronDown
                        className={cn(
                          'size-4 text-stone-400 transition-transform',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden
                      />
                    </button>
                    {isOpen && (
                      <ul className="mb-1 space-y-0.5 pl-3">
                        {group.items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={item.href}
                              className="flex items-baseline justify-between gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-stone-50"
                            >
                              <span className="text-sm text-navy-800">{item.label}</span>
                              <span className="text-xs text-stone-400">
                                {item.fromGross === null
                                  ? ''
                                  : `ab ${formatPriceCompact(item.fromGross)}`}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <ul className="p-3">
              {flatLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-stone-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-stone-200 bg-stone-50 p-4">
            <Button asChild size="md" className="w-full">
              <Link href={routes.quote}>Kostenloses Angebot anfordern</Link>
            </Button>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href={routes.contact}
                className="flex items-center gap-2 font-semibold text-navy-900"
              >
                <FileText className="size-4 text-accent-600" aria-hidden />
                Kontakt aufnehmen
              </Link>
              <a href={contact.emailHref} className="flex items-center gap-2 text-stone-600">
                <Mail className="size-4 text-stone-400" aria-hidden />
                {contact.email}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
