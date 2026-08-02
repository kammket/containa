import type { Metadata } from 'next';

import { routes } from '@emc/catalog';

import { ServicePage } from '@/components/layout/service-page';
import { installationContent } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Container aufstellen – Fundament, Unterbau & Stapeln',
    description:
      'Container richtig aufstellen: Warum kein Betonfundament nötig ist, welche Unterbauten taugen, wie Sie waagerecht ausrichten und was beim Stapeln zu beachten ist.',
    focusKeyword: 'Container aufstellen',
  },
  path: routes.installation,
});

export default function Page() {
  return (
    <ServicePage
      title="Aufstellung & Fundament"
      kicker={installationContent.kicker}
      intro={installationContent.intro}
      sections={installationContent.sections}
      faqs={installationContent.faqs}
      path={routes.installation}
    />
  );
}
