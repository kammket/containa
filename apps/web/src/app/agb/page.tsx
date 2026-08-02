import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { LegalPage } from '@/components/layout/legal-page';
import { LEGAL_UPDATED_AT, termsSections } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'AGB – Allgemeine Geschäftsbedingungen',
    description:
      'Allgemeine Geschäftsbedingungen der EMC Container GmbH: Vertragsschluss, Preise, Lieferbedingungen, Eigentumsvorbehalt, Gewährleistung und Garantie.',
    focusKeyword: 'AGB Container kaufen',
  },
  path: routes.terms,
});

export default function Page() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      intro="Die Bedingungen für Bestellung, Lieferung, Zahlung und Gewährleistung bei EMC Container."
      sections={termsSections}
      path={routes.terms}
      updatedAt={LEGAL_UPDATED_AT}
    />
  );
}
