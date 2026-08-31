import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { breadcrumbs, categories, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { anyListingImage, categoryHeroImage } from '@/lib/hero-images';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { getProducts } from '@/lib/live-catalog';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Galerie – Container, Umbauten und Anlieferungen',
    description:
      'Bildergalerie von EMC Container: Seecontainer in allen Größen, ausgebaute Büro- und Werkstattcontainer, Kühlcontainer sowie Anlieferungen per Kranfahrzeug.',
    focusKeyword: 'Container Bilder',
    secondaryKeywords: ['Seecontainer Galerie', 'Containerumbau Bilder'],
  },
  path: routes.gallery,
});

export default async function GalleryPage() {
  const products = await getProducts();
  const crumbs = breadcrumbs({ name: 'Galerie', href: routes.gallery });

  // Aufmacher aus dem echten Bestand statt der Katalogbilder, die es in
  // Cloudinary nie gab – siehe hero-images.ts.
  const categoryImages = await Promise.all(
    categories.map(
      async (category) => (await categoryHeroImage(category.slug)) ?? (await anyListingImage()) ?? category.image,
    ),
  );

  // Alle Produktbilder als flache Galerie, Kategorie-Titelbilder vorangestellt
  const items = [
    ...categories.map((category, index) => ({
      publicId: categoryImages[index]!.publicId,
      alt: categoryImages[index]!.alt,
      caption: category.name,
      href: routes.category(category.slug),
    })),
    ...products.flatMap((product) =>
      product.images.slice(0, 2).map((image) => ({
        publicId: image.publicId,
        alt: image.alt,
        caption: product.name,
        href: routes.product(product.slug),
      })),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Galerie
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Container aus unserem Bestand, Umbauten aus unserer Werkstatt und Anlieferungen beim
            Kunden. Klicken Sie auf ein Bild, um zum passenden Produkt zu gelangen.
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => (
            <li key={`${item.publicId}-${index}`}>
              <Link
                href={item.href}
                className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-card-hover"
              >
                <span className="relative block aspect-[4/3] bg-stone-100">
                  <Image
                    src={imageSrc(item.publicId, { width: 600, height: 450 })}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 24vw"
                    placeholder="blur"
                    blurDataURL={blurDataUrl(item.publicId)}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading={index < 8 ? 'eager' : 'lazy'}
                    priority={index < 4}
                  />
                </span>
                <span className="flex items-center justify-between gap-2 p-3.5">
                  <span className="truncate text-sm font-semibold text-navy-900">
                    {item.caption}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-stone-50 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-navy-950">
            Fotos des konkreten Containers gewünscht?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-stone-600">
            Bei Gebrauchtcontainern senden wir Ihnen auf Anfrage Fotos der tatsächlich verfügbaren
            Einheit inklusive Containernummer – damit Sie genau wissen, was Sie bekommen.
          </p>
          <Button asChild className="mt-6">
            <Link href={routes.contact}>Fotos anfragen</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
