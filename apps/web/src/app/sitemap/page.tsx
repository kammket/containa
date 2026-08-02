import type { Metadata } from 'next';
import Link from 'next/link';

import {
  blogCategories,
  blogPostsByDate,
  breadcrumbs,
  caseStudies,
  citiesByPopulation,
  landingPages,
  navigation,
  postsInCategory,
  products,
  routes,
} from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Sitemap – alle Seiten im Überblick',
    description:
      'Übersicht aller Seiten von EMC Container: Containerkategorien, Produkte, Standorte, Ratgeberbeiträge, Serviceseiten und rechtliche Hinweise.',
    focusKeyword: 'EMC Container Sitemap',
  },
  path: routes.sitemapPage,
});

const serviceLinks = [
  { href: routes.shop, label: 'Alle Container' },
  { href: routes.quote, label: 'Angebot anfordern' },
  { href: routes.delivery, label: 'Lieferung & Anlieferung' },
  { href: routes.installation, label: 'Aufstellung & Fundament' },
  { href: routes.modifications, label: 'Container Umbau' },
  { href: routes.financing, label: 'Finanzierung & Leasing' },
  { href: routes.shipping, label: 'Versandkosten' },
  { href: routes.warranty, label: 'Garantie' },
];

const companyLinks = [
  { href: routes.about, label: 'Über uns' },
  { href: routes.contact, label: 'Kontakt' },
  { href: routes.faq, label: 'Häufige Fragen' },
  { href: routes.reviews, label: 'Kundenbewertungen' },
  { href: routes.caseStudies, label: 'Referenzen' },
  { href: routes.gallery, label: 'Galerie' },
  { href: routes.downloads, label: 'Downloads' },
  { href: routes.careers, label: 'Karriere' },
  { href: routes.cities, label: 'Standorte' },
];

const legalLinks = [
  { href: routes.imprint, label: 'Impressum' },
  { href: routes.privacy, label: 'Datenschutzerklärung' },
  { href: routes.terms, label: 'AGB' },
  { href: routes.returns, label: 'Widerrufsbelehrung' },
  { href: routes.cookies, label: 'Cookie-Richtlinie' },
];

export default function SitemapPage() {
  const crumbs = breadcrumbs({ name: 'Sitemap', href: routes.sitemapPage });

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Sitemap
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Alle Seiten dieser Website im Überblick. Die maschinenlesbare Fassung finden Sie unter{' '}
            <a
              href={routes.sitemapXml}
              className="font-medium text-navy-800 underline underline-offset-2"
            >
              sitemap.xml
            </a>
            .
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {navigation.map((group) => (
            <SitemapGroup key={group.key} title={group.label}>
              {group.items.map((item) => (
                <SitemapLink key={item.slug} href={item.href}>
                  {item.label}
                </SitemapLink>
              ))}
            </SitemapGroup>
          ))}

          <SitemapGroup title="Service">
            {serviceLinks.map((link) => (
              <SitemapLink key={link.href} href={link.href}>
                {link.label}
              </SitemapLink>
            ))}
          </SitemapGroup>

          <SitemapGroup title="Unternehmen">
            {companyLinks.map((link) => (
              <SitemapLink key={link.href} href={link.href}>
                {link.label}
              </SitemapLink>
            ))}
          </SitemapGroup>

          <SitemapGroup title="Themenseiten">
            {landingPages.map((page) => (
              <SitemapLink key={page.slug} href={routes.landing(page.slug)}>
                {page.seo.focusKeyword}
              </SitemapLink>
            ))}
          </SitemapGroup>

          <SitemapGroup title="Rechtliches">
            {legalLinks.map((link) => (
              <SitemapLink key={link.href} href={link.href}>
                {link.label}
              </SitemapLink>
            ))}
          </SitemapGroup>

          <SitemapGroup title="Ratgeber-Kategorien">
            {blogCategories
              .filter((category) => postsInCategory(category.slug).length > 0)
              .map((category) => (
                <SitemapLink key={category.slug} href={routes.blogCategory(category.slug)}>
                  {category.name}
                </SitemapLink>
              ))}
          </SitemapGroup>

          <SitemapGroup title="Referenzen">
            {caseStudies.map((study) => (
              <SitemapLink key={study.slug} href={routes.caseStudy(study.slug)}>
                {study.title}
              </SitemapLink>
            ))}
          </SitemapGroup>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <SitemapGroup title={`Produkte (${products.length})`}>
            {products.map((product) => (
              <SitemapLink key={product.slug} href={routes.product(product.slug)}>
                {product.name}
              </SitemapLink>
            ))}
          </SitemapGroup>

          <div className="space-y-10">
            <SitemapGroup title={`Standorte (${citiesByPopulation.length})`}>
              {citiesByPopulation.map((city) => (
                <SitemapLink key={city.slug} href={routes.city(city.slug)}>
                  Seecontainer {city.name}
                </SitemapLink>
              ))}
            </SitemapGroup>

            <SitemapGroup title={`Ratgeberbeiträge (${blogPostsByDate.length})`}>
              {blogPostsByDate.map((post) => (
                <SitemapLink key={post.slug} href={routes.blogPost(post.slug)}>
                  {post.title}
                </SitemapLink>
              ))}
            </SitemapGroup>
          </div>
        </div>
      </div>
    </>
  );
}

function SitemapGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-base font-bold text-navy-950">{title}</h2>
      <ul className="mt-3 space-y-1.5">{children}</ul>
    </section>
  );
}

function SitemapLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-snug text-stone-600 transition-colors hover:text-accent-700"
      >
        {children}
      </Link>
    </li>
  );
}
