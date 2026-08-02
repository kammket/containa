'use client';

import { usePathname } from 'next/navigation';

/**
 * Blendet Kopf-, Fußzeile und Cookie-Banner im Adminbereich aus.
 *
 * Das Wurzel-Layout umschließt jede Seite mit der Storefront-Navigation – auch
 * `/admin`. Dort stört sie doppelt: Der Adminbereich bringt seine eigene
 * Seitennavigation mit, und seine Oberfläche ist englisch, während Kopf- und
 * Fußzeile deutsch sind und deutsche Kundschaft ansprechen.
 *
 * `usePathname` läuft auch beim serverseitigen Rendern, die Storefront-Elemente
 * landen im Adminbereich also gar nicht erst im HTML.
 */
export function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return <>{children}</>;
}
