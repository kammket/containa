'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { formatPrice } from '@emc/catalog';

import {
  Content,
  DataTable,
  EmptyState,
  LoadingState,
  PageHeader,
  StatCard,
  StatusBadge,
} from '@/components/admin/ui';
import { adminApi } from '@/lib/admin-api';
import { formatDateShort } from '@/lib/utils';

export default function AdminDashboard() {
  const orderStats = useQuery({
    queryKey: ['admin', 'orders', 'stats'],
    queryFn: adminApi.orders.stats,
  });
  const inquiryStats = useQuery({
    queryKey: ['admin', 'inquiries', 'stats'],
    queryFn: adminApi.inquiries.stats,
  });
  const recentOrders = useQuery({
    queryKey: ['admin', 'orders', 'recent'],
    queryFn: () => adminApi.orders.list({ limit: 8 }),
  });
  const openInquiries = useQuery({
    queryKey: ['admin', 'inquiries', 'open'],
    queryFn: () => adminApi.inquiries.list({ status: 'NEU', limit: 5 }),
  });

  return (
    <>
      <PageHeader
        title="Übersicht"
        description="Bestellungen, Anfragen und Umsatz auf einen Blick."
      />

      <Content>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Offene Bestellungen"
            value={orderStats.data ? String(orderStats.data.openOrders) : '–'}
            hint="eingegangen, bezahlt oder in Bearbeitung"
          />
          <StatCard
            label="Bestellungen gesamt"
            value={orderStats.data ? String(orderStats.data.totalOrders) : '–'}
            hint={
              orderStats.data ? `${orderStats.data.ordersThisMonth} in diesem Monat` : undefined
            }
          />
          <StatCard
            label="Umsatz gesamt"
            value={orderStats.data ? formatPrice(orderStats.data.revenueGross) : '–'}
            hint="brutto, ohne Stornos und Erstattungen"
          />
          <StatCard
            label="Neue Anfragen"
            value={inquiryStats.data ? String(inquiryStats.data.newTotal) : '–'}
            hint={
              inquiryStats.data
                ? `${inquiryStats.data.newQuote} Angebote · ${inquiryStats.data.newContact} Kontakt`
                : undefined
            }
          />
        </div>

        {/* Neueste Bestellungen */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy-950">Neueste Bestellungen</h2>
            <Link
              href="/admin/bestellungen"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
            >
              Alle ansehen
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {recentOrders.isLoading ? (
            <LoadingState />
          ) : recentOrders.data && recentOrders.data.items.length > 0 ? (
            <DataTable
              caption="Neueste Bestellungen"
              head={['Nummer', 'Datum', 'Kunde', 'Lieferort', 'Betrag', 'Status']}
            >
              {recentOrders.data.items.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`/admin/bestellungen/${order.orderNumber}`}
                      className="font-semibold text-navy-900 hover:text-accent-700"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {formatDateShort(order.createdAt.slice(0, 10))}
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {order.billingAddress
                      ? order.billingAddress.company ||
                        `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
                      : order.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {order.shippingAddress?.postalCode} {order.shippingAddress?.city}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-navy-900">
                    {formatPrice(order.totalGross)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </DataTable>
          ) : (
            <EmptyState
              title="Noch keine Bestellungen"
              description="Sobald die erste Bestellung eingeht, erscheint sie hier."
            />
          )}
        </section>

        {/* Offene Anfragen */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy-950">
              Unbearbeitete Anfragen
            </h2>
            <Link
              href="/admin/anfragen"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
            >
              Alle ansehen
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {openInquiries.isLoading ? (
            <LoadingState />
          ) : openInquiries.data && openInquiries.data.items.length > 0 ? (
            <DataTable
              caption="Unbearbeitete Anfragen"
              head={['Referenz', 'Art', 'Datum', 'Name', 'Kontakt']}
            >
              {openInquiries.data.items.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`/admin/anfragen/${inquiry.id}`}
                      className="font-semibold text-navy-900 hover:text-accent-700"
                    >
                      {inquiry.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {inquiry.type === 'ANGEBOT' ? 'Angebot' : 'Kontakt'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {formatDateShort(inquiry.createdAt.slice(0, 10))}
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {inquiry.company ? `${inquiry.name} · ${inquiry.company}` : inquiry.name}
                  </td>
                  <td className="px-4 py-3 text-stone-600">{inquiry.email}</td>
                </tr>
              ))}
            </DataTable>
          ) : (
            <EmptyState
              title="Keine offenen Anfragen"
              description="Alle eingegangenen Anfragen sind bearbeitet."
            />
          )}
        </section>
      </Content>
    </>
  );
}
