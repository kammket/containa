'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Loader2, Package, Phone, Search } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { contact } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { FieldError, Input, Label } from '@/components/ui/input';
import { ApiError, trackOrder, type TrackingResult } from '@/lib/api';
import { formatDate } from '@/lib/utils';

const schema = z.object({
  orderNumber: z.string().trim().min(4, 'Bitte geben Sie Ihre Bestellnummer ein.').max(32),
  email: z
    .string()
    .trim()
    .min(1, 'Bitte geben Sie die E-Mail-Adresse der Bestellung ein.')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
});

type FormValues = z.infer<typeof schema>;

export function TrackOrderForm() {
  const params = useSearchParams();
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { orderNumber: params.get('nr') ?? '' },
  });

  const onSubmit = async (values: FormValues) => {
    setLookupError(null);
    setResult(null);
    try {
      setResult(await trackOrder(values.orderNumber, values.email));
    } catch (error) {
      setLookupError(
        error instanceof ApiError && error.status === 404
          ? 'Zu dieser Kombination aus Bestellnummer und E-Mail-Adresse haben wir keine Bestellung gefunden. Bitte prüfen Sie Ihre Eingabe.'
          : 'Der Status konnte gerade nicht abgerufen werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
      );
    }
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-2xl border border-stone-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="orderNumber">Bestellnummer *</Label>
            <Input
              id="orderNumber"
              placeholder="z. B. EMC-2026-04821"
              aria-invalid={Boolean(errors.orderNumber)}
              {...register('orderNumber')}
            />
            <FieldError>{errors.orderNumber?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="trackEmail">E-Mail-Adresse *</Label>
            <Input
              id="trackEmail"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-5 w-full sm:w-auto">
          <span className="contents">
            {isSubmitting ? (
              <Loader2 className="animate-spin" aria-hidden />
            ) : (
              <Search aria-hidden />
            )}
          </span>
          <span>{isSubmitting ? 'Wird abgerufen …' : 'Status abrufen'}</span>
        </Button>
      </form>

      {lookupError && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-xl bg-danger-50 p-4 text-sm text-danger-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {lookupError}
        </p>
      )}

      {result && (
        <div className="mt-6 animate-fade-up rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-wider text-stone-400 uppercase">
                Bestellung
              </p>
              <p className="font-display text-lg font-bold text-navy-950">{result.orderNumber}</p>
            </div>
            <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-bold text-navy-800">
              {result.statusLabel}
            </span>
          </div>

          <dl className="mt-5 grid gap-3 border-y border-stone-100 py-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-stone-500">Bestellt am</dt>
              <dd className="mt-0.5 text-sm font-medium text-navy-900">
                {formatDate(result.placedAt.slice(0, 10))}
              </dd>
            </div>
            {result.estimatedDelivery && (
              <div>
                <dt className="text-xs text-stone-500">Voraussichtliche Lieferung</dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-900">
                  {formatDate(result.estimatedDelivery.slice(0, 10))}
                </dd>
              </div>
            )}
            {result.carrier && (
              <div>
                <dt className="text-xs text-stone-500">Transporteur</dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-900">{result.carrier}</dd>
              </div>
            )}
          </dl>

          <h2 className="mt-5 text-xs font-bold tracking-wider text-stone-400 uppercase">
            Verlauf
          </h2>
          <ol className="mt-3 space-y-4 border-l-2 border-stone-200 pl-5">
            {result.events.map((event, index) => (
              <li key={`${event.at}-${index}`} className="relative">
                <span
                  className={`absolute top-1.5 -left-[1.65rem] size-3 rounded-full border-2 border-white ${
                    index === 0 ? 'bg-accent-600' : 'bg-stone-300'
                  }`}
                  aria-hidden
                />
                <p className="text-sm font-semibold text-navy-900">{event.label}</p>
                <p className="mt-0.5 text-sm text-stone-600">{event.description}</p>
                <p className="mt-0.5 text-xs text-stone-400">{formatDate(event.at.slice(0, 10))}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Package className="mt-0.5 size-5 shrink-0 text-stone-400" aria-hidden />
          <p className="text-sm leading-relaxed text-stone-600">
            Bestellnummer nicht zur Hand? Sie steht in Ihrer Bestellbestätigung – oder rufen Sie uns
            einfach an.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a href={contact.phoneHref}>
            <Phone aria-hidden />
            {contact.phoneDisplay}
          </a>
        </Button>
      </div>
    </div>
  );
}
