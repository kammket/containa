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
      <PageHeader title="Overview" description="Orders, inquiries and revenue at a glance." />

      <Content>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Open orders"
            value={orderStats.data ? String(orderStats.data.openOrders) : '–'}
            hint="received, paid or in progress"
          />
          <StatCard
            label="Total orders"
            value={orderStats.data ? String(orderStats.data.totalOrders) : '–'}
            hint={
              orderStats.data ? `${orderStats.data.ordersThisMonth} in diesem Monat` : undefined
            }
          />
          <StatCard
            label="Total revenue"
            value={orderStats.data ? formatPrice(orderStats.data.revenueGross) : '–'}
            hint="gross, excluding cancellations and refunds"
          />
          <StatCard
            label="New inquiries"
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
            <h2 className="font-display text-base font-bold text-navy-950">Latest orders</h2>
            <Link
              href="/admin/bestellungen"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
            >
              View all
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {recentOrders.isLoading ? (
            <LoadingState />
          ) : recentOrders.data && recentOrders.data.items.length > 0 ? (
            <DataTable
              caption="Latest orders"
              head={['Number', 'Date', 'Customer', 'Delivery location', 'Amount', 'Status']}
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
              title="No orders yet"
              description="The first order will appear here as soon as it arrives."
            />
          )}
        </section>

        {/* Offene Anfragen */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy-950">Unhandled inquiries</h2>
            <Link
              href="/admin/anfragen"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-700"
            >
              View all
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {openInquiries.isLoading ? (
            <LoadingState />
          ) : openInquiries.data && openInquiries.data.items.length > 0 ? (
            <DataTable
              caption="Unhandled inquiries"
              head={['Reference', 'Type', 'Date', 'Name', 'Contact']}
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
                    {inquiry.type === 'ANGEBOT' ? 'Quote' : 'Contact'}
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
              title="No open inquiries"
              description="Every inquiry received has been handled."
            />
          )}
        </section>
      </Content>
    </>
  );
}
