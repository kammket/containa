'use client';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Wiederverwendbare Bausteine des Adminbereichs.
 *
 * Die Oberfläche des Adminbereichs ist englisch: Er wird von einer Person
 * bedient, die kein Deutsch spricht. Die Storefront bleibt davon unberührt –
 * sie richtet sich an deutsche Kundschaft.
 */

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="border-b border-stone-200 bg-white px-5 py-5 sm:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-navy-950 sm:text-2xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className="px-5 py-6 sm:px-8">{children}</div>;
}

export function Card({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <section className={cn('rounded-xl border border-stone-200 bg-white', className)}>
      {title && (
        <h2 className="border-b border-stone-100 px-5 py-3.5 font-display text-sm font-bold text-navy-900">
          {title}
        </h2>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-bold text-navy-950">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-stone-400">{hint}</p>}
    </div>
  );
}

const statusStyles: Record<string, string> = {
  // Orders
  EINGEGANGEN: 'bg-navy-100 text-navy-800',
  ZAHLUNG_AUSSTEHEND: 'bg-warning-50 text-warning-700',
  BEZAHLT: 'bg-success-50 text-success-700',
  IN_BEARBEITUNG: 'bg-accent-100 text-accent-800',
  VERSANDBEREIT: 'bg-accent-100 text-accent-800',
  IN_ZUSTELLUNG: 'bg-accent-100 text-accent-800',
  GELIEFERT: 'bg-success-50 text-success-700',
  STORNIERT: 'bg-stone-100 text-stone-500',
  ERSTATTET: 'bg-stone-100 text-stone-500',
  // Inquiries
  NEU: 'bg-accent-100 text-accent-800',
  BEANTWORTET: 'bg-success-50 text-success-700',
  GESCHLOSSEN: 'bg-stone-100 text-stone-500',
};

/**
 * Anzeigetexte der Statuswerte. Die Schlüssel sind die Enumwerte aus der
 * Datenbank und bleiben deutsch – nur die Beschriftung wird übersetzt.
 */
export const statusLabels: Record<string, string> = {
  EINGEGANGEN: 'Received',
  ZAHLUNG_AUSSTEHEND: 'Payment pending',
  BEZAHLT: 'Paid',
  IN_BEARBEITUNG: 'In progress',
  VERSANDBEREIT: 'Ready to ship',
  IN_ZUSTELLUNG: 'Out for delivery',
  GELIEFERT: 'Delivered',
  STORNIERT: 'Cancelled',
  ERSTATTET: 'Refunded',
  NEU: 'New',
  BEANTWORTET: 'Answered',
  GESCHLOSSEN: 'Closed',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-2xs font-bold whitespace-nowrap',
        statusStyles[status] ?? 'bg-stone-100 text-stone-600',
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}

export function LoadingState({ label = 'Loading …' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-stone-500">
      <Loader2 className="size-5 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 px-6 py-14 text-center">
      <p className="font-display text-base font-bold text-navy-900">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-stone-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-danger-600/20 bg-danger-50 px-5 py-4 text-sm text-danger-700"
    >
      {message}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="ml-2 cursor-pointer font-semibold underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}

/** Datentabelle mit horizontalem Scrollen auf schmalen Bildschirmen. */
export function DataTable({
  head,
  children,
  caption,
}: {
  head: string[];
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-stone-50">
          <tr>
            {head.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold tracking-wider whitespace-nowrap text-stone-500 uppercase"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">{children}</tbody>
      </table>
    </div>
  );
}
