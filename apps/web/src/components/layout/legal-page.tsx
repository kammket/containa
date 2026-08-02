import Link from 'next/link';

import { breadcrumbs, type BreadcrumbItem } from '@emc/catalog';

import { Breadcrumbs } from './breadcrumbs';
import { JsonLd } from './json-ld';
import { breadcrumbSchema, jsonLdGraph } from '@/lib/schema';
import { formatDate, slugify } from '@/lib/utils';

export interface LegalSection {
  heading: string;
  /** Absätze; Strings mit führendem "- " werden als Listenpunkt gerendert. */
  body: string[];
}

interface LegalPageProps {
  title: string;
  intro?: string;
  sections: LegalSection[];
  path: string;
  /** Datum der letzten inhaltlichen Änderung (ISO) */
  updatedAt: string;
  breadcrumbLabel?: string;
}

/**
 * Einheitliches Layout für Rechtstexte mit Sprungmarken-Navigation.
 * Die Inhalte liegen in `content/legal.ts`, damit Text und Darstellung
 * getrennt bleiben.
 */
export function LegalPage({
  title,
  intro,
  sections,
  path,
  updatedAt,
  breadcrumbLabel,
}: LegalPageProps) {
  const crumbs: BreadcrumbItem[] = breadcrumbs({ name: breadcrumbLabel ?? title, href: path });

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-stone-200 bg-stone-50 pt-6 pb-10">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">{intro}</p>
          )}
          <p className="mt-4 text-sm text-stone-500">
            Stand: <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-14">
          <div className="max-w-3xl min-w-0">
            {sections.map((section) => (
              <section
                key={section.heading}
                className="mb-9 scroll-mt-28"
                id={slugify(section.heading)}
              >
                <h2 className="font-display text-xl font-bold text-navy-950">{section.heading}</h2>
                <div className="mt-3 space-y-3">{renderBody(section.body)}</div>
              </section>
            ))}
          </div>

          {sections.length > 3 && (
            <nav aria-labelledby="legal-toc" className="lg:sticky lg:top-28 lg:self-start">
              <h2
                id="legal-toc"
                className="text-xs font-bold tracking-wider text-stone-400 uppercase"
              >
                Inhalt
              </h2>
              <ol className="mt-3 space-y-1.5">
                {sections.map((section, index) => (
                  <li key={section.heading}>
                    <Link
                      href={`#${slugify(section.heading)}`}
                      className="block text-sm leading-snug text-stone-600 transition-colors hover:text-navy-900"
                    >
                      <span className="text-stone-400">{index + 1}.</span> {section.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

/** Gruppiert aufeinanderfolgende "- "-Zeilen zu einer Liste. */
function renderBody(body: string[]) {
  const output: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (bullets.length === 0) return;
    output.push(
      <ul key={`ul-${key}`} className="space-y-1.5 pl-1">
        {bullets.map((item) => (
          <li
            key={item.slice(0, 30)}
            className="flex gap-2.5 text-sm leading-relaxed text-stone-700"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-stone-300" aria-hidden />
            {item}
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  body.forEach((paragraph, index) => {
    if (paragraph.startsWith('- ')) {
      bullets.push(paragraph.slice(2));
      return;
    }
    flush(String(index));
    output.push(
      <p key={index} className="prose-de text-sm leading-relaxed text-stone-700">
        {paragraph}
      </p>,
    );
  });

  flush('end');
  return output;
}
