'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Plus, Search } from 'lucide-react';
import { useState } from 'react';

import { formatPrice, grossFromNet } from '@emc/catalog';

import {
  Content,
  DataTable,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
} from '@/components/admin/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminApi, type AdminProduct } from '@/lib/admin-api';
import { cn } from '@/lib/utils';

const sizeLabels: Record<string, string> = {
  '8ft': '8 ft',
  '10ft': '10 ft',
  '20ft': '20 ft',
  '40ft': '40 ft',
  '45ft': '45 ft',
  sonder: 'Accessories',
};

const conditionLabels: Record<string, string> = {
  NEU: 'New',
  ONE_TRIP: 'One-Trip',
  GENERALUEBERHOLT: 'Refurbished',
  GEBRAUCHT: 'Used',
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: ['admin', 'products', search],
    queryFn: () => adminApi.products.list({ search: search || undefined, limit: 100 }),
  });

  const toggleActive = useMutation({
    mutationFn: (product: AdminProduct) =>
      product.isActive
        ? adminApi.products.deactivate(product.id)
        : adminApi.products.activate(product.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'products'] }),
  });

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage master data, prices, stock and images."
        actions={
          <Button asChild size="sm">
            <Link href="/admin/produkte/neu">
              <Plus aria-hidden />
              New product
            </Link>
          </Button>
        }
      />

      <Content>
        <div className="relative mb-5 max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400"
            aria-hidden
          />
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <Input
            id="product-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, SKU or tagline …"
            className="pl-10"
          />
        </div>

        {products.isLoading ? (
          <LoadingState label="Loading products …" />
        ) : products.isError ? (
          <ErrorState
            message="The products could not be loaded."
            onRetry={() => void products.refetch()}
          />
        ) : products.data && products.data.items.length > 0 ? (
          <>
            <p className="mb-3 text-sm text-stone-500">
              {products.data.meta.total} {products.data.meta.total === 1 ? 'product' : 'products'}
            </p>

            <DataTable
              caption="List of products"
              head={['', 'Product', 'Size', 'Condition', 'Price (gross)', 'Stock', 'Status', '']}
            >
              {products.data.items.map((product) => (
                <tr
                  key={product.id}
                  className={cn('hover:bg-stone-50', !product.isActive && 'opacity-60')}
                >
                  <td className="py-2 pl-4">
                    <span className="relative block size-11 overflow-hidden rounded-lg bg-stone-100">
                      {product.images[0]?.url && (
                        <Image
                          src={product.images[0].url}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/produkte/${product.id}`}
                      className="font-semibold text-navy-900 hover:text-accent-700"
                    >
                      {product.name}
                    </Link>
                    <span className="mt-0.5 block text-xs text-stone-500">{product.sku}</span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {sizeLabels[product.size] ?? product.size}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {conditionLabels[product.condition] ?? product.condition}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-navy-900">
                    {formatPrice(grossFromNet(product.priceNet))}
                    <span className="block text-2xs font-normal text-stone-400">
                      {formatPrice(product.priceNet)} net
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        'font-medium',
                        product.stock === 0 ? 'text-danger-600' : 'text-navy-900',
                      )}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-2xs font-bold',
                        product.isActive
                          ? 'bg-success-50 text-success-700'
                          : 'bg-stone-100 text-stone-500',
                      )}
                    >
                      <span>{product.isActive ? 'Visible' : 'Ausgeblendet'}</span>
                    </span>
                  </td>

                  <td className="py-3 pr-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => toggleActive.mutate(product)}
                      disabled={toggleActive.isPending}
                      title={product.isActive ? 'Im Shop ausblenden' : 'Im Shop anzeigen'}
                      aria-label={product.isActive ? 'Im Shop ausblenden' : 'Im Shop anzeigen'}
                      className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-navy-800 disabled:opacity-50"
                    >
                      {product.isActive ? (
                        <EyeOff className="size-4" aria-hidden />
                      ) : (
                        <Eye className="size-4" aria-hidden />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </DataTable>
          </>
        ) : (
          <EmptyState
            title={search ? 'No matches' : 'No products yet'}
            description={
              search
                ? `Zu „${search}" wurde nichts gefunden. Versuchen Sie einen anderen Begriff.`
                : 'Create your first product, or import the catalogue with the seed.'
            }
            action={
              !search && (
                <Button asChild>
                  <Link href="/admin/produkte/neu">
                    <Plus aria-hidden />
                    New product
                  </Link>
                </Button>
              )
            }
          />
        )}
      </Content>
    </>
  );
}
