import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { cities, getCity, getLandingPage, landingPages, routes } from '@emc/catalog';

import { CityPage } from '@/components/landing/city-page';
import { KeywordLandingPage } from '@/components/landing/keyword-page';
import { buildMetadata } from '@/lib/seo';

/**
 * Sammelroute für alle Landingpages auf Root-Ebene.
 *
 * Zwei Seitentypen teilen sich diesen Pfad:
 *   /seecontainer-kaufen, /container-preise, …  → Keyword-Landingpages
 *   /seecontainer-berlin, /seecontainer-hamburg → Städteseiten
 *
 * Der Präfix „seecontainer-" ist bei Städten Teil des Slugs, weil Next.js
 * keine partiellen dynamischen Segmente unterstützt. Konkrete Routen wie
 * /shop oder /kontakt haben in Next.js Vorrang vor dieser dynamischen Route;
 * zusätzlich prüft ein Katalogtest, dass keine Slugs kollidieren.
 */

const CITY_PREFIX = 'seecontainer-';

interface PageProps {
  params: Promise<{ slug: string }>;
}

type Resolved =
  | { kind: 'landing'; page: NonNullable<ReturnType<typeof getLandingPage>> }
  | { kind: 'city'; city: NonNullable<ReturnType<typeof getCity>> }
  | null;

function resolve(slug: string): Resolved {
  const landing = getLandingPage(slug);
  if (landing) return { kind: 'landing', page: landing };

  if (slug.startsWith(CITY_PREFIX)) {
    const city = getCity(slug.slice(CITY_PREFIX.length));
    if (city) return { kind: 'city', city };
  }

  return null;
}

export function generateStaticParams() {
  return [
    ...landingPages.map((page) => ({ slug: page.slug })),
    ...cities.map((city) => ({ slug: `${CITY_PREFIX}${city.slug}` })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) return {};

  return resolved.kind === 'landing'
    ? buildMetadata({ seo: resolved.page.seo, path: routes.landing(resolved.page.slug) })
    : buildMetadata({ seo: resolved.city.seo, path: routes.city(resolved.city.slug) });
}

export default async function RootLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) notFound();

  return resolved.kind === 'landing' ? (
    <KeywordLandingPage page={resolved.page} />
  ) : (
    <CityPage city={resolved.city} />
  );
}
