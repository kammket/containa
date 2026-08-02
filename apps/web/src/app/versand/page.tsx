import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ServicePage } from '@/components/layout/service-page';
import { shippingContent } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Versandkosten – Lieferpauschale nach PLZ-Zone',
    description:
      'Versandkosten für Container: Lieferpauschale nach PLZ-Zone und Containerlänge, versandkostenfrei ab 9.500 € netto, Staffelpreise bei mehreren Einheiten.',
    focusKeyword: 'Container Versandkosten',
  },
  path: routes.shipping,
});

export default function Page() {
  return (
    <ServicePage
      title="Versandkosten"
      kicker={shippingContent.kicker}
      intro={shippingContent.intro}
      sections={shippingContent.sections}
      faqs={shippingContent.faqs}
      path={routes.shipping}
    />
  );
}
