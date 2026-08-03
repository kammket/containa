import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ProductCard } from '@/components/commerce/product-card';
import { WishlistView } from '@/components/commerce/wishlist-view';
import { getProducts } from '@/lib/live-catalog';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata(
  'Merkzettel',
  'Ihre gemerkten Container bei EMC Container.',
  routes.wishlist,
);

export default async function WishlistPage() {
  const products = await getProducts();

  // Alle Karten serverseitig rendern; der Client blendet nur die gemerkten ein.
  const cards = Object.fromEntries(
    products.map((product) => [product.slug, <ProductCard key={product.slug} product={product} />]),
  );

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">Merkzettel</h1>
      <p className="mt-2 text-base text-stone-600">
        Container, die Sie sich für später gemerkt haben. Der Merkzettel wird lokal in Ihrem Browser
        gespeichert.
      </p>
      <WishlistView cards={cards} />
    </div>
  );
}
