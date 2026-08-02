import type { MetadataRoute } from 'next';

import {
  absoluteUrl,
  blogCategories,
  blogPosts,
  caseStudies,
  categories,
  cities,
  landingPages,
  postsInCategory,
  products,
  routes,
} from '@emc/catalog';

import { ogImageUrl } from '@/lib/images';

/**
 * XML-Sitemap.
 *
 * Prioritäten spiegeln die geschäftliche Relevanz: Produkt- und
 * Kategorieseiten stehen über redaktionellen Inhalten, rechtliche Seiten am
 * Ende. Seiten hinter dem Login sowie Warenkorb und Kasse sind bewusst nicht
 * enthalten – sie sind über robots.txt und Meta-Robots von der Indexierung
 * ausgenommen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // `satisfies` erhält die Literaltypen von changeFrequency beim späteren map()
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl('/'), changeFrequency: 'daily', priority: 1 },
      { url: absoluteUrl(routes.shop), changeFrequency: 'daily', priority: 0.9 },
      { url: absoluteUrl(routes.quote), changeFrequency: 'monthly', priority: 0.8 },
      { url: absoluteUrl(routes.contact), changeFrequency: 'monthly', priority: 0.7 },
      { url: absoluteUrl(routes.about), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl(routes.blog), changeFrequency: 'weekly', priority: 0.7 },
      { url: absoluteUrl(routes.cities), changeFrequency: 'monthly', priority: 0.7 },
      { url: absoluteUrl(routes.faq), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl(routes.delivery), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl(routes.installation), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl(routes.modifications), changeFrequency: 'monthly', priority: 0.7 },
      { url: absoluteUrl(routes.financing), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl(routes.reviews), changeFrequency: 'weekly', priority: 0.6 },
      { url: absoluteUrl(routes.caseStudies), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl(routes.gallery), changeFrequency: 'monthly', priority: 0.5 },
      { url: absoluteUrl(routes.downloads), changeFrequency: 'monthly', priority: 0.5 },
      { url: absoluteUrl(routes.careers), changeFrequency: 'monthly', priority: 0.4 },
      { url: absoluteUrl(routes.sitemapPage), changeFrequency: 'monthly', priority: 0.3 },
      // Rechtliches
      { url: absoluteUrl(routes.terms), changeFrequency: 'yearly', priority: 0.2 },
      { url: absoluteUrl(routes.privacy), changeFrequency: 'yearly', priority: 0.2 },
      { url: absoluteUrl(routes.imprint), changeFrequency: 'yearly', priority: 0.2 },
      { url: absoluteUrl(routes.returns), changeFrequency: 'yearly', priority: 0.2 },
      { url: absoluteUrl(routes.warranty), changeFrequency: 'yearly', priority: 0.2 },
      { url: absoluteUrl(routes.shipping), changeFrequency: 'yearly', priority: 0.2 },
      { url: absoluteUrl(routes.cookies), changeFrequency: 'yearly', priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  /**
   * Produktseiten mit Bild-Sitemap-Angaben. Google nutzt `images`, um
   * Produktbilder der Bildersuche zuzuordnen.
   */
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(routes.product(product.slug)),
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly',
    priority: product.bestseller ? 0.9 : 0.8,
    images: product.images.map((image) => ogImageUrl(image.publicId)),
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(routes.category(category.slug)),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const landingPageEntries: MetadataRoute.Sitemap = landingPages.map((page) => ({
    url: absoluteUrl(routes.landing(page.slug)),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: absoluteUrl(routes.city(city.slug)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(routes.blogPost(post.slug)),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories
    .filter((category) => postsInCategory(category.slug).length > 0)
    .map((category) => ({
      url: absoluteUrl(routes.blogCategory(category.slug)),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: absoluteUrl(routes.caseStudy(study.slug)),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...landingPageEntries,
    ...productPages,
    ...cityPages,
    ...blogPages,
    ...blogCategoryPages,
    ...caseStudyPages,
  ];
}
