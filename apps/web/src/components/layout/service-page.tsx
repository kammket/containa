import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';

import { breadcrumbs, contact, routes } from '@emc/catalog';

import { Breadcrumbs } from './breadcrumbs';
import { JsonLd } from './json-ld';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { breadcrumbSchema, faqSchema, jsonLdGraph } from '@/lib/schema';
import { slugify } from '@/lib/utils';

export interface ServiceSection {
  heading: string;
  body: string[];
  /** Optionale Checkliste unter dem Fließtext */
  checklist?: string[];
  /** Optionale Tabelle */
  table?: { head: string[]; rows: string[][] };
}

interface ServicePageProps {
  title: string;
  kicker: string;
  intro: string[];
  sections: ServiceSection[];
  faqs?: { question: string; answer: string }[];
  path: string;
  /** Kennzahlen im Kopfbereich */
  stats?: { value: string; label: string }[];
  cta?: { title: string; text: string; href: string; label: string };
}

/**
 * Einheitliches Layout für Serviceseiten (Lieferung, Aufstellung, Umbau,
 * Finanzierung …). Struktur folgt der Suchintention: Kernaussage zuerst,
 * dann Details, dann Fragen.
 */
export function ServicePage({
  title,
  kicker,
  intro,
  sections,
  faqs = [],
  path,
  stats,
  cta,
}: ServicePageProps) {
  const crumbs = breadcrumbs({ name: title, href: path });

  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), ...(faqs.length > 0 ? [faqSchema(faqs)] : []))}
      />

      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} inverted />

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-accent-500" aria-hidden />
            {kicker}
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-5 max-w-2xl space-y-3">
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-white/75">
                {paragraph}
              </p>
            ))}
          </div>

          {stats && stats.length > 0 && (
            <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <dd className="font-display text-2xl font-extrabold text-white">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-white/60">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
          <div className="max-w-3xl min-w-0 space-y-10">
            {sections.map((section) => (
              <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-navy-950">{section.heading}</h2>

                <div className="prose-de mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-base leading-relaxed text-stone-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.checklist && (
                  <ul className="mt-5 space-y-2.5 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                    {section.checklist.map((item) => (
                      <li
                        key={item.slice(0, 30)}
                        className="flex gap-2.5 text-sm leading-relaxed text-stone-700"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-success-600" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="mt-5 overflow-x-auto rounded-xl border border-stone-200">
                    <table className="w-full text-sm">
                      <caption className="sr-only">{section.heading}</caption>
                      <thead className="bg-stone-50">
                        <tr>
                          {section.table.head.map((heading) => (
                            <th
                              key={heading}
                              scope="col"
                              className="px-4 py-3 text-left font-bold whitespace-nowrap text-navy-900"
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="even:bg-stone-50/50">
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className={
                                  cellIndex === 0
                                    ? 'px-4 py-3 font-medium text-navy-900'
                                    : 'px-4 py-3 text-stone-700'
                                }
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {sections.length > 3 && (
              <nav
                aria-labelledby="service-toc"
                className="rounded-2xl border border-stone-200 p-5"
              >
                <h2
                  id="service-toc"
                  className="text-xs font-bold tracking-wider text-stone-400 uppercase"
                >
                  Inhalt
                </h2>
                <ol className="mt-3 space-y-1.5">
                  {sections.map((section) => (
                    <li key={section.heading}>
                      <Link
                        href={`#${slugify(section.heading)}`}
                        className="block text-sm leading-snug text-stone-600 transition-colors hover:text-navy-900"
                      >
                        {section.heading}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h2 className="font-display text-base font-bold">{cta?.title ?? 'Fragen dazu?'}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                {cta?.text ??
                  'Wir beraten kostenlos – auch zu Zufahrt, Genehmigung und Alternativen.'}
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={cta?.href ?? routes.quote}>
                  {cta?.label ?? 'Angebot anfordern'}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-3 w-full border-white/25 bg-white/10 text-white hover:bg-white/15"
              >
                <a href={contact.phoneHref}>
                  <Phone aria-hidden />
                  Anrufen
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </div>

      {faqs.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 py-14">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <h2 className="font-display text-2xl font-bold text-navy-950">Häufige Fragen</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
    </>
  );
}
