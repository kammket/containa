import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ServicePage } from '@/components/layout/service-page';
import { deliveryContent } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Container-Lieferung – Ablauf, Zufahrt & Kosten',
    description:
      'So läuft die Container-Anlieferung ab: erforderliche Zufahrtsmaße, Ablauf am Liefertag, wann ein Autokran nötig ist und was die Lieferung in Ihrer Region kostet.',
    focusKeyword: 'Container Lieferung',
  },
  path: routes.delivery,
});

export default function Page() {
  return (
    <ServicePage
      title="Lieferung & Anlieferung"
      kicker={deliveryContent.kicker}
      intro={deliveryContent.intro}
      sections={deliveryContent.sections}
      faqs={deliveryContent.faqs}
      stats={deliveryContent.stats}
      path={routes.delivery}
    />
  );
}
