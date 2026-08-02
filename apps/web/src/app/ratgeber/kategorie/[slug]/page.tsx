import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  blogCategories,
  blogCategoriesBySlug,
  breadcrumbs,
  postsInCategory,
  routes,
} from '@emc/catalog';

import { BlogCard } from '@/components/blog/blog-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Nur Kategorien mit Beiträgen erzeugen – leere Seiten wären dünner Inhalt. */
export function generateStaticParams() {
  return blogCategories
    .filter((category) => postsInCategory(category.slug).length > 0)
    .map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategoriesBySlug.get(slug);
  if (!category) return {};

  return buildMetadata({
    seo: {
      title: `${category.name} – Ratgeber`,
      description: `${category.description} Alle Beiträge zum Thema ${category.name} im Container-Ratgeber von EMC Container.`,
      focusKeyword: category.name,
    },
    path: routes.blogCategory(category.slug),
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = blogCategoriesBySlug.get(slug);
  if (!category) notFound();

  const posts = postsInCategory(category.slug);
  const others = blogCategories.filter(
    (c) => c.slug !== category.slug && postsInCategory(c.slug).length > 0,
  );

  const crumbs = breadcrumbs(
    { name: 'Ratgeber', href: routes.blog },
    { name: category.name, href: routes.blogCategory(category.slug) },
  );

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            {category.description}
          </p>
          <p className="mt-3 text-sm text-stone-500">
            {posts.length} {posts.length === 1 ? 'Beitrag' : 'Beiträge'}
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>

        <nav aria-label="Weitere Kategorien" className="mt-12 border-t border-stone-200 pt-8">
          <h2 className="font-display text-lg font-bold text-navy-950">Weitere Themen</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={routes.blogCategory(other.slug)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                >
                  {other.name}
                  <span className="text-xs text-stone-400">
                    {postsInCategory(other.slug).length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
