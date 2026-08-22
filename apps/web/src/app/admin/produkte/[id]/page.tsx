'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ExternalLink, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { routes } from '@emc/catalog';

import {
  ConfirmDialog,
  Content,
  ErrorState,
  LoadingState,
  PageHeader,
} from '@/components/admin/ui';
import { ImageManager } from '@/components/admin/image-manager';
import { ProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { AdminApiError, adminApi } from '@/lib/admin-api';

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const product = useQuery({
    queryKey: ['admin', 'product', id],
    queryFn: () => adminApi.products.get(id),
    enabled: Boolean(id),
  });

  const remove = useMutation({
    mutationFn: () => adminApi.products.remove(id),
    onSuccess: () => {
      setConfirmOpen(false);
      // Diese Detailseite gibt es nicht mehr – zurück zur Liste, die neu
      // geladen werden muss. Die Abfrage des gelöschten Produkts wird bewusst
      // *nicht* aus dem Cache entfernt: Sie ist noch aktiv, und ein Verwerfen
      // löste sofort ein erneutes Laden aus, das mit 404 fehlschlägt. Beim
      // Verlassen der Seite räumt React Query sie von selbst ab.
      void queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      router.push('/admin/produkte');
    },
    onError: (caught) =>
      setDeleteError(
        caught instanceof AdminApiError ? caught.message : 'The product could not be deleted.',
      ),
  });

  if (product.isLoading) {
    return (
      <>
        <PageHeader title="Edit product" />
        <Content>
          <LoadingState />
        </Content>
      </>
    );
  }

  if (product.isError || !product.data) {
    return (
      <>
        <PageHeader title="Edit product" />
        <Content>
          <ErrorState
            message="This product could not be loaded."
            onRetry={() => void product.refetch()}
          />
        </Content>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={product.data.name}
        description={`Item number ${product.data.sku}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link href={routes.product(product.data.slug)} target="_blank" rel="noopener">
                View in shop
                <ExternalLink aria-hidden />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDeleteError(null);
                setConfirmOpen(true);
              }}
              className="border-danger-600/30 text-danger-700 hover:border-danger-600/50 hover:bg-danger-50"
            >
              <Trash2 aria-hidden />
              Delete
            </Button>
          </>
        }
      />
      <Content>
        <div className="space-y-5">
          <ImageManager
            productId={product.data.id}
            productName={product.data.name}
            images={product.data.images}
          />
          <ProductForm product={product.data} />
        </div>
      </Content>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          setConfirmOpen(open);
          if (!open) setDeleteError(null);
        }}
        title="Delete product permanently?"
        description={
          <>
            <strong className="font-semibold text-navy-900">{product.data.name}</strong> and all of
            its images will be removed for good. This cannot be undone.
          </>
        }
        details={
          <ul className="space-y-1 text-sm text-stone-600">
            <li>· {product.data.images.length} image(s) will be deleted</li>
            <li>· Past orders keep their record and stay readable</li>
            <li>· To take it off the shop temporarily, hide it in the product list instead</li>
          </ul>
        }
        confirmLabel="Delete product"
        pending={remove.isPending}
        error={deleteError}
        onConfirm={() => remove.mutate()}
      />
    </>
  );
}
