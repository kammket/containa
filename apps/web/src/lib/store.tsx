'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { FREE_DELIVERY_THRESHOLD_NET, quoteDelivery } from '@emc/catalog';

import type { CartSnapshot } from './cart-snapshot';

/**
 * Warenkorb und Merkzettel als Client-Store mit localStorage-Persistenz.
 *
 * Der Warenkorb speichert eine **Momentaufnahme** der benötigten Produktfelder
 * statt einer Referenz in den Katalog. Zwei Gründe:
 *
 * 1. Das Client-Bundle bleibt klein – ohne Snapshot müsste der gesamte
 *    Produktkatalog auf jeder Seite geladen werden, nur damit der Warenkorb
 *    Namen und Preise anzeigen kann.
 * 2. Es entspricht der üblichen Shop-Praxis: Preise werden beim Hinzufügen
 *    festgehalten und beim Checkout serverseitig erneut geprüft. Die API ist
 *    die maßgebliche Instanz für den Endpreis – der Client rechnet nur vor.
 */

const CART_KEY = 'emc.cart.v2';
const WISHLIST_KEY = 'emc.wishlist.v1';
const PLZ_KEY = 'emc.plz.v1';

export type { CartSnapshot };

export interface CartLine extends CartSnapshot {
  quantity: number;
  lineNet: number;
}

export interface CartTotals {
  itemCount: number;
  subtotalNet: number;
  deliveryNet: number | null;
  deliveryFree: boolean;
  freeDeliveryRemainingNet: number;
  totalNet: number | null;
}

interface StoredLine extends CartSnapshot {
  quantity: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  postalCode: string;
  /** true, sobald localStorage gelesen wurde – vermeidet Hydration-Flackern */
  ready: boolean;
  addToCart: (snapshot: CartSnapshot, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  setPostalCode: (plz: string) => void;
  totals: CartTotals;
}

const StoreContext = createContext<StoreState | null>(null);

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Speicher voll oder Privatmodus – der Warenkorb gilt dann nur für die Sitzung.
  }
}

/** Verwirft fehlerhafte Einträge aus dem Speicher, statt beim Rendern zu scheitern. */
function isValidLine(line: unknown): line is StoredLine {
  if (typeof line !== 'object' || line === null) return false;
  const l = line as Record<string, unknown>;
  return (
    typeof l.slug === 'string' &&
    typeof l.name === 'string' &&
    typeof l.priceNet === 'number' &&
    Number.isFinite(l.priceNet) &&
    typeof l.quantity === 'number' &&
    l.quantity > 0
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StoredLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [postalCode, setPostalCodeState] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readJson<unknown[]>(CART_KEY, []).filter(isValidLine));
    setWishlist(readJson<string[]>(WISHLIST_KEY, []).filter((s) => typeof s === 'string'));
    setPostalCodeState(readJson<string>(PLZ_KEY, ''));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeJson(CART_KEY, lines);
  }, [lines, ready]);

  useEffect(() => {
    if (ready) writeJson(WISHLIST_KEY, wishlist);
  }, [wishlist, ready]);

  useEffect(() => {
    if (ready) writeJson(PLZ_KEY, postalCode);
  }, [postalCode, ready]);

  const addToCart = useCallback((snapshot: CartSnapshot, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.slug === snapshot.slug);
      if (existing) {
        return prev.map((line) =>
          line.slug === snapshot.slug
            ? { ...snapshot, quantity: Math.min(line.quantity + quantity, 99) }
            : line,
        );
      }
      return [...prev, { ...snapshot, quantity: Math.min(quantity, 99) }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setLines((prev) => prev.filter((line) => line.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.slug !== slug)
        : prev.map((line) =>
            line.slug === slug ? { ...line, quantity: Math.min(quantity, 99) } : line,
          ),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isWishlisted = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const setPostalCode = useCallback((plz: string) => {
    setPostalCodeState(plz.replace(/\D/g, '').slice(0, 5));
  }, []);

  const cart = useMemo<CartLine[]>(
    () =>
      lines.map((line) => {
        const lineNet = line.priceNet * line.quantity;
        return { ...line, lineNet };
      }),
    [lines],
  );

  const totals = useMemo<CartTotals>(() => {
    const subtotalNet = cart.reduce((sum, line) => sum + line.lineNet, 0);
    const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

    // Lieferkosten: Der längste Container bestimmt das Fahrzeug. Jede weitere
    // Einheit wird mit 60 % der Grundpauschale angesetzt, da sie in derselben
    // Tour mitgeliefert wird. Zubehör fährt kostenfrei mit.
    let deliveryNet: number | null = null;
    let deliveryFree = false;

    if (/^\d{5}$/.test(postalCode) && cart.length > 0) {
      const maxLength = Math.max(...cart.map((line) => line.lengthMeters));
      const primary = quoteDelivery(postalCode, maxLength, subtotalNet);
      if (primary) {
        deliveryFree = primary.free;
        const containerCount = cart
          .filter((line) => line.size !== 'sonder')
          .reduce((sum, line) => sum + line.quantity, 0);
        const extraUnits = Math.max(0, containerCount - 1);
        deliveryNet = primary.free
          ? 0
          : primary.priceNet + Math.round(primary.priceNet * 0.6) * extraUnits;
      }
    }

    const totalNet = deliveryNet !== null ? subtotalNet + deliveryNet : null;

    return {
      itemCount,
      subtotalNet,
      deliveryNet,
      deliveryFree,
      freeDeliveryRemainingNet: Math.max(0, FREE_DELIVERY_THRESHOLD_NET - subtotalNet),
      totalNet,
    };
  }, [cart, postalCode]);

  const value = useMemo<StoreState>(
    () => ({
      cart,
      wishlist,
      postalCode,
      ready,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
      setPostalCode,
      totals,
    }),
    [
      cart,
      wishlist,
      postalCode,
      ready,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
      setPostalCode,
      totals,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore muss innerhalb von <StoreProvider> verwendet werden');
  return context;
}
