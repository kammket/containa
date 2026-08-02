import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Helle Variante für dunkle Hintergründe (Footer, Hero) */
  inverted?: boolean;
}

/**
 * Wortbildmarke: stilisierter Container mit Wellblechstruktur plus Schriftzug.
 * Als Inline-SVG, damit kein zusätzlicher Request entsteht und die Farbe über
 * CSS steuerbar bleibt.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5', className)}
      aria-label="EMC Container – zur Startseite"
    >
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden focusable="false">
        <rect
          x="2"
          y="8"
          width="36"
          height="24"
          rx="3"
          className={inverted ? 'fill-accent-500' : 'fill-navy-900'}
        />
        <g className={inverted ? 'stroke-navy-950/40' : 'stroke-white/25'} strokeWidth="2.5">
          <path d="M9 12v16" />
          <path d="M15 12v16" />
          <path d="M21 12v16" />
          <path d="M27 12v16" />
          <path d="M33 12v16" />
        </g>
        <rect
          x="2"
          y="8"
          width="5"
          height="24"
          rx="2"
          className={inverted ? 'fill-accent-400' : 'fill-navy-700'}
        />
        <circle cx="4.5" cy="14" r="1" className="fill-white/70" />
        <circle cx="4.5" cy="26" r="1" className="fill-white/70" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-800 font-display text-lg font-bold tracking-tight',
            inverted ? 'text-white' : 'text-navy-900',
          )}
        >
          EMC<span className="text-accent-600"> Container</span>
        </span>
        <span
          className={cn(
            'mt-0.5 text-2xs font-medium tracking-wide',
            inverted ? 'text-white/60' : 'text-stone-500',
          )}
        >
          Seecontainer für Deutschland
        </span>
      </span>
    </Link>
  );
}
