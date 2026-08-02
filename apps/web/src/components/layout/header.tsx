import Link from 'next/link';
import { FileText } from 'lucide-react';

import { routes } from '@emc/catalog';

import { Logo } from './logo';
import { MegaMenu } from './mega-menu';
import { MobileNav } from './mobile-nav';
import { HeaderActions } from './header-actions';

/**
 * Sticky Header. Server Component – nur Suche, Warenkorb-Badge und das mobile
 * Menü sind Client-Inseln, damit die Navigation ohne JavaScript funktioniert
 * und der JS-Anteil klein bleibt.
 */
export function Header() {
  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only-focusable fixed top-4 left-4 z-[100] rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Zum Inhalt springen
      </a>

      {/* Topbar mit USPs und Telefonnummer */}
      <div className="hidden bg-navy-950 text-white md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-5 font-medium text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success-600" aria-hidden />
              Deutschlandweite Lieferung in 3–7 Werktagen
            </span>
            <span className="hidden lg:inline">CSC-zertifiziert nach ISO 668</span>
            <span className="hidden xl:inline">Bis zu 60 Monate Garantie</span>
          </p>
          <Link
            href={routes.quote}
            className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-accent-300"
          >
            <FileText className="size-3.5" aria-hidden />
            Angebot anfordern
          </Link>
        </div>
      </div>

      <header
        translate="no"
        className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80"
      >
        <div className="container-page flex h-header items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Logo size="lg" withTagline={false} />
          </div>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <MegaMenu />
              </li>
              <li>
                <HeaderLink href={routes.landing('container-preise')}>Preise</HeaderLink>
              </li>
              <li>
                <HeaderLink href={routes.modifications}>Umbau</HeaderLink>
              </li>
              <li>
                <HeaderLink href={routes.landing('container-mieten')}>Mieten</HeaderLink>
              </li>
              <li>
                <HeaderLink href={routes.blog}>Ratgeber</HeaderLink>
              </li>
              <li>
                <HeaderLink href={routes.contact}>Kontakt</HeaderLink>
              </li>
            </ul>
          </nav>

          <HeaderActions />
        </div>
      </header>
    </>
  );
}

function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center rounded-lg px-3.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-stone-100 hover:text-navy-950"
    >
      {children}
    </Link>
  );
}
