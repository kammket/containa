import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { breadcrumbs, caseStudies, getCaseStudy, routes } from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { anyListingImage, productHeroImage } from '@/lib/hero-images';
import { getProductsBySlugs } from '@/lib/live-catalog';
import { breadcrumbSchema, caseStudySchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return buildMetadata({
    seo: study.seo,
    path: routes.caseStudy(study.slug),
    image: study.image.publicId,
    type: 'article',
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Foto des Containers, um den es in der Referenz geht – das Katalogbild ist
  // nur der Rückfall.
  const hero =
    (await productHeroImage(study.productSlugs)) ?? (await anyListingImage()) ?? study.image;

  const products = await getProductsBySlugs(study.productSlugs);

  const others = caseStudies.filter((s) => s.slug !== study.slug);

  const crumbs = breadcrumbs(
    { name: 'Referenzen', href: routes.caseStudies },
    { name: study.title, href: routes.caseStudy(study.slug) },
  );

  return (
    <>
      <JsonLd data={jsonLdGraph(caseStudySchema(study), breadcrumbSchema(crumbs))} />

      <article>
        <header className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
          <div className="container-page">
            <Breadcrumbs items={crumbs} />
            <p className="mt-5 text-xs font-bold tracking-wider text-accent-700 uppercase">
              {study.industry} · {study.city}
            </p>
            <h1 className="mt-2 max-w-4xl font-display text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl">
              {study.title}
            </h1>
            <p className="mt-3 text-base text-stone-600">
              Kunde: <strong className="font-semibold text-navy-800">{study.client}</strong>
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-stone-200 bg-white p-4">
                  <dd className="font-display text-xl font-extrabold text-navy-950">
                    {metric.value}
                  </dd>
                  <dt className="mt-1 text-sm text-stone-500">{metric.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="container-page py-12 lg:py-16">
          <figure className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-stone-100">
            <Image
              src={imageSrc(hero.publicId, { width: 1400, height: 790 })}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={blurDataUrl(hero.publicId)}
              className="object-cover"
            />
          </figure>

          <div className="prose-de mx-auto max-w-3xl space-y-9">
            <section>
              <h2 className="font-display text-2xl font-bold text-navy-950">Die Ausgangslage</h2>
              <p className="mt-3 text-base leading-relaxed text-stone-700">{study.challenge}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy-950">Unsere Lösung</h2>
              <p className="mt-3 text-base leading-relaxed text-stone-700">{study.solution}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy-950">Das Ergebnis</h2>
              <p className="mt-3 text-base leading-relaxed text-stone-700">{study.result}</p>
            </section>
          </div>
        </div>
      </article>

      {products.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 py-12">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-navy-950">Eingesetzte Container</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container-page">
          <h2 className="font-display text-lg font-bold text-navy-950">Weitere Referenzen</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={routes.caseStudy(other.slug)}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-5 transition-all hover:border-navy-300 hover:shadow-card"
                >
                  <span>
                    <span className="block text-xs font-bold tracking-wider text-accent-700 uppercase">
                      {other.industry}
                    </span>
                    <span className="mt-1 block font-display text-base font-bold text-navy-900">
                      {other.title}
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

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href={routes.quote}>
                Eigenes Projekt anfragen
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
