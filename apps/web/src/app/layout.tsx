import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

import { brand, routes } from '@emc/catalog';

import { CookieBanner } from '@/components/layout/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Providers } from '@/components/providers';
import { ServiceWorkerCleanup } from '@/components/layout/service-worker-cleanup';
import { jsonLdGraph, localBusinessSchema, organizationSchema, websiteSchema } from '@/lib/schema';
import { withBrand } from '@/lib/seo';

import './globals.css';

/**
 * Schriften werden von next/font zur Bauzeit heruntergeladen und selbst
 * ausgeliefert. Dadurch entfällt jede Verbindung zu Google Fonts – gut für
 * Ladezeit, Datenschutz (DSGVO) und Content-Security-Policy.
 */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700', '800'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: withBrand('Seecontainer kaufen – neu & gebraucht'),
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  authors: [{ name: brand.legalName, url: brand.url }],
  creator: brand.legalName,
  publisher: brand.legalName,
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: true, address: true, email: true },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: routes.rss, title: `${brand.name} Ratgeber` }],
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: brand.name,
    url: brand.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'shopping',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1b2d' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Globales Schema: Organisation, LocalBusiness und Website als ein Graph.
  // Seitenspezifische Knoten (Produkt, Breadcrumb, FAQ) kommen je Seite dazu.
  const globalSchema = jsonLdGraph(organizationSchema(), localBusinessSchema(), websiteSchema());

  return (
    <html lang="de" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <ServiceWorkerCleanup />
        <script
          type="application/ld+json"
          // Nur eigene, serverseitig erzeugte Daten – kein Nutzereingabe-Pfad.
          dangerouslySetInnerHTML={{ __html: globalSchema }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <Providers>
          <Header />
          <main id="hauptinhalt" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
