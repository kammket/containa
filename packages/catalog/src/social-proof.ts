import type { CaseStudy, Review, Testimonial } from './types.ts';

export const reviews: Review[] = [
  {
    id: 'r-001',
    author: 'Michael K.',
    city: 'Köln',
    rating: 5,
    title: 'Schnelle Lieferung, Container wie beschrieben',
    body: 'Bestellung am Montag, Lieferung am Mittwoch. Der Container war exakt so, wie auf den vorab geschickten Fotos zu sehen – wind- und wasserdicht, Türen laufen leicht. Der Fahrer hat ihn millimetergenau auf die vorbereiteten Betonplatten gesetzt. Kann ich uneingeschränkt empfehlen.',
    date: '2026-06-14',
    productSlug: '20-fuss-seecontainer-gebraucht-blau',
    verified: true,
  },
  {
    id: 'r-002',
    author: 'Sandra B.',
    city: 'Hamburg',
    rating: 5,
    title: 'Beratung hat den Unterschied gemacht',
    body: 'Ich wollte ursprünglich einen Standardcontainer bestellen. Im Telefonat wurde mir erklärt, dass ich für den geplanten Innenausbau besser einen High Cube nehme. Genau richtig – nach der Dämmung kann ich aufrecht stehen. Solche Beratung erlebt man selten.',
    date: '2026-05-28',
    productSlug: '20-fuss-high-cube-one-trip',
    verified: true,
  },
  {
    id: 'r-003',
    author: 'Thomas R.',
    city: 'München',
    rating: 5,
    title: 'Festpreis wurde eingehalten',
    body: 'Bei zwei anderen Anbietern kamen nach der Bestellung noch Zuschläge für die Kranstellung dazu. Hier stand der Preis von Anfang an und blieb auch so. Der Autokran war im Angebot enthalten, weil unser Hof nicht anfahrbar ist. Genau so soll es sein.',
    date: '2026-06-30',
    productSlug: '40-fuss-high-cube-one-trip',
    verified: true,
  },
  {
    id: 'r-004',
    author: 'Jens W.',
    city: 'Berlin',
    rating: 4,
    title: 'Guter Container, Termin verschob sich um zwei Tage',
    body: 'Der Container selbst ist top – neuwertig, saubere Lackierung, keine Beulen. Der Liefertermin musste wegen eines Fahrzeugausfalls um zwei Tage verschoben werden. Wurde aber rechtzeitig kommuniziert und der neue Termin dann pünktlich gehalten. Vier Sterne dafür.',
    date: '2026-04-19',
    productSlug: '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
    verified: true,
  },
  {
    id: 'r-005',
    author: 'Andrea L.',
    city: 'Stuttgart',
    rating: 5,
    title: 'Bürocontainer ist jeden Cent wert',
    body: 'Wir nutzen den Bürocontainer als Baustellenbüro auf wechselnden Standorten. Gut gedämmt, im Winter mit der Heizung schnell warm, die Fenster mit Rollladen sind praktisch. Nach zwei Umsetzungen immer noch dicht. Wir bestellen einen zweiten.',
    date: '2026-03-11',
    productSlug: '20-fuss-buerocontainer-ausgebaut',
    verified: true,
  },
  {
    id: 'r-006',
    author: 'Peter M.',
    city: 'Bonn',
    rating: 5,
    title: 'Am nächsten Tag geliefert',
    body: 'Kurzfristiger Bedarf nach einem Wasserschaden – am Vormittag angerufen, am nächsten Nachmittag stand der Container auf dem Hof. Dass so etwas möglich ist, hätte ich nicht gedacht. Der Schlosskasten wurde direkt mit angeschweißt.',
    date: '2026-07-02',
    productSlug: '10-fuss-seecontainer-gebraucht',
    verified: true,
  },
  {
    id: 'r-007',
    author: 'Christine H.',
    city: 'Münster',
    rating: 5,
    title: 'Kühlcontainer für die Ernte',
    body: 'Wir mieten jedes Jahr zur Ernte einen Kühlcontainer. Das Aggregat läuft zuverlässig, die Temperatur bleibt konstant, und das PTI-Protokoll gibt uns Sicherheit gegenüber unseren Abnehmern. Lieferung und Abholung immer termingerecht.',
    date: '2026-06-08',
    productSlug: '20-fuss-kuehlcontainer-reefer',
    verified: true,
  },
  {
    id: 'r-008',
    author: 'Frank S.',
    city: 'Duisburg',
    rating: 4,
    title: 'Solider Gebrauchtcontainer',
    body: 'Für den Preis genau das, was man erwarten darf: Gebrauchsspuren, ein paar Dellen, aber absolut dicht. Der Boden ist einwandfrei. Wer Neuwertoptik will, muss mehr ausgeben – als Materiallager auf dem Hof völlig ausreichend.',
    date: '2026-05-05',
    productSlug: '40-fuss-seecontainer-gebraucht',
    verified: true,
  },
  {
    id: 'r-009',
    author: 'Markus T.',
    city: 'Leipzig',
    rating: 5,
    title: 'Seitentür spart uns täglich Zeit',
    body: 'Wir lagern Baustoffe und mussten vorher immer alles umschichten. Mit dem Open-Side-Container fährt der Stapler direkt an jede Stelle. Der Aufpreis hat sich in wenigen Monaten über die eingesparte Arbeitszeit gerechnet.',
    date: '2026-04-27',
    productSlug: '20-fuss-seitentuer-container',
    verified: true,
  },
  {
    id: 'r-010',
    author: 'Nicole F.',
    city: 'Frankfurt am Main',
    rating: 5,
    title: 'Rechnung und Papiere korrekt und schnell',
    body: 'Als Buchhalterin achte ich darauf: Rechnung mit korrekt ausgewiesener Mehrwertsteuer, CSC-Dokumentation, Lieferschein – alles vollständig und direkt nach der Lieferung als PDF im Kundenkonto. Angenehm unkompliziert.',
    date: '2026-06-21',
    verified: true,
  },
  {
    id: 'r-011',
    author: 'Wolfgang D.',
    city: 'Dresden',
    rating: 5,
    title: 'Ehrliche Beratung zur Baugenehmigung',
    body: 'Ich wollte einen Wohncontainer im Außenbereich aufstellen. Statt mir einfach etwas zu verkaufen, wurde mir erklärt, dass das genehmigungsrechtlich sehr schwierig wird. Am Ende habe ich einen Lagercontainer genommen. Diese Ehrlichkeit rechne ich hoch an.',
    date: '2026-02-17',
    verified: true,
  },
  {
    id: 'r-012',
    author: 'Ralf E.',
    city: 'Hannover',
    rating: 5,
    title: 'Werkstattcontainer perfekt ausgestattet',
    body: 'Der Starkstromanschluss war genau so dimensioniert, wie besprochen. Werkbank stabil, Beleuchtung hell genug zum Arbeiten. Die Bodenbeschichtung steckt Öl und Späne problemlos weg. Für uns die günstigste Lösung gegenüber einem Hallenanbau.',
    date: '2026-05-16',
    productSlug: '20-fuss-werkstattcontainer',
    verified: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Wir haben inzwischen sieben Container von EMC im Einsatz. Was uns hält, ist die Verlässlichkeit: Der genannte Termin steht, der genannte Preis steht. In unserer Branche ist das keine Selbstverständlichkeit.',
    author: 'Stefan Brenner',
    role: 'Bauleiter',
    company: 'Brenner Hochbau GmbH',
    city: 'Köln',
  },
  {
    quote:
      'Als wir kurzfristig Kühlkapazität brauchten, weil unsere Kammer ausgefallen war, stand innerhalb von 48 Stunden ein Reefer auf dem Hof. Das hat uns die Saison gerettet.',
    author: 'Katrin Vogel',
    role: 'Geschäftsführerin',
    company: 'Vogel Frischelogistik',
    city: 'Münster',
  },
  {
    quote:
      'Der Umbau zum Werkstattcontainer wurde exakt nach unserer Skizze umgesetzt. Nachträge gab es keine – das Angebot war das, was am Ende auf der Rechnung stand.',
    author: 'Dirk Hanselmann',
    role: 'Werkstattleiter',
    company: 'Hanselmann Landtechnik',
    city: 'Hannover',
  },
  {
    quote:
      'Für unsere Messeauftritte brauchen wir Lagerfläche, die genau dann da ist, wenn wir sie brauchen. Miete inklusive Anlieferung und Abholung – so muss das laufen.',
    author: 'Sabine Reuter',
    role: 'Projektleiterin Messebau',
    company: 'Reuter Messe & Event',
    city: 'Düsseldorf',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'baustellenlogistik-koeln-altbausanierung',
    title: 'Baustellenlogistik auf 40 m²: Sanierung eines Kölner Gründerzeithauses',
    client: 'Brenner Hochbau GmbH',
    industry: 'Bauwirtschaft',
    city: 'Köln',
    challenge:
      'Bei der Kernsanierung eines Gründerzeithauses in der Kölner Südstadt stand für die gesamte Baustelleneinrichtung eine Hoffläche von nur 40 m² zur Verfügung. Material, Werkzeug und ein Baustellenbüro mussten dort untergebracht werden – bei einer Zufahrt über eine 3,6 m breite Torfahrt mit 4,0 m lichter Höhe.',
    solution:
      'Wir haben zwei 10-Fuß-Container als Material- und Werkzeuglager sowie einen 20-Fuß-Bürocontainer geliefert. Weil die Torfahrt für den Absetzkipper zu niedrig war, erfolgte die Einbringung per Autokran über das Vorderhaus. Die Container wurden auf Fundamentblöcken aufgestellt, um Höhenunterschiede des Hofpflasters auszugleichen.',
    result:
      'Die Baustelleneinrichtung war an einem Tag komplett. Über die gesamte Bauzeit von 14 Monaten gab es keine Materialdiebstähle – die Schlosskästen haben sich bewährt. Nach Bauende wurden die Container zur nächsten Baustelle umgesetzt.',
    metrics: [
      { label: 'Aufstellzeit', value: '1 Tag' },
      { label: 'Bauzeit begleitet', value: '14 Monate' },
      { label: 'Diebstähle', value: '0' },
      { label: 'Container', value: '3 Einheiten' },
    ],
    image: {
      publicId: 'emc/cases/koeln-baustelle',
      alt: 'Baustelleneinrichtung mit drei Containern in einem Kölner Hinterhof',
      width: 1200,
      height: 800,
    },
    productSlugs: ['10-fuss-seecontainer-gebraucht', '20-fuss-buerocontainer-ausgebaut'],
    seo: {
      title: 'Case Study: Baustellenlogistik auf 40 m² in Köln',
      description:
        'Wie drei Container die komplette Baustelleneinrichtung für eine Kölner Altbausanierung auf 40 m² Hoffläche ermöglichten – inklusive Einbringung per Autokran.',
      focusKeyword: 'Baustellencontainer Köln',
    },
  },
  {
    slug: 'kuehlcontainer-erntesaison-muensterland',
    title: 'Kühlkapazität in 48 Stunden: Erntesaison im Münsterland',
    client: 'Vogel Frischelogistik',
    industry: 'Lebensmittellogistik',
    city: 'Münster',
    challenge:
      'Mitten in der Erntesaison fiel bei einem Frischelogistiker die fest installierte Kühlkammer aus. Rund 40 Tonnen Ware standen im Risiko. Ein Ersatz musste innerhalb von zwei Tagen stehen – mit lückenloser Temperaturdokumentation für die Abnehmer im Lebensmitteleinzelhandel.',
    solution:
      'Wir haben zwei 20-Fuß-Kühlcontainer aus dem Mietbestand disponiert und innerhalb von 44 Stunden angeliefert. Beide Aggregate durchliefen vor Auslieferung eine Pre-Trip-Inspection; die Protokolle wurden direkt übergeben. Ein Elektrofachbetrieb aus unserem Partnernetz stellte die 400-V-Anschlüsse noch am Liefertag her.',
    result:
      'Die Ware wurde vollständig gerettet. Die Container blieben über die gesamte Saison im Einsatz und werden seither jedes Jahr zur Erntespitze angemietet – inzwischen fest eingeplant statt als Notlösung.',
    metrics: [
      { label: 'Reaktionszeit', value: '44 Stunden' },
      { label: 'Gerettete Ware', value: '40 t' },
      { label: 'Temperaturabweichungen', value: 'keine' },
      { label: 'Folgejahre', value: 'seit 2023 jährlich' },
    ],
    image: {
      publicId: 'emc/cases/muensterland-reefer',
      alt: 'Zwei Kühlcontainer auf einem landwirtschaftlichen Betriebsgelände',
      width: 1200,
      height: 800,
    },
    productSlugs: ['20-fuss-kuehlcontainer-reefer'],
    seo: {
      title: 'Case Study: Kühlcontainer in 48 Stunden im Münsterland',
      description:
        'Wie zwei Kühlcontainer innerhalb von 44 Stunden 40 Tonnen Frischware retteten, nachdem die fest installierte Kühlkammer eines Logistikers ausgefallen war.',
      focusKeyword: 'Kühlcontainer mieten',
    },
  },
  {
    slug: 'werkstattcontainer-landtechnik-hannover',
    title: 'Werkstatt statt Hallenanbau: Landtechnikbetrieb bei Hannover',
    client: 'Hanselmann Landtechnik',
    industry: 'Landmaschinentechnik',
    city: 'Hannover',
    challenge:
      'Ein Landtechnikbetrieb brauchte eine zusätzliche Werkstattfläche für die Vorbereitung von Erntemaschinen. Ein Hallenanbau war mit rund 180.000 € kalkuliert und hätte eine Baugenehmigung sowie eine Bauzeit von neun Monaten erfordert – zu lang vor der anstehenden Saison.',
    solution:
      'Wir haben zwei 20-Fuß-Werkstattcontainer nach den Vorgaben des Betriebs ausgebaut: 400-V-Anschluss mit eigener Unterverteilung, Werkbänke mit Schraubstock, Werkzeugwände, LED-Beleuchtung und öl beständige Bodenbeschichtung. Beide Einheiten wurden gekoppelt aufgestellt und über einen überdachten Zwischenbereich verbunden.',
    result:
      'Die Werkstattfläche stand nach elf Wochen zur Verfügung – bei rund einem Fünftel der Investition gegenüber dem Hallenanbau. Da die Container versetzbar sind, bleibt der Betrieb flexibel, falls sich der Standort ändert.',
    metrics: [
      { label: 'Investition', value: 'ca. 20 % des Hallenanbaus' },
      { label: 'Zeit bis Nutzung', value: '11 Wochen' },
      { label: 'Werkstattfläche', value: 'ca. 30 m²' },
      { label: 'Versetzbar', value: 'ja' },
    ],
    image: {
      publicId: 'emc/cases/hannover-werkstatt',
      alt: 'Zwei gekoppelte Werkstattcontainer auf einem Landtechnikbetrieb',
      width: 1200,
      height: 800,
    },
    productSlugs: ['20-fuss-werkstattcontainer'],
    seo: {
      title: 'Case Study: Werkstattcontainer statt Hallenanbau bei Hannover',
      description:
        'Wie ein Landtechnikbetrieb mit zwei Werkstattcontainern in elf Wochen zusätzliche Werkstattfläche schuf – zu rund einem Fünftel der Kosten eines Hallenanbaus.',
      focusKeyword: 'Werkstattcontainer',
    },
  },
];

export const caseStudiesBySlug = new Map(caseStudies.map((c) => [c.slug, c]));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudiesBySlug.get(slug);
}

export function reviewsForProduct(productSlug: string): Review[] {
  return reviews.filter((r) => r.productSlug === productSlug);
}

/** Durchschnittsbewertung eines Produkts, gerundet auf eine Nachkommastelle. */
export function averageRating(productSlug?: string): { value: number; count: number } | null {
  const set = productSlug ? reviewsForProduct(productSlug) : reviews;
  if (set.length === 0) return null;
  const sum = set.reduce((acc, r) => acc + r.rating, 0);
  return { value: Math.round((sum / set.length) * 10) / 10, count: set.length };
}
