'use client';

import * as Dialog from '@radix-ui/react-dialog';
import dynamic from 'next/dynamic';
import { Loader2, Search, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

/**
 * Hülle der Instant-Suche.
 *
 * Der eigentliche Suchpanel-Inhalt samt Suchindex (~55 KB) wird erst geladen,
 * wenn der Dialog zum ersten Mal geöffnet wird. Dadurch bleibt der Index aus
 * dem First-Load-Bundle jeder Seite heraus, obwohl der Auslöser im Header auf
 * allen Seiten sichtbar ist.
 */
const SearchPanel = dynamic(() => import('./search-panel').then((m) => m.SearchPanel), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center">
      <Loader2 className="size-5 animate-spin text-stone-400" aria-hidden />
      <span className="sr-only">Suche wird geladen …</span>
    </div>
  ),
});

export function SearchDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // ⌘K / Strg+K öffnet die Suche global
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-navy-950/40 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed top-[12vh] left-1/2 z-[90] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-float focus:outline-none data-[state=open]:animate-fade-up"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Suche</Dialog.Title>
          {open && <SearchPanel onNavigate={() => setOpen(false)} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Wird vom Panel wiederverwendet, damit Kopfzeile und Schließen-Knopf identisch aussehen. */
export function SearchHeader({
  value,
  onChange,
  onKeyDown,
}: {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-stone-200 px-4">
      <Search className="size-5 shrink-0 text-stone-400" aria-hidden />
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Container, Größe, Stadt oder Ratgeber suchen …"
        aria-label="Suchbegriff"
        className="h-14 w-full bg-transparent text-base text-navy-900 placeholder:text-stone-400 focus:outline-none"
      />
      <Dialog.Close
        aria-label="Suche schließen"
        className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
      >
        <X className="size-4" aria-hidden />
      </Dialog.Close>
    </div>
  );
}
