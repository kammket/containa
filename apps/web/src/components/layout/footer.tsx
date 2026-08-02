import Link from 'next/link';
import { Clock, FileText, Mail, MapPin } from 'lucide-react';

import {
  address,
  brand,
  categories,
  citiesByPopulation,
  contact,
  landingPages,
  legal,
  paymentMethods,
  routes,
  social,
} from '@emc/catalog';

import { Logo } from './logo';
import { NewsletterForm } from './newsletter-form';

const serviceLinks = [
  { href: routes.delivery, label: 'Lieferung & Anlieferung' },
  { href: routes.installation, label: 'Aufstellung & Fundament' },
  { href: routes.modifications, label: 'Container Umbau' },
  { href: routes.financing, label: 'Finanzierung' },
  { href: routes.quote, label: 'Angebot anfordern' },
  { href: routes.trackOrder, label: 'Sendungsverfolgung' },
  { href: routes.downloads, label: 'Downloads' },
];

const companyLinks = [
  { href: routes.about, label: 'Über uns' },
  { href: routes.contact, label: 'Kontakt' },
  { href: routes.caseStudies, label: 'Referenzen' },
  { href: routes.reviews, label: 'Kundenbewertungen' },
  { href: routes.gallery, label: 'Galerie' },
  { href: routes.blog, label: 'Ratgeber' },
  { href: routes.careers, label: 'Karriere' },
  { href: routes.faq, label: 'Häufige Fragen' },
];

const legalLinks = [
  { href: routes.imprint, label: 'Impressum' },
  { href: routes.privacy, label: 'Datenschutz' },
  { href: routes.terms, label: 'AGB' },
  { href: routes.returns, label: 'Widerrufsrecht' },
  { href: routes.warranty, label: 'Garantie' },
  { href: routes.shipping, label: 'Versandkosten' },
  { href: routes.cookies, label: 'Cookie-Richtlinie' },
  { href: routes.sitemapPage, label: 'Sitemap' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-navy-950 text-white/70">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-page flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-xl font-bold text-white">
              Preisupdates und Ratgeber per E-Mail
            </h2>
            <p className="mt-1.5 text-sm">
              Einmal im Monat: aktuelle Containerpreise, neue Angebote und praktische Tipps rund um
              Lagerung, Umbau und Anlieferung. Jederzeit abbestellbar.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Hauptbereich */}
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {brand.claim} Seit {brand.foundingYear} beliefern wir Gewerbe, Handwerk, Landwirtschaft
            und Privatkunden in ganz Deutschland – zum Festpreis inklusive Anlieferung.
          </p>

          <address className="mt-6 space-y-2.5 text-sm not-italic">
            <Link
              href={routes.quote}
              className="flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-accent-400"
            >
              <FileText className="size-4 shrink-0 text-accent-500" aria-hidden />
              Angebot anfordern
            </Link>
            <a
              href={contact.emailHref}
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Mail className="size-4 shrink-0 text-accent-500" aria-hidden />
              {contact.email}
            </a>
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-500" aria-hidden />
              <span>
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </span>
            </span>
            <span className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent-500" aria-hidden />
              <span>
                Mo–Do 8–17 Uhr, Fr 8–16 Uhr
                <br />
                Sa 9–13 Uhr
              </span>
            </span>
          </address>

          <div className="mt-6 flex gap-2">
            {Object.entries(social).map(([name, href]) => (
              <a
                key={name}
                href={href}
                rel="noopener noreferrer me"
                target="_blank"
                className="inline-flex size-9 items-center justify-center rounded-lg bg-white/8 text-xs font-bold text-white/70 uppercase transition-colors hover:bg-white/15 hover:text-white"
                aria-label={`${brand.name} auf ${name}`}
              >
                {name.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Container" className="lg:col-span-2">
          {categories.slice(0, 9).map((category) => (
            <FooterLink key={category.slug} href={routes.category(category.slug)}>
              {category.navLabel}
            </FooterLink>
          ))}
          <FooterLink href={routes.shop}>Alle Container</FooterLink>
        </FooterColumn>

        <FooterColumn title="Service" className="lg:col-span-2">
          {serviceLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Unternehmen" className="lg:col-span-2">
          {companyLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Rechtliches" className="lg:col-span-2">
          {legalLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      {/* Städte- und Themenlinks für interne Verlinkung */}
      <div className="border-t border-white/10">
        <div className="container-page space-y-5 py-8">
          <div>
            <p className="mb-2.5 text-xs font-bold tracking-wider text-white/40 uppercase">
              Seecontainer kaufen in Ihrer Stadt
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {citiesByPopulation.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={routes.city(city.slug)}
                    className="text-xs text-white/50 transition-colors hover:text-white"
                  >
                    Container {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.cities}
                  className="text-xs font-semibold text-accent-400 transition-colors hover:text-accent-300"
                >
                  Alle Standorte →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-bold tracking-wider text-white/40 uppercase">
              Beliebte Themen
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {landingPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={routes.landing(page.slug)}
                    className="text-xs text-white/50 transition-colors hover:text-white"
                  >
                    {page.seo.focusKeyword}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Zahlungsarten und Copyright */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-white/40">Zahlungsarten:</span>
            {paymentMethods.map((method) => (
              <span
                key={method.key}
                title={method.detail}
                className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-2xs font-semibold text-white/70"
              >
                {method.label}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/40">
            © {year} {brand.legalName} · USt-IdNr. {legal.vatId} · Alle Preise inkl. gesetzlicher
            MwSt.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h3 className="mb-3.5 font-display text-sm font-bold text-white">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
