import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { CartView } from '@/components/cart/cart-view';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata(
  'Warenkorb',
  'Ihr Warenkorb bei EMC Container. Lieferkosten nach Postleitzahl berechnen und zur Kasse gehen.',
  routes.cart,
);

export default function CartPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">Warenkorb</h1>
      <CartView />
    </div>
  );
}
