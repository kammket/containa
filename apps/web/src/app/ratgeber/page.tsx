import type { Metadata } from 'next';
import Link from 'next/link';

import {
  blogCategories,
  blogPostsByDate,
  breadcrumbs,
  postsInCategory,
  routes,
} from '@emc/catalog';

import { BlogCard } from '@/components/blog/blog-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Container-Ratgeber – Kaufberatung, Preise & Praxiswissen',
    description:
      'Der EMC Container Ratgeber: Kaufberatung, Preisentwicklung, Anlieferung, Dämmung, Baugenehmigung und Praxiswissen rund um Seecontainer – aus über zehn Jahren Erfahrung.',
    focusKeyword: 'Container Ratgeber',
    secondaryKeywords: ['Container Kaufberatung', 'Seecontainer Tipps'],
  },
  path: routes.blog,
});

export default function BlogIndexPage() {
  const crumbs = breadcrumbs({ name: 'Ratgeber', href: routes.blog });
  const [lead, ...rest] = blogPostsByDate;

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Container-Ratgeber
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Praxiswissen aus über zehn Jahren Containerhandel: Wie Sie die richtige Größe wählen,
            worauf Sie bei Gebrauchtcontainern achten sollten, was die Anlieferung kostet und wann
            Sie eine Baugenehmigung brauchen.
          </p>

          <nav aria-label="Ratgeber-Kategorien" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {blogCategories.map((category) => {
                const count = postsInCategory(category.slug).length;
                if (count === 0) return null;
                return (
                  <li key={category.slug}>
                    <Link
                      href={routes.blogCategory(category.slug)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                    >
                      {category.name}
                      <span className="text-xs text-stone-400">{count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        {lead && (
          <div className="mb-10">
            <BlogCard post={lead} priority className="lg:grid lg:grid-cols-2 lg:items-stretch" />
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
