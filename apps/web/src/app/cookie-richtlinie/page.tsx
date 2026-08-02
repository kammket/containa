import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { LegalPage } from '@/components/layout/legal-page';
import { LEGAL_UPDATED_AT, cookieSections } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Cookie-Richtlinie – EMC Container',
    description:
      'Cookie-Richtlinie von EMC Container: Übersicht aller technisch notwendigen und einwilligungspflichtigen Cookies, Speicherdauer und wie Sie Ihre Einwilligung widerrufen.',
    focusKeyword: 'Cookies EMC Container',
  },
  path: routes.cookies,
});

export default function Page() {
  return (
    <LegalPage
      title="Cookie-Richtlinie"
      intro="Welche Cookies und lokalen Speicher wir einsetzen – und welche nur mit Ihrer Einwilligung."
      sections={cookieSections}
      path={routes.cookies}
      updatedAt={LEGAL_UPDATED_AT}
    />
  );
}
