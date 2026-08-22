import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Helle Variante für dunkle Hintergründe (Footer, Hero) */
  inverted?: boolean;
  /** Größere Darstellung für Kopf- und Fußzeile */
  size?: 'md' | 'lg';
  /** Untertitel ausblenden, etwa in beengten Bereichen */
  withTagline?: boolean;
}

/**
 * Wortbildmarke von EMC Container.
 *
 * Die Marke besteht aus oranger Grafik und weißem Schriftzug auf orangem
 * Balken. Sie funktioniert dadurch sowohl auf hellem als auch auf dunklem
 * Grund, weshalb es nur eine Bilddatei gibt und `inverted` allein den
 * Untertitel einfärbt.
 *
 * `priority` ist gesetzt, weil das Logo in der Kopfzeile im sichtbaren Bereich
 * liegt: Ohne Vorrang lädt es spät und verschiebt das Layout.
 *
 * `unoptimized`, weil die Datei bereits in Anzeigegröße vorliegt (440 × 117 px,
 * also doppelte Pixeldichte für die größte Darstellung von 220 × 58). Ohne die
 * Angabe erzeugt `next/image` ein `srcSet`, in dem alle Einträge auf dieselbe
 * Datei zeigen – der Browser leitet daraus eine falsche Eigengröße ab und
 * stellt die Marke zu klein dar.
 */
export function Logo({ className, inverted = false, size = 'md', withTagline = true }: LogoProps) {
  const dimensions = size === 'lg' ? { width: 220, height: 58 } : { width: 170, height: 45 };

  return (
    <Link
      href="/"
      className={cn('inline-flex flex-col justify-center', className)}
      aria-label="EMC Container – zur Startseite"
    >
      <Image
        src="/logo.png"
        alt="EMC Container"
        width={dimensions.width}
        height={dimensions.height}
        priority
        unoptimized
        className={cn('h-auto w-auto', size === 'lg' ? 'max-h-13' : 'max-h-10')}
      />
      {withTagline && (
        <span
          className={cn(
            'mt-1 text-2xs font-medium tracking-wide',
            inverted ? 'text-white/60' : 'text-stone-500',
          )}
        >
          Seecontainer für Deutschland
        </span>
      )}
    </Link>
  );
}
