'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';

import { formatPrice } from '@emc/catalog';

import {
  Content,
  DataTable,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  StatusBadge,
  statusLabels,
} from '@/components/admin/ui';
import { Input } from '@/components/ui/input';
import { adminApi } from '@/lib/admin-api';
import { cn, formatDateShort } from '@/lib/utils';

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'EINGEGANGEN', label: 'Received' },
  { value: 'BEZAHLT', label: 'Paid' },
  { value: 'IN_BEARBEITUNG', label: 'In progress' },
  { value: 'IN_ZUSTELLUNG', label: 'Out for delivery' },
  { value: 'GELIEFERT', label: 'Delivered' },
  { value: 'STORNIERT', label: 'Cancelled' },
];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const orders = useQuery({
    queryKey: ['admin', 'orders', status, search],
    queryFn: () =>
      adminApi.orders.list({
        status: status || undefined,
        search: search || undefined,
        limit: 50,
      }),
  });

  return (
    <>
      <PageHeader
        title="Orders"
        description="Review incoming orders and keep their status up to date."
      />

      <Content>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400"
              aria-hidden
            />
            <label htmlFor="order-search" className="sr-only">
              Search orders
            </label>
            <Input
              id="order-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Order number, email, name or company …"
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatus(filter.value)}
                aria-pressed={status === filter.value}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  status === filter.value
                    ? 'bg-navy-900 text-white'
                    : 'border border-stone-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-stone-50',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {orders.isLoading ? (
          <LoadingState label="Loading orders …" />
        ) : orders.isError ? (
          <ErrorState
            message="The orders could not be loaded."
            onRetry={() => void orders.refetch()}
          />
        ) : orders.data && orders.data.items.length > 0 ? (
          <>
            <p className="mb-3 text-sm text-stone-500">
              {orders.data.meta.total} {orders.data.meta.total === 1 ? 'order' : 'orders'}
              {status && ` with status “${statusLabels[status] ?? status}”`}
            </p>

            <DataTable
              caption="List of orders"
              head={[
                'Number',
                'Date',
                'Customer',
                'Delivery location',
                'Line items',
                'Amount',
                'Status',
              ]}
            >
              {orders.data.items.map((order) => (
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
                  <td className="px-4 py-3">
                    <span className="block text-navy-900">
                      {order.billingAddress
                        ? order.billingAddress.company ||
                          `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
                        : '–'}
                    </span>
                    <span className="block text-xs text-stone-500">{order.email}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {order.shippingAddress
                      ? `${order.shippingAddress.postalCode} ${order.shippingAddress.city}`
                      : '–'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
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
          </>
        ) : (
          <EmptyState
            title={search || status ? 'No matches' : 'No orders yet'}
            description={
              search || status
                ? 'Adjust your search or status filter.'
                : 'The first order will appear here as soon as it arrives.'
            }
          />
        )}
      </Content>
    </>
  );
}
