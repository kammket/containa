import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { breadcrumbs, caseStudies, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { anyListingImage, productHeroImage } from '@/lib/hero-images';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Referenzen – Containerprojekte aus der Praxis',
    description:
      'Umgesetzte Containerprojekte von EMC Container: Baustellenlogistik in Köln, Kühlcontainer im Münsterland, Werkstattcontainer bei Hannover – mit Ausgangslage, Lösung und Ergebnis.',
    focusKeyword: 'Container Referenzen',
    secondaryKeywords: ['Containerprojekte', 'Container Praxisbeispiele'],
  },
  path: routes.caseStudies,
});

export default async function CaseStudiesPage() {
  const crumbs = breadcrumbs({ name: 'Referenzen', href: routes.caseStudies });

  // Aufmacher aus dem echten Bestand statt der Katalogbilder, die es in
  // Cloudinary nie gab – siehe hero-images.ts.
  const images = await Promise.all(
    caseStudies.map(
      async (study) => (await productHeroImage(study.productSlugs)) ?? (await anyListingImage()) ?? study.image,
    ),
  );

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Referenzen aus der Praxis
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Drei Projekte, die zeigen, wie Container konkrete Probleme lösen – mit Ausgangslage,
            Umsetzung und messbarem Ergebnis.
          </p>
        </div>
      </section>

      <div className="container-page py-12 lg:py-16">
        <ul className="space-y-8">
          {caseStudies.map((study, index) => (
            <li key={study.slug}>
              <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all hover:border-stone-300 hover:shadow-card-hover lg:grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] bg-stone-100 lg:aspect-auto lg:min-h-72">
                  <Image
                    src={imageSrc(images[index]!.publicId, { width: 800, height: 600 })}
                    alt={images[index]!.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={blurDataUrl(images[index]!.publicId)}
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  <p className="text-xs font-bold tracking-wider text-accent-700 uppercase">
                    {study.industry} · {study.city}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                    <Link href={routes.caseStudy(study.slug)}>{study.title}</Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600">
                    {study.challenge}
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg bg-stone-50 p-3">
                        <dd className="font-display text-sm font-bold text-navy-900">
                          {metric.value}
                        </dd>
                        <dt className="mt-0.5 text-2xs text-stone-500">{metric.label}</dt>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={routes.caseStudy(study.slug)}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
                  >
                    Projekt ansehen
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center text-white sm:p-12">
          <h2 className="font-display text-2xl font-bold">Ihr Projekt als nächste Referenz?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/75">
            Beschreiben Sie uns Ihre Ausgangslage. Wir entwickeln einen Vorschlag mit Festpreis –
            unverbindlich und kostenlos.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link href={routes.quote}>
              Projekt besprechen
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
