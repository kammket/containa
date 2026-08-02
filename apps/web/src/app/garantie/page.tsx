import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ServicePage } from '@/components/layout/service-page';
import { warrantyContent } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Garantie – bis zu 60 Monate auf Wind- und Wasserdichtheit',
    description:
      'Garantieleistungen von EMC Container: bis zu 60 Monate auf Wind- und Wasserdichtheit, gestaffelt nach Zustand. Umfang, Ausschlüsse und wie Sie einen Garantiefall melden.',
    focusKeyword: 'Container Garantie',
  },
  path: routes.warranty,
});

export default function Page() {
  return (
    <ServicePage
      title="Garantie"
      kicker={warrantyContent.kicker}
      intro={warrantyContent.intro}
      sections={warrantyContent.sections}
      faqs={warrantyContent.faqs}
      path={routes.warranty}
    />
  );
}
