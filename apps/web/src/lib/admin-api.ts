'use client';

/**
 * API-Client für den Adminbereich.
 *
 * Das Access-Token lebt ausschließlich im Speicher dieses Moduls – bewusst
 * nicht in localStorage. Damit ist es für XSS nicht auslesbar. Nach einem
 * Seitenreload wird es über das HttpOnly-Refresh-Cookie neu geholt.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'OWNER' | 'EDITOR';
}

export class AdminApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'AdminApiError';
  }
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function hasAccessToken() {
  return accessToken !== null;
}

/**
 * Holt ein neues Access-Token über das Refresh-Cookie.
 * Parallele Aufrufe teilen sich dieselbe Anfrage, damit bei mehreren
 * gleichzeitigen 401ern nicht mehrfach rotiert wird.
 */
async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) return null;

      const data = (await response.json()) as { accessToken: string };
      accessToken = data.accessToken;
      return data.accessToken;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Bei true wird nach einem 401 nicht erneut versucht (verhindert Schleifen) */
  isRetry?: boolean;
}

export async function adminFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, isRetry, headers, ...rest } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${API_URL}/api/v1${path}`, {
    ...rest,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: isFormData ? (body as FormData) : JSON.stringify(body) } : {}),
  });

  // Abgelaufenes Token: einmalig erneuern und wiederholen.
  if (response.status === 401 && !isRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return adminFetch<T>(path, { ...options, isRetry: true });
    }
    accessToken = null;
    throw new AdminApiError('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.', 401);
  }

  if (!response.ok) {
    let message = `Anfrage fehlgeschlagen (${response.status})`;
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      // Antwort ohne JSON-Body – Standardmeldung bleibt.
    }
    throw new AdminApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

// ── Authentifizierung ───────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new AdminApiError(data.message ?? 'Anmeldung fehlgeschlagen.', response.status);
  }

  const data = (await response.json()) as { accessToken: string; user: AdminUser };
  accessToken = data.accessToken;
  return data.user;
}

export async function adminLogout() {
  accessToken = null;
  await fetch(`${API_URL}/api/v1/auth/logout`, { method: 'POST', credentials: 'include' }).catch(
    () => undefined,
  );
}

/** Stellt die Sitzung nach einem Reload wieder her. */
export async function restoreSession(): Promise<AdminUser | null> {
  const token = await refreshAccessToken();
  if (!token) return null;

  try {
    const me = await adminFetch<{ id: string; email: string; role: AdminUser['role'] }>('/auth/me');
    return { ...me, name: me.email };
  } catch {
    return null;
  }
}

// ── Datentypen ──────────────────────────────────────────────────────────────

export interface Paginated<T> {
  items: T[];
  meta: { page: number; limit: number; total: number; pages: number };
}

export interface AdminProductImage {
  id: string;
  publicId: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface AdminProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  tagline: string;
  priceNet: number;
  compareAtNet: number | null;
  stock: number;
  size: string;
  condition: string;
  availability: string;
  isActive: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  images: AdminProductImage[];
  categories: { category: { slug: string; name: string }; isPrimary: boolean }[];
}

export interface AdminOrderItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  priceNet: number;
  lineNet: number;
}

export interface AdminAddress {
  firstName: string;
  lastName: string;
  company: string | null;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  email: string;
  customerType: string;
  vatId: string | null;
  status: string;
  subtotalNet: number;
  discountNet: number;
  shippingNet: number;
  vatAmount: number;
  totalGross: number;
  deliveryNotes: string | null;
  carrier: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  items: AdminOrderItem[];
  billingAddress: AdminAddress | null;
  shippingAddress: AdminAddress | null;
  payments?: { method: string; status: string; amount: number }[];
  events?: { status: string; label: string; description: string; createdAt: string }[];
}

export interface AdminInquiry {
  id: string;
  reference: string;
  type: 'KONTAKT' | 'ANGEBOT';
  status: 'NEU' | 'IN_BEARBEITUNG' | 'BEANTWORTET' | 'GESCHLOSSEN';
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  customerType: string | null;
  productSlug: string | null;
  size: string | null;
  condition: string | null;
  quantity: number | null;
  postalCode: string | null;
  deliveryDate: string | null;
  usage: string | null;
  internalNote: string | null;
  createdAt: string;
}

// ── Endpunkte ───────────────────────────────────────────────────────────────

export const adminApi = {
  products: {
    list: (params: Record<string, string | number | undefined> = {}) =>
      adminFetch<Paginated<AdminProduct>>(`/admin/products?${toQuery(params)}`),
    get: (id: string) => adminFetch<AdminProduct>(`/admin/products/${id}`),
    create: (body: unknown) =>
      adminFetch<AdminProduct>('/admin/products', { method: 'POST', body }),
    update: (id: string, body: unknown) =>
      adminFetch<AdminProduct>(`/admin/products/${id}`, { method: 'PATCH', body }),
    activate: (id: string) =>
      adminFetch<AdminProduct>(`/admin/products/${id}/activate`, { method: 'PATCH' }),
    deactivate: (id: string) =>
      adminFetch<AdminProduct>(`/admin/products/${id}/deactivate`, { method: 'PATCH' }),
    uploadImage: (id: string, file: File, alt: string) => {
      const form = new FormData();
      form.append('file', file);
      form.append('alt', alt);
      return adminFetch<AdminProductImage>(`/admin/products/${id}/images`, {
        method: 'POST',
        body: form,
      });
    },
    deleteImage: (imageId: string) =>
      adminFetch<{ deleted: boolean }>(`/admin/products/images/${imageId}`, { method: 'DELETE' }),
    reorderImages: (id: string, imageIds: string[]) =>
      adminFetch<AdminProductImage[]>(`/admin/products/${id}/images/order`, {
        method: 'PATCH',
        body: { imageIds },
      }),
  },

  orders: {
    list: (params: Record<string, string | number | undefined> = {}) =>
      adminFetch<Paginated<AdminOrder>>(`/admin/orders?${toQuery(params)}`),
    get: (orderNumber: string) => adminFetch<AdminOrder>(`/admin/orders/${orderNumber}`),
    stats: () =>
      adminFetch<{
        totalOrders: number;
        openOrders: number;
        ordersThisMonth: number;
        revenueGross: number;
      }>('/admin/orders/stats'),
    updateStatus: (orderNumber: string, body: unknown) =>
      adminFetch<AdminOrder>(`/admin/orders/${orderNumber}/status`, { method: 'PATCH', body }),
    markPaid: (orderNumber: string, note?: string) =>
      adminFetch<AdminOrder>(`/admin/payments/${orderNumber}/mark-paid`, {
        method: 'POST',
        body: { note },
      }),
    invoice: (orderNumber: string) =>
      adminFetch<{ invoiceNumber: string }>(`/admin/orders/${orderNumber}/invoice`),
  },

  inquiries: {
    list: (params: Record<string, string | number | undefined> = {}) =>
      adminFetch<Paginated<AdminInquiry>>(`/admin/inquiries?${toQuery(params)}`),
    get: (id: string) => adminFetch<AdminInquiry>(`/admin/inquiries/${id}`),
    stats: () =>
      adminFetch<{ newContact: number; newQuote: number; newTotal: number; total: number }>(
        '/admin/inquiries/stats',
      ),
    update: (id: string, body: unknown) =>
      adminFetch<AdminInquiry>(`/admin/inquiries/${id}`, { method: 'PATCH', body }),
  },
};

function toQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  return search.toString();
}
