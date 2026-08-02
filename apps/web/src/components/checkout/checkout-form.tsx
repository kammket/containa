'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatPrice, paymentMethods, routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Textarea } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { ApiError, createOrder } from '@/lib/api';
import { checkoutSchema, type CheckoutValues } from '@/lib/checkout-schema';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { OrderSummary } from './order-summary';

export function CheckoutForm() {
  const { cart, totals, postalCode, clearCart, ready } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerType: 'privat',
      shippingSameAsBilling: true,
      paymentMethod: 'banktransfer',
      billingAddress: { country: 'DE', postalCode },
    },
  });

  const customerType = watch('customerType');
  const sameAddress = watch('shippingSameAsBilling');

  const onSubmit = async (values: CheckoutValues) => {
    setSubmitError(null);
    try {
      const order = await createOrder({
        email: values.email,
        customerType: values.customerType,
        vatId: values.vatId || undefined,
        billingAddress: values.billingAddress,
        shippingAddress: values.shippingSameAsBilling
          ? values.billingAddress
          : (values.shippingAddress as CheckoutValues['billingAddress']),
        shippingSameAsBilling: values.shippingSameAsBilling,
        items: cart.map((line) => ({
          sku: line.sku,
          slug: line.slug,
          quantity: line.quantity,
        })),
        paymentMethod: values.paymentMethod,
        couponCode: values.couponCode || undefined,
        deliveryNotes: values.deliveryNotes || undefined,
        acceptsTerms: values.acceptsTerms,
        acceptsWithdrawal: values.acceptsWithdrawal,
      });

      clearCart();
      router.push(routes.checkoutSuccess(order.orderNumber));
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Die Bestellung konnte nicht übermittelt werden. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.';
      setSubmitError(message);
      toast({ variant: 'error', title: 'Bestellung fehlgeschlagen', description: message });
    }
  };

  if (ready && cart.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
        <h2 className="font-display text-xl font-bold text-navy-900">Ihr Warenkorb ist leer</h2>
        <p className="mt-2 text-sm text-stone-600">
          Legen Sie zuerst einen Container in den Warenkorb.
        </p>
        <Button asChild className="mt-6">
          <Link href={routes.shop}>Zum Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      translate="no"
      className="mt-8 grid gap-8 lg:grid-cols-[1fr_23rem] lg:gap-12"
    >
      <div className="space-y-8">
        {/* Kontakt */}
        <Fieldset legend="1. Kontakt" description="Für Bestellbestätigung und Terminabstimmung.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="email">E-Mail-Adresse *</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </div>

            <fieldset className="sm:col-span-2">
              <legend className="mb-1.5 text-sm font-medium text-navy-800">
                Ich bestelle als *
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                <RadioCard
                  value="privat"
                  label="Privatkunde"
                  hint="Preise inkl. MwSt., 14 Tage Widerrufsrecht"
                  checked={customerType === 'privat'}
                  {...register('customerType')}
                />
                <RadioCard
                  value="gewerblich"
                  label="Geschäftskunde"
                  hint="Netto ausgewiesen, Kauf auf Rechnung möglich"
                  checked={customerType === 'gewerblich'}
                  {...register('customerType')}
                />
              </div>
              <FieldError>{errors.customerType?.message}</FieldError>
            </fieldset>

            {customerType === 'gewerblich' && (
              <div className="sm:col-span-2">
                <Label htmlFor="vatId">USt-IdNr. (optional)</Label>
                <Input
                  id="vatId"
                  placeholder="DE123456789"
                  aria-invalid={Boolean(errors.vatId)}
                  {...register('vatId')}
                />
                <FieldError>{errors.vatId?.message}</FieldError>
              </div>
            )}
          </div>
        </Fieldset>

        {/* Rechnungsadresse */}
        <Fieldset legend="2. Rechnungsadresse">
          <AddressFields prefix="billingAddress" register={register} errors={errors} />
        </Fieldset>

        {/* Lieferadresse */}
        <Fieldset
          legend="3. Lieferadresse"
          description="Der Ort, an dem der Container abgesetzt werden soll."
        >
          <label className="mb-4 flex cursor-pointer items-center gap-2.5 text-sm text-navy-800">
            <input
              type="checkbox"
              className="size-4 cursor-pointer rounded border-stone-300 accent-accent-600"
              {...register('shippingSameAsBilling')}
            />
            Lieferadresse entspricht der Rechnungsadresse
          </label>

          {!sameAddress && (
            <AddressFields prefix="shippingAddress" register={register} errors={errors} />
          )}

          <div className="mt-4">
            <Label htmlFor="deliveryNotes">Hinweise zur Anlieferung (optional)</Label>
            <Textarea
              id="deliveryNotes"
              placeholder="z. B. Zufahrt nur über Hofeinfahrt, Torbreite 3,2 m, Kranstellung erforderlich, Wunschtermin …"
              {...register('deliveryNotes')}
            />
            <p className="mt-1.5 text-2xs text-stone-500">
              Je genauer Ihre Angaben, desto zuverlässiger können wir die Anlieferung planen.
            </p>
          </div>
        </Fieldset>

        {/* Zahlung */}
        <Fieldset legend="4. Zahlungsart">
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <RadioCard
                key={method.key}
                value={method.key}
                label={method.label}
                hint={method.detail}
                checked={watch('paymentMethod') === method.key}
                disabled={method.key === 'invoice' && customerType !== 'gewerblich'}
                {...register('paymentMethod')}
              />
            ))}
          </div>
          <FieldError>{errors.paymentMethod?.message}</FieldError>
        </Fieldset>

        {/* Bestätigungen */}
        <Fieldset legend="5. Bestellung abschließen">
          <div className="space-y-3">
            <Consent
              id="acceptsTerms"
              error={errors.acceptsTerms?.message}
              {...register('acceptsTerms')}
            >
              Ich habe die{' '}
              <Link
                href={routes.terms}
                className="font-medium text-navy-900 underline underline-offset-2"
              >
                Allgemeinen Geschäftsbedingungen
              </Link>{' '}
              und die{' '}
              <Link
                href={routes.privacy}
                className="font-medium text-navy-900 underline underline-offset-2"
              >
                Datenschutzerklärung
              </Link>{' '}
              gelesen und akzeptiere sie. *
            </Consent>

            <Consent
              id="acceptsWithdrawal"
              error={errors.acceptsWithdrawal?.message}
              {...register('acceptsWithdrawal')}
            >
              Ich habe die{' '}
              <Link
                href={routes.returns}
                className="font-medium text-navy-900 underline underline-offset-2"
              >
                Widerrufsbelehrung
              </Link>{' '}
              zur Kenntnis genommen. *
            </Consent>
          </div>

          {submitError && (
            <p
              role="alert"
              className="mt-5 flex items-start gap-2.5 rounded-xl bg-danger-50 p-4 text-sm text-danger-700"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              {submitError}
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
            {isSubmitting
              ? 'Bestellung wird übermittelt …'
              : `Zahlungspflichtig bestellen${
                  totals.totalGross !== null ? ` · ${formatPrice(totals.totalGross)}` : ''
                }`}
          </Button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-2xs text-stone-500">
            <ShieldCheck className="size-3.5 text-success-600" aria-hidden />
            SSL-verschlüsselte Übertragung · Zahlungsdaten werden nicht bei uns gespeichert
          </p>
        </Fieldset>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <OrderSummary />
      </aside>
    </form>
  );
}

/* ── Bausteine ──────────────────────────────────────────────────────────── */

function Fieldset({
  legend,
  description,
  children,
}: {
  legend: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <legend className="px-1 font-display text-lg font-bold text-navy-900">{legend}</legend>
      {description && <p className="mb-4 text-sm text-stone-500">{description}</p>}
      <div className={description ? '' : 'mt-4'}>{children}</div>
    </fieldset>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function AddressFields({
  prefix,
  register,
  errors,
}: {
  prefix: 'billingAddress' | 'shippingAddress';
  register: any;
  errors: any;
}) {
  const fieldError = (name: string): string | undefined => errors?.[prefix]?.[name]?.message;

  return (
    <div className="grid gap-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <Label htmlFor={`${prefix}.firstName`}>Vorname *</Label>
        <Input
          id={`${prefix}.firstName`}
          autoComplete="given-name"
          aria-invalid={Boolean(fieldError('firstName'))}
          {...register(`${prefix}.firstName`)}
        />
        <FieldError>{fieldError('firstName')}</FieldError>
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`${prefix}.lastName`}>Nachname *</Label>
        <Input
          id={`${prefix}.lastName`}
          autoComplete="family-name"
          aria-invalid={Boolean(fieldError('lastName'))}
          {...register(`${prefix}.lastName`)}
        />
        <FieldError>{fieldError('lastName')}</FieldError>
      </div>

      <div className="sm:col-span-6">
        <Label htmlFor={`${prefix}.company`}>Firma (optional)</Label>
        <Input
          id={`${prefix}.company`}
          autoComplete="organization"
          {...register(`${prefix}.company`)}
        />
      </div>

      <div className="sm:col-span-4">
        <Label htmlFor={`${prefix}.street`}>Straße *</Label>
        <Input
          id={`${prefix}.street`}
          autoComplete="address-line1"
          aria-invalid={Boolean(fieldError('street'))}
          {...register(`${prefix}.street`)}
        />
        <FieldError>{fieldError('street')}</FieldError>
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor={`${prefix}.houseNumber`}>Hausnummer *</Label>
        <Input
          id={`${prefix}.houseNumber`}
          aria-invalid={Boolean(fieldError('houseNumber'))}
          {...register(`${prefix}.houseNumber`)}
        />
        <FieldError>{fieldError('houseNumber')}</FieldError>
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor={`${prefix}.postalCode`}>PLZ *</Label>
        <Input
          id={`${prefix}.postalCode`}
          inputMode="numeric"
          maxLength={5}
          autoComplete="postal-code"
          aria-invalid={Boolean(fieldError('postalCode'))}
          {...register(`${prefix}.postalCode`)}
        />
        <FieldError>{fieldError('postalCode')}</FieldError>
      </div>

      <div className="sm:col-span-4">
        <Label htmlFor={`${prefix}.city`}>Ort *</Label>
        <Input
          id={`${prefix}.city`}
          autoComplete="address-level2"
          aria-invalid={Boolean(fieldError('city'))}
          {...register(`${prefix}.city`)}
        />
        <FieldError>{fieldError('city')}</FieldError>
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`${prefix}.country`}>Land *</Label>
        <select
          id={`${prefix}.country`}
          autoComplete="country"
          className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
          {...register(`${prefix}.country`)}
        >
          <option value="DE">Deutschland</option>
          <option value="AT">Österreich</option>
          <option value="CH">Schweiz</option>
        </select>
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor={`${prefix}.phone`}>Telefon *</Label>
        <Input
          id={`${prefix}.phone`}
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(fieldError('phone'))}
          {...register(`${prefix}.phone`)}
        />
        <FieldError>{fieldError('phone')}</FieldError>
      </div>
    </div>
  );
}

const RadioCard = function RadioCard({
  value,
  label,
  hint,
  checked,
  disabled,
  ...props
}: {
  value: string;
  label: string;
  hint: string;
  checked: boolean;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors',
        checked ? 'border-navy-800 bg-navy-50' : 'border-stone-300 hover:border-stone-400',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <input
        type="radio"
        value={value}
        disabled={disabled}
        className="mt-0.5 size-4 cursor-pointer accent-accent-600"
        {...props}
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-navy-900">{label}</span>
        <span className="block text-xs text-stone-500">{hint}</span>
      </span>
    </label>
  );
};

const Consent = function Consent({
  id,
  error,
  children,
  ...props
}: {
  id: string;
  error?: string;
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-2.5 text-sm text-stone-700"
      >
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-stone-300 accent-accent-600"
          {...props}
        />
        <span className="leading-relaxed">{children}</span>
      </label>
      <FieldError>{error}</FieldError>
    </div>
  );
};
