import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { LegalPage } from '@/components/layout/legal-page';
import { LEGAL_UPDATED_AT, privacySections } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Datenschutzerklärung – EMC Container',
    description:
      'Datenschutzerklärung von EMC Container: Welche Daten wir verarbeiten, auf welcher Rechtsgrundlage, wie lange wir sie speichern und welche Rechte Sie nach DSGVO haben.',
    focusKeyword: 'Datenschutz',
  },
  path: routes.privacy,
});

export default function Page() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Wie wir personenbezogene Daten verarbeiten – transparent und nach den Vorgaben der DSGVO."
      sections={privacySections}
      path={routes.privacy}
      updatedAt={LEGAL_UPDATED_AT}
    />
  );
}
