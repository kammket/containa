'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { subscribeNewsletter } from '@/lib/api';

const schema = z.object({
  email: z
    .string()
    .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse ein.')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  // Honeypot: von Menschen nie ausgefüllt, von einfachen Bots dagegen schon
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // Bot erkannt – stillschweigend verwerfen
    try {
      await subscribeNewsletter(values.email);
      setDone(true);
    } catch {
      setError('email', {
        message: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      });
    }
  };

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-success-600/15 px-5 py-4 lg:w-[26rem]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success-600/25">
          <Check className="size-4 text-success-600" aria-hidden />
        </span>
        <p className="text-sm text-white">
          <strong className="font-semibold">Fast geschafft.</strong> Bitte bestätigen Sie die
          Anmeldung über den Link in unserer E-Mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[26rem]" noValidate>
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            E-Mail-Adresse
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="ihre@firma.de"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'newsletter-error' : undefined}
            className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/40 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/25 focus:outline-none"
            {...register('email')}
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
        <Button type="submit" disabled={isSubmitting} className="shrink-0">
          <span className="contents">
            {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
          </span>
          Anmelden
        </Button>
      </div>
      {errors.email && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-accent-300"
        >
          {errors.email.message}
        </p>
      )}
      <p className="mt-2 text-2xs text-white/40">
        Mit der Anmeldung akzeptieren Sie unsere{' '}
        <Link href={routes.privacy} className="underline underline-offset-2 hover:text-white/70">
          Datenschutzerklärung
        </Link>
        . Abmeldung jederzeit möglich.
      </p>
    </form>
  );
}
