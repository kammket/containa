import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin, Wrench } from 'lucide-react';

import {
  blogPostsByDate,
  citiesByPopulation,
  routes,
  topFaqs,
  trustSignals,
} from '@emc/catalog';

import { CategoryGrid } from '@/components/home/category-grid';
import { DeliveryChecker } from '@/components/home/delivery-checker';
import { Hero } from '@/components/home/hero';
import { ProcessSteps } from '@/components/home/process-steps';
import { SizeComparison } from '@/components/home/size-comparison';
import { Testimonials } from '@/components/home/testimonials';
import { ProductCard } from '@/components/commerce/product-card';
import { BlogCard } from '@/components/blog/blog-card';
import { JsonLd } from '@/components/layout/json-ld';
import { Section, SectionHeading } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getBestsellers, getFeaturedProducts } from '@/lib/live-catalog';
import { faqSchema, jsonLdGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  seo: {
    title: 'Seecontainer kaufen – neu & gebraucht ab 1.416 €',
    description:
      'Seecontainer kaufen bei EMC Container: 10, 20, 40 und 45 Fuß, neu, One-Trip und gebraucht. CSC-zertifiziert, Festpreis inkl. Lieferung, deutschlandweite Anlieferung.',
    focusKeyword: 'Seecontainer kaufen',
    secondaryKeywords: [
      'Container kaufen Deutschland',
      'Schiffscontainer kaufen',
      'Lagercontainer kaufen',
      'Container mit Lieferung',
    ],
  },
  path: '/',
});

const useCases = [
  {
    icon: Building2,
    title: 'Gewerbe & Handwerk',
    text: 'Material-, Werkzeug- und Ersatzteillager direkt auf dem Betriebshof – günstiger als jede angemietete Hallenfläche.',
    href: routes.category('lagercontainer'),
    linkLabel: 'Lagercontainer ansehen',
  },
  {
    icon: Wrench,
    title: 'Umbau nach Maß',
    text: 'Werkstatt, Sanitärbereich, Garage mit Rolltor oder Verkaufsstand – gefertigt in unserer eigenen Werkstatt zum Festpreis.',
    href: routes.modifications,
    linkLabel: 'Umbauten entdecken',
  },
  {
    icon: MapPin,
    title: 'Baustelle & Projekt',
    text: 'Büro-, Material- und Sanitärcontainer termingerecht auf die Baustelle – auch in enge Innenstadthöfe per Autokran.',
    href: routes.category('buerocontainer'),
    linkLabel: 'Bürocontainer ansehen',
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(4);
  const popular = await getBestsellers(4);
  const posts = blogPostsByDate.slice(0, 3);
  const topCities = citiesByPopulation.slice(0, 12);

  return (
    <>
      <JsonLd data={jsonLdGraph(faqSchema(topFaqs))} />

      <Hero />

      {/* Vertrauenssignale */}
      <section className="border-b border-stone-200 bg-stone-50">
        <ul className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <li key={signal.key}>
              <h2 className="font-display text-sm font-bold text-navy-900">{signal.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{signal.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Sortiment"
          title="Container für jeden Einsatzzweck"
          description="Von der kompakten 10-Fuß-Box bis zum ausgebauten Wohncontainer – 15 Kategorien, über 25 Modelle, alle mit gültiger CSC-Plakette."
          link={{ href: routes.shop, label: 'Alle Kategorien' }}
        />
        <CategoryGrid />
      </Section>

      <Section tone="stone">
        <SectionHeading
          eyebrow="Empfehlungen"
          title="Meistgekaufte Container"
          description="Diese Modelle liefern wir am häufigsten aus – gute Verfügbarkeit und kurze Lieferzeiten."
          link={{ href: routes.shop, label: 'Zum Shop' }}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index === 0} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Orientierung"
              title="Welche Größe brauche ich?"
              description="Die Balken sind maßstabsgetreu – so sehen Sie das Längenverhältnis auf einen Blick."
            />
            <SizeComparison />
          </div>
          <div className="lg:pt-24">
            <DeliveryChecker />
            <div className="mt-5 rounded-2xl bg-navy-950 p-6 text-white">
              <h3 className="font-display text-base font-bold">Unsicher bei der Auswahl?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Schildern Sie uns kurz Ihr Vorhaben. Wir sagen Ihnen ehrlich, welcher Container
                passt – und wann sich ein günstigerer lohnt.
              </p>
              <Button asChild variant="primary" className="mt-5 w-full">
                <Link href={routes.quote}>
                  Kostenlose Beratung anfordern
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="stone">
        <SectionHeading
          eyebrow="Anwendungen"
          title="Wofür unsere Kunden Container nutzen"
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-card"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-navy-100 text-navy-800">
                <useCase.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{useCase.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{useCase.text}</p>
              <Link
                href={useCase.href}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
              >
                {useCase.linkLabel}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Ablauf"
          title="Von der Auswahl bis zur Aufstellung"
          description="Vier Schritte, klare Zuständigkeiten und ein Festpreis, der bis zur Anlieferung hält."
        />
        <ProcessSteps />
      </Section>

      <Section tone="stone">
        <SectionHeading
          eyebrow="Neu im Sortiment"
          title="Aktuelle Empfehlungen"
          link={{ href: routes.shop, label: 'Alle Container' }}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Kundenstimmen" title="Was unsere Kunden sagen" align="center" />
        <Testimonials />
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href={routes.reviews}>
              Alle Bewertungen lesen
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Standorte für lokale Suchintention */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Deutschlandweit"
          title="Wir liefern in Ihre Region"
          description="Von Hamburg bis München: Anlieferung per Absetzkipper oder Kranfahrzeug, auf Wunsch inklusive Genehmigung für die Aufstellfläche."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topCities.map((city) => (
            <li key={city.slug}>
              <Link
                href={routes.city(city.slug)}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <span>
                  <span className="block text-sm font-semibold text-white">{city.name}</span>
                  <span className="block text-xs text-white/50">
                    Lieferung in {city.deliveryDays[0]}–{city.deliveryDays[1]} Werktagen
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-400"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-white/25 bg-white/10 text-white hover:bg-white/15"
          >
            <Link href={routes.cities}>Alle Standorte ansehen</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Ratgeber"
          title="Wissen rund um den Container"
          description="Kaufberatung, Preisentwicklung, Genehmigungen und Praxistipps – aus über zehn Jahren Erfahrung."
          link={{ href: routes.blog, label: 'Alle Beiträge' }}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section tone="stone">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Weitere Antworten finden Sie in unserem{' '}
              <Link
                href={routes.faq}
                className="font-semibold text-navy-800 underline underline-offset-2"
              >
                vollständigen FAQ-Bereich
              </Link>
              . Wenn etwas offenbleibt, rufen Sie uns an – wir beraten kostenlos.
            </p>
            <Button asChild variant="secondary" className="mt-6">
              <Link href={routes.contact}>Frage stellen</Link>
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {topFaqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Abschluss-CTA */}
      <section className="bg-accent-600">
        <div className="container-page flex flex-col items-start gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Angebot in einem Werktag – kostenlos und unverbindlich
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-white/85">
              Nennen Sie uns Größe, Zustand und Lieferort. Sie erhalten ein verbindliches
              Festpreisangebot inklusive Anlieferung – ohne Nachträge.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-accent-700 hover:bg-white/90 hover:text-accent-800"
            >
              <Link href={routes.quote}>Angebot anfordern</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              <Link href={routes.contact}>Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
