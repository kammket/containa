import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';

import {
  breadcrumbs,
  categories,
  formatPriceCompact,
  getCategory,
  grossFromNet,
  lowestPriceInCategory,
  navCategories,
  productsInCategory,
  routes,
} from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { ProductFilters } from '@/components/shop/product-filters';
import { toFacet } from '@/components/shop/facets';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { breadcrumbSchema, collectionSchema, faqSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return buildMetadata({
    seo: category.seo,
    path: routes.category(category.slug),
    image: category.image.publicId,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsInCategory(category.slug);
  const from = lowestPriceInCategory(category.slug);

  const crumbs = breadcrumbs(
    { name: 'Container', href: routes.shop },
    { name: category.name, href: routes.category(category.slug) },
  );

  const cards = Object.fromEntries(
    items.map((product) => [product.slug, <ProductCard key={product.slug} product={product} />]),
  );

  // Verwandte Kategorien aus derselben Menügruppe für interne Verlinkung
  const siblings = navCategories.filter((c) => c.slug !== category.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          collectionSchema(category, items),
          breadcrumbSchema(crumbs),
          faqSchema(category.faqs),
        )}
      />

      {/* Kopfbereich */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Image
          src={imageSrc(category.image.publicId, { width: 1600, height: 700 })}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataUrl(category.image.publicId)}
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/50"
          aria-hidden
        />

        <div className="container-page relative py-10 sm:py-14">
          <Breadcrumbs items={crumbs} inverted />

          <h1 className="mt-5 max-w-3xl font-display text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/75">{category.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span>
              <strong className="font-semibold text-white">{items.length}</strong>{' '}
              {items.length === 1 ? 'Modell' : 'Modelle'} verfügbar
            </span>
            {from !== null && (
              <span>
                ab{' '}
                <strong className="font-semibold text-white">
                  {formatPriceCompact(grossFromNet(from))}
                </strong>{' '}
                inkl. MwSt.
              </span>
            )}
            <span>Lieferung deutschlandweit</span>
          </div>
        </div>
      </section>

      {/* Produkte */}
      <div className="container-page py-10">
        {items.length > 3 ? (
          <ProductFilters facets={items.map(toFacet)} cards={cards} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Redaktioneller Text für SEO und Beratung */}
      <section className="border-t border-stone-200 bg-stone-50 py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950">
              {category.name} kaufen – worauf es ankommt
            </h2>
            <div className="prose-de mt-5 space-y-4">
              {category.description.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-stone-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">Ihre Vorteile</h2>
            <ul className="mt-5 space-y-4">
              {category.benefits.map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-700">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{benefit.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-stone-600">
                      {benefit.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-navy-950 p-6 text-white">
              <h3 className="font-display text-base font-bold">Beratung gewünscht?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Wir sagen Ihnen ehrlich, welches Modell zu Ihrem Vorhaben passt – auch wenn es das
                günstigere ist.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={routes.quote}>
                  Angebot anfordern
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Häufige Fragen zu {category.name}
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {category.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Weitere Kategorien */}
      <section className="border-t border-stone-200 py-12">
        <div className="container-page">
          <h2 className="font-display text-lg font-bold text-navy-950">Weitere Kategorien</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link
                  href={sibling.href}
                  className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-navy-300 hover:shadow-card"
                >
                  <span>
                    <span className="block text-sm font-semibold text-navy-900">
                      {sibling.label}
                    </span>
                    <span className="block text-xs text-stone-500">
                      {sibling.productCount} {sibling.productCount === 1 ? 'Modell' : 'Modelle'}
                      {sibling.fromGross !== null &&
                        ` · ab ${formatPriceCompact(sibling.fromGross)}`}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
