import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { LegalPage } from '@/components/layout/legal-page';
import { LEGAL_UPDATED_AT, withdrawalSections } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Widerrufsrecht & Rückgabe – EMC Container',
    description:
      'Widerrufsbelehrung von EMC Container: 14 Tage Widerrufsrecht für Verbraucher, Folgen des Widerrufs, Rücksendekosten bei Speditionsware und Muster-Widerrufsformular.',
    focusKeyword: 'Widerrufsrecht Container',
  },
  path: routes.returns,
});

export default function Page() {
  return (
    <LegalPage
      title="Widerrufsbelehrung"
      intro="Ihr gesetzliches Widerrufsrecht als Verbraucher – inklusive Muster-Widerrufsformular."
      sections={withdrawalSections}
      path={routes.returns}
      updatedAt={LEGAL_UPDATED_AT}
    />
  );
}
