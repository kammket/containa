import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { LegalPage } from '@/components/layout/legal-page';
import { LEGAL_UPDATED_AT, imprintSections } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Impressum – EMC Container',
    description:
      'Impressum und Anbieterkennzeichnung der EMC Container GmbH: Anschrift, Geschäftsführung, Handelsregister, USt-IdNr. und Kontaktdaten gemäß § 5 DDG.',
    focusKeyword: 'Impressum',
  },
  path: routes.imprint,
});

export default function Page() {
  return (
    <LegalPage
      title="Impressum"
      intro="Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
      sections={imprintSections}
      path={routes.imprint}
      updatedAt={LEGAL_UPDATED_AT}
    />
  );
}
