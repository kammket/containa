/**
 * @emc/catalog – zentrale Datenquelle für Storefront, API und Seed.
 *
 * Die Storefront generiert daraus statische Seiten (maximale Performance und
 * SEO), die API seedet daraus ihre Datenbank. So bleibt genau eine Quelle der
 * Wahrheit für Produkte, Kategorien, Inhalte und SEO-Metadaten.
 */

export * from './types.ts';
export * from './brand.ts';
export * from './pricing.ts';
export * from './specs.ts';
export * from './categories.ts';
export * from './navigation.ts';
export * from './products.ts';
export * from './cities.ts';
export * from './landing-pages.ts';
export * from './blog.ts';
export * from './faqs.ts';
export * from './social-proof.ts';
export * from './routes.ts';
export * from './search.ts';
