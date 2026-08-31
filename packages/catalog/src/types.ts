/**
 * Zentrale Typdefinitionen für den EMC-Container-Katalog.
 *
 * Alle Preise werden als Nettobetrag in Cent (EUR) gespeichert. Die Anzeige
 * im Shop erfolgt netto; die Umsatzsteuer wird erst auf der Rechnung
 * berechnet und ausgewiesen. Siehe `pricing.ts`.
 */

export type ConditionSlug = 'neu' | 'one-trip' | 'gebraucht' | 'generalueberholt';

export interface Condition {
  slug: ConditionSlug;
  label: string;
  short: string;
  description: string;
}

/** Verfügbarkeitsstatus – wird auf schema.org/ItemAvailability gemappt. */
export type Availability = 'auf-lager' | 'kurzfristig' | 'auf-anfrage' | 'ausverkauft';

export interface Dimension {
  /** Länge in Millimetern */
  length: number;
  /** Breite in Millimetern */
  width: number;
  /** Höhe in Millimetern */
  height: number;
}

export interface ContainerSpecs {
  /** ISO-Baugrößen-Code, z. B. "22G1" */
  isoCode?: string;
  exterior: Dimension;
  interior?: Dimension;
  doorOpening?: Dimension;
  /** Innenvolumen in m³ */
  volume?: number;
  /** Eigengewicht (Tara) in kg */
  tareWeight?: number;
  /** Maximale Zuladung in kg */
  payload?: number;
  /** Max. Bruttogewicht in kg */
  maxGross?: number;
  /** Wandmaterial */
  material: string;
  /** Bodenbelag */
  flooring?: string;
  /** RAL-Farbton */
  ral?: string;
  /** CSC-Plakette / ISO-Zertifizierung vorhanden */
  csc: boolean;
  /** Windundwasserdicht */
  wwt: boolean;
}

export interface ProductImage {
  /** Cloudinary public ID – ohne Cloudinary wird ein lokales SVG erzeugt. */
  publicId: string;
  alt: string;
  /** Seitenverhältnis für CLS-freies Rendering */
  width: number;
  height: number;
}

export interface SpecRow {
  label: string;
  value: string;
  /** Gruppierung in der Spezifikationstabelle */
  group: 'abmessungen' | 'gewicht' | 'aufbau' | 'zertifizierung' | 'lieferung';
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Download {
  label: string;
  description: string;
  /** Pfad relativ zu /public oder absolute URL */
  href: string;
  type: 'pdf' | 'dwg' | 'zip';
  sizeLabel: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  /** Kurzer Verkaufstext für Karten und Meta-Description */
  tagline: string;
  /** Ausführliche Beschreibung (Markdown-freies HTML-sicheres Plaintext-Absatzarray) */
  description: string[];
  /** Kernvorteile für die Bullet-Liste */
  highlights: string[];
  categorySlugs: string[];
  /** Primäre Kategorie – bestimmt Breadcrumb und kanonischen Pfad */
  primaryCategory: string;
  condition: ConditionSlug;
  /** Größenklasse für Filter, z. B. "20ft" */
  size: SizeSlug;
  priceNet: number;
  compareAtNet?: number;
  availability: Availability;
  /** Lieferzeit in Werktagen (Spanne) */
  leadTimeDays: [number, number];
  stock: number;
  images: ProductImage[];
  specs: ContainerSpecs;
  specRows: SpecRow[];
  faqs: ProductFaq[];
  downloads: Download[];
  /** Gewährleistung in Monaten */
  warrantyMonths: number;
  /** Manuell kuratierte verwandte Produkte (Slugs) */
  related: string[];
  /** Suchbegriffe für die Instant-Suche */
  keywords: string[];
  featured: boolean;
  bestseller: boolean;
  /** Veröffentlichungsdatum – für sitemap lastmod */
  updatedAt: string;
  seo: SeoMeta;
}

export type SizeSlug = '8ft' | '10ft' | '20ft' | '40ft' | '45ft' | 'sonder';

export interface SeoMeta {
  title: string;
  description: string;
  /** Fokus-Keyword für interne Verlinkung */
  focusKeyword: string;
  /** Weitere Keywords für semantische interne Links */
  secondaryKeywords?: string[];
}

export interface Category {
  slug: string;
  name: string;
  /** Kurzform für Navigation / Breadcrumbs */
  navLabel: string;
  tagline: string;
  description: string[];
  /** Vorteilsliste auf der Kategorieseite */
  benefits: { title: string; text: string }[];
  faqs: ProductFaq[];
  image: ProductImage;
  /** Icon-Key aus components/icons */
  icon: string;
  /** Position in der Mega-Menü-Spalte */
  menuGroup: 'groessen' | 'zustand' | 'bauart' | 'ausbau';
  order: number;
  seo: SeoMeta;
}

export interface City {
  slug: string;
  /** Städtename, z. B. "München" */
  name: string;
  /** Genitiv/Adjektivform, z. B. "Münchner" */
  adjective: string;
  state: string;
  postalPrefix: string;
  population: number;
  lat: number;
  lng: number;
  /** Entfernung vom Zentrallager in km – steuert Lieferpauschale */
  distanceKm: number;
  /** Übliche Lieferzeit in Werktagen */
  deliveryDays: [number, number];
  /** Nächstgelegener Umschlagplatz / Hafen / Terminal */
  hub: string;
  /** Individueller Einleitungstext – kein Duplicate Content */
  intro: string[];
  /** Lokale Anwendungsfälle */
  useCases: { title: string; text: string }[];
  /** Stadtteile / Umlandgemeinden für Longtail-Abdeckung */
  districts: string[];
  /** Lokale Besonderheiten für Anlieferung */
  logisticsNote: string;
  seo: SeoMeta;
}

/**
 * Auswahlregel für die Produktliste einer Landingpage.
 *
 * Alternative zur festen Slugliste: Seiten, die eine Produktgruppe abdecken
 * („gebrauchte 20-Füßer"), sollen auch Produkte zeigen, die erst später im
 * Adminbereich entstehen. Eine eingefrorene Liste würde das verhindern.
 */
export interface ProductFilter {
  sizes?: SizeSlug[];
  conditions?: ConditionSlug[];
  categorySlugs?: string[];
}

export interface LandingPage {
  slug: string;
  h1: string;
  /** Kurz-Kicker über der H1 */
  kicker: string;
  intro: string[];
  /** Slugs der hervorgehobenen Produkte */
  productSlugs: string[];
  /** Statt `productSlugs`: Produkte live aus dem Katalog auswählen. */
  productFilter?: ProductFilter;
  /** Slugs der verlinkten Kategorien */
  categorySlugs: string[];
  sections: { heading: string; body: string[] }[];
  faqs: ProductFaq[];
  seo: SeoMeta;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  image: ProductImage;
  /** Strukturierter Artikelinhalt */
  body: BlogBlock[];
  tags: string[];
  /** Verwandte Produkte / Kategorien für automatische interne Verlinkung */
  relatedProducts: string[];
  relatedCategories: string[];
  seo: SeoMeta;
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'callout'; title: string; text: string };

export interface Faq {
  question: string;
  answer: string;
  category: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  /** Produkt-Slug, falls produktbezogen */
  productSlug?: string;
  verified: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  city: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  city: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  image: ProductImage;
  productSlugs: string[];
  seo: SeoMeta;
}

export interface DeliveryZone {
  /** Erste Ziffer(n) der PLZ */
  prefixes: string[];
  name: string;
  /** Grundpreis netto in Cent für einen 20ft-Container */
  baseNet: number;
  /** Aufschlag netto in Cent je zusätzlichem Meter Containerlänge über 6 m */
  perExtraMeterNet: number;
  days: [number, number];
}
