import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Kleiner Kicker über der Überschrift */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Weiterführender Link rechts (Desktop) bzw. unter dem Text (Mobil) */
  link?: { href: string; label: string };
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  align = 'left',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'text-center')}>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold tracking-wider text-accent-700 uppercase">
            {eyebrow}
          </p>
        )}
        <Tag className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">{title}</Tag>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-stone-600">{description}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
        >
          {link.label}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}

/** Standardabstände für Seitenabschnitte. */
export function Section({
  children,
  className,
  tone = 'white',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'white' | 'stone' | 'navy';
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20',
        tone === 'stone' && 'bg-stone-50',
        tone === 'navy' && 'bg-navy-950 text-white',
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
