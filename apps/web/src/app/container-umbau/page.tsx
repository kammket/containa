import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ServicePage } from '@/components/layout/service-page';
import { modificationsContent } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Container Umbau – Werkstatt, Büro & Sonderbau nach Maß',
    description:
      'Container umbauen lassen: Fenster, Dämmung, Elektrik, Sanitär, Rolltore und Vollausbau. Eigene Werkstatt, Festpreis ohne Nachträge, Fertigung in 3 bis 6 Wochen.',
    focusKeyword: 'Container Umbau',
  },
  path: routes.modifications,
});

export default function Page() {
  return (
    <ServicePage
      title="Container Umbau nach Maß"
      kicker={modificationsContent.kicker}
      intro={modificationsContent.intro}
      sections={modificationsContent.sections}
      faqs={modificationsContent.faqs}
      stats={modificationsContent.stats}
      path={routes.modifications}
    />
  );
}
