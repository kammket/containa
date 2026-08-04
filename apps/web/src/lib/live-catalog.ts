/**
 * Live-Katalog – Produktdaten aus der API statt aus dem statischen Katalog.
 *
 * Der Adminbereich pflegt Produkte in der Datenbank. Die Storefront darf
 * deshalb nicht mehr ausschließlich aus `@emc/catalog` rendern, sonst bleiben
 * Preisänderungen, neue Fotos und neu angelegte Produkte unsichtbar.
 *
 * Ablauf:
 *
 * 1. Die Seiten holen die Produkte über dieses Modul (nur serverseitig).
 * 2. Der Abruf wird von Next.js zwischengespeichert – die Seiten bleiben
 *    statisch ausgeliefert und werden höchstens alle 60 Sekunden erneuert.
 *    Speichert jemand im Adminbereich, meldet die API das an
 *    `/api/revalidate`; die betroffenen Seiten werden dann sofort erneuert.
 * 3. Ist die API nicht erreichbar oder die Datenbank leer, liefert jede
 *    Funktion die statischen Katalogdaten. Der Shop bleibt damit auch ohne
 *    laufende API vollständig lesbar und crawlbar – wie bisher.
 *
 * Die Datenbank führt das Produkt vollständig – bis hin zu Suchbegriffen,
 * Nebenkeywords und kuratierten verwandten Produkten. Was dort leer bleibt,
 * ergänzt der Katalogeintrag desselben Slugs; fehlt auch der, greifen die
 * Standardwerte (allgemeine FAQ, Standard-Downloads). Ein im Adminbereich
 * angelegtes Produkt ist damit von sich aus vollständig.
 */

import { cache } from 'react';

import {
  buildSpecRows,
  commonFaqs,
  formatDimension,
  getProduct as getCatalogProduct,
  products as catalogProducts,
  standardDownloads,
  type Availability,
  type ConditionSlug,
  type ContainerSpecs,
  type Product,
  type ProductFaq,
  type ProductFilter,
  type ProductImage,
  type SizeSlug,
  type SpecRow,
} from '@emc/catalog';

const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '');

/** Höchstalter der Produktdaten in Sekunden, wenn keine Meldung der API kommt. */
const REVALIDATE_SECONDS = 60;

/** Cache-Marke, über die der Adminbereich eine sofortige Erneuerung auslöst. */
export const PRODUCTS_CACHE_TAG = 'produkte';

const PAGE_SIZE = 100;
const MAX_PAGES = 20;
const TIMEOUT_MS = 8_000;

// ── Antwortformat der API ───────────────────────────────────────────────────

interface ApiImage {
  publicId: string;
  alt: string;
  width: number | null;
  height: number | null;
  sortOrder: number;
}

interface ApiProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  tagline: string;
  description: string[];
  highlights: string[];
  condition: string;
  size: string;
  availability: string;
  priceNet: number;
  compareAtNet: number | null;
  stock: number;
  leadTimeDaysMin: number;
  leadTimeDaysMax: number;
  warrantyMonths: number;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  specs: unknown;
  specRows: unknown;
  faqs: unknown;
  isFeatured: boolean;
  isBestseller: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  // Optional, weil Storefront und API getrennt ausgerollt werden: Zwischen
  // beiden Deployments antwortet die API kurzzeitig noch ohne diese Felder.
  secondaryKeywords?: string[];
  keywords?: string[];
  relatedSlugs?: string[];
  updatedAt: string;
  images: ApiImage[];
  categories: { isPrimary: boolean; category: { slug: string } }[];
}

interface ApiProductList {
  items: ApiProduct[];
  meta: { page: number; limit: number; total: number; pages: number };
}

const conditionSlugs: Record<string, ConditionSlug> = {
  NEU: 'neu',
  ONE_TRIP: 'one-trip',
  GENERALUEBERHOLT: 'generalueberholt',
  GEBRAUCHT: 'gebraucht',
};

const availabilitySlugs: Record<string, Availability> = {
  AUF_LAGER: 'auf-lager',
  KURZFRISTIG: 'kurzfristig',
  AUF_ANFRAGE: 'auf-anfrage',
  AUSVERKAUFT: 'ausverkauft',
};

const sizeSlugs: SizeSlug[] = ['8ft', '10ft', '20ft', '40ft', '45ft', 'sonder'];

// ── Abruf ───────────────────────────────────────────────────────────────────

/**
 * Bricht das Warten nach `TIMEOUT_MS` ab, ohne die Anfrage selbst abzubrechen.
 * Ein `AbortSignal` an `fetch` würde den Datencache von Next.js umgehen; so
 * läuft die Anfrage im Hintergrund weiter und füllt den Cache für den nächsten
 * Aufruf, während diese Seite bereits mit den Katalogdaten rendert.
 */
function withTimeout<T>(promise: Promise<T>): Promise<T | null> {
  promise.catch(() => undefined);
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), TIMEOUT_MS)),
  ]);
}

async function fetchPage(page: number): Promise<ApiProductList | null> {
  const response = await fetch(
    `${API_URL}/api/v1/products?page=${page}&limit=${PAGE_SIZE}`,
    {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS, tags: [PRODUCTS_CACHE_TAG] },
    },
  );

  if (!response.ok) return null;
  return (await response.json()) as ApiProductList;
}

async function fetchAll(): Promise<ApiProduct[] | null> {
  if (!API_URL) return null;

  const items: ApiProduct[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const result = await withTimeout(fetchPage(page)).catch(() => null);
    // Schon die erste Seite fehlgeschlagen: gar keine Live-Daten. Bricht eine
    // Folgeseite ab, liefern wir lieber die vollständigen Katalogdaten als
    // einen halben Shop.
    if (!result) return null;

    items.push(...result.items);
    if (page >= result.meta.pages) break;
  }

  return items;
}

// ── Übersetzung API → Katalogformat ─────────────────────────────────────────

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Liste von Zeichenketten aus einer Antwort, die das Feld auch weglassen darf.
 *
 * Storefront und API werden getrennt ausgerollt, und zwischengespeicherte
 * Antworten überdauern ein Deployment. Ein Feld, das die API noch nicht
 * kennt, darf die Produktseiten deshalb nicht zum Absturz bringen.
 */
function asStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function asSpecRows(value: unknown): SpecRow[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const rows = value.filter(
    (row): row is SpecRow =>
      isRecord(row) && typeof row.label === 'string' && typeof row.value === 'string',
  );
  return rows.length > 0 ? rows : undefined;
}

function asFaqs(value: unknown): ProductFaq[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const faqs = value.filter(
    (faq): faq is ProductFaq =>
      isRecord(faq) && typeof faq.question === 'string' && typeof faq.answer === 'string',
  );
  return faqs.length > 0 ? faqs : undefined;
}

function toSize(value: string): SizeSlug {
  return sizeSlugs.includes(value as SizeSlug) ? (value as SizeSlug) : 'sonder';
}

/**
 * Technische Daten zusammenführen. Die Maßspalten der Datenbank gewinnen: Sie
 * sind das Feld, das der Adminbereich tatsächlich pflegt, das JSON daneben
 * stammt aus dem Seed.
 */
function mergeSpecs(dto: ApiProduct, base: Product | undefined): ContainerSpecs {
  const stored = isRecord(dto.specs) ? (dto.specs as Partial<ContainerSpecs>) : undefined;

  return {
    material: 'Corten-Stahl',
    csc: false,
    wwt: false,
    ...base?.specs,
    ...stored,
    exterior: { length: dto.lengthMm, width: dto.widthMm, height: dto.heightMm },
  };
}

/**
 * Spezifikationstabelle.
 *
 * Liegen technische Daten vor, wird die Tabelle aus den zusammengeführten
 * Daten neu erzeugt – sonst zeigte sie nach einer Maßänderung im Adminbereich
 * weiterhin die alten Werte. Zusätzliche, redaktionell gepflegte Zeilen
 * (etwa „Rolltor" oder „Dämmung") bleiben dabei erhalten.
 */
function mergeSpecRows(
  dto: ApiProduct,
  base: Product | undefined,
  specs: ContainerSpecs,
): SpecRow[] {
  const stored = asSpecRows(dto.specRows) ?? base?.specRows;
  const hasSpecs = isRecord(dto.specs) || Boolean(base?.specs);

  if (!hasSpecs) return minimalSpecRows(dto, specs);

  if (!stored) return buildSpecRows(specs);

  // Zeilen, die `buildSpecRows` nicht selbst erzeugt, sind redaktionell
  // ergänzt und werden unverändert angehängt. Die erzeugten Beschriftungen
  // hängen nur davon ab, welche Felder gesetzt sind, nicht von ihren Werten.
  const generatedLabels = new Set(buildSpecRows(specs).map((row) => row.label));
  const extra = stored.filter((row) => !generatedLabels.has(row.label));

  return buildSpecRows(specs, extra);
}

/** Notdürftige Tabelle für Produkte, die nur im Adminbereich angelegt wurden. */
function minimalSpecRows(dto: ApiProduct, specs: ContainerSpecs): SpecRow[] {
  const area = (specs.exterior.length / 1000) * (specs.exterior.width / 1000);

  return [
    {
      label: 'Außenmaße (L × B × H)',
      value: formatDimension(specs.exterior),
      group: 'abmessungen',
    },
    {
      label: 'Stellfläche',
      value: `ca. ${area.toLocaleString('de-DE', { maximumFractionDigits: 1 })} m²`,
      group: 'abmessungen',
    },
    { label: 'Wandmaterial', value: specs.material, group: 'aufbau' },
    { label: 'Garantie', value: `${dto.warrantyMonths} Monate`, group: 'lieferung' },
    {
      label: 'Lieferzeit',
      value: `${dto.leadTimeDaysMin}–${dto.leadTimeDaysMax} Werktage`,
      group: 'lieferung',
    },
  ];
}

/**
 * Bilder eines Produkts – immer die der Datenbank, auch wenn es keine gibt.
 *
 * Bewusst **ohne** Rückfall auf die Katalogbilder: Wer im Adminbereich alle
 * Fotos eines Produkts löscht, bekäme sonst genau die gelöschten Bilder
 * wieder zu sehen, weil der Katalogeintrag sie weiterhin führt. Das Löschen
 * wäre damit wirkungslos. Ein Produkt ohne Bild zeigt lieber keines – die
 * Galerie blendet sich dann aus – als ein Bild, das gerade entfernt wurde.
 */
function mergeImages(dto: ApiProduct): ProductImage[] {
  return (Array.isArray(dto.images) ? [...dto.images] : [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((image) => ({
      publicId: image.publicId,
      alt: image.alt,
      width: image.width ?? 1200,
      height: image.height ?? 900,
    }));
}

function toProduct(dto: ApiProduct): Product {
  const base = getCatalogProduct(dto.slug);
  const specs = mergeSpecs(dto, base);

  const links = Array.isArray(dto.categories) ? dto.categories : [];
  const categorySlugs = links.map((link) => link.category.slug);
  const primary = links.find((link) => link.isPrimary)?.category.slug;

  const description = asStringList(dto.description);
  const highlights = asStringList(dto.highlights);
  const keywords = asStringList(dto.keywords);
  const secondaryKeywords = asStringList(dto.secondaryKeywords);
  const related = asStringList(dto.relatedSlugs);

  return {
    id: dto.id,
    slug: dto.slug,
    sku: dto.sku,
    name: dto.name,
    tagline: dto.tagline,
    description: description.length > 0 ? description : (base?.description ?? []),
    highlights: highlights.length > 0 ? highlights : (base?.highlights ?? []),
    categorySlugs: categorySlugs.length > 0 ? categorySlugs : (base?.categorySlugs ?? []),
    primaryCategory: primary ?? categorySlugs[0] ?? base?.primaryCategory ?? '',
    condition: conditionSlugs[dto.condition] ?? base?.condition ?? 'gebraucht',
    size: toSize(dto.size),
    priceNet: dto.priceNet,
    // 0 bedeutet „im Adminbereich gestrichen" und nicht „kostenlos".
    ...(dto.compareAtNet ? { compareAtNet: dto.compareAtNet } : {}),
    availability: availabilitySlugs[dto.availability] ?? 'auf-lager',
    leadTimeDays: [dto.leadTimeDaysMin, dto.leadTimeDaysMax],
    stock: dto.stock,
    images: mergeImages(dto),
    specs,
    specRows: mergeSpecRows(dto, base, specs),
    // Ohne eigene FAQ bekommt das Produkt wenigstens die allgemeinen – sonst
    // fehlten der Seite ein ganzer Abschnitt und die FAQPage-Auszeichnung.
    faqs: asFaqs(dto.faqs) ?? base?.faqs ?? commonFaqs,
    // Die drei Standard-PDFs gelten für jeden Container; in der Datenbank
    // werden sie deshalb nicht je Produkt gepflegt.
    downloads: base?.downloads ?? standardDownloads,
    related: related.length > 0 ? related : (base?.related ?? []),
    keywords: keywords.length > 0 ? keywords : (base?.keywords ?? []),
    warrantyMonths: dto.warrantyMonths,
    featured: dto.isFeatured,
    bestseller: dto.isBestseller,
    updatedAt: dto.updatedAt,
    // Leere SEO-Felder fallen auf Katalog, Produktname bzw. Kurztext zurück –
    // eine leere Meta-Description wäre schlechter als eine allgemeine.
    seo: {
      title: dto.seoTitle || base?.seo.title || dto.name,
      description: dto.seoDescription || base?.seo.description || dto.tagline,
      focusKeyword: dto.focusKeyword || base?.seo.focusKeyword || dto.name,
      ...(secondaryKeywords.length > 0
        ? { secondaryKeywords }
        : base?.seo.secondaryKeywords
          ? { secondaryKeywords: base.seo.secondaryKeywords }
          : {}),
    },
  };
}

/**
 * Reihenfolge des Katalogs beibehalten – sie ist redaktionell sortiert. Im
 * Adminbereich neu angelegte Produkte hängen sich hinten an.
 */
function inCatalogOrder(items: ApiProduct[]): Product[] {
  const rank = new Map(catalogProducts.map((product, index) => [product.slug, index]));

  return items
    .map((dto, index) => ({
      product: toProduct(dto),
      rank: rank.get(dto.slug) ?? catalogProducts.length + index,
    }))
    .sort((a, b) => a.rank - b.rank)
    .map((entry) => entry.product);
}

// ── Öffentliche Schnittstelle ───────────────────────────────────────────────

/**
 * Alle im Shop sichtbaren Produkte.
 *
 * `cache` fasst mehrere Aufrufe innerhalb desselben Renderdurchlaufs zusammen;
 * über Anfragen hinweg übernimmt das der Datencache von Next.js.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  const items = await fetchAll();

  // Keine Verbindung oder leere Datenbank (nicht geseedet): statischer Katalog.
  if (!items || items.length === 0) return catalogProducts;

  return inCatalogOrder(items);
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((product) => product.slug === slug);
}

export async function getProductsInCategory(categorySlug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((product) => product.categorySlugs.includes(categorySlug));
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((product) => product.featured).slice(0, limit);
}

export async function getBestsellers(limit = 8): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((product) => product.bestseller).slice(0, limit);
}

/**
 * Produkte nach Größe, Zustand und Kategorie. Grundlage der Landingpages, die
 * eine Produktgruppe abdecken statt einer festen Auswahl – neue Produkte aus
 * dem Adminbereich erscheinen dort ohne Codeänderung.
 */
export async function getProductsByFilter(
  filter: ProductFilter,
  limit?: number,
): Promise<Product[]> {
  const all = await getProducts();

  const matching = all.filter(
    (product) =>
      (!filter.sizes || filter.sizes.includes(product.size)) &&
      (!filter.conditions || filter.conditions.includes(product.condition)) &&
      (!filter.categorySlugs ||
        filter.categorySlugs.some((slug) => product.categorySlugs.includes(slug))),
  );

  return limit === undefined ? matching : matching.slice(0, limit);
}

/** Mehrere Produkte in der Reihenfolge der übergebenen Slugs. */
export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const all = await getProducts();
  return slugs
    .map((slug) => all.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
}

/** Entspricht `relatedProducts` aus dem Katalog, nur auf den Live-Daten. */
export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const all = await getProducts();
  const product = all.find((item) => item.slug === slug);
  if (!product) return [];

  const explicit = product.related
    .map((related) => all.find((item) => item.slug === related))
    .filter((item): item is Product => item !== undefined && item.slug !== slug);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const fallback = all.filter(
    (item) =>
      item.slug !== slug &&
      !explicit.some((entry) => entry.slug === item.slug) &&
      item.categorySlugs.some((category) => product.categorySlugs.includes(category)),
  );

  return [...explicit, ...fallback].slice(0, limit);
}

/**
 * Günstigster Nettopreis einer Kategorie. Zubehör bleibt ausgeschlossen,
 * solange die Kategorie auch Container enthält – siehe `lowestPriceInCategory`
 * im Katalog, die Begründung (PAngV) gilt hier unverändert.
 */
export async function getLowestPriceInCategory(categorySlug: string): Promise<number | null> {
  const items = await getProductsInCategory(categorySlug);
  if (items.length === 0) return null;

  const containers = items.filter((product) => product.size !== 'sonder');
  const relevant = containers.length > 0 ? containers : items;

  return Math.min(...relevant.map((product) => product.priceNet));
}
