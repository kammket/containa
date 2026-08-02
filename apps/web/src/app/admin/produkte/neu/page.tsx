'use client';

import { Content, PageHeader } from '@/components/admin/ui';
import { ProductForm } from '@/components/admin/product-form';

export default function NewProductPage() {
  return (
    <>
      <PageHeader
        title="New product"
        description="Create the master data. You can upload images after saving."
      />
      <Content>
        <ProductForm />
      </Content>
    </>
  );
}
