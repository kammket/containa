'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FieldError, Input, Label } from '@/components/ui/input';
import { AdminApiError, adminLogin, type AdminUser } from '@/lib/admin-api';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse ein.')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  password: z.string().min(1, 'Bitte geben Sie Ihr Passwort ein.'),
});

type FormValues = z.infer<typeof schema>;

/**
 * Anmeldung für Administratoren.
 *
 * Es gibt bewusst keine Registrierung und keine „Passwort vergessen"-Funktion:
 * Konten legt ausschließlich der Seed bzw. ein bestehender Inhaber an.
 */
export function AdminLogin({ onSuccess }: { onSuccess: (user: AdminUser) => void }) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      onSuccess(await adminLogin(values.email, values.password));
    } catch (caught) {
      setError(
        caught instanceof AdminApiError
          ? caught.message
          : 'Die Anmeldung ist fehlgeschlagen. Läuft die API?',
      );
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-navy-950 px-4">
      <div className="bg-grid pointer-events-none fixed inset-0 opacity-20" aria-hidden />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-xl font-bold text-white">
            EMC<span className="text-accent-500"> Container</span>
          </p>
          <p className="mt-1 text-sm text-white/50">Verwaltung</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl bg-white p-6 shadow-float"
        >
          <h1 className="font-display text-lg font-bold text-navy-950">Anmelden</h1>
          <p className="mt-1 text-sm text-stone-500">
            Zugang ausschließlich für Mitarbeitende von EMC Container.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="admin-email">E-Mail-Adresse</Label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="username"
                autoFocus
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </div>

            <div>
              <Label htmlFor="admin-password">Passwort</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                {...register('password')}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-xl bg-danger-50 p-3.5 text-sm text-danger-700"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full">
            <span className="contents">
              {isSubmitting ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <Lock aria-hidden />
              )}
            </span>
            <span>{isSubmitting ? 'Anmeldung läuft …' : 'Anmelden'}</span>
          </Button>

          <p className="mt-4 text-center text-2xs leading-relaxed text-stone-500">
            Nach fünf Fehlversuchen wird das Konto für 15 Minuten gesperrt.
          </p>
        </form>
      </div>
    </div>
  );
}
