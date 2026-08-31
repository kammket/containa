/** Firmenstammdaten – einzige Quelle für Impressum, Footer, Schema.org und E-Mails. */

export const brand = {
  name: 'EMC Container',
  legalName: 'EMC Container GmbH',
  domain: 'emccontainer.com',
  url: 'https://emccontainer.com',
  slogan: 'Seecontainer kaufen – deutschlandweit geliefert',
  claim: 'Neue, gebrauchte und umgebaute Seecontainer direkt vom Fachhändler.',
  description:
    'EMC Container liefert neue, gebrauchte und individuell umgebaute Seecontainer deutschlandweit. 10, 20 und 40 Fuß, High Cube, Büro-, Lager- und Kühlcontainer – mit Festpreis, CSC-Zertifikat und Anlieferung per Kranfahrzeug.',
  foundingYear: 2014,
  locale: 'de-DE',
  language: 'de',
  country: 'DE',
  currency: 'EUR',
  vatRate: 0.19,
} as const;

export const contact = {
  phone: '+49 2661 9572843',
  phoneHref: 'tel:+4926619572843',
  phoneDisplay: '+49 (0) 2661 957 2843',
  mobile: '+49 163 5393159',
  mobileHref: 'tel:+491635393159',
  whatsapp: '+49 163 5393159',
  email: 'contact@emccontainer.com',
  emailHref: 'mailto:contact@emccontainer.com',
  salesEmail: 'vertrieb@emccontainer.com',
  supportEmail: 'service@emccontainer.com',
  fax: '+49 2661 9578849',
} as const;

export const address = {
  street: 'Fürst-Bismarck-Str. 21',
  postalCode: '47119',
  city: 'Duisburg',
  region: 'Nordrhein-Westfalen',
  country: 'Deutschland',
  countryCode: 'DE',
  lat: 51.4556,
  lng: 6.7311,
  /** Google-Maps-Einbettung ohne Tracking-Cookies (Consent-pflichtig, siehe CookieBanner) */
  mapsQuery: 'Fürst-Bismarck-Str.+21,+47119+Duisburg',
} as const;

export const openingHours = [
  { day: 'Montag', short: 'Mo', open: '08:00', close: '17:00', schema: 'Monday' },
  { day: 'Dienstag', short: 'Di', open: '08:00', close: '17:00', schema: 'Tuesday' },
  { day: 'Mittwoch', short: 'Mi', open: '08:00', close: '17:00', schema: 'Wednesday' },
  { day: 'Donnerstag', short: 'Do', open: '08:00', close: '17:00', schema: 'Thursday' },
  { day: 'Freitag', short: 'Fr', open: '08:00', close: '16:00', schema: 'Friday' },
  { day: 'Samstag', short: 'Sa', open: '09:00', close: '13:00', schema: 'Saturday' },
] as const;

export const legal = {
  managingDirector: 'Christoph Bachmann',
  registerCourt: 'Amtsgericht Duisburg',
  registerNumber: 'HRB 35066',
  vatId: 'DE330443785',
  /** Verantwortlich i. S. d. § 18 Abs. 2 MStV */
  contentResponsible: 'Christoph Bachmann, Fürst-Bismarck-Str. 21, 47119 Duisburg',
  dsbEmail: 'datenschutz@emccontainer.com',
  disputeResolution: 'https://ec.europa.eu/consumers/odr/',
} as const;

export const social = {
  facebook: 'https://www.facebook.com/emccontainer',
  instagram: 'https://www.instagram.com/emccontainer',
  linkedin: 'https://www.linkedin.com/company/emccontainer',
  youtube: 'https://www.youtube.com/@emccontainer',
} as const;

export const bank = {
  accountHolder: 'EMC Container GmbH',
  bankName: 'Sparkasse Westerwald-Sieg',
  iban: 'DE89 5735 1030 0000 1234 56',
  bic: 'MALADE51AKI',
} as const;

/** Vertrauenssignale für Startseite, Produktseiten und Checkout. */
export const trustSignals = [
  {
    key: 'lieferung',
    title: 'Deutschlandweite Lieferung',
    text: 'Anlieferung per Kran- oder Absetzfahrzeug in ganz Deutschland – auch auf beengte Grundstücke.',
    icon: 'truck',
  },
  {
    key: 'festpreis',
    title: 'Festpreis ohne Überraschungen',
    text: 'Transparente Preise inklusive Lieferung. Keine versteckten Zuschläge nach Vertragsabschluss.',
    icon: 'euro',
  },
  {
    key: 'zertifiziert',
    title: 'CSC-zertifiziert',
    text: 'Alle Seecontainer mit gültiger CSC-Plakette nach ISO 668 und ISO 6346.',
    icon: 'badge',
  },
  {
    key: 'garantie',
    title: 'Bis zu 60 Monate Garantie',
    text: 'Auf Neucontainer gewähren wir 5 Jahre Garantie auf Wind- und Wasserdichtheit.',
    icon: 'shield',
  },
] as const;

export const paymentMethods = [
  { key: 'sepa', label: 'SEPA-Lastschrift', detail: 'Bequem per Bankeinzug' },
  { key: 'banktransfer', label: 'Vorkasse / Überweisung', detail: '2 % Skonto bei Vorkasse' },
  {
    key: 'invoice',
    label: 'Kauf auf Rechnung',
    detail: 'Für Geschäftskunden nach Bonitätsprüfung',
  },
] as const;

/** Aggregierte Bewertungsdaten für das Organization-Schema. */
export const aggregateRating = {
  ratingValue: 4.8,
  reviewCount: 412,
  bestRating: 5,
  worstRating: 1,
} as const;
