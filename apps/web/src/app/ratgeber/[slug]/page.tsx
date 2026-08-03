import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Info } from 'lucide-react';

import {
  blogCategoriesBySlug,
  blogPosts,
  breadcrumbs,
  getBlogPost,
  getCategory,
  relatedPosts,
  routes,
  type BlogBlock,
} from '@emc/catalog';

import { BlogCard } from '@/components/blog/blog-card';
import { ProductCard } from '@/components/commerce/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { getProductsBySlugs } from '@/lib/live-catalog';
import { articleSchema, breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { formatDate, slugify } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return buildMetadata({
    seo: post.seo,
    path: routes.blogPost(post.slug),
    image: post.image.publicId,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const category = blogCategoriesBySlug.get(post.categorySlug);
  const related = relatedPosts(post.slug, 3);

  const crumbs = breadcrumbs(
    { name: 'Ratgeber', href: routes.blog },
    ...(category ? [{ name: category.name, href: routes.blogCategory(category.slug) }] : []),
    { name: post.title, href: routes.blogPost(post.slug) },
  );

  // Inhaltsverzeichnis aus den H2-Überschriften
  const toc = post.body
    .filter((block): block is Extract<BlogBlock, { type: 'h2' }> => block.type === 'h2')
    .map((block) => ({ id: slugify(block.text), text: block.text }));

  const linkedProducts = await getProductsBySlugs(post.relatedProducts);

  const linkedCategories = post.relatedCategories
    .map((s) => getCategory(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <JsonLd data={jsonLdGraph(articleSchema(post), breadcrumbSchema(crumbs))} />

      <article>
        <header className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
          <div className="container-page">
            <Breadcrumbs items={crumbs} />

            {category && (
              <Link
                href={routes.blogCategory(category.slug)}
                className="mt-5 inline-flex rounded-full bg-navy-100 px-3 py-1 text-xs font-bold text-navy-800 transition-colors hover:bg-navy-200"
              >
                {category.name}
              </Link>
            )}

            <h1 className="mt-4 max-w-4xl font-display text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-500">
              <span>
                Von <strong className="font-semibold text-navy-800">{post.author}</strong>,{' '}
                {post.authorRole}
              </span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden />
                {post.readingMinutes} Min. Lesezeit
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span className="text-stone-400">Aktualisiert am {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>
        </header>

        <div className="container-page py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
            <div className="min-w-0">
              <figure className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-stone-100">
                <Image
                  src={imageSrc(post.image.publicId, { width: 1200, height: 675 })}
                  alt={post.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  placeholder="blur"
                  blurDataURL={blurDataUrl(post.image.publicId)}
                  className="object-cover"
                />
              </figure>

              <div className="prose-de max-w-none">
                {post.body.map((block, index) => (
                  <BlogBlockRenderer key={index} block={block} />
                ))}
              </div>

              {/* Autorenkasten */}
              <div className="mt-12 rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="text-xs font-bold tracking-wider text-stone-400 uppercase">
                  Über den Autor
                </p>
                <p className="mt-2 font-display text-base font-bold text-navy-900">{post.author}</p>
                <p className="text-sm text-stone-600">{post.authorRole}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Haben Sie Fragen zu diesem Thema? Rufen Sie uns an – wir beraten kostenlos und
                  sagen Ihnen auch, wenn eine günstigere Lösung besser passt.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={routes.contact}>Kontakt aufnehmen</Link>
                </Button>
              </div>
            </div>

            {/* Seitenspalte */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 2 && (
                <nav
                  aria-labelledby="toc-heading"
                  className="rounded-2xl border border-stone-200 p-5"
                >
                  <h2
                    id="toc-heading"
                    className="text-xs font-bold tracking-wider text-stone-400 uppercase"
                  >
                    Inhalt
                  </h2>
                  <ol className="mt-3 space-y-1.5">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-sm leading-snug text-stone-600 transition-colors hover:text-navy-900"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {linkedCategories.length > 0 && (
                <div className="rounded-2xl border border-stone-200 p-5">
                  <h2 className="text-xs font-bold tracking-wider text-stone-400 uppercase">
                    Passende Kategorien
                  </h2>
                  <ul className="mt-3 space-y-1.5">
                    {linkedCategories.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={routes.category(category.slug)}
                          className="group flex items-center justify-between gap-2 text-sm font-medium text-navy-800 transition-colors hover:text-accent-700"
                        >
                          {category.name}
                          <ArrowRight
                            className="size-3.5 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl bg-navy-950 p-5 text-white">
                <h2 className="font-display text-base font-bold">Angebot anfordern</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Festpreis inklusive Anlieferung – in einem Werktag bei Ihnen.
                </p>
                <Button asChild size="sm" className="mt-4 w-full">
                  <Link href={routes.quote}>Jetzt anfragen</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Verlinkte Produkte */}
      {linkedProducts.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 py-14">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-navy-950">
              Passende Container zum Thema
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {linkedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Weitere Beiträge */}
      {related.length > 0 && (
        <section className="py-14">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-navy-950">Weitere Beiträge</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/** Rendert einen strukturierten Inhaltsblock als semantisches HTML. */
function BlogBlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={slugify(block.text)}
          className="mt-10 scroll-mt-28 font-display text-2xl font-bold text-navy-950"
        >
          {block.text}
        </h2>
      );

    case 'h3':
      return (
        <h3
          id={slugify(block.text)}
          className="mt-7 scroll-mt-28 font-display text-lg font-bold text-navy-900"
        >
          {block.text}
        </h3>
      );

    case 'p':
      return <p className="mt-4 text-base leading-relaxed text-stone-700">{block.text}</p>;

    case 'ul':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li
              key={item.slice(0, 30)}
              className="flex gap-3 text-base leading-relaxed text-stone-700"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="mt-4 space-y-2.5">
          {block.items.map((item, index) => (
            <li
              key={item.slice(0, 30)}
              className="flex gap-3 text-base leading-relaxed text-stone-700"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-xs font-bold text-navy-800">
                {index + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );

    case 'quote':
      return (
        <blockquote className="mt-6 border-l-4 border-accent-500 bg-stone-50 py-4 pr-4 pl-5">
          <p className="text-base leading-relaxed text-stone-700 italic">{block.text}</p>
          {block.cite && (
            <cite className="mt-2 block text-sm text-stone-500 not-italic">— {block.cite}</cite>
          )}
        </blockquote>
      );

    case 'callout':
      return (
        <aside className="mt-6 flex gap-3.5 rounded-2xl border border-accent-200 bg-accent-50 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-accent-700" aria-hidden />
          <div>
            <p className="font-display text-base font-bold text-accent-900">{block.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-accent-900/85">{block.text}</p>
          </div>
        </aside>
      );

    case 'table':
      return (
        <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                {block.head.map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-4 py-3 text-left font-bold whitespace-nowrap text-navy-900"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-stone-50/50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cellIndex === 0
                          ? 'px-4 py-3 font-medium whitespace-nowrap text-navy-900'
                          : 'px-4 py-3 text-stone-700'
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
