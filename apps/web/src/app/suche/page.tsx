import type { Metadata } from 'next';
import { Suspense } from 'react';

import { routes } from '@emc/catalog';

import { SearchResults } from '@/components/search/search-results';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata(
  'Suche',
  'Durchsuchen Sie Container, Kategorien, Standorte und Ratgeberbeiträge bei EMC Container.',
  routes.search,
);

export default function SearchPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">Suche</h1>
      <Suspense
        fallback={
          <div className="mt-8 h-64 animate-pulse rounded-2xl bg-stone-100" aria-busy="true" />
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
