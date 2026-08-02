import type { MetadataRoute } from 'next';

import { absoluteUrl, brand, routes } from '@emc/catalog';

/**
 * robots.txt
 *
 * Ausgeschlossen sind Bereiche ohne Indexierungswert oder mit personenbezogenen
 * Daten: Kasse, Warenkorb, Merkzettel, Sendungsverfolgung, der Adminbereich und
 * die interne Suche. Letztere würde sonst beliebig viele Parameter-URLs mit
 * dünnem Inhalt erzeugen.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = [
    '/api/',
    `${routes.checkout}/`,
    routes.checkout,
    routes.cart,
    routes.wishlist,
    routes.search,
    '/suche?',
    routes.trackOrder,
    '/admin',
    '/admin/',
    '/*?sort=',
    '/*?filter=',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        // KI-Crawler ohne Suchverkehr-Gegenwert vom Vollzugriff ausnehmen
        userAgent: ['GPTBot', 'CCBot', 'ClaudeBot', 'Bytespider'],
        disallow: '/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: brand.url,
  };
}
