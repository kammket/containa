import { categories, menuGroups } from './categories.ts';
import { lowestPriceInCategory, productsInCategory } from './products.ts';
import { routes } from './routes.ts';

/**
 * Schlanke Navigationsdaten für Client-Komponenten (Mega-Menü, mobile
 * Navigation, Footer).
 *
 * Die vollständigen `Category`-Objekte enthalten Beschreibungstexte, Vorteile,
 * FAQs und SEO-Metadaten – zusammen rund 40 KB. Menüs brauchen davon nichts.
 * Dieses Modul stellt genau die benötigten Felder bereit und wird zur Bauzeit
 * einmal berechnet, damit Client-Bundles klein bleiben.
 */

export interface NavCategory {
  slug: string;
  label: string;
  href: string;
  /** Günstigster Nettopreis der Kategorie in Cent, `null` wenn leer */
  fromNet: number | null;
  productCount: number;
}

export interface NavGroup {
  key: string;
  label: string;
  description: string;
  items: NavCategory[];
}

export const navigation: NavGroup[] = menuGroups.map((group) => ({
  key: group.key,
  label: group.label,
  description: group.description,
  items: categories
    .filter((category) => category.menuGroup === group.key)
    .sort((a, b) => a.order - b.order)
    .map((category) => {
      const lowest = lowestPriceInCategory(category.slug);
      return {
        slug: category.slug,
        label: category.navLabel,
        href: routes.category(category.slug),
        fromNet: lowest,
        productCount: productsInCategory(category.slug).length,
      };
    }),
}));

/** Flache Liste aller Kategorien für Footer und Sitemap-Seite. */
export const navCategories: NavCategory[] = navigation.flatMap((group) => group.items);
