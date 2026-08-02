import { brand } from './brand.ts';

/**
 * Zentrale URL-Definition. Alle Links im Shop werden über diese Helfer erzeugt,
 * damit ein Pfadwechsel an genau einer Stelle nachgezogen werden muss.
 *
 * Landingpages und Städteseiten liegen bewusst auf Root-Ebene – für
 * transaktionale Keywords ist das die stärkste URL-Struktur.
 */
export const routes = {
  home: '/',
  shop: '/shop',
  category: (slug: string) => `/container/${slug}`,
  product: (slug: string) => `/produkt/${slug}`,
  landing: (slug: string) => `/${slug}`,
  city: (slug: string) => `/seecontainer-${slug}`,
  cities: '/standorte',

  blog: '/ratgeber',
  blogPost: (slug: string) => `/ratgeber/${slug}`,
  blogCategory: (slug: string) => `/ratgeber/kategorie/${slug}`,

  search: '/suche',
  cart: '/warenkorb',
  wishlist: '/merkzettel',
  checkout: '/kasse',
  checkoutSuccess: (orderNumber: string) => `/kasse/bestaetigung/${orderNumber}`,
  quote: '/angebot-anfordern',

  /**
   * Der Shop arbeitet ausschließlich mit Gast-Checkout – es gibt keine
   * Kundenkonten. Bestellstatus und Rechnung rufen Kundinnen und Kunden über
   * Bestellnummer und E-Mail-Adresse ab.
   */
  trackOrder: '/sendungsverfolgung',

  about: '/ueber-uns',
  contact: '/kontakt',
  faq: '/haeufige-fragen',
  delivery: '/lieferung',
  shipping: '/versand',
  installation: '/aufstellung',
  modifications: '/container-umbau',
  financing: '/finanzierung',
  reviews: '/bewertungen',
  caseStudies: '/referenzen',
  caseStudy: (slug: string) => `/referenzen/${slug}`,
  downloads: '/downloads',
  gallery: '/galerie',
  careers: '/karriere',
  sitemapPage: '/sitemap',

  terms: '/agb',
  privacy: '/datenschutz',
  cookies: '/cookie-richtlinie',
  returns: '/widerruf',
  warranty: '/garantie',
  imprint: '/impressum',

  // Technische Routen
  sitemapXml: '/sitemap.xml',
  robots: '/robots.txt',
  rss: '/ratgeber/rss.xml',
} as const;

/** Absolute URL für Canonicals, OpenGraph und Schema.org. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${brand.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Reservierte Root-Slugs. Landingpages und Städteseiten dürfen keinen dieser
 * Pfade belegen – wird im Test `routes.test.ts` geprüft.
 */
export const reservedRootSlugs = new Set<string>([
  'shop',
  'container',
  'produkt',
  'ratgeber',
  'suche',
  'warenkorb',
  'merkzettel',
  'kasse',
  'ueber-uns',
  'kontakt',
  'haeufige-fragen',
  'lieferung',
  'versand',
  'aufstellung',
  'container-umbau',
  'finanzierung',
  'bewertungen',
  'referenzen',
  'downloads',
  'galerie',
  'karriere',
  'sitemap',
  'agb',
  'datenschutz',
  'cookie-richtlinie',
  'widerruf',
  'garantie',
  'impressum',
  'standorte',
  'angebot-anfordern',
  'sendungsverfolgung',
  'admin',
  'api',
]);

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/** Erzeugt Breadcrumbs mit vorangestelltem Startseiten-Eintrag. */
export function breadcrumbs(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ name: 'Startseite', href: routes.home }, ...items];
}
