'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

import { routes } from '@emc/catalog';

import { Content, ErrorState, LoadingState, PageHeader } from '@/components/admin/ui';
import { ImageManager } from '@/components/admin/image-manager';
import { ProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { adminApi } from '@/lib/admin-api';

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const product = useQuery({
    queryKey: ['admin', 'product', id],
    queryFn: () => adminApi.products.get(id),
    enabled: Boolean(id),
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
        description={`Artikelnummer ${product.data.sku}`}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href={routes.product(product.data.slug)} target="_blank" rel="noopener">
              Im Shop ansehen
              <ExternalLink aria-hidden />
            </Link>
          </Button>
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
    </>
  );
}
