import { blogPosts } from './blog.ts';
import { categories } from './categories.ts';
import { cities } from './cities.ts';
import { landingPages } from './landing-pages.ts';
import { products } from './products.ts';
import { routes } from './routes.ts';
import type { Product } from './types.ts';

/**
 * Leichtgewichtiger Suchindex für die Instant-Suche. Bewusst ohne externe
 * Bibliothek: Der Index ist klein genug (< 40 KB), um komplett im Client zu
 * liegen, und vermeidet damit eine Netzwerkrunde je Tastendruck.
 */

export type SearchEntryType = 'produkt' | 'kategorie' | 'ratgeber' | 'standort' | 'seite';

export interface SearchEntry {
  id: string;
  type: SearchEntryType;
  title: string;
  subtitle: string;
  href: string;
  /** Vorberechneter, normalisierter Suchtext */
  haystack: string;
  /** Gewicht für die Sortierung bei gleichem Treffer-Score */
  boost: number;
  priceNet?: number;
  image?: string;
}

/**
 * Normalisiert deutschen Suchtext: Kleinschreibung, Umlaut- und ß-Auflösung,
 * Entfernen von Satzzeichen. Damit findet „muenchen" auch „München" und
 * „20ft" auch „20 Fuß".
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Erzeugt zusätzliche Schreibvarianten für Größenangaben (20ft ↔ 20 Fuß). */
function sizeSynonyms(text: string): string {
  const matches = text.match(/(\d+)\s*(ft|fuss|fuß)/gi) ?? [];
  return matches
    .map((m) => {
      const n = m.match(/\d+/)?.[0];
      return n ? `${n}ft ${n} fuss ${n} fuesse` : '';
    })
    .join(' ');
}

function entry(partial: Omit<SearchEntry, 'haystack'> & { keywords?: string[] }): SearchEntry {
  const { keywords = [], ...rest } = partial;
  const raw = [rest.title, rest.subtitle, ...keywords].join(' ');
  const haystack = `${normalize(raw)} ${sizeSynonyms(raw)}`.replace(/\s+/g, ' ').trim();
  return { ...rest, haystack };
}

/**
 * Produkteinträge des Suchindex.
 *
 * Als Funktion und nicht als feste Liste, damit die Storefront den Index auch
 * aus den Live-Produktdaten der API erzeugen kann – sonst zeigte die Suche
 * nach einer Preisänderung im Adminbereich weiterhin den alten Preis.
 */
export function productSearchEntries(items: Product[]): SearchEntry[] {
  return items.map((p) =>
    entry({
      id: `p:${p.slug}`,
      type: 'produkt',
      title: p.name,
      subtitle: p.tagline,
      href: routes.product(p.slug),
      boost: p.bestseller ? 3 : p.featured ? 2 : 1,
      priceNet: p.priceNet,
      image: p.images[0]?.publicId,
      keywords: [...p.keywords, p.sku, p.size, p.condition, ...p.categorySlugs],
    }),
  );
}

export const searchIndex: SearchEntry[] = [
  ...productSearchEntries(products),
  ...categories.map((c) =>
    entry({
      id: `c:${c.slug}`,
      type: 'kategorie',
      title: c.name,
      subtitle: c.tagline,
      href: routes.category(c.slug),
      boost: 4,
      image: c.image.publicId,
      keywords: [c.seo.focusKeyword, ...(c.seo.secondaryKeywords ?? [])],
    }),
  ),
  ...landingPages.map((l) =>
    entry({
      id: `l:${l.slug}`,
      type: 'seite',
      title: l.h1,
      subtitle: l.kicker,
      href: routes.landing(l.slug),
      boost: 3,
      keywords: [l.seo.focusKeyword, ...(l.seo.secondaryKeywords ?? [])],
    }),
  ),
  ...cities.map((c) =>
    entry({
      id: `city:${c.slug}`,
      type: 'standort',
      title: `Seecontainer ${c.name}`,
      subtitle: `Lieferung in ${c.deliveryDays[0]}–${c.deliveryDays[1]} Werktagen · ${c.state}`,
      href: routes.city(c.slug),
      boost: 2,
      keywords: [c.name, c.state, ...c.districts, c.seo.focusKeyword],
    }),
  ),
  ...blogPosts.map((p) =>
    entry({
      id: `b:${p.slug}`,
      type: 'ratgeber',
      title: p.title,
      subtitle: p.excerpt,
      href: routes.blogPost(p.slug),
      boost: 1,
      image: p.image.publicId,
      keywords: p.tags,
    }),
  ),
];

export interface SearchOptions {
  limit?: number;
  types?: SearchEntryType[];
  /** Abweichender Index, etwa mit Live-Produktdaten. Standard: `searchIndex`. */
  index?: SearchEntry[];
}

/**
 * Präfix-basierte Volltextsuche. Jeder Suchbegriff muss als Wortanfang im
 * Index vorkommen (UND-Verknüpfung) – das liefert bei kurzen Eingaben
 * präzisere Ergebnisse als eine reine Teilstringsuche.
 */
export function search(query: string, options: SearchOptions = {}): SearchEntry[] {
  const { limit = 8, types, index = searchIndex } = options;
  const terms = normalize(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];

  const pool = types ? index.filter((e) => types.includes(e.type)) : index;

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const item of pool) {
    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      const wordStart = item.haystack.startsWith(term)
        ? 3
        : item.haystack.includes(` ${term}`)
          ? 2
          : item.haystack.includes(term)
            ? 1
            : 0;

      if (wordStart === 0) {
        matchedAll = false;
        break;
      }
      score += wordStart;
    }

    if (matchedAll) {
      // Exakter Titeltreffer wird deutlich höher gewichtet
      const titleNorm = normalize(item.title);
      if (titleNorm.startsWith(terms.join(' '))) score += 6;
      scored.push({ entry: item, score: score + item.boost });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'de'))
    .slice(0, limit)
    .map((s) => s.entry);
}

/** Vorschläge für die leere Suchmaske. */
export const popularSearches = [
  '20 Fuß Container',
  '40 Fuß High Cube',
  'Gebrauchte Container',
  'Bürocontainer',
  'Kühlcontainer',
  'Container Berlin',
  'Schlosskasten',
  'Container Preise',
];
