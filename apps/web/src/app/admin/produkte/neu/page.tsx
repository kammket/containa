'use client';

import { Content, PageHeader } from '@/components/admin/ui';
import { ProductForm } from '@/components/admin/product-form';

export default function NewProductPage() {
  return (
    <>
      <PageHeader
        title="Neues Produkt"
        description="Stammdaten anlegen. Bilder können Sie nach dem Speichern hochladen."
      />
      <Content>
        <ProductForm />
      </Content>
    </>
  );
}
