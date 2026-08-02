'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formatPrice, grossFromNet, navCategories } from '@emc/catalog';

import { Card } from '@/components/admin/ui';
import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Textarea } from '@/components/ui/input';
import { AdminApiError, adminApi, type AdminProduct } from '@/lib/admin-api';

/**
 * Preise werden im Formular in Euro erfasst und beim Speichern in Cent
 * umgerechnet – intern rechnet der Shop ausschließlich in ganzen Cent.
 */
const euroToCents = (value: string): number =>
  Math.round(Number.parseFloat(value.replace(',', '.')) * 100);

const centsToEuro = (cents: number | null | undefined): string =>
  cents === null || cents === undefined ? '' : (cents / 100).toFixed(2).replace('.', ',');

const euroField = (message: string) =>
  z
    .string()
    .trim()
    .regex(/^\d+([.,]\d{1,2})?$/, message);

const schema = z.object({
  name: z.string().trim().min(3, 'Please enter a product name.').max(180),
  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Lower-case letters, digits and hyphens only – e.g. 20-fuss-container-gebraucht.',
    ),
  sku: z.string().trim().min(2, 'Please enter an SKU.').max(64),
  tagline: z.string().trim().min(10, 'Please enter a short sales description.').max(300),
  descriptionText: z
    .string()
    .trim()
    .min(30, 'Please describe the product in at least 30 characters.'),
  highlightsText: z.string().trim(),

  priceEuro: euroField('Please enter a valid net price, e.g. 1190.00.'),
  compareAtEuro: z.union([euroField('Please enter a valid compare-at price.'), z.literal('')]),

  condition: z.enum(['NEU', 'ONE_TRIP', 'GENERALUEBERHOLT', 'GEBRAUCHT']),
  size: z.enum(['8ft', '10ft', '20ft', '40ft', '45ft', 'sonder']),
  availability: z.enum(['AUF_LAGER', 'KURZFRISTIG', 'AUF_ANFRAGE', 'AUSVERKAUFT']),

  stock: z.coerce.number().int().min(0).max(9999),
  leadTimeDaysMin: z.coerce.number().int().min(0).max(365),
  leadTimeDaysMax: z.coerce.number().int().min(0).max(365),
  warrantyMonths: z.coerce.number().int().min(0).max(120),

  lengthMm: z.coerce.number().int().min(1, 'Please enter the exterior length in millimetres.'),
  widthMm: z.coerce.number().int().min(1, 'Please enter the exterior width in millimetres.'),
  heightMm: z.coerce.number().int().min(1, 'Please enter the exterior height in millimetres.'),

  categorySlugs: z.array(z.string()).min(1, 'Please choose at least one category.'),
  primaryCategory: z.string().min(1, 'Please choose a primary category.'),

  seoTitle: z.string().trim().max(70, 'At most 70 characters – Google truncates longer titles.'),
  seoDescription: z
    .string()
    .trim()
    .max(175, 'At most 175 characters – longer descriptions get cut off.'),
  focusKeyword: z.string().trim().max(120),

  isActive: z.boolean(),
  isBestseller: z.boolean(),
  isFeatured: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function ProductForm({ product }: { product?: AdminProduct }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          tagline: product.tagline,
          descriptionText: '',
          highlightsText: '',
          priceEuro: centsToEuro(product.priceNet),
          compareAtEuro: centsToEuro(product.compareAtNet),
          condition: product.condition as FormValues['condition'],
          size: product.size as FormValues['size'],
          availability: product.availability as FormValues['availability'],
          stock: product.stock,
          leadTimeDaysMin: 3,
          leadTimeDaysMax: 7,
          warrantyMonths: 12,
          lengthMm: 6058,
          widthMm: 2438,
          heightMm: 2591,
          categorySlugs: product.categories.map((c) => c.category.slug),
          primaryCategory:
            product.categories.find((c) => c.isPrimary)?.category.slug ??
            product.categories[0]?.category.slug ??
            '',
          seoTitle: '',
          seoDescription: '',
          focusKeyword: '',
          isActive: product.isActive,
          isBestseller: product.isBestseller,
          isFeatured: product.isFeatured,
        }
      : {
          condition: 'GEBRAUCHT',
          size: '20ft',
          availability: 'AUF_LAGER',
          stock: 1,
          leadTimeDaysMin: 3,
          leadTimeDaysMax: 7,
          warrantyMonths: 12,
          lengthMm: 6058,
          widthMm: 2438,
          heightMm: 2591,
          categorySlugs: [],
          primaryCategory: '',
          isActive: true,
          isBestseller: false,
          isFeatured: false,
          compareAtEuro: '',
          highlightsText: '',
          seoTitle: '',
          seoDescription: '',
          focusKeyword: '',
        },
  });

  const selectedCategories = watch('categorySlugs') ?? [];
  const priceEuro = watch('priceEuro');

  const save = useMutation({
    mutationFn: (values: FormValues) => {
      const payload = {
        name: values.name,
        slug: values.slug,
        sku: values.sku,
        tagline: values.tagline,
        description: values.descriptionText
          .split('\n\n')
          .map((p) => p.trim())
          .filter(Boolean),
        highlights: values.highlightsText
          .split('\n')
          .map((h) => h.trim())
          .filter(Boolean),
        condition: values.condition,
        size: values.size,
        availability: values.availability,
        priceNet: euroToCents(values.priceEuro),
        ...(values.compareAtEuro ? { compareAtNet: euroToCents(values.compareAtEuro) } : {}),
        stock: values.stock,
        leadTimeDaysMin: values.leadTimeDaysMin,
        leadTimeDaysMax: values.leadTimeDaysMax,
        warrantyMonths: values.warrantyMonths,
        lengthMm: values.lengthMm,
        widthMm: values.widthMm,
        heightMm: values.heightMm,
        categorySlugs: values.categorySlugs,
        primaryCategory: values.primaryCategory,
        ...(values.seoTitle ? { seoTitle: values.seoTitle } : {}),
        ...(values.seoDescription ? { seoDescription: values.seoDescription } : {}),
        ...(values.focusKeyword ? { focusKeyword: values.focusKeyword } : {}),
        isActive: values.isActive,
        isBestseller: values.isBestseller,
        isFeatured: values.isFeatured,
      };

      return product
        ? adminApi.products.update(product.id, payload)
        : adminApi.products.create(payload);
    },
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (!product) router.push(`/admin/produkte/${result.id}`);
    },
    onError: (error) => {
      setSubmitError(
        error instanceof AdminApiError ? error.message : 'The product could not be saved.',
      );
    },
  });

  const onSubmit = (values: FormValues) => {
    setSubmitError(null);
    save.mutate(values);
  };

  const toggleCategory = (slug: string) => {
    const next = selectedCategories.includes(slug)
      ? selectedCategories.filter((s) => s !== slug)
      : [...selectedCategories, slug];

    setValue('categorySlugs', next, { shouldValidate: true });

    // Primärkategorie mitziehen, damit sie nie auf eine abgewählte zeigt.
    if (!next.includes(watch('primaryCategory'))) {
      setValue('primaryCategory', next[0] ?? '', { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Card title="Master data">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Product name *</Label>
            <Input id="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
            <FieldError>{errors.name?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="slug">URL-Slug *</Label>
            <Input id="slug" aria-invalid={Boolean(errors.slug)} {...register('slug')} />
            <p className="mt-1.5 text-2xs text-stone-500">
              Ergibt /produkt/<span className="font-medium">{watch('slug') || '…'}</span>
            </p>
            <FieldError>{errors.slug?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="sku">SKU *</Label>
            <Input id="sku" aria-invalid={Boolean(errors.sku)} {...register('sku')} />
            <FieldError>{errors.sku?.message}</FieldError>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input id="tagline" aria-invalid={Boolean(errors.tagline)} {...register('tagline')} />
            <p className="mt-1.5 text-2xs text-stone-500">
              Shown on product cards and in search results.
            </p>
            <FieldError>{errors.tagline?.message}</FieldError>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="descriptionText">Description *</Label>
            <Textarea
              id="descriptionText"
              rows={8}
              placeholder="Separate paragraphs with a blank line."
              aria-invalid={Boolean(errors.descriptionText)}
              {...register('descriptionText')}
            />
            <FieldError>{errors.descriptionText?.message}</FieldError>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="highlightsText">Key benefits</Label>
            <Textarea
              id="highlightsText"
              rows={5}
              placeholder="Ein Vorteil pro Zeile."
              {...register('highlightsText')}
            />
          </div>
        </div>
      </Card>

      <Card title="Price and availability">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="priceEuro">Net price in € *</Label>
            <Input
              id="priceEuro"
              inputMode="decimal"
              placeholder="1190,00"
              aria-invalid={Boolean(errors.priceEuro)}
              {...register('priceEuro')}
            />
            {priceEuro && /^\d+([.,]\d{1,2})?$/.test(priceEuro) && (
              <p className="mt-1.5 text-2xs text-stone-500">
                Brutto: {formatPrice(grossFromNet(euroToCents(priceEuro)))}
              </p>
            )}
            <FieldError>{errors.priceEuro?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="compareAtEuro">Compare-at price, net, in €</Label>
            <Input
              id="compareAtEuro"
              inputMode="decimal"
              placeholder="optional"
              {...register('compareAtEuro')}
            />
            <FieldError>{errors.compareAtEuro?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="stock">Stock *</Label>
            <Input id="stock" type="number" min={0} {...register('stock')} />
          </div>

          <div>
            <Label htmlFor="availability">Availability *</Label>
            <Select id="availability" {...register('availability')}>
              <option value="AUF_LAGER">In stock</option>
              <option value="KURZFRISTIG">Available at short notice</option>
              <option value="AUF_ANFRAGE">On request</option>
              <option value="AUSVERKAUFT">Sold out</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="condition">Condition *</Label>
            <Select id="condition" {...register('condition')}>
              <option value="NEU">Factory new</option>
              <option value="ONE_TRIP">One-Trip</option>
              <option value="GENERALUEBERHOLT">Refurbished</option>
              <option value="GEBRAUCHT">Used</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="size">Size *</Label>
            <Select id="size" {...register('size')}>
              <option value="10ft">10 ft</option>
              <option value="20ft">20 ft</option>
              <option value="40ft">40 ft</option>
              <option value="45ft">45 ft</option>
              <option value="8ft">8 ft</option>
              <option value="sonder">Accessories / special format</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="leadTimeDaysMin">Delivery time from (working days)</Label>
            <Input id="leadTimeDaysMin" type="number" min={0} {...register('leadTimeDaysMin')} />
          </div>

          <div>
            <Label htmlFor="leadTimeDaysMax">Delivery time to (working days)</Label>
            <Input id="leadTimeDaysMax" type="number" min={0} {...register('leadTimeDaysMax')} />
          </div>
        </div>
      </Card>

      <Card title="Dimensions and warranty">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="lengthMm">Exterior length in mm *</Label>
            <Input id="lengthMm" type="number" min={1} {...register('lengthMm')} />
            <p className="mt-1.5 text-2xs text-stone-500">Determines the flat delivery rate.</p>
            <FieldError>{errors.lengthMm?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="widthMm">Exterior width in mm *</Label>
            <Input id="widthMm" type="number" min={1} {...register('widthMm')} />
          </div>
          <div>
            <Label htmlFor="heightMm">Exterior height in mm *</Label>
            <Input id="heightMm" type="number" min={1} {...register('heightMm')} />
          </div>
          <div>
            <Label htmlFor="warrantyMonths">Warranty in months</Label>
            <Input id="warrantyMonths" type="number" min={0} {...register('warrantyMonths')} />
          </div>
        </div>
      </Card>

      <Card title="Categories">
        <fieldset>
          <legend className="sr-only">Select categories</legend>
          <div className="flex flex-wrap gap-2">
            {navCategories.map((category) => {
              const selected = selectedCategories.includes(category.slug);
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? 'cursor-pointer rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white'
                      : 'cursor-pointer rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-stone-50'
                  }
                >
                  {category.label}
                </button>
              );
            })}
          </div>
          <FieldError>{errors.categorySlugs?.message}</FieldError>
        </fieldset>

        {selectedCategories.length > 0 && (
          <div className="mt-5 max-w-sm">
            <Label htmlFor="primaryCategory">Primary category *</Label>
            <Select id="primaryCategory" {...register('primaryCategory')}>
              {selectedCategories.map((slug) => (
                <option key={slug} value={slug}>
                  {navCategories.find((c) => c.slug === slug)?.label ?? slug}
                </option>
              ))}
            </Select>
            <p className="mt-1.5 text-2xs text-stone-500">
              Determines the breadcrumb and the canonical path of the product.
            </p>
            <FieldError>{errors.primaryCategory?.message}</FieldError>
          </div>
        )}
      </Card>

      <Card title="Search engine optimisation">
        <div className="space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO title</Label>
            <Input id="seoTitle" maxLength={70} {...register('seoTitle')} />
            <p className="mt-1.5 text-2xs text-stone-500">
              {(watch('seoTitle') ?? '').length} / 70 Zeichen
            </p>
            <FieldError>{errors.seoTitle?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="seoDescription">Meta-Description</Label>
            <Textarea
              id="seoDescription"
              rows={3}
              maxLength={175}
              {...register('seoDescription')}
            />
            <p className="mt-1.5 text-2xs text-stone-500">
              {(watch('seoDescription') ?? '').length} / 175 Zeichen
            </p>
            <FieldError>{errors.seoDescription?.message}</FieldError>
          </div>

          <div className="max-w-sm">
            <Label htmlFor="focusKeyword">Focus keyword</Label>
            <Input
              id="focusKeyword"
              placeholder="e.g. buy 20 ft container"
              {...register('focusKeyword')}
            />
          </div>
        </div>
      </Card>

      <Card title="Visibility">
        <div className="space-y-3">
          <Checkbox id="isActive" label="Im Shop sichtbar" {...register('isActive')} />
          <Checkbox
            id="isBestseller"
            label="Als Bestseller kennzeichnen"
            hint="Shown on the home page under “Best-selling containers”."
            {...register('isBestseller')}
          />
          <Checkbox
            id="isFeatured"
            label="Hervorheben"
            hint="Erscheint unter „Aktuelle Empfehlungen“."
            {...register('isFeatured')}
          />
        </div>
      </Card>

      {submitError && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-danger-50 p-4 text-sm text-danger-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {submitError}
        </p>
      )}

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-stone-200 bg-white/95 py-4 backdrop-blur-sm">
        <Button type="submit" size="lg" disabled={isSubmitting || save.isPending}>
          {save.isPending ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : saved ? (
            <Check aria-hidden />
          ) : (
            <Save aria-hidden />
          )}
          <span>{save.isPending ? 'Saving …' : saved ? 'Gespeichert' : 'Save'}</span>
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

/* ── kleine Formularbausteine ───────────────────────────────────────────── */

const Select = function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={
        'h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none ' +
        (className ?? '')
      }
      {...props}
    />
  );
};

const Checkbox = function Checkbox({
  id,
  label,
  hint,
  ...props
}: { id: string; label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-stone-300 accent-accent-600"
        {...props}
      />
      <span>
        <span className="block text-sm font-medium text-navy-900">{label}</span>
        {hint && <span className="block text-xs text-stone-500">{hint}</span>}
      </span>
    </label>
  );
};
