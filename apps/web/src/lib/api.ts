/**
 * Client für die NestJS-API.
 *
 * Die Storefront ist bewusst so gebaut, dass sie ohne laufende API vollständig
 * benutzbar bleibt: Katalog, Preise und Inhalte kommen aus `@emc/catalog` und
 * werden statisch gerendert. Die API liefert die dynamischen Teile – Bestellungen,
 * Kontaktanfragen, Angebotsanfragen und Sendungsverfolgung.
 *
 * Der Shop arbeitet ohne Kundenkonten: Es gibt keine Registrierung und keinen
 * Login. Bestellungen laufen als Gast-Checkout; den Status rufen Kundinnen und
 * Kunden über Bestellnummer und E-Mail-Adresse ab.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Bricht die Anfrage nach n Millisekunden ab */
  timeoutMs?: number;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, timeoutMs = 15_000, headers, ...rest } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...rest,
      signal: controller.signal,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      let details: unknown;
      try {
        details = await response.json();
      } catch {
        details = await response.text();
      }
      const message =
        typeof details === 'object' && details !== null && 'message' in details
          ? String((details as { message: unknown }).message)
          : `Anfrage fehlgeschlagen (${response.status})`;
      throw new ApiError(message, response.status, details);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

// ── Formulare ───────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  postalCode: string;
}

export function sendContactRequest(payload: ContactPayload) {
  return apiFetch<{ id: string }>('/api/v1/contact', { method: 'POST', body: payload });
}

export interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  customerType: 'privat' | 'gewerblich';
  productSlug?: string;
  size: string;
  condition: string;
  quantity: number;
  postalCode: string;
  deliveryDate?: string;
  usage?: string;
  message?: string;
}

export function requestQuote(payload: QuotePayload) {
  return apiFetch<{ id: string; reference: string }>('/api/v1/quotes', {
    method: 'POST',
    body: payload,
  });
}

export function subscribeNewsletter(email: string) {
  return apiFetch<{ status: string }>('/api/v1/newsletter', {
    method: 'POST',
    body: { email },
  });
}

// ── Bestellungen ────────────────────────────────────────────────────────────

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
}

export interface CheckoutPayload {
  email: string;
  customerType: 'privat' | 'gewerblich';
  vatId?: string;
  billingAddress: CheckoutAddress;
  shippingAddress: CheckoutAddress;
  shippingSameAsBilling: boolean;
  items: { sku: string; slug: string; quantity: number }[];
  paymentMethod: string;
  couponCode?: string;
  deliveryNotes?: string;
  acceptsTerms: boolean;
  acceptsWithdrawal: boolean;
}

export interface OrderResponse {
  orderNumber: string;
  status: string;
  totalGross: number;
}

export function createOrder(payload: CheckoutPayload) {
  return apiFetch<OrderResponse>('/api/v1/orders', { method: 'POST', body: payload });
}

export interface CouponResult {
  code: string;
  valid: boolean;
  type: 'percent' | 'fixed';
  value: number;
  message: string;
}

export function validateCoupon(code: string, subtotalNet: number) {
  return apiFetch<CouponResult>('/api/v1/coupons/validate', {
    method: 'POST',
    body: { code, subtotalNet },
  });
}

export interface TrackingResult {
  orderNumber: string;
  status: string;
  statusLabel: string;
  placedAt: string;
  estimatedDelivery?: string;
  carrier?: string;
  events: { at: string; label: string; description: string }[];
}

export function trackOrder(orderNumber: string, email: string) {
  return apiFetch<TrackingResult>(
    `/api/v1/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`,
  );
}

/**
 * Live-Bestand für Produktseiten. Schlägt der Abruf fehl, liefert die Funktion
 * `null` und die Seite zeigt weiterhin den statisch gerenderten Bestand aus dem
 * Katalog – die Seite bleibt in jedem Fall funktionsfähig.
 */
export async function fetchLiveStock(slugs: string[]): Promise<Record<string, number> | null> {
  try {
    return await apiFetch<Record<string, number>>(
      `/api/v1/products/stock?slugs=${encodeURIComponent(slugs.join(','))}`,
      { timeoutMs: 3_000 },
    );
  } catch {
    return null;
  }
}
