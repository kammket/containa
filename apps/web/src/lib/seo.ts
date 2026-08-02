import type { Metadata } from 'next';

import { absoluteUrl, brand, type SeoMeta } from '@emc/catalog';

import { ogImageUrl } from './images';

/**
 * Zentrale Metadaten-Erzeugung. Jede Seite ruft `buildMetadata` auf, damit
 * Canonical, OpenGraph, Twitter Card und Robots-Direktiven überall konsistent
 * gesetzt sind und nirgends vergessen werden können.
 */

const TITLE_SUFFIX = ` | ${brand.name}`;
const MAX_TITLE = 60;

/** Hängt den Markennamen an, sofern der Titel dadurch nicht zu lang wird. */
export function withBrand(title: string): string {
  if (title.includes(brand.name)) return title;
  return title.length + TITLE_SUFFIX.length <= MAX_TITLE ? `${title}${TITLE_SUFFIX}` : title;
}

export interface BuildMetadataOptions {
  seo: SeoMeta;
  /** Pfad ab Root, z. B. "/produkt/20-fuss-container" */
  path: string;
  /** Cloudinary-publicId für das OpenGraph-Bild */
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  /** Seite von der Indexierung ausnehmen (Warenkorb, Konto, Suche …) */
  noIndex?: boolean;
}

export function buildMetadata({
  seo,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? ogImageUrl(image) : absoluteUrl('/og-default.svg');

  return {
    title: withBrand(seo.title),
    description: seo.description,
    keywords: [seo.focusKeyword, ...(seo.secondaryKeywords ?? [])],
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'de_DE',
      url,
      siteName: brand.name,
      title: seo.title,
      description: seo.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
  };
}

/** Metadaten für Seiten ohne Indexierung – Konto, Warenkorb, Kasse. */
export function privateMetadata(title: string, description: string, path: string): Metadata {
  return buildMetadata({
    seo: { title, description, focusKeyword: '' },
    path,
    noIndex: true,
  });
}
