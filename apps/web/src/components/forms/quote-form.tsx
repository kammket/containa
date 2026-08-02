'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { AlertCircle, Check, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { conditions, routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Textarea } from '@/components/ui/input';
import { ApiError, requestQuote } from '@/lib/api';

const schema = z.object({
  name: z.string().trim().min(2, 'Bitte geben Sie Ihren Namen ein.'),
  email: z
    .string()
    .trim()
    .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse ein.')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Bitte geben Sie eine Telefonnummer an – für Rückfragen zur Zufahrt.'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  customerType: z.enum(['privat', 'gewerblich']),
  size: z.string().min(1, 'Bitte wählen Sie eine Containergröße.'),
  condition: z.string().min(1, 'Bitte wählen Sie einen Zustand.'),
  quantity: z.coerce.number().int().min(1, 'Mindestens 1 Container.').max(50),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.'),
  deliveryDate: z.string().optional().or(z.literal('')),
  usage: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }),
  }),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const sizes = [
  { value: '10ft', label: '10 Fuß (ca. 3 m, 16 m³)' },
  { value: '20ft', label: '20 Fuß (ca. 6 m, 33 m³)' },
  { value: '20ft-hc', label: '20 Fuß High Cube (37 m³)' },
  { value: '40ft', label: '40 Fuß (ca. 12 m, 68 m³)' },
  { value: '40ft-hc', label: '40 Fuß High Cube (76 m³)' },
  { value: '45ft', label: '45 Fuß High Cube (86 m³)' },
  { value: 'unklar', label: 'Weiß ich noch nicht – bitte beraten' },
];

const usages = [
  'Lager / Materialdepot',
  'Baustelle',
  'Werkstatt',
  'Büro',
  'Kühlung',
  'Garage / Fahrzeug',
  'Landwirtschaft',
  'Wohnen / Ausbau',
  'Sonstiges',
];

export function QuoteForm({ productSlug }: { productSlug?: string }) {
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { customerType: 'gewerblich', quantity: 1, condition: 'gebraucht' },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return;
    setSubmitError(null);
    try {
      const result = await requestQuote({
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.company || undefined,
        customerType: values.customerType,
        productSlug,
        size: values.size,
        condition: values.condition,
        quantity: values.quantity,
        postalCode: values.postalCode,
        deliveryDate: values.deliveryDate || undefined,
        usage: values.usage || undefined,
        message: values.message || undefined,
      });
      setReference(result.reference);
      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
      );
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-success-600/25 bg-success-50 p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-success-600 text-white">
          <Check className="size-6" aria-hidden strokeWidth={2.5} />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-navy-950">Anfrage eingegangen</h2>
        {reference && (
          <p className="mt-2 text-sm text-stone-600">
            Ihre Referenz: <strong className="font-semibold text-navy-900">{reference}</strong>
          </p>
        )}
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-700">
          Wir prüfen Verfügbarkeit und Zufahrt und senden Ihnen in der Regel innerhalb eines
          Werktages ein verbindliches Festpreisangebot inklusive Anlieferung.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate translate="no" className="space-y-6">
      {/* Bedarf */}
      <fieldset>
        <legend className="mb-4 font-display text-lg font-bold text-navy-900">
          1. Was brauchen Sie?
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="size">Containergröße *</Label>
            <select
              id="size"
              className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
              aria-invalid={Boolean(errors.size)}
              {...register('size')}
            >
              <option value="">Bitte wählen …</option>
              {sizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <FieldError>{errors.size?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="condition">Zustand *</Label>
            <select
              id="condition"
              className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
              {...register('condition')}
            >
              {conditions.map((condition) => (
                <option key={condition.slug} value={condition.slug}>
                  {condition.label}
                </option>
              ))}
              <option value="egal">Egal – Hauptsache günstig</option>
            </select>
            <FieldError>{errors.condition?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="quantity">Anzahl *</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={50}
              aria-invalid={Boolean(errors.quantity)}
              {...register('quantity')}
            />
            <FieldError>{errors.quantity?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="usage">Verwendungszweck</Label>
            <select
              id="usage"
              className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
              {...register('usage')}
            >
              <option value="">Bitte wählen …</option>
              {usages.map((usage) => (
                <option key={usage} value={usage}>
                  {usage}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Lieferung */}
      <fieldset>
        <legend className="mb-4 font-display text-lg font-bold text-navy-900">
          2. Wohin und wann?
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="quotePostalCode">Lieferpostleitzahl *</Label>
            <Input
              id="quotePostalCode"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              placeholder="z. B. 50667"
              aria-invalid={Boolean(errors.postalCode)}
              {...register('postalCode')}
            />
            <FieldError>{errors.postalCode?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="deliveryDate">Wunschtermin (optional)</Label>
            <Input id="deliveryDate" type="date" {...register('deliveryDate')} />
          </div>
        </div>
      </fieldset>

      {/* Kontakt */}
      <fieldset>
        <legend className="mb-4 font-display text-lg font-bold text-navy-900">
          3. Ihre Kontaktdaten
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="quoteName">Name *</Label>
            <Input
              id="quoteName"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...register('name')}
            />
            <FieldError>{errors.name?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="quoteCompany">Firma (optional)</Label>
            <Input id="quoteCompany" autoComplete="organization" {...register('company')} />
          </div>

          <div>
            <Label htmlFor="quoteEmail">E-Mail *</Label>
            <Input
              id="quoteEmail"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="quotePhone">Telefon *</Label>
            <Input
              id="quotePhone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register('phone')}
            />
            <FieldError>{errors.phone?.message}</FieldError>
          </div>

          <fieldset className="sm:col-span-2">
            <legend className="mb-1.5 text-sm font-medium text-navy-800">Ich frage an als</legend>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  value="gewerblich"
                  className="size-4 cursor-pointer accent-accent-600"
                  {...register('customerType')}
                />
                Geschäftskunde
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  value="privat"
                  className="size-4 cursor-pointer accent-accent-600"
                  {...register('customerType')}
                />
                Privatkunde
              </label>
            </div>
          </fieldset>
        </div>
      </fieldset>

      <div>
        <Label htmlFor="quoteMessage">Weitere Angaben (optional)</Label>
        <Textarea
          id="quoteMessage"
          rows={5}
          placeholder="Besonderheiten am Aufstellort, gewünschte Ausstattung (Belüftung, Regale, Schlosskasten), Farbwunsch, Zufahrtsbreite …"
          {...register('message')}
        />
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute size-0 opacity-0"
        {...register('website')}
      />

      <div>
        <label htmlFor="quotePrivacy" className="flex cursor-pointer items-start gap-2.5 text-sm">
          <input
            id="quotePrivacy"
            type="checkbox"
            aria-invalid={Boolean(errors.privacy)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-stone-300 accent-accent-600"
            {...register('privacy')}
          />
          <span className="leading-relaxed text-stone-700">
            Ich habe die{' '}
            <Link
              href={routes.privacy}
              className="font-medium text-navy-900 underline underline-offset-2"
            >
              Datenschutzerklärung
            </Link>{' '}
            gelesen und stimme der Verarbeitung meiner Daten zur Erstellung eines Angebots zu. *
          </span>
        </label>
        <FieldError>{errors.privacy?.message}</FieldError>
      </div>

      {submitError && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-danger-50 p-4 text-sm text-danger-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {submitError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        <span className="contents">
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
        </span>
        <span>{isSubmitting ? 'Wird gesendet …' : 'Kostenloses Angebot anfordern'}</span>
      </Button>

      <p className="text-2xs text-stone-500">
        * Pflichtfeld · Ihre Anfrage ist unverbindlich und kostenlos.
      </p>
    </form>
  );
}
