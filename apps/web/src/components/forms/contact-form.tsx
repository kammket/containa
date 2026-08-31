'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { AlertCircle, Check, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Textarea } from '@/components/ui/input';
import { ApiError, sendContactRequest } from '@/lib/api';

const schema = z.object({
  name: z.string().trim().min(2, 'Bitte geben Sie Ihren Namen ein.'),
  email: z
    .string()
    .trim()
    .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse ein.')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  phone: z.string().trim().max(25).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Bitte geben Sie eine gültige Postleitzahl ein.'),
  subject: z.string().min(1, 'Bitte wählen Sie ein Anliegen.'),
  message: z
    .string()
    .trim()
    .min(20, 'Bitte beschreiben Sie Ihr Anliegen in mindestens 20 Zeichen.')
    .max(4000),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }),
  }),
  // Honeypot gegen einfache Spam-Bots
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  'Allgemeine Anfrage',
  'Produktberatung',
  'Angebot anfordern',
  'Lieferung & Termin',
  'Containerumbau',
  'Miete',
  'Bestehende Bestellung',
  'Reklamation',
  'Sonstiges',
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: 'Allgemeine Anfrage' },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // Bot – stillschweigend verwerfen
    setSubmitError(null);
    try {
      await sendContactRequest({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        postalCode: values.postalCode,
        subject: values.subject,
        message: values.message,
      });
      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
      );
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-success-600/25 bg-success-50 p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-success-600 text-white">
          <Check className="size-6" aria-hidden strokeWidth={2.5} />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-navy-950">Nachricht gesendet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-700">
          Vielen Dank für Ihre Anfrage. Wir melden uns in der Regel innerhalb eines Werktages bei
          Ihnen – bei dringenden Anliegen erreichen Sie uns telefonisch schneller.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate translate="no" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="company">Firma (optional)</Label>
          <Input id="company" autoComplete="organization" {...register('company')} />
        </div>

        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="phone">Telefon (optional)</Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
          <p className="mt-1.5 text-2xs text-stone-500">
            Für Rückfragen zur Zufahrt geht es telefonisch am schnellsten.
          </p>
        </div>

        <div>
          <Label htmlFor="postalCode">Lieferpostleitzahl *</Label>
          <Input
            id="postalCode"
            inputMode="numeric"
            maxLength={5}
            autoComplete="postal-code"
            aria-invalid={Boolean(errors.postalCode)}
            {...register('postalCode')}
          />
          <FieldError>{errors.postalCode?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="subject">Anliegen *</Label>
          <select
            id="subject"
            className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
            {...register('subject')}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <FieldError>{errors.subject?.message}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Ihre Nachricht *</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Beschreiben Sie kurz Ihr Vorhaben: Welche Containergröße, welcher Einsatzzweck, wo soll er aufgestellt werden? Je mehr wir wissen, desto konkreter können wir beraten."
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute size-0 opacity-0"
        {...register('website')}
      />

      <div>
        <label htmlFor="privacy" className="flex cursor-pointer items-start gap-2.5 text-sm">
          <input
            id="privacy"
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
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *
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
        <span>{isSubmitting ? 'Wird gesendet …' : 'Nachricht senden'}</span>
      </Button>

      <p className="text-2xs text-stone-500">* Pflichtfeld</p>
    </form>
  );
}
