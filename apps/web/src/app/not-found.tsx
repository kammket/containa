import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';

import { navCategories, routes } from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { Button } from '@/components/ui/button';
import { getBestsellers } from '@/lib/live-catalog';

export const metadata = {
  title: 'Seite nicht gefunden (404)',
  robots: { index: false, follow: true },
};

/**
 * 404-Seite.
 *
 * Statt einer Sackgasse bietet sie konkrete Wege weiter: Suche, Kategorien und
 * die meistgekauften Container. Das reduziert Absprünge spürbar.
 */
export default async function NotFound() {
  const suggestions = await getBestsellers(4);

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50 py-16 sm:py-20">
        <div className="container-page text-center">
          <p className="font-display text-6xl font-extrabold text-stone-300 sm:text-7xl">404</p>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-navy-950 sm:text-3xl">
            Diese Seite gibt es nicht
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-stone-600">
            Die aufgerufene Adresse existiert nicht oder wurde verschoben. Über die Suche oder die
            Kategorien unten finden Sie schnell weiter.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.home}>
                <Home aria-hidden />
                Zur Startseite
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={routes.shop}>
                <Search aria-hidden />
                Alle Container ansehen
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <h2 className="font-display text-lg font-bold text-navy-950">Nach Kategorie suchen</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {navCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="inline-flex rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-lg font-bold text-navy-950">
            Meistgekaufte Container
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center text-white">
            <h2 className="font-display text-xl font-bold">Nicht gefunden, was Sie suchen?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-white/70">
              Schreiben Sie uns kurz, was Sie brauchen – wir sagen Ihnen, ob wir das Passende haben.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href={routes.quote}>
                  Angebot anfordern
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/15"
              >
                <Link href={routes.contact}>
                  Nachricht schreiben
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
