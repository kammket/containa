'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { formatPrice, grossFromNet } from '@emc/catalog';

import {
  ConfirmDialog,
  Content,
  DataTable,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
} from '@/components/admin/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminApiError, adminApi, type AdminProduct } from '@/lib/admin-api';
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
  /** Produkt, für das die Löschabfrage offen ist. */
  const [pendingDelete, setPendingDelete] = useState<AdminProduct | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
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

  const remove = useMutation({
    mutationFn: (product: AdminProduct) => adminApi.products.remove(product.id),
    onSuccess: () => {
      setPendingDelete(null);
      setDeleteError(null);
      void queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
    // Der häufigste Fehlschlag ist eine fehlende Berechtigung (nur OWNER darf
    // löschen). Die Abfrage bleibt offen und zeigt die Meldung der API.
    onError: (caught) =>
      setDeleteError(
        caught instanceof AdminApiError ? caught.message : 'The product could not be deleted.',
      ),
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
                      <span>{product.isActive ? 'Visible' : 'Hidden'}</span>
                    </span>
                  </td>

                  <td className="py-3 pr-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => toggleActive.mutate(product)}
                      disabled={toggleActive.isPending}
                      title={product.isActive ? 'Hide in shop' : 'Show in shop'}
                      aria-label={product.isActive ? 'Hide in shop' : 'Show in shop'}
                      className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-navy-800 disabled:opacity-50"
                    >
                      {product.isActive ? (
                        <EyeOff className="size-4" aria-hidden />
                      ) : (
                        <Eye className="size-4" aria-hidden />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDeleteError(null);
                        setPendingDelete(product);
                      }}
                      disabled={remove.isPending}
                      title="Delete permanently"
                      aria-label={`Delete ${product.name} permanently`}
                      className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-danger-50 hover:text-danger-600 disabled:opacity-50"
                    >
                      <Trash2 className="size-4" aria-hidden />
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
                ? `Nothing matched “${search}”. Try a different term.`
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

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDelete(null);
            setDeleteError(null);
          }
        }}
        title="Delete product permanently?"
        description={
          <>
            <strong className="font-semibold text-navy-900">{pendingDelete?.name}</strong> and all
            of its images will be removed for good. This cannot be undone.
          </>
        }
        details={
          <ul className="space-y-1 text-sm text-stone-600">
            <li>· {pendingDelete?.images.length ?? 0} image(s) will be deleted</li>
            <li>· Past orders keep their record and stay readable</li>
            <li>· To take it off the shop temporarily, cancel and use the eye icon instead</li>
          </ul>
        }
        confirmLabel="Delete product"
        pending={remove.isPending}
        error={deleteError}
        onConfirm={() => pendingDelete && remove.mutate(pendingDelete)}
      />
    </>
  );
}
