import type { Availability } from '@emc/catalog';

import { cn } from '@/lib/utils';

const availabilityMeta: Record<Availability, { label: string; dot: string; text: string }> = {
  'auf-lager': {
    label: 'Auf Lager',
    dot: 'bg-success-600',
    text: 'text-success-700',
  },
  kurzfristig: {
    label: 'Kurzfristig verfügbar',
    dot: 'bg-warning-600',
    text: 'text-warning-700',
  },
  'auf-anfrage': {
    label: 'Auf Anfrage',
    dot: 'bg-navy-500',
    text: 'text-navy-700',
  },
  ausverkauft: {
    label: 'Derzeit nicht verfügbar',
    dot: 'bg-stone-400',
    text: 'text-stone-500',
  },
};

export function AvailabilityDot({
  availability,
  className,
  showLabel = true,
}: {
  availability: Availability;
  className?: string;
  showLabel?: boolean;
}) {
  const meta = availabilityMeta[availability];

  return (
    <span className={cn('inline-flex items-center gap-1.5 font-medium', meta.text, className)}>
      <span className={cn('size-2 shrink-0 rounded-full', meta.dot)} aria-hidden />
      {showLabel && meta.label}
    </span>
  );
}

export function availabilityLabel(availability: Availability): string {
  return availabilityMeta[availability].label;
}
