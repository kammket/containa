import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ServicePage } from '@/components/layout/service-page';
import { financingContent } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Container finanzieren – ab 4,9 % effektiv, ohne Anzahlung',
    description:
      'Container finanzieren oder leasen: Laufzeiten von 12 bis 60 Monaten, ab 4,9 % effektiver Jahreszins, keine Anzahlung. Online-Antrag in wenigen Minuten.',
    focusKeyword: 'Container finanzieren',
  },
  path: routes.financing,
});

export default function Page() {
  return (
    <ServicePage
      title="Finanzierung & Leasing"
      kicker={financingContent.kicker}
      intro={financingContent.intro}
      sections={financingContent.sections}
      faqs={financingContent.faqs}
      stats={financingContent.stats}
      path={routes.financing}
    />
  );
}
