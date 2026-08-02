import type { Metadata } from 'next';
import Link from 'next/link';

import { breadcrumbs, faqCategories, faqs, faqsByCategory, routes } from '@emc/catalog';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/layout/json-ld';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { breadcrumbSchema, faqSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { slugify } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Häufige Fragen zu Seecontainern – FAQ',
    description:
      'Antworten auf die häufigsten Fragen zu Seecontainern: Größenwahl, Lieferung, Fundament, Kondenswasser, Baugenehmigung, Zahlung und Garantie. Über 25 Fragen beantwortet.',
    focusKeyword: 'Container FAQ',
    secondaryKeywords: ['Seecontainer Fragen', 'Container Baugenehmigung', 'Container Lieferung'],
  },
  path: routes.faq,
});

export default function FaqPage() {
  const crumbs = breadcrumbs({ name: 'Häufige Fragen', href: routes.faq });

  return (
    <>
      {/* Alle FAQs im Schema – Google kann daraus Rich Results erzeugen */}
      <JsonLd data={jsonLdGraph(faqSchema(faqs), breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Häufige Fragen
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            {faqs.length} Antworten aus der täglichen Beratungspraxis – von der Größenwahl über die
            Anlieferung bis zur Baugenehmigung. Ist Ihre Frage nicht dabei, rufen Sie uns an.
          </p>

          <nav aria-label="Themenbereiche" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {faqCategories.map((category) => (
                <li key={category.slug}>
                  <a
                    href={`#${slugify(category.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                  >
                    {category.name}
                    <span className="text-xs text-stone-400">
                      {faqsByCategory(category.slug).length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-14">
          <div className="min-w-0 space-y-12">
            {faqCategories.map((category) => {
              const items = faqsByCategory(category.slug);
              if (items.length === 0) return null;

              return (
                <section key={category.slug} id={slugify(category.name)} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-bold text-navy-950">{category.name}</h2>
                  <Accordion type="single" collapsible className="mt-5 space-y-3">
                    {items.map((faq, index) => (
                      <AccordionItem key={faq.question} value={`${category.slug}-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h2 className="font-display text-base font-bold">Frage nicht beantwortet?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Schildern Sie uns Ihr Vorhaben – wir antworten mit einem Festpreis und sagen Ihnen
                auch, wenn eine günstigere Lösung besser passt.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={routes.quote}>Angebot anfordern</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-3 w-full border-white/25 bg-white/10 text-white hover:bg-white/15"
              >
                <Link href={routes.contact}>Nachricht schreiben</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
