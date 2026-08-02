import { buildSpecRows, floorings, materials, specsFrom } from './specs.ts';
import type { Product, ProductFaq, SizeSlug } from './types.ts';

/**
 * Produktdefinition ohne abgeleitete Felder. `specRows` wird automatisch aus
 * `specs` erzeugt; zusätzliche Zeilen können über `extraSpecRows` ergänzt werden.
 */
type ProductInput = Omit<Product, 'specRows' | 'downloads'> & {
  extraSpecRows?: Product['specRows'];
  downloads?: Product['downloads'];
};

/** Standard-Downloads, die auf jeder Produktseite angeboten werden. */
const standardDownloads: Product['downloads'] = [
  {
    label: 'Maßblatt & technische Zeichnung',
    description: 'Bemaßte Ansichten und Schnitte als PDF für Ihre Planung.',
    href: '/downloads/emc-massblatt-seecontainer.pdf',
    type: 'pdf',
    sizeLabel: '480 KB',
  },
  {
    label: 'Checkliste Stellplatz & Anlieferung',
    description: 'Zufahrt, Untergrund und Kranstellung vorab prüfen.',
    href: '/downloads/emc-checkliste-anlieferung.pdf',
    type: 'pdf',
    sizeLabel: '260 KB',
  },
  {
    label: 'Garantiebedingungen',
    description: 'Umfang und Laufzeit unserer Garantieleistungen.',
    href: '/downloads/emc-garantiebedingungen.pdf',
    type: 'pdf',
    sizeLabel: '180 KB',
  },
];

/** FAQs, die für alle Container gelten und je Produkt ergänzt werden. */
const commonFaqs: ProductFaq[] = [
  {
    question: 'Wie läuft die Anlieferung ab?',
    answer:
      'Nach Zahlungseingang stimmen wir telefonisch einen Liefertermin mit Ihnen ab. Die Anlieferung erfolgt per Absetzkipper oder Kranfahrzeug. Der Fahrer setzt den Container an der gewünschten Position ab – Sie müssen lediglich eine tragfähige, möglichst ebene Fläche und eine freie Zufahrt bereitstellen.',
  },
  {
    question: 'Benötige ich ein Fundament?',
    answer:
      'Nein. Der Container trägt sein Gewicht über die vier Eckbeschläge. Vier tragfähige Punktauflager – etwa Betonplatten von 40 × 40 cm oder Fundamentblöcke – genügen. Wichtig ist, dass der Container waagerecht steht, damit die Türen sauber schließen.',
  },
  {
    question: 'Welche Zahlungsarten akzeptieren Sie?',
    answer:
      'Vorkasse per Überweisung, SEPA-Lastschrift und – für Geschäftskunden nach Bonitätsprüfung – Kauf auf Rechnung. Bei Vorkasse gewähren wir 2 % Skonto.',
  },
];

function defineProduct(input: ProductInput): Product {
  const { extraSpecRows, downloads, ...rest } = input;
  return {
    ...rest,
    specRows: buildSpecRows(rest.specs, extraSpecRows ?? []),
    downloads: downloads ?? standardDownloads,
    faqs: [...rest.faqs, ...commonFaqs],
  };
}

/** Erzeugt einen Bildersatz mit konsistenten Alt-Texten. */
function gallery(base: string, name: string, views: string[]): Product['images'] {
  const labels: Record<string, string> = {
    front: 'Frontansicht mit geschlossenen Türen',
    open: 'geöffnete Doppelflügeltüren mit Blick in den Innenraum',
    side: 'Seitenansicht',
    interior: 'Innenraum mit Sperrholzboden',
    corner: 'Detailansicht Eckbeschlag und Verriegelung',
    door: 'Detailansicht Türdichtung und Verriegelungsstangen',
    csc: 'CSC-Plakette an der Türhälfte',
    delivery: 'Anlieferung per Kranfahrzeug',
  };
  return views.map((view) => ({
    publicId: `emc/products/${base}-${view}`,
    alt: `${name} – ${labels[view] ?? view}`,
    width: 1200,
    height: 900,
  }));
}

export const products: Product[] = [
  // ─────────────────────────────────────────────────────────────── 20 Fuß ──
  defineProduct({
    id: 'p-20-std-used-blau',
    slug: '20-fuss-seecontainer-gebraucht-blau',
    sku: 'EMC-20DC-U-5010',
    name: '20 Fuß Seecontainer gebraucht – Enzianblau',
    tagline:
      'Geprüft wind- und wasserdicht, sofort verfügbar. Der Klassiker für trockenen Stauraum.',
    description: [
      'Dieser 20-Fuß-Standardcontainer hat seinen Dienst im Seeverkehr hinter sich und startet nun sein zweites Leben als Lagerraum. Er ist im Lichttest geprüft, die Türdichtungen schließen umlaufend, die Verriegelungsstangen laufen leichtgängig und der Sperrholzboden ist voll tragfähig.',
      'Gebrauchsspuren gehören dazu: Kratzer, kleinere Dellen im Wellblech, Farbunterschiede durch werkseitige Ausbesserungen und Flugrost an Kanten. Auf Funktion und Dichtheit hat das keinen Einfluss – dafür zahlen Sie deutlich weniger als für einen neuwertigen Container.',
      'Mit 33 m³ Volumen und knapp 15 m² Stellfläche ist dies das meistgenutzte Format in Deutschland. Er fasst rund zehn Europaletten in einer Lage und trägt bis zu 28 Tonnen – mehr, als die meisten Anwendungen je ausreizen.',
    ],
    highlights: [
      'Im Lichttest geprüft: wind- und wasserdicht',
      '33,2 m³ Stauraum auf nur 14,8 m² Stellfläche',
      'Gültige CSC-Plakette nach ISO 6346',
      'Sofort ab Lager – Lieferung in 3–5 Werktagen',
      'Türdichtungen und Verriegelung überprüft',
    ],
    categorySlugs: ['20-fuss-container', 'gebrauchte-container', 'lagercontainer'],
    primaryCategory: '20-fuss-container',
    condition: 'gebraucht',
    size: '20ft',
    priceNet: 119000,
    compareAtNet: 145000,
    availability: 'auf-lager',
    leadTimeDays: [3, 5],
    stock: 14,
    images: gallery('20ft-used-blau', '20 Fuß Seecontainer gebraucht in Enzianblau', [
      'front',
      'open',
      'side',
      'interior',
      'door',
      'csc',
    ]),
    specs: specsFrom('20ft', {
      material: materials.corten,
      flooring: floorings.plywood,
      ral: 'RAL 5010 Enzianblau (Originallackierung mit Ausbesserungen)',
    }),
    faqs: [
      {
        question: 'Wie alt ist dieser Container?',
        answer:
          'Die verfügbaren Einheiten sind zwischen 11 und 15 Jahre alt. Das exakte Baujahr steht auf der CSC-Plakette und teilen wir Ihnen auf Anfrage zur konkreten Containernummer mit.',
      },
      {
        question: 'Kann ich den Farbton auswählen?',
        answer:
          'Bei Gebrauchtcontainern liefern wir in der jeweils verfügbaren Farbe – überwiegend Blau, Rot oder Grau. Wenn der Farbton für Sie entscheidend ist, empfehlen wir einen generalüberholten oder One-Trip-Container in Wunschfarbe.',
      },
      {
        question: 'Bildet sich im Container Kondenswasser?',
        answer:
          'Bei ungedämmten Stahlcontainern kann sich bei Temperaturwechseln Kondensat an der Decke bilden. Wir empfehlen vier Belüftungsgitter zur Querlüftung – diese können wir direkt mitliefern und bei der Anlieferung montieren.',
      },
    ],
    warrantyMonths: 12,
    related: [
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      '20-fuss-high-cube-one-trip',
      '10-fuss-seecontainer-gebraucht',
      'schlosskasten-lockbox-verzinkt',
    ],
    keywords: [
      '20 Fuß Container gebraucht',
      '20ft Seecontainer',
      'Lagercontainer 20 Fuß',
      'gebrauchter Seecontainer blau',
      'Container kaufen günstig',
    ],
    featured: true,
    bestseller: true,
    updatedAt: '2026-07-18',
    seo: {
      title: '20 Fuß Seecontainer gebraucht kaufen – ab 1.190 € netto',
      description:
        'Gebrauchter 20 Fuß Seecontainer in Enzianblau: wind- und wasserdicht, CSC-zertifiziert, 33 m³ Stauraum. Sofort verfügbar, Lieferung deutschlandweit in 3–5 Werktagen.',
      focusKeyword: '20 Fuß Seecontainer gebraucht',
    },
  }),

  defineProduct({
    id: 'p-20-std-onetrip',
    slug: '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
    sku: 'EMC-20DC-OT-RAL',
    name: '20 Fuß Seecontainer One-Trip – RAL-Wunschfarbe',
    tagline: 'Nur eine Überfahrt, neuwertiger Zustand. In Ihrem Wunsch-RAL-Ton lieferbar.',
    description: [
      'Dieser Container wurde im Werk produziert, einmalig mit Exportladung nach Europa verschifft und danach aus dem Umlauf genommen. Er ist praktisch neuwertig: makellose Lackierung, unbenutzter Hartholzboden, neue Türdichtungen, leichtgängige Verriegelung.',
      'Gegenüber einem fabrikneuen Container sparen Sie rund 20 %, ohne beim Zustand nennenswerte Abstriche zu machen. Für alle Anwendungen, bei denen der Container sichtbar bleibt – vor dem Betriebsgebäude, im Vorgarten, als Verkaufsstand – ist das die vernünftigste Wahl.',
      'Auf Wunsch lackieren wir den Container in nahezu jedem RAL-Ton. Beliebt sind RAL 9010 Reinweiß, RAL 7016 Anthrazitgrau und RAL 6005 Moosgrün. Die Reederei-Beschriftung der Erstverschiffung überlackieren wir dabei mit.',
    ],
    highlights: [
      'Nur eine einzige Seereise – neuwertiger Zustand',
      'RAL-Wunschfarbe ohne Aufpreis bei Standardtönen',
      'Unbenutzter 28-mm-Hartholzboden',
      'Neue Türdichtungen und gefettete Verriegelung',
      '36 Monate Garantie auf Wind- und Wasserdichtheit',
    ],
    categorySlugs: ['20-fuss-container', 'one-trip-container', 'neue-container', 'lagercontainer'],
    primaryCategory: '20-fuss-container',
    condition: 'one-trip',
    size: '20ft',
    priceNet: 259000,
    compareAtNet: 289000,
    availability: 'auf-lager',
    leadTimeDays: [5, 8],
    stock: 9,
    images: gallery('20ft-onetrip', '20 Fuß Seecontainer One-Trip in RAL-Wunschfarbe', [
      'front',
      'open',
      'interior',
      'side',
      'corner',
      'door',
    ]),
    specs: specsFrom('20ft', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL-Wunschfarbe (Standard: RAL 9010, 7016, 6005, 5010)',
    }),
    faqs: [
      {
        question: 'Worin unterscheidet sich One-Trip von fabrikneu?',
        answer:
          'Ein One-Trip-Container war genau einmal beladen. Optisch ist der Unterschied minimal – gelegentlich zeigen sich leichte Transportspuren an den Kanten. Dafür ist er 15 bis 25 % günstiger und sofort verfügbar, während Neucontainer eine Produktionszeit haben.',
      },
      {
        question: 'Ist die RAL-Lackierung im Preis enthalten?',
        answer:
          'Bei den vier Standardtönen RAL 9010, 7016, 6005 und 5010 ja. Für Sonderfarbtöne berechnen wir einen Aufschlag von 380 € netto. Die Lackierung erfolgt als Zweischichtaufbau über der Werksgrundierung.',
      },
      {
        question: 'Kann ich Zubehör direkt mitbestellen?',
        answer:
          'Ja. Schlosskasten, Belüftungsgitter, Regalsysteme und Fundamentblöcke reisen mit Ihrem Container mit – es fällt keine zweite Lieferpauschale an. Auf Wunsch montieren wir alles bei der Anlieferung.',
      },
    ],
    warrantyMonths: 36,
    related: [
      '20-fuss-high-cube-one-trip',
      '20-fuss-seecontainer-gebraucht-blau',
      '20-fuss-seitentuer-container',
      '40-fuss-high-cube-one-trip',
    ],
    keywords: [
      '20 Fuß Container neu',
      'One Trip Container 20 Fuß',
      'Seecontainer Wunschfarbe',
      'neuer Container kaufen',
    ],
    featured: true,
    bestseller: true,
    updatedAt: '2026-07-22',
    seo: {
      title: '20 Fuß One-Trip Container kaufen – neuwertig in RAL-Wunschfarbe',
      description:
        '20 Fuß One-Trip Seecontainer: nur einmal gelaufen, neuwertig, in RAL-Wunschfarbe. 33 m³, CSC-zertifiziert, 36 Monate Garantie. Lieferung deutschlandweit.',
      focusKeyword: '20 Fuß One Trip Container',
    },
  }),

  defineProduct({
    id: 'p-20-hc-onetrip',
    slug: '20-fuss-high-cube-one-trip',
    sku: 'EMC-20HC-OT-7016',
    name: '20 Fuß High Cube One-Trip – Anthrazitgrau',
    tagline: '30 cm mehr Innenhöhe auf 20 Fuß Grundfläche – ideal für Ausbau und Hochregale.',
    description: [
      'Der 20-Fuß-High-Cube kombiniert die handliche Grundfläche des Standardcontainers mit 2,70 m Innenhöhe. Das macht ihn zur bevorzugten Basis für Umbauten: Nach Dämmung, Installationsebene und Bodenaufbau bleiben rund 2,40 m lichte Höhe – man steht aufrecht, ohne sich zu ducken.',
      'Auch für die reine Lagerung zahlt sich die Mehrhöhe aus. Ein zweites Regalfach passt hinein, Langgut lässt sich senkrecht stellen und ein Elektro-Deichselstapler kann im Container arbeiten. Das Volumen wächst von 33,2 auf 37,4 m³.',
      'Ausgeliefert wird das Modell in RAL 7016 Anthrazitgrau – ein Ton, der auf Gewerbeflächen und in Wohnumgebungen gleichermaßen unauffällig wirkt und Verschmutzungen kaschiert.',
    ],
    highlights: [
      '2,698 m Innenhöhe – 305 mm mehr als Standard',
      '37,4 m³ Volumen bei identischer Stellfläche',
      'Bevorzugte Basis für Innenausbau und Umbauten',
      'RAL 7016 Anthrazitgrau, werksseitig lackiert',
      'One-Trip: nur eine einzige Seereise',
    ],
    categorySlugs: [
      '20-fuss-container',
      'high-cube-container',
      'one-trip-container',
      'lagercontainer',
    ],
    primaryCategory: 'high-cube-container',
    condition: 'one-trip',
    size: '20ft',
    priceNet: 289000,
    compareAtNet: 319000,
    availability: 'auf-lager',
    leadTimeDays: [5, 8],
    stock: 6,
    images: gallery('20ft-hc-onetrip', '20 Fuß High Cube One-Trip in Anthrazitgrau', [
      'front',
      'open',
      'interior',
      'side',
      'corner',
    ]),
    specs: specsFrom('20ft-hc', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 7016 Anthrazitgrau',
    }),
    faqs: [
      {
        question: 'Lohnt sich der Aufpreis gegenüber dem Standardcontainer?',
        answer:
          'Wenn Sie ausbauen, Hochregale nutzen oder mit einem Stapler hineinfahren wollen: eindeutig ja. Für Palettenlagerung in einer Lage bringt die Mehrhöhe keinen Vorteil – dann ist der Standardcontainer wirtschaftlicher.',
      },
      {
        question: 'Passt ein High Cube durch normale Tordurchfahrten?',
        answer:
          'Der Container ist außen 2,896 m hoch. Auf einem Tieflader mit 1,0 m Ladehöhe ergibt das rund 3,9 m Gesamthöhe. Prüfen Sie Durchfahrtshöhen auf dem Anfahrtsweg – wir klären das im Vorfeld gemeinsam mit Ihnen.',
      },
    ],
    warrantyMonths: 36,
    related: [
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      '40-fuss-high-cube-one-trip',
      '10-fuss-high-cube-one-trip-weiss',
      'belueftungsgitter-set-4-stueck',
    ],
    keywords: [
      '20 Fuß High Cube',
      'High Cube Container 20ft',
      '20 Fuß Container hoch',
      'Container Innenhöhe 2,70 m',
    ],
    featured: true,
    bestseller: false,
    updatedAt: '2026-07-20',
    seo: {
      title: '20 Fuß High Cube Container kaufen – 2,70 m Innenhöhe',
      description:
        '20 Fuß High Cube One-Trip Container in Anthrazitgrau: 2,698 m Innenhöhe, 37,4 m³, neuwertig. Ideal für Ausbau und Hochregale. Lieferung deutschlandweit.',
      focusKeyword: '20 Fuß High Cube',
    },
  }),

  defineProduct({
    id: 'p-20-sidedoor',
    slug: '20-fuss-seitentuer-container',
    sku: 'EMC-20OS-OT-5010',
    name: '20 Fuß Open Side Container – Seitentür über volle Länge',
    tagline: '5,8 m freie Ladebreite. Der Stapler erreicht jede Position ohne Umschichten.',
    description: [
      'Beim Open-Side-Container öffnet sich die komplette Längsseite. Statt durch die 2,34 m schmale Stirntür laden Sie über 5,8 m Breite – der Gabelstapler fährt seitlich an jeden Punkt heran, ohne dass Ware davor weggeräumt werden muss.',
      'Für Betriebe mit täglichem Materialzugriff ist das ein spürbarer Effizienzgewinn. Baustoffhändler, Handwerksbetriebe, Werkstätten und landwirtschaftliche Betriebe amortisieren den Aufpreis gegenüber dem Standardcontainer meist innerhalb weniger Monate an eingesparter Arbeitszeit.',
      'Die Stirnseite bleibt zusätzlich als klassische Doppelflügeltür nutzbar. Konstruktiv ist der Container im Rahmen verstärkt, um die fehlende Aussteifung der Längswand auszugleichen – er ist voll stapelbar und seetüchtig.',
    ],
    highlights: [
      '5,8 m freie Ladebreite über die volle Längsseite',
      'Zusätzlich klassische Doppelflügeltür an der Stirnseite',
      'Verstärkter Rahmen, voll stapelbar',
      'Mehrpunktverriegelung mit umlaufender Dichtung',
      'Spart Umschichten bei täglichem Materialzugriff',
    ],
    categorySlugs: ['open-side-container', '20-fuss-container', 'one-trip-container'],
    primaryCategory: 'open-side-container',
    condition: 'one-trip',
    size: '20ft',
    priceNet: 389000,
    compareAtNet: 429000,
    availability: 'kurzfristig',
    leadTimeDays: [8, 14],
    stock: 3,
    images: gallery('20ft-sidedoor', '20 Fuß Open Side Container mit geöffneter Seitenwand', [
      'front',
      'open',
      'side',
      'interior',
      'door',
    ]),
    specs: specsFrom('20ft', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 5010 Enzianblau',
      tareWeight: 2900,
      payload: 27580,
    }),
    extraSpecRows: [
      { label: 'Seitenöffnung (B × H)', value: '5.860 × 2.280 mm', group: 'abmessungen' },
      { label: 'Türflügel Seite', value: '4 Flügel, Öffnungswinkel 270°', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Wie viel Platz brauche ich seitlich zum Öffnen?',
        answer:
          'Die vier Flügel schwenken nach außen und lassen sich an die Längswand anlegen. Planen Sie seitlich mindestens 1,5 m frei ein, besser 2,5 m, damit der Stapler ungehindert anfahren kann.',
      },
      {
        question: 'Ist der Open-Side-Container genauso dicht?',
        answer:
          'Ja. Die Seitentüren haben umlaufende Gummidichtungen und eine Mehrpunktverriegelung. Entscheidend ist eine ebene Aufstellung: Verwindet sich der Container, schließen die langen Flügel schlechter.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '40-fuss-high-cube-seitentuer-container',
      '20-fuss-doppeltuer-container',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
    ],
    keywords: [
      'Open Side Container 20 Fuß',
      'Container mit Seitentür',
      'Side Door Container',
      'Seitentürcontainer kaufen',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-11',
    seo: {
      title: '20 Fuß Open Side Container kaufen – Seitentür über volle Länge',
      description:
        '20 Fuß Open Side Container mit 5,8 m Seitenöffnung: Beladung per Stapler von der Seite, zusätzlich Stirntür. Verstärkter Rahmen, CSC-zertifiziert.',
      focusKeyword: 'Open Side Container 20 Fuß',
    },
  }),

  defineProduct({
    id: 'p-20-doubledoor',
    slug: '20-fuss-doppeltuer-container',
    sku: 'EMC-20DD-OT-9010',
    name: '20 Fuß Doppeltür Container – Tunnelcontainer',
    tagline: 'Türen an beiden Stirnseiten. Vorne beladen, hinten entladen – ohne Umräumen.',
    description: [
      'Der Tunnelcontainer hat an beiden Stirnseiten vollwertige Doppelflügeltüren. Damit lässt sich das FIFO-Prinzip ohne Umlagern umsetzen: Neue Ware kommt vorne hinein, ältere wird hinten entnommen.',
      'Ebenso wertvoll ist die Bauart als Durchgang. Zwischen zwei Hallen aufgestellt, verbindet der Container beide Bereiche wetterfest und abschließbar. Auf Baustellen dient er als Schleuse zwischen abgesperrten Zonen.',
      'Für Langgut ist die durchgehende Öffnung ein praktischer Vorteil: Rohre, Profile und Kanthölzer lassen sich durchschieben statt hineinwuchten. Geliefert in RAL 9010 Reinweiß.',
    ],
    highlights: [
      'Vollwertige Doppelflügeltüren an beiden Stirnseiten',
      'FIFO-Lagerung ohne Umschichten',
      'Als wetterfester Durchgang zwischen Bereichen nutzbar',
      'Durchladen von Langgut möglich',
      'RAL 9010 Reinweiß, One-Trip-Zustand',
    ],
    categorySlugs: ['doppeltuer-container', '20-fuss-container', 'one-trip-container'],
    primaryCategory: 'doppeltuer-container',
    condition: 'one-trip',
    size: '20ft',
    priceNet: 329000,
    availability: 'kurzfristig',
    leadTimeDays: [8, 14],
    stock: 4,
    images: gallery('20ft-doubledoor', '20 Fuß Doppeltür Container in Reinweiß', [
      'front',
      'open',
      'interior',
      'side',
    ]),
    specs: specsFrom('20ft', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 9010 Reinweiß',
      tareWeight: 2400,
      payload: 28080,
    }),
    extraSpecRows: [
      { label: 'Türen', value: '2 × Doppelflügeltür, je 270° Öffnungswinkel', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Ist der Container durch die zweite Tür weniger stabil?',
        answer:
          'Nein. Die Aussteifung übernehmen Längswände, Boden und Eckpfosten. Doppeltürcontainer sind uneingeschränkt stapelbar und erfüllen dieselben ISO-Prüfanforderungen wie Standardcontainer.',
      },
      {
        question: 'Wie viel Platz benötige ich vorne und hinten?',
        answer:
          'Für die volle 270°-Öffnung je rund 2,5 m. Bei beengten Verhältnissen genügen 1,5 m für eine 90°-Öffnung, was für die meisten Ladevorgänge ausreicht.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-seitentuer-container',
      '40-fuss-doppeltuer-container',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
    ],
    keywords: [
      'Doppeltür Container',
      'Tunnelcontainer 20 Fuß',
      'Double Door Container',
      'Container zwei Türen',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-09',
    seo: {
      title: '20 Fuß Doppeltür Container kaufen – Tunnelcontainer mit 2 Türen',
      description:
        '20 Fuß Doppeltür Container (Tunnelcontainer): Doppelflügeltüren an beiden Stirnseiten, FIFO-Lagerung, durchladbar. One-Trip in RAL 9010. Deutschlandweite Lieferung.',
      focusKeyword: 'Doppeltür Container 20 Fuß',
    },
  }),

  // ─────────────────────────────────────────────────────────────── 40 Fuß ──
  defineProduct({
    id: 'p-40-hc-onetrip',
    slug: '40-fuss-high-cube-one-trip',
    sku: 'EMC-40HC-OT-RAL',
    name: '40 Fuß High Cube One-Trip – RAL-Wunschfarbe',
    tagline: '76 m³ Volumen, 2,70 m Innenhöhe. Das gefragteste Format für Lager und Ausbau.',
    description: [
      'Der 40-Fuß-High-Cube ist das Arbeitspferd unter den Großcontainern: 12,19 m lang, 2,70 m innen hoch, 76,3 m³ Volumen. Er bietet den günstigsten Preis pro Kubikmeter und ist gleichzeitig die bevorzugte Basis für Werkstatt-, Büro- und Wohnumbauten.',
      'Als One-Trip-Container ist er praktisch neuwertig: unbenutzter Hartholzboden, makellose Lackierung, neue Dichtungen. Auf Wunsch lackieren wir ihn in Ihrem RAL-Ton und überstreichen die Beschriftung der Erstverschiffung.',
      'Für die Anlieferung wird eine großzügige Zufahrt benötigt: Der Sattelzug misst mit Auflieger rund 18 m. Wir prüfen die Anfahrt vorab anhand von Kartenmaterial und stimmen den Ablauf telefonisch mit Ihnen ab.',
    ],
    highlights: [
      '76,3 m³ – das größte Volumen im Standardsortiment',
      '2,698 m Innenhöhe für Ausbau und Staplerbetrieb',
      'Günstigster Preis pro Kubikmeter Stauraum',
      'RAL-Wunschfarbe bei Standardtönen ohne Aufpreis',
      '36 Monate Garantie auf Wind- und Wasserdichtheit',
    ],
    categorySlugs: [
      '40-fuss-container',
      'high-cube-container',
      'one-trip-container',
      'lagercontainer',
    ],
    primaryCategory: '40-fuss-container',
    condition: 'one-trip',
    size: '40ft',
    priceNet: 449000,
    compareAtNet: 499000,
    availability: 'auf-lager',
    leadTimeDays: [5, 10],
    stock: 7,
    images: gallery('40ft-hc-onetrip', '40 Fuß High Cube One-Trip Container', [
      'front',
      'open',
      'side',
      'interior',
      'corner',
      'delivery',
    ]),
    specs: specsFrom('40ft-hc', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL-Wunschfarbe (Standard: RAL 9010, 7016, 6005, 5010)',
    }),
    faqs: [
      {
        question: 'Welche Zufahrt braucht die Anlieferung?',
        answer:
          'Der Sattelzug ist ca. 18 m lang und 2,55 m breit. Er benötigt rund 25 m gerade Anfahrt, eine befestigte tragfähige Fläche und für das Absetzen mit dem Ladekran seitlich etwa 6 m Arbeitsraum bei 6 m hindernisfreier Höhe. Bei engen Verhältnissen setzen wir einen Autokran ein.',
      },
      {
        question: 'Wie viele Europaletten passen hinein?',
        answer:
          'Rund 21 Europaletten in einer Lage – längs in zwei Reihen. Bei stapelfähigem Ladegut und der Innenhöhe von 2,70 m sind bis zu 42 Paletten in zwei Lagen möglich.',
      },
      {
        question: 'Eignet sich der Container für einen Innenausbau?',
        answer:
          'Ja, er ist die Standardbasis dafür. Die 2,70 m Innenhöhe lassen nach Dämmung, Installationsebene und Bodenaufbau rund 2,40 m lichte Höhe. Die Länge reicht für mehrere getrennte Zonen. Sprechen Sie uns an – wir übernehmen den Ausbau in unserer Werkstatt.',
      },
    ],
    warrantyMonths: 36,
    related: [
      '40-fuss-seecontainer-gebraucht',
      '20-fuss-high-cube-one-trip',
      '40-fuss-high-cube-seitentuer-container',
      '45-fuss-high-cube-container',
    ],
    keywords: [
      '40 Fuß High Cube kaufen',
      '40ft HC Container',
      '40 Fuß Container neu',
      'großer Seecontainer',
    ],
    featured: true,
    bestseller: true,
    updatedAt: '2026-07-24',
    seo: {
      title: '40 Fuß High Cube Container kaufen – 76 m³ ab 4.490 € netto',
      description:
        '40 Fuß High Cube One-Trip Container in RAL-Wunschfarbe: 76,3 m³, 2,70 m Innenhöhe, neuwertig, CSC-zertifiziert. Lieferung deutschlandweit per Kranfahrzeug.',
      focusKeyword: '40 Fuß High Cube kaufen',
    },
  }),

  defineProduct({
    id: 'p-40-std-used',
    slug: '40-fuss-seecontainer-gebraucht',
    sku: 'EMC-40DC-U-MIX',
    name: '40 Fuß Seecontainer gebraucht',
    tagline: '68 m³ trockener Stauraum zum besten Preis pro Kubikmeter.',
    description: [
      'Wer viel Volumen zum kleinen Preis braucht, kommt am gebrauchten 40-Fuß-Container nicht vorbei. Mit 67,7 m³ bietet er doppelt so viel Raum wie ein 20-Fuß-Container – bei einem Aufpreis von deutlich unter 100 %.',
      'Jede Einheit ist im Lichttest geprüft und wind- und wasserdicht. Türdichtungen, Verriegelung und Sperrholzboden sind kontrolliert. Gebrauchsspuren wie Kratzer, Dellen und Farbunterschiede sind normal und beeinträchtigen die Funktion nicht.',
      'Typische Einsätze: Lagerung von Verpackungsmaterial, Textilien, Möbeln, landwirtschaftlichen Erzeugnissen oder Baustoffen. Überall dort, wo Volumen wichtiger ist als Traglast, spielt dieses Format seine Stärke aus.',
    ],
    highlights: [
      '67,7 m³ Volumen – günstigster Preis pro m³',
      'Im Lichttest geprüft: wind- und wasserdicht',
      'Rund 21 Europaletten in einer Lage',
      'Gültige CSC-Plakette',
      'Sofort ab Lager verfügbar',
    ],
    categorySlugs: ['40-fuss-container', 'gebrauchte-container', 'lagercontainer'],
    primaryCategory: '40-fuss-container',
    condition: 'gebraucht',
    size: '40ft',
    priceNet: 219000,
    compareAtNet: 259000,
    availability: 'auf-lager',
    leadTimeDays: [3, 6],
    stock: 11,
    images: gallery('40ft-used', '40 Fuß Seecontainer gebraucht', [
      'front',
      'open',
      'side',
      'interior',
      'csc',
    ]),
    specs: specsFrom('40ft', {
      material: materials.corten,
      flooring: floorings.plywood,
      ral: 'Verfügbare Farbe je nach Bestand (überwiegend Rot, Blau, Grau)',
    }),
    faqs: [
      {
        question: 'Kann ich mir den konkreten Container vorher ansehen?',
        answer:
          'Ja. Nach Terminvereinbarung zeigen wir Ihnen die verfügbaren Einheiten an unserem Standort in Altenkirchen. Alternativ senden wir Fotos des konkreten Containers inklusive Containernummer per E-Mail.',
      },
      {
        question: 'Lässt sich ein 40-Fuß-Container später umsetzen?',
        answer:
          'Ja, leer wiegt er rund 3,75 Tonnen. Für das Umsetzen auf dem Grundstück eignet sich ein Autokran oder ein Reach Stacker. Wir vermitteln auf Wunsch einen Partnerbetrieb in Ihrer Region.',
      },
    ],
    warrantyMonths: 12,
    related: [
      '40-fuss-high-cube-one-trip',
      '20-fuss-seecontainer-gebraucht-blau',
      '40-fuss-doppeltuer-container',
    ],
    keywords: [
      '40 Fuß Container gebraucht',
      '40ft Seecontainer',
      'großer Lagercontainer',
      'Container 40 Fuß Preis',
    ],
    featured: false,
    bestseller: true,
    updatedAt: '2026-07-16',
    seo: {
      title: '40 Fuß Seecontainer gebraucht kaufen – ab 2.190 € netto',
      description:
        'Gebrauchter 40 Fuß Seecontainer: wind- und wasserdicht, 67,7 m³, CSC-zertifiziert, sofort verfügbar. Günstigster Preis pro m³. Lieferung deutschlandweit.',
      focusKeyword: '40 Fuß Seecontainer gebraucht',
    },
  }),

  defineProduct({
    id: 'p-40-hc-sidedoor',
    slug: '40-fuss-high-cube-seitentuer-container',
    sku: 'EMC-40HCOS-OT-7016',
    name: '40 Fuß High Cube Open Side – Anthrazitgrau',
    tagline: '11,8 m freie Ladebreite bei 2,70 m Innenhöhe. Unser Spezialist für Staplerbetrieb.',
    description: [
      'Die Kombination aus voller Seitenöffnung und High-Cube-Höhe macht diesen Container zum flexibelsten Lagerraum im Sortiment. Über 11,8 m Breite erreicht der Stapler jede Position direkt, die 2,70 m Innenhöhe erlauben zweilagige Palettierung oder Hochregale.',
      'Eingesetzt wird die Bauart überall dort, wo täglich viel bewegt wird: im Baustoffhandel, bei Messebauern, in der Getränkelogistik, in Werkstätten mit großem Materialdurchsatz. Die Zeitersparnis gegenüber einem Standardcontainer ist erheblich.',
      'Der Rahmen ist konstruktiv verstärkt, um die durchgehende Seitenöffnung auszugleichen. Zusätzlich bleibt die Stirnseite als klassische Doppelflügeltür nutzbar.',
    ],
    highlights: [
      '11,8 m freie Ladebreite über die volle Längsseite',
      '2,698 m Innenhöhe – zweilagige Palettierung möglich',
      'Zusätzliche Doppelflügeltür an der Stirnseite',
      'Verstärkter Rahmen, voll stapelbar',
      'RAL 7016 Anthrazitgrau',
    ],
    categorySlugs: [
      'open-side-container',
      '40-fuss-container',
      'high-cube-container',
      'one-trip-container',
    ],
    primaryCategory: 'open-side-container',
    condition: 'one-trip',
    size: '40ft',
    priceNet: 690000,
    compareAtNet: 749000,
    availability: 'kurzfristig',
    leadTimeDays: [10, 18],
    stock: 2,
    images: gallery('40ft-hc-sidedoor', '40 Fuß High Cube Open Side Container in Anthrazitgrau', [
      'front',
      'open',
      'side',
      'interior',
      'door',
    ]),
    specs: specsFrom('40ft-hc', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 7016 Anthrazitgrau',
      tareWeight: 4900,
      payload: 25580,
    }),
    extraSpecRows: [
      { label: 'Seitenöffnung (B × H)', value: '11.800 × 2.585 mm', group: 'abmessungen' },
      { label: 'Türflügel Seite', value: '8 Flügel, Öffnungswinkel 270°', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Wie viel Rangierfläche brauche ich seitlich?',
        answer:
          'Für den Staplerbetrieb sollten seitlich mindestens 4 m frei sein: 2,5 m für die angelegten Türflügel und die Rangierfläche des Staplers. Bei Frontstaplern mit langem Radstand planen Sie besser 5 m ein.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-seitentuer-container',
      '40-fuss-high-cube-one-trip',
      '40-fuss-doppeltuer-container',
    ],
    keywords: [
      '40 Fuß Open Side Container',
      'Container Seitentür 40 Fuß',
      'Side Door Container 40ft',
    ],
    featured: true,
    bestseller: false,
    updatedAt: '2026-07-14',
    seo: {
      title: '40 Fuß High Cube Open Side Container – 11,8 m Seitenöffnung',
      description:
        '40 Fuß High Cube Open Side Container in Anthrazitgrau: 11,8 m Seitenöffnung, 2,70 m Innenhöhe, verstärkter Rahmen. Ideal für Staplerbetrieb.',
      focusKeyword: '40 Fuß Open Side Container',
    },
  }),

  defineProduct({
    id: 'p-40-doubledoor',
    slug: '40-fuss-doppeltuer-container',
    sku: 'EMC-40DD-OT-9010',
    name: '40 Fuß Doppeltür Container – Tunnelcontainer',
    tagline: 'Über 12 m durchgehend – Langgut durchschieben statt hineinwuchten.',
    description: [
      'Der 40-Fuß-Tunnelcontainer bietet über zwölf Meter durchgehende Länge mit Türen an beiden Enden. Für Langgut wie Rohre, Stahlprofile, Kanthölzer oder Bauteile ist das die praktikabelste Lagerform überhaupt: Das Material wird von einer Seite eingeschoben und von der anderen entnommen.',
      'Auch als Verbindungselement zwischen zwei Gebäudeteilen bewährt sich die Bauart – wetterfest, abschließbar und ohne Baugenehmigung für temporäre Nutzung auf dem Betriebsgelände.',
      'Geliefert in RAL 9010 Reinweiß im One-Trip-Zustand mit unbenutztem Hartholzboden.',
    ],
    highlights: [
      '12,03 m durchgehende Innenlänge',
      'Doppelflügeltüren an beiden Stirnseiten',
      'Ideal für Langgut und FIFO-Lagerung',
      'Als wetterfester Durchgang nutzbar',
      'One-Trip in RAL 9010 Reinweiß',
    ],
    categorySlugs: ['doppeltuer-container', '40-fuss-container', 'one-trip-container'],
    primaryCategory: 'doppeltuer-container',
    condition: 'one-trip',
    size: '40ft',
    priceNet: 549000,
    availability: 'auf-anfrage',
    leadTimeDays: [12, 20],
    stock: 1,
    images: gallery('40ft-doubledoor', '40 Fuß Doppeltür Container in Reinweiß', [
      'front',
      'open',
      'side',
      'interior',
    ]),
    specs: specsFrom('40ft', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 9010 Reinweiß',
      tareWeight: 3900,
      payload: 26580,
    }),
    faqs: [
      {
        question: 'Eignet sich der Container für Langgut über 12 m?',
        answer:
          'Die Innenlänge beträgt 12,032 m. Material bis zu dieser Länge lässt sich einlagern. Bei Überlänge käme der 45-Fuß-High-Cube mit 13,556 m Innenlänge infrage – sprechen Sie uns an.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-doppeltuer-container',
      '40-fuss-high-cube-one-trip',
      '45-fuss-high-cube-container',
    ],
    keywords: ['40 Fuß Doppeltür Container', 'Tunnelcontainer 40 Fuß', 'Container Langgut'],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-05',
    seo: {
      title: '40 Fuß Doppeltür Container kaufen – Tunnelcontainer 12 m',
      description:
        '40 Fuß Doppeltür Container mit Türen an beiden Stirnseiten: 12,03 m durchgehende Innenlänge, ideal für Langgut und FIFO-Lagerung. One-Trip, RAL 9010.',
      focusKeyword: '40 Fuß Doppeltür Container',
    },
  }),

  defineProduct({
    id: 'p-45-hc',
    slug: '45-fuss-high-cube-container',
    sku: 'EMC-45HC-OT-9010',
    name: '45 Fuß High Cube Container – Maximalvolumen',
    tagline: '86 m³ und 13,56 m Innenlänge. Das größte Standardformat im Markt.',
    description: [
      'Der 45-Fuß-High-Cube ist der größte im Linienverkehr eingesetzte Standardcontainer. Mit 13,56 m Innenlänge und 86 m³ Volumen übertrifft er den 40-Fuß-High-Cube um gut 12 % – bei identischer Breite und Höhe.',
      'In Deutschland wird er vor allem im Palettenverkehr eingesetzt, weil 33 Europaletten in einer Lage hineinpassen. Als stationärer Lagerraum bietet er die größte zusammenhängende Fläche, die ohne Sondergenehmigung transportiert werden kann.',
      'Beim Transport ist zu beachten, dass 45-Fuß-Container auf der Straße andere Auflieger erfordern als 40-Fuß-Einheiten. Wir klären die Machbarkeit der Anlieferung vorab.',
    ],
    highlights: [
      '86 m³ – größtes Standardvolumen am Markt',
      '13,556 m durchgehende Innenlänge',
      '33 Europaletten in einer Lage',
      '2,698 m Innenhöhe (High Cube)',
      'One-Trip-Zustand, RAL 9010 Reinweiß',
    ],
    categorySlugs: ['high-cube-container', 'one-trip-container', 'lagercontainer'],
    primaryCategory: 'high-cube-container',
    condition: 'one-trip',
    size: '45ft',
    priceNet: 589000,
    availability: 'auf-anfrage',
    leadTimeDays: [14, 25],
    stock: 1,
    images: gallery('45ft-hc', '45 Fuß High Cube Container in Reinweiß', [
      'front',
      'side',
      'open',
      'interior',
    ]),
    specs: specsFrom('45ft-hc', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 9010 Reinweiß',
    }),
    faqs: [
      {
        question: 'Ist der Transport eines 45-Fuß-Containers problematisch?',
        answer:
          'Er erfordert spezielle Auflieger und eine großzügige Rangierfläche. Auf öffentlichen Straßen gilt die Kombination als Regelfahrzeug, sofern die Gesamtlänge eingehalten wird. Wir prüfen die Anfahrt individuell und setzen bei Bedarf einen Autokran ein.',
      },
    ],
    warrantyMonths: 24,
    related: ['40-fuss-high-cube-one-trip', '40-fuss-seecontainer-gebraucht'],
    keywords: ['45 Fuß Container', '45ft High Cube', 'größter Seecontainer'],
    featured: false,
    bestseller: false,
    updatedAt: '2026-06-30',
    seo: {
      title: '45 Fuß High Cube Container kaufen – 86 m³ Maximalvolumen',
      description:
        '45 Fuß High Cube Container: 13,56 m Innenlänge, 86 m³, 33 Europaletten pro Lage. Größtes Standardformat, One-Trip-Zustand. Lieferung nach Machbarkeitsprüfung.',
      focusKeyword: '45 Fuß Container',
    },
  }),

  // ─────────────────────────────────────────────────────────────── 10 Fuß ──
  defineProduct({
    id: 'p-10-used',
    slug: '10-fuss-seecontainer-gebraucht',
    sku: 'EMC-10DC-U-MIX',
    name: '10 Fuß Seecontainer gebraucht',
    tagline: 'Nur 2,99 m lang – passt auf Grundstücke, an denen 20 Fuß scheitern.',
    description: [
      'Der 10-Fuß-Container ist die Lösung, wenn der Platz knapp ist. Mit 2,99 m Außenlänge stellt man ihn in Hinterhöfe, auf Reihenhausgrundstücke oder in Baulücken, wo ein 20-Fuß-Container keine Chance hätte.',
      'Trotz der kompakten Maße bietet er rund 16 m³ Stauraum und trägt bis zu neun Tonnen. Als Gartengerätelager, Vereinsdepot, Werkzeuglager auf der Baustelle oder Zwischenlager bei Renovierungen ist er die praktischste Größe überhaupt.',
      'Alle Einheiten sind geprüft wind- und wasserdicht mit gültiger CSC-Plakette. Gebrauchsspuren sind vorhanden und funktional unerheblich.',
    ],
    highlights: [
      'Nur 2,99 m Länge – passt auf kleine Grundstücke',
      '16 m³ Stauraum auf 7,3 m² Stellfläche',
      'Zufahrtsbreite ab 3,5 m ausreichend',
      'Geprüft wind- und wasserdicht',
      'Kein Fundament erforderlich',
    ],
    categorySlugs: ['10-fuss-container', 'gebrauchte-container', 'lagercontainer'],
    primaryCategory: '10-fuss-container',
    condition: 'gebraucht',
    size: '10ft',
    priceNet: 159000,
    compareAtNet: 179000,
    availability: 'auf-lager',
    leadTimeDays: [3, 5],
    stock: 8,
    images: gallery('10ft-used', '10 Fuß Seecontainer gebraucht', [
      'front',
      'open',
      'side',
      'interior',
    ]),
    specs: specsFrom('10ft', {
      material: materials.corten,
      flooring: floorings.plywood,
      ral: 'Verfügbare Farbe je nach Bestand',
    }),
    faqs: [
      {
        question: 'Passt der Container durch eine schmale Hofeinfahrt?',
        answer:
          'Der Container ist 2,44 m breit. Für die Anlieferung mit dem Absetzkipper benötigen wir eine Zufahrtsbreite von mindestens 3,5 m und rund 15 m gerade Anfahrt. Bei engeren Verhältnissen setzen wir einen Mitnahmestapler oder Autokran ein.',
      },
      {
        question: 'Wie viel passt hinein?',
        answer:
          'Rund 16 m³ – das entspricht etwa dem Inhalt einer Ein- bis Zwei-Zimmer-Wohnung oder vier Europaletten in einer Lage. Für Gartengeräte, Fahrräder, Werkzeug und Saisonartikel ist das großzügig bemessen.',
      },
    ],
    warrantyMonths: 12,
    related: [
      '10-fuss-high-cube-one-trip-weiss',
      '20-fuss-seecontainer-gebraucht-blau',
      'schlosskasten-lockbox-verzinkt',
    ],
    keywords: [
      '10 Fuß Container gebraucht',
      'kleiner Container kaufen',
      '10ft Seecontainer',
      'Minicontainer',
    ],
    featured: false,
    bestseller: true,
    updatedAt: '2026-07-12',
    seo: {
      title: '10 Fuß Seecontainer gebraucht kaufen – ab 1.590 € netto',
      description:
        'Gebrauchter 10 Fuß Seecontainer: nur 2,99 m lang, 16 m³ Stauraum, wind- und wasserdicht, CSC-zertifiziert. Passt auf kleine Grundstücke. Lieferung deutschlandweit.',
      focusKeyword: '10 Fuß Seecontainer gebraucht',
    },
  }),

  defineProduct({
    id: 'p-10-hc-onetrip',
    slug: '10-fuss-high-cube-one-trip-weiss',
    sku: 'EMC-10HC-OT-9010',
    name: '10 Fuß High Cube One-Trip – Reinweiß',
    tagline: 'Kompakt, neuwertig und mit 2,70 m Innenhöhe. Beliebt als Gartenlager und Kiosk.',
    description: [
      'Dieser 10-Fuß-High-Cube vereint das kleinste Stellmaß mit voller Innenhöhe. In RAL 9010 Reinweiß wirkt er auch im privaten Umfeld unaufdringlich – ein Grund, warum er häufig als Gartenlager, Poolhaus, Vereinsdepot oder Basis für kleine Verkaufsstände gewählt wird.',
      'Der One-Trip-Zustand bedeutet: eine einzige Seereise, danach direkt in den Verkauf. Lackierung, Dichtungen und Hartholzboden sind praktisch unbenutzt.',
      'Wegen der geringen Stückzahlen in der Neuproduktion ist die Verfügbarkeit begrenzt. Wir empfehlen eine frühzeitige Reservierung.',
    ],
    highlights: [
      '2,698 m Innenhöhe bei nur 2,99 m Außenlänge',
      '17,9 m³ Volumen auf 7,3 m² Stellfläche',
      'Neuwertiger One-Trip-Zustand',
      'RAL 9010 Reinweiß – unauffällig im Wohnumfeld',
      'Beliebte Basis für Kiosk- und Gartenumbauten',
    ],
    categorySlugs: [
      '10-fuss-container',
      'high-cube-container',
      'one-trip-container',
      'lagercontainer',
    ],
    primaryCategory: '10-fuss-container',
    condition: 'one-trip',
    size: '10ft',
    priceNet: 229000,
    compareAtNet: 259000,
    availability: 'auf-lager',
    leadTimeDays: [5, 10],
    stock: 5,
    images: gallery('10ft-hc-onetrip', '10 Fuß High Cube One-Trip Container in Reinweiß', [
      'front',
      'open',
      'interior',
      'side',
      'corner',
    ]),
    specs: specsFrom('10ft-hc', {
      material: materials.cortenNew,
      flooring: floorings.plywoodNew,
      ral: 'RAL 9010 Reinweiß',
    }),
    faqs: [
      {
        question: 'Eignet sich der Container als Verkaufsstand?',
        answer:
          'Ja, das ist eine der häufigsten Anwendungen. Wir schneiden auf Wunsch eine Verkaufsklappe ein, montieren eine Theke und verlegen die Elektroinstallation. Sprechen Sie uns für ein Umbauangebot an.',
      },
      {
        question: 'Ist eine Baugenehmigung nötig?',
        answer:
          'Für die reine Lagernutzung sind kleine Container in vielen Bundesländern verfahrensfrei – die Grenzen unterscheiden sich je Landesbauordnung. Sobald der Container gewerblich genutzt wird, dem Aufenthalt dient oder dauerhaft im Außenbereich steht, ist eine Genehmigung erforderlich. Klären Sie das mit Ihrem Bauamt.',
      },
    ],
    warrantyMonths: 36,
    related: [
      '10-fuss-seecontainer-gebraucht',
      '20-fuss-high-cube-one-trip',
      'belueftungsgitter-set-4-stueck',
    ],
    keywords: [
      '10 Fuß High Cube',
      '10ft Container neu',
      'kleiner Container weiß',
      'Gartencontainer',
    ],
    featured: true,
    bestseller: false,
    updatedAt: '2026-07-19',
    seo: {
      title: '10 Fuß High Cube Container kaufen – neuwertig in Reinweiß',
      description:
        '10 Fuß High Cube One-Trip Container in RAL 9010: 2,70 m Innenhöhe, 17,9 m³, neuwertig. Beliebt als Gartenlager und Verkaufsstand. Lieferung deutschlandweit.',
      focusKeyword: '10 Fuß High Cube Container',
    },
  }),

  // ────────────────────────────────────────────────────────── Kühlcontainer ──
  defineProduct({
    id: 'p-20-reefer',
    slug: '20-fuss-kuehlcontainer-reefer',
    sku: 'EMC-20RF-U-9010',
    name: '20 Fuß Kühlcontainer – Reefer, −25 °C bis +25 °C',
    tagline: 'Mobile Kühlzelle mit geprüftem Aggregat und PTI-Protokoll.',
    description: [
      'Dieser 20-Fuß-Reefer hält Temperaturen von −25 °C bis +25 °C konstant und dokumentiert den Verlauf. Der Innenraum ist mit Edelstahl ausgekleidet, der Boden als T-Profil-Aluminiumrost ausgeführt, damit die Kaltluft frei zirkulieren kann – HACCP-konform reinigbar und für Lebensmittel geeignet.',
      'Eingesetzt wird er als flexible Kühlzelle in Gastronomie, Lebensmittelhandel, Getränkelogistik, Blumengroßhandel und Veranstaltungstechnik – überall dort, wo Kühlkapazität kurzfristig, saisonal oder als Ersatz für eine ausgefallene Festinstallation benötigt wird.',
      'Vor der Auslieferung durchläuft jedes Aggregat eine Pre-Trip-Inspection im Dauerlauf. Sie erhalten das Prüfprotokoll mit den Messwerten. Für den Betrieb ist ein 400-V-Drehstromanschluss mit 32-A-CEE-Steckdose erforderlich.',
    ],
    highlights: [
      'Temperaturbereich −25 °C bis +25 °C, stufenlos',
      'Edelstahlauskleidung, HACCP-konform reinigbar',
      'T-Profil-Aluboden für Kaltluftzirkulation',
      'Pre-Trip-Inspection mit schriftlichem Protokoll',
      '100 mm PU-Sandwichdämmung',
    ],
    categorySlugs: ['kuehlcontainer', '20-fuss-container', 'gebrauchte-container'],
    primaryCategory: 'kuehlcontainer',
    condition: 'generalueberholt',
    size: '20ft',
    priceNet: 690000,
    compareAtNet: 790000,
    availability: 'kurzfristig',
    leadTimeDays: [7, 14],
    stock: 3,
    images: gallery('20ft-reefer', '20 Fuß Kühlcontainer mit Kälteaggregat', [
      'front',
      'open',
      'interior',
      'side',
      'corner',
    ]),
    specs: specsFrom('20ft-reefer', {
      material: materials.reefer,
      flooring: floorings.aluminium,
      ral: 'RAL 9010 Reinweiß',
    }),
    extraSpecRows: [
      { label: 'Temperaturbereich', value: '−25 °C bis +25 °C, stufenlos', group: 'aufbau' },
      { label: 'Dämmstärke', value: '100 mm PU-Sandwichpaneel', group: 'aufbau' },
      { label: 'Stromanschluss', value: '400 V Drehstrom, 32 A CEE', group: 'aufbau' },
      { label: 'Leistungsaufnahme', value: '3–9 kW je nach Zieltemperatur', group: 'aufbau' },
      { label: 'Kältemittel', value: 'R-134a bzw. R-513A (je nach Aggregat)', group: 'aufbau' },
      {
        label: 'Prüfung',
        value: 'Pre-Trip-Inspection (PTI) mit Protokoll',
        group: 'zertifizierung',
      },
    ],
    faqs: [
      {
        question: 'Welchen Stromanschluss brauche ich?',
        answer:
          'Einen 400-V-Drehstromanschluss mit 32-A-CEE-Steckdose und eigener Absicherung. Ein Schuko-Anschluss reicht nicht. Der Anlaufstrom liegt deutlich über der Dauerleistung – die Zuleitung muss entsprechend dimensioniert und von einer Elektrofachkraft abgenommen sein.',
      },
      {
        question: 'Wie hoch sind die Stromkosten?',
        answer:
          'Im Frischebereich (+2 bis +5 °C) etwa 3 bis 5 kW im Mittel, im Tiefkühlbetrieb (−20 °C) 6 bis 9 kW. Bei 0,30 €/kWh entspricht das rund 25 bis 65 € pro Tag – abhängig von Außentemperatur, Türöffnungen und Beladung.',
      },
      {
        question: 'Kann ich den Kühlcontainer auch mieten?',
        answer:
          'Ja. Für Veranstaltungen, Erntespitzen oder Ausfallzeiten vermieten wir tage- und wochenweise inklusive Lieferung, Anschluss und Rückholung. Fordern Sie ein Mietangebot über das Anfrageformular an.',
      },
    ],
    warrantyMonths: 12,
    related: ['40-fuss-high-cube-kuehlcontainer', '20-fuss-seecontainer-one-trip-ral-wunschfarbe'],
    keywords: [
      'Kühlcontainer 20 Fuß',
      'Reefer Container kaufen',
      'Kühlcontainer mieten',
      'Tiefkühlcontainer',
    ],
    featured: true,
    bestseller: false,
    updatedAt: '2026-07-21',
    seo: {
      title: '20 Fuß Kühlcontainer kaufen – Reefer −25 °C bis +25 °C',
      description:
        '20 Fuß Kühlcontainer (Reefer): −25 bis +25 °C, Edelstahl-Innenraum, T-Profil-Aluboden, geprüftes Aggregat mit PTI-Protokoll. Kauf oder Miete, deutschlandweit.',
      focusKeyword: 'Kühlcontainer 20 Fuß',
    },
  }),

  defineProduct({
    id: 'p-40-hc-reefer',
    slug: '40-fuss-high-cube-kuehlcontainer',
    sku: 'EMC-40RF-U-9010',
    name: '40 Fuß High Cube Kühlcontainer – Reefer',
    tagline: '67 m³ temperaturgeführter Raum. Für Großküchen, Handel und Erntespitzen.',
    description: [
      'Der 40-Fuß-High-Cube-Reefer ist die größte mobile Kühlzelle im Standardsortiment. Mit 67 m³ nutzbarem Volumen ersetzt er eine mittlere Kühlkammer – und lässt sich bei geändertem Bedarf einfach umsetzen.',
      'Typische Einsätze sind Erntespitzen in der Landwirtschaft, saisonale Lagerspitzen im Lebensmittelhandel, Großveranstaltungen und die Überbrückung von Ausfällen fest installierter Kälteanlagen.',
      'Das Aggregat wird vor Auslieferung im Dauerlauf geprüft; Sie erhalten das PTI-Protokoll. Innenauskleidung aus Edelstahl, Aluminium-T-Profilboden, 100 mm PU-Dämmung.',
    ],
    highlights: [
      '67 m³ temperaturgeführtes Volumen',
      '−25 °C bis +25 °C, stufenlos regelbar',
      'Edelstahlauskleidung, lebensmittelecht',
      'PTI-geprüftes Aggregat mit Protokoll',
      'Versetzbar – kein fester Kammereinbau nötig',
    ],
    categorySlugs: ['kuehlcontainer', '40-fuss-container', 'high-cube-container'],
    primaryCategory: 'kuehlcontainer',
    condition: 'generalueberholt',
    size: '40ft',
    priceNet: 1290000,
    availability: 'auf-anfrage',
    leadTimeDays: [10, 20],
    stock: 2,
    images: gallery('40ft-hc-reefer', '40 Fuß High Cube Kühlcontainer', [
      'front',
      'open',
      'interior',
      'side',
    ]),
    specs: specsFrom('40ft-hc-reefer', {
      material: materials.reefer,
      flooring: floorings.aluminium,
      ral: 'RAL 9010 Reinweiß',
    }),
    extraSpecRows: [
      { label: 'Temperaturbereich', value: '−25 °C bis +25 °C, stufenlos', group: 'aufbau' },
      { label: 'Dämmstärke', value: '100 mm PU-Sandwichpaneel', group: 'aufbau' },
      { label: 'Stromanschluss', value: '400 V Drehstrom, 32 A CEE', group: 'aufbau' },
      { label: 'Leistungsaufnahme', value: '5–14 kW je nach Zieltemperatur', group: 'aufbau' },
      {
        label: 'Prüfung',
        value: 'Pre-Trip-Inspection (PTI) mit Protokoll',
        group: 'zertifizierung',
      },
    ],
    faqs: [
      {
        question: 'Reicht ein 32-A-Anschluss für den 40-Fuß-Reefer?',
        answer:
          'In der Regel ja, sofern die Zuleitung ausreichend dimensioniert ist. Bei hohen Außentemperaturen und Tiefkühlbetrieb empfehlen wir eine eigene Absicherung mit 32 A träge und eine Leitungslänge unter 25 m. Lassen Sie die Installation von einer Elektrofachkraft prüfen.',
      },
    ],
    warrantyMonths: 12,
    related: ['20-fuss-kuehlcontainer-reefer', '40-fuss-high-cube-one-trip'],
    keywords: ['Kühlcontainer 40 Fuß', '40ft Reefer', 'großer Kühlcontainer'],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-08',
    seo: {
      title: '40 Fuß Kühlcontainer kaufen – High Cube Reefer mit 67 m³',
      description:
        '40 Fuß High Cube Kühlcontainer: 67 m³, −25 bis +25 °C, Edelstahl-Innenraum, PTI-geprüftes Aggregat. Für Handel, Landwirtschaft und Events. Deutschlandweit.',
      focusKeyword: 'Kühlcontainer 40 Fuß',
    },
  }),

  // ─────────────────────────────────────────────────────────────── Ausbau ──
  defineProduct({
    id: 'p-20-office',
    slug: '20-fuss-buerocontainer-ausgebaut',
    sku: 'EMC-20OF-N-7035',
    name: '20 Fuß Bürocontainer – ausgebaut & bezugsfertig',
    tagline: '13 m² Arbeitsfläche mit Dämmung, Heizung, Elektrik und Fenstern.',
    description: [
      'Dieser Bürocontainer kommt bezugsfertig auf Ihren Hof: gedämmt, mit Elektroinstallation, elektrischer Heizung, zwei Kunststofffenstern mit Rollladen, Außentür mit Sicherheitsschloss, Vinylboden und heller Innenverkleidung.',
      'Auf rund 13 m² finden zwei Arbeitsplätze, ein kleiner Besprechungstisch und ein Aktenschrank Platz. Für Baustellenbüros, Betriebshöfe, Pförtnerlogen oder als schnelle Erweiterung bei Raumnot ist das die pragmatischste Lösung.',
      'Der Container ist versetzbar, koppelbar und stapelbar. Mehrere Module lassen sich zu größeren Einheiten über zwei Etagen verbinden – Treppen, Podeste und Geländer liefern wir passend dazu.',
    ],
    highlights: [
      'Bezugsfertig: Dämmung, Elektrik, Heizung, Fenster, Boden',
      'Ca. 13 m² Nutzfläche für zwei Arbeitsplätze',
      '2 Kunststofffenster mit Rollladen, Außentür mit Sicherheitsschloss',
      'Koppel- und stapelbar zu größeren Einheiten',
      'Versetzbar ohne festes Fundament',
    ],
    categorySlugs: ['buerocontainer', '20-fuss-container', 'umbau-container', 'neue-container'],
    primaryCategory: 'buerocontainer',
    condition: 'neu',
    size: '20ft',
    priceNet: 790000,
    compareAtNet: 890000,
    availability: 'kurzfristig',
    leadTimeDays: [15, 25],
    stock: 3,
    images: gallery('20ft-office', '20 Fuß Bürocontainer ausgebaut', [
      'front',
      'interior',
      'side',
      'open',
      'corner',
    ]),
    specs: specsFrom('20ft', {
      material: 'Corten-Stahl mit Innendämmung und beschichteter Spanplattenverkleidung',
      flooring: floorings.vinyl,
      ral: 'RAL 7035 Lichtgrau (Außen), Weiß (Innen)',
      interior: { length: 5750, width: 2200, height: 2250 },
      volume: 28.5,
      tareWeight: 3200,
      payload: 5000,
    }),
    extraSpecRows: [
      { label: 'Nutzfläche', value: 'ca. 13 m²', group: 'abmessungen' },
      {
        label: 'Dämmung',
        value: '60 mm Mineralwolle in Wand und Decke, mit Dampfbremse',
        group: 'aufbau',
      },
      {
        label: 'Fenster',
        value: '2 × Kunststofffenster 1.000 × 1.000 mm mit Rollladen',
        group: 'aufbau',
      },
      { label: 'Tür', value: 'Stahlaußentür 875 × 2.000 mm mit Profilzylinder', group: 'aufbau' },
      {
        label: 'Elektro',
        value: '230 V, 4 Steckdosen, 2 LED-Deckenleuchten, FI-Schutzschalter',
        group: 'aufbau',
      },
      { label: 'Heizung', value: 'Elektrokonvektor 2 kW mit Thermostat', group: 'aufbau' },
      {
        label: 'Anschluss',
        value: 'CEE-Einspeisung 230 V/16 A, bauseits bereitzustellen',
        group: 'lieferung',
      },
    ],
    faqs: [
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer:
          'In der Regel ja, sobald sich Menschen dauerhaft darin aufhalten. Die Anforderungen ergeben sich aus der Landesbauordnung Ihres Bundeslandes; für temporäre Baustelleneinrichtungen gelten Erleichterungen. Klären Sie das Vorhaben frühzeitig mit dem zuständigen Bauamt.',
      },
      {
        question: 'Kann ich eine Klimaanlage nachrüsten?',
        answer:
          'Ja. Wir installieren auf Wunsch eine Split-Klimaanlage mit Wärmepumpenfunktion – sie kühlt im Sommer und heizt im Winter deutlich sparsamer als der Elektrokonvektor. Aufpreis auf Anfrage.',
      },
      {
        question: 'Ist ein Sanitärbereich möglich?',
        answer:
          'Bei 20 Fuß wird es eng, machbar ist eine WC-Kabine auf Kosten der Bürofläche. Ab 40 Fuß realisieren wir Büro plus Sanitärbereich komfortabel. Sprechen Sie uns für ein individuelles Umbauangebot an.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '40-fuss-buerocontainer-zwei-raeume',
      '20-fuss-werkstattcontainer',
      '20-fuss-sanitaercontainer',
    ],
    keywords: [
      'Bürocontainer kaufen',
      'Bürocontainer 20 Fuß',
      'Baustellenbüro',
      'Container Büro ausgebaut',
    ],
    featured: true,
    bestseller: true,
    updatedAt: '2026-07-23',
    seo: {
      title: '20 Fuß Bürocontainer kaufen – ausgebaut & bezugsfertig',
      description:
        '20 Fuß Bürocontainer: gedämmt, beheizt, mit Elektroinstallation, Fenstern und Vinylboden. 13 m² Nutzfläche, koppel- und stapelbar. Lieferung deutschlandweit.',
      focusKeyword: 'Bürocontainer 20 Fuß',
    },
  }),

  defineProduct({
    id: 'p-40-office',
    slug: '40-fuss-buerocontainer-zwei-raeume',
    sku: 'EMC-40OF-N-7035',
    name: '40 Fuß Bürocontainer – zwei Räume mit Sanitär',
    tagline: '28 m² auf zwei Zonen: Büro, Aufenthaltsraum und WC mit Waschbecken.',
    description: [
      'Der 40-Fuß-Bürocontainer bietet Platz für eine vollständige Betriebsinfrastruktur: einen Büroraum mit vier Arbeitsplätzen, einen Aufenthalts- oder Besprechungsraum und einen Sanitärbereich mit WC und Waschbecken.',
      'Der Ausbau umfasst GEG-konforme Dämmung, Elektroinstallation mit Unterverteilung, Split-Klimaanlage mit Wärmepumpenfunktion, vier Fenster mit Rollladen, zwei Außentüren, Vinylboden und Innenverkleidung.',
      'Als eigenständige Einheit ist der Container sofort einsatzbereit; für die Sanitärnutzung sind bauseits Wasser- und Abwasseranschluss bereitzustellen. Wir liefern die Planungsunterlagen für den Bauantrag mit.',
    ],
    highlights: [
      'Ca. 28 m² auf zwei getrennte Räume plus Sanitär',
      'WC mit Waschbecken und Durchlauferhitzer',
      'Split-Klimaanlage mit Wärmepumpenfunktion',
      'GEG-konforme Dämmung, 4 Fenster mit Rollladen',
      'Planungsunterlagen für den Bauantrag inklusive',
    ],
    categorySlugs: ['buerocontainer', '40-fuss-container', 'umbau-container', 'neue-container'],
    primaryCategory: 'buerocontainer',
    condition: 'neu',
    size: '40ft',
    priceNet: 1690000,
    availability: 'auf-anfrage',
    leadTimeDays: [25, 40],
    stock: 1,
    images: gallery('40ft-office', '40 Fuß Bürocontainer mit zwei Räumen', [
      'front',
      'interior',
      'side',
      'open',
    ]),
    specs: specsFrom('40ft-hc', {
      material: 'Corten-Stahl mit GEG-konformer Innendämmung und Innenverkleidung',
      flooring: floorings.vinyl,
      ral: 'RAL 7035 Lichtgrau (Außen), Weiß (Innen)',
      interior: { length: 11880, width: 2200, height: 2450 },
      volume: 64.0,
      tareWeight: 6800,
      payload: 8000,
    }),
    extraSpecRows: [
      {
        label: 'Nutzfläche',
        value: 'ca. 28 m² (Büro ca. 16 m², Aufenthalt ca. 9 m², WC ca. 3 m²)',
        group: 'abmessungen',
      },
      {
        label: 'Dämmung',
        value: '100 mm in Wand und Dach, Dampfbremse, GEG-konform',
        group: 'aufbau',
      },
      {
        label: 'Fenster',
        value: '4 × Kunststofffenster 1.200 × 1.000 mm mit Rollladen',
        group: 'aufbau',
      },
      {
        label: 'Türen',
        value: '2 × Stahlaußentür mit Profilzylinder, 2 Innentüren',
        group: 'aufbau',
      },
      {
        label: 'Elektro',
        value: '400 V Einspeisung, Unterverteilung, 12 Steckdosen, LED-Beleuchtung',
        group: 'aufbau',
      },
      {
        label: 'Klima',
        value: 'Split-Klimaanlage 3,5 kW mit Wärmepumpenfunktion',
        group: 'aufbau',
      },
      {
        label: 'Sanitär',
        value: 'WC, Waschbecken, Durchlauferhitzer; Anschlüsse bauseits',
        group: 'aufbau',
      },
    ],
    faqs: [
      {
        question: 'Welche bauseitigen Anschlüsse werden benötigt?',
        answer:
          'Ein 400-V-Einspeisepunkt (CEE 32 A), ein Trinkwasseranschluss (½ Zoll) und ein Abwasseranschluss (DN 100). Die Anschlusspunkte liegen an der Stirnseite; wir stimmen die Lage vor Fertigung mit Ihnen ab.',
      },
      {
        question: 'Wie lange dauert die Fertigung?',
        answer:
          'Für die Vollausstattung planen wir 25 bis 40 Werktage ab Auftragsbestätigung ein. Den verbindlichen Termin nennen wir mit der Auftragsbestätigung.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-buerocontainer-ausgebaut',
      '20-fuss-sanitaercontainer',
      '40-fuss-wohncontainer-vollausbau',
    ],
    keywords: [
      'Bürocontainer 40 Fuß',
      'großer Bürocontainer',
      'Container Büro mit WC',
      'Baustellenbüro 40 Fuß',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-06',
    seo: {
      title: '40 Fuß Bürocontainer kaufen – 2 Räume mit Sanitär, 28 m²',
      description:
        '40 Fuß Bürocontainer mit zwei Räumen und WC: 28 m², GEG-Dämmung, Split-Klimaanlage, 4 Fenster. Planungsunterlagen für den Bauantrag inklusive.',
      focusKeyword: 'Bürocontainer 40 Fuß',
    },
  }),

  defineProduct({
    id: 'p-20-workshop',
    slug: '20-fuss-werkstattcontainer',
    sku: 'EMC-20WS-N-6005',
    name: '20 Fuß Werkstattcontainer – mit Werkbank & Starkstrom',
    tagline: 'Mobile Werkstatt mit 400-V-Anschluss, Werkbank und Werkzeugwand.',
    description: [
      'Dieser Werkstattcontainer ist als vollwertiger Arbeitsplatz eingerichtet: 400-V-Starkstromanschluss mit Unterverteilung, sechs Schuko-Steckdosen, zwei CEE-Steckdosen, LED-Werkstattbeleuchtung, eine 2 m lange Werkbank mit Schraubstock und eine Lochplatten-Werkzeugwand.',
      'Zwei Fenster mit Gitter sorgen für Tageslicht, ein Belüftungsset für Luftaustausch beim Arbeiten. Der Boden ist mit einer öl- und lösemittelbeständigen Beschichtung versehen und lässt sich einfach reinigen.',
      'Eingesetzt wird der Container auf Baustellen, Betriebshöfen, in der Landwirtschaft und überall dort, wo eine feste Werkstatt fehlt oder eine mobile Ergänzung gebraucht wird.',
    ],
    highlights: [
      '400-V-Starkstromanschluss mit Unterverteilung',
      '2 m Werkbank mit Schraubstock und Werkzeugwand',
      'Öl- und lösemittelbeständige Bodenbeschichtung',
      'LED-Werkstattbeleuchtung, 2 Fenster mit Gitter',
      'Belüftungsset für Luftaustausch beim Arbeiten',
    ],
    categorySlugs: ['umbau-container', '20-fuss-container', 'lagercontainer', 'neue-container'],
    primaryCategory: 'umbau-container',
    condition: 'neu',
    size: '20ft',
    priceNet: 990000,
    availability: 'auf-anfrage',
    leadTimeDays: [20, 30],
    stock: 2,
    images: gallery('20ft-workshop', '20 Fuß Werkstattcontainer mit Werkbank', [
      'front',
      'interior',
      'open',
      'side',
    ]),
    specs: specsFrom('20ft', {
      material: 'Corten-Stahl, teilgedämmt, mit Innenverkleidung',
      flooring: 'Öl- und lösemittelbeständige Epoxidbeschichtung auf Sperrholz',
      ral: 'RAL 6005 Moosgrün',
      tareWeight: 3100,
      payload: 5000,
    }),
    extraSpecRows: [
      {
        label: 'Elektro',
        value: '400 V/32 A CEE-Einspeisung, Unterverteilung, FI/LS',
        group: 'aufbau',
      },
      { label: 'Steckdosen', value: '6 × Schuko 230 V, 2 × CEE 400 V/16 A', group: 'aufbau' },
      {
        label: 'Werkbank',
        value: '2.000 × 700 mm, Buche-Massivplatte, Schraubstock 125 mm',
        group: 'aufbau',
      },
      { label: 'Beleuchtung', value: '4 × LED-Feuchtraumleuchte, 4.000 lm', group: 'aufbau' },
      { label: 'Belüftung', value: '4 × Lüftungsgitter mit Insektenschutz', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Kann ich Maschinen mit hohem Anlaufstrom betreiben?',
        answer:
          'Die Unterverteilung ist auf 32 A ausgelegt. Damit lassen sich übliche Werkstattmaschinen wie Säulenbohrmaschine, Kompressor oder Schweißgerät bis rund 7 kW betreiben. Für größere Verbraucher planen wir die Verteilung individuell.',
      },
      {
        question: 'Ist der Container gedämmt?',
        answer:
          'Serienmäßig ist er teilgedämmt zur Reduktion von Kondenswasser. Auf Wunsch führen wir eine Vollämmung mit Heizung aus, sodass auch im Winter komfortabel gearbeitet werden kann. Aufpreis auf Anfrage.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-buerocontainer-ausgebaut',
      '20-fuss-garage-container-rolltor',
      '20-fuss-sanitaercontainer',
    ],
    keywords: [
      'Werkstattcontainer kaufen',
      'Container Werkstatt',
      'mobile Werkstatt Container',
      'Werkstattcontainer 20 Fuß',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-02',
    seo: {
      title: 'Werkstattcontainer kaufen – 20 Fuß mit Werkbank & Starkstrom',
      description:
        '20 Fuß Werkstattcontainer: 400-V-Anschluss, Werkbank mit Schraubstock, Werkzeugwand, LED-Beleuchtung, beschichteter Boden. Mobile Werkstatt, deutschlandweit geliefert.',
      focusKeyword: 'Werkstattcontainer kaufen',
    },
  }),

  defineProduct({
    id: 'p-20-sanitary',
    slug: '20-fuss-sanitaercontainer',
    sku: 'EMC-20SN-N-9010',
    name: '20 Fuß Sanitärcontainer – Dusche, WC & Waschplatz',
    tagline: 'Komplette Sanitäreinheit für Baustellen, Events und Betriebshöfe.',
    description: [
      'Der Sanitärcontainer bringt vollwertige Sanitärausstattung dorthin, wo keine feste Installation vorhanden ist: zwei Duschkabinen, zwei WCs, zwei Waschplätze mit Spiegel und ein elektrischer Durchlauferhitzer.',
      'Alle Oberflächen sind feuchtraumtauglich ausgeführt: Wandpaneele aus beschichtetem Blech, rutschhemmender Bodenbelag mit Bodenablauf, Sanitärobjekte aus Sanitärkeramik. Die Beheizung erfolgt über einen frostsicheren Konvektor.',
      'Für den Betrieb werden bauseits Trinkwasser-, Abwasser- und Stromanschluss benötigt. Auf Wunsch liefern wir eine Variante mit integriertem Frisch- und Abwassertank für den anschlussfreien Betrieb bei Veranstaltungen.',
    ],
    highlights: [
      '2 Duschkabinen, 2 WCs, 2 Waschplätze',
      'Elektrischer Durchlauferhitzer 21 kW',
      'Feuchtraumtaugliche Paneele, rutschhemmender Boden',
      'Frostsichere Beheizung',
      'Optional mit Frisch- und Abwassertank',
    ],
    categorySlugs: ['umbau-container', '20-fuss-container', 'neue-container'],
    primaryCategory: 'umbau-container',
    condition: 'neu',
    size: '20ft',
    priceNet: 1290000,
    availability: 'auf-anfrage',
    leadTimeDays: [25, 40],
    stock: 1,
    images: gallery('20ft-sanitary', '20 Fuß Sanitärcontainer mit Dusche und WC', [
      'front',
      'interior',
      'open',
      'side',
    ]),
    specs: specsFrom('20ft', {
      material: 'Corten-Stahl, gedämmt, feuchtraumtaugliche Innenpaneele',
      flooring: 'Rutschhemmender PVC-Belag R10 mit Hohlkehle und Bodenablauf',
      ral: 'RAL 9010 Reinweiß',
      tareWeight: 3800,
      payload: 4000,
    }),
    extraSpecRows: [
      { label: 'Sanitärobjekte', value: '2 × Dusche, 2 × WC, 2 × Waschbecken', group: 'aufbau' },
      { label: 'Warmwasser', value: 'Elektro-Durchlauferhitzer 21 kW', group: 'aufbau' },
      {
        label: 'Anschlüsse',
        value: 'Trinkwasser ½ Zoll, Abwasser DN 100, 400 V/32 A',
        group: 'lieferung',
      },
      { label: 'Beheizung', value: 'Frostsicherer Konvektor mit Thermostat', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Funktioniert der Container ohne festen Wasseranschluss?',
        answer:
          'In der Standardausführung nicht. Wir bieten jedoch eine Tankvariante mit 1.000 l Frischwasser- und 1.000 l Abwassertank an, die für rund 40 bis 60 Nutzungen pro Befüllung ausreicht – ideal für Veranstaltungen.',
      },
      {
        question: 'Ist der Container winterfest?',
        answer:
          'Ja. Die Leitungen sind begleitbeheizt und die Kabine wird über einen frostsicheren Konvektor temperiert. Bei längeren Stillstandszeiten unter 0 °C empfehlen wir dennoch, die Anlage zu entleeren.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-buerocontainer-ausgebaut',
      '40-fuss-buerocontainer-zwei-raeume',
      '20-fuss-werkstattcontainer',
    ],
    keywords: [
      'Sanitärcontainer kaufen',
      'Duschcontainer',
      'WC Container',
      'Sanitärcontainer Baustelle',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-06-28',
    seo: {
      title: 'Sanitärcontainer kaufen – 20 Fuß mit Dusche, WC & Waschplatz',
      description:
        '20 Fuß Sanitärcontainer: 2 Duschen, 2 WCs, 2 Waschplätze, Durchlauferhitzer, frostsicher. Für Baustellen, Events und Betriebshöfe. Optional mit Wassertank.',
      focusKeyword: 'Sanitärcontainer kaufen',
    },
  }),

  defineProduct({
    id: 'p-40-living',
    slug: '40-fuss-wohncontainer-vollausbau',
    sku: 'EMC-40WH-N-7016',
    name: '40 Fuß Wohncontainer – Vollausbau mit Bad & Küche',
    tagline: 'Schlüsselfertige Wohneinheit auf 28 m² – GEG-konform gedämmt.',
    description: [
      'Auf Basis eines 40-Fuß-High-Cube entsteht hier eine vollwertige Wohneinheit: Wohn-/Schlafbereich, Küchenzeile mit Kochfeld, Kühlschrank und Spüle, Duschbad mit WC sowie ein Flur mit Garderobe und Technikschrank.',
      'Die Dämmung ist GEG-konform ausgeführt: 140 mm in Wand und Dach mit Dampfbremse, dreifach verglaste Fenster, gedämmte Haustür. Beheizt wird über eine Split-Wärmepumpe, ergänzt durch eine kontrollierte Wohnraumlüftung mit Wärmerückgewinnung.',
      'Wohncontainer sind ausnahmslos baugenehmigungspflichtig. Wir liefern Standsicherheitsnachweis, Wärmeschutznachweis und Ausführungspläne für Ihren Bauantrag mit und arbeiten auf Wunsch mit Ihrem Architekten zusammen.',
    ],
    highlights: [
      'Ca. 28 m² Wohnfläche, schlüsselfertig ausgebaut',
      'Küchenzeile mit Kochfeld, Kühlschrank und Spüle',
      'Duschbad mit WC und Handtuchheizkörper',
      '140 mm GEG-konforme Dämmung, Dreifachverglasung',
      'Split-Wärmepumpe und Lüftung mit Wärmerückgewinnung',
      'Statik und Planungsunterlagen für den Bauantrag inklusive',
    ],
    categorySlugs: ['wohncontainer', '40-fuss-container', 'high-cube-container', 'umbau-container'],
    primaryCategory: 'wohncontainer',
    condition: 'neu',
    size: '40ft',
    priceNet: 3890000,
    availability: 'auf-anfrage',
    leadTimeDays: [40, 70],
    stock: 1,
    images: gallery('40ft-living', '40 Fuß Wohncontainer im Vollausbau', [
      'front',
      'interior',
      'side',
      'open',
      'corner',
    ]),
    specs: specsFrom('40ft-hc', {
      material: 'Corten-Stahl mit 140 mm GEG-konformer Dämmung und Dampfbremse',
      flooring: 'Vinyl-Designboden auf Trittschall- und Dämmschicht',
      ral: 'RAL 7016 Anthrazitgrau',
      interior: { length: 11880, width: 2160, height: 2400 },
      volume: 61.6,
      tareWeight: 9500,
      payload: 5000,
    }),
    extraSpecRows: [
      { label: 'Wohnfläche', value: 'ca. 28 m²', group: 'abmessungen' },
      {
        label: 'Dämmung',
        value: '140 mm Wand und Dach, 100 mm Boden, mit Dampfbremse',
        group: 'aufbau',
      },
      {
        label: 'Fenster',
        value: '3-fach verglast, Ug 0,6 W/(m²·K), mit Rollladen',
        group: 'aufbau',
      },
      { label: 'Heizung', value: 'Split-Wärmepumpe 5 kW, SCOP > 4,0', group: 'aufbau' },
      {
        label: 'Lüftung',
        value: 'Kontrollierte Wohnraumlüftung mit Wärmerückgewinnung',
        group: 'aufbau',
      },
      {
        label: 'Küche',
        value: 'Küchenzeile 240 cm, Kochfeld, Kühlschrank, Spüle, Dunstabzug',
        group: 'aufbau',
      },
      {
        label: 'Bad',
        value: 'Dusche 90 × 90 cm, WC, Waschtisch, Handtuchheizkörper',
        group: 'aufbau',
      },
      {
        label: 'Nachweise',
        value: 'Standsicherheit, Wärmeschutz nach GEG, Ausführungspläne',
        group: 'zertifizierung',
      },
      {
        label: 'Anschlüsse',
        value: 'Wasser, Abwasser, 400 V – bauseits bereitzustellen',
        group: 'lieferung',
      },
    ],
    faqs: [
      {
        question: 'Darf ich einen Wohncontainer einfach aufstellen?',
        answer:
          'Nein. Ein Wohncontainer ist bauordnungsrechtlich ein Gebäude und benötigt eine Baugenehmigung. Erforderlich sind unter anderem Standsicherheitsnachweis, Wärmeschutznachweis und gesicherte Erschließung. Im Außenbereich nach § 35 BauGB ist eine Genehmigung nur in engen Ausnahmen möglich.',
      },
      {
        question: 'Welches Fundament wird benötigt?',
        answer:
          'Für einen dauerhaft genutzten Wohncontainer empfehlen wir Streifen- oder Punktfundamente aus Beton, frostfrei gegründet in mindestens 80 cm Tiefe. Die genaue Ausführung ergibt sich aus dem Standsicherheitsnachweis und dem Baugrundgutachten.',
      },
      {
        question: 'Wie lange dauert die Fertigung?',
        answer:
          'Für den Vollausbau planen wir 40 bis 70 Werktage ab Auftragsbestätigung ein. Parallel dazu läuft üblicherweise Ihr Baugenehmigungsverfahren – wir stimmen die Termine gemeinsam ab.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '40-fuss-buerocontainer-zwei-raeume',
      '20-fuss-sanitaercontainer',
      '40-fuss-high-cube-one-trip',
    ],
    keywords: [
      'Wohncontainer kaufen',
      'Containerhaus',
      'Container Haus kaufen',
      'Tiny House Container',
    ],
    featured: true,
    bestseller: false,
    updatedAt: '2026-07-25',
    seo: {
      title: 'Wohncontainer kaufen – 40 Fuß Vollausbau mit Bad & Küche',
      description:
        '40 Fuß Wohncontainer schlüsselfertig: 28 m², Küche, Duschbad, 140 mm GEG-Dämmung, Wärmepumpe. Statik und Planungsunterlagen für den Bauantrag inklusive.',
      focusKeyword: 'Wohncontainer kaufen',
    },
  }),

  defineProduct({
    id: 'p-20-garage',
    slug: '20-fuss-garage-container-rolltor',
    sku: 'EMC-20GA-N-7016',
    name: '20 Fuß Garagencontainer – mit elektrischem Rolltor',
    tagline: 'Abschließbarer Stellplatz für Fahrzeug, Oldtimer oder Maschinen.',
    description: [
      'Statt eine Garage zu bauen, stellen Sie eine auf. Dieser Containergarage-Umbau hat an der Stirnseite ein elektrisches Rolltor mit 2,30 m lichter Durchfahrtsbreite und 2,20 m Höhe – ausreichend für PKW, Anhänger, Quads oder kompakte Baumaschinen.',
      'Der Boden ist mit einer belastbaren Epoxidbeschichtung versehen, die Öl und Kraftstoff verträgt und sich leicht reinigen lässt. Vier Lüftungsgitter sorgen für Luftaustausch und beugen Kondenswasser vor, eine LED-Beleuchtung erhellt den Innenraum.',
      'Der Container ist versetzbar und ohne aufwendiges Fundament aufstellbar. Ob eine Baugenehmigung nötig ist, hängt vom Bundesland und der Nutzungsdauer ab – klären Sie das vorab mit dem Bauamt.',
    ],
    highlights: [
      'Elektrisches Rolltor, 2,30 × 2,20 m lichte Durchfahrt',
      'Öl- und kraftstoffbeständige Epoxid-Bodenbeschichtung',
      '4 Lüftungsgitter gegen Kondenswasser',
      'LED-Beleuchtung mit Bewegungsmelder',
      'Versetzbar, kein aufwendiges Fundament nötig',
    ],
    categorySlugs: ['umbau-container', '20-fuss-container', 'lagercontainer', 'neue-container'],
    primaryCategory: 'umbau-container',
    condition: 'neu',
    size: '20ft',
    priceNet: 749000,
    availability: 'auf-anfrage',
    leadTimeDays: [20, 35],
    stock: 2,
    images: gallery('20ft-garage', '20 Fuß Garagencontainer mit Rolltor', [
      'front',
      'open',
      'interior',
      'side',
    ]),
    specs: specsFrom('20ft', {
      material: 'Corten-Stahl, Stirnseite mit Rolltorausschnitt und Verstärkungsrahmen',
      flooring: 'Epoxidbeschichtung, öl- und kraftstoffbeständig',
      ral: 'RAL 7016 Anthrazitgrau',
      tareWeight: 2900,
      payload: 6000,
    }),
    extraSpecRows: [
      {
        label: 'Rolltor',
        value: 'Elektrisch, lichte Durchfahrt 2.300 × 2.200 mm',
        group: 'aufbau',
      },
      {
        label: 'Torantrieb',
        value: '230 V, mit Funkfernbedienung und Notentriegelung',
        group: 'aufbau',
      },
      { label: 'Beleuchtung', value: '2 × LED-Leuchte mit Bewegungsmelder', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Passt ein normaler PKW hinein?',
        answer:
          'Die lichte Durchfahrt beträgt 2,30 × 2,20 m, die Innenlänge 5,90 m. Ein Mittelklasse-PKW passt problemlos; bei Fahrzeugen über 5,50 m Länge oder 2,15 m Höhe empfehlen wir die 40-Fuß-Variante.',
      },
      {
        question: 'Brauche ich für eine Containergarage eine Baugenehmigung?',
        answer:
          'Das hängt von Bundesland, Grundfläche und Aufstellungsdauer ab. Garagen sind in mehreren Landesbauordnungen bis zu einer bestimmten Größe verfahrensfrei, im Außenbereich jedoch grundsätzlich genehmigungspflichtig. Fragen Sie vorab bei Ihrem Bauamt nach.',
      },
    ],
    warrantyMonths: 24,
    related: [
      '20-fuss-werkstattcontainer',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      'auffahrrampe-container-stahl',
    ],
    keywords: [
      'Garagencontainer',
      'Container Garage',
      'Container mit Rolltor',
      'Fahrzeugcontainer',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-06-25',
    seo: {
      title: 'Garagencontainer kaufen – 20 Fuß mit elektrischem Rolltor',
      description:
        '20 Fuß Garagencontainer mit elektrischem Rolltor: 2,30 m Durchfahrt, Epoxidboden, Belüftung, LED. Abschließbarer Stellplatz für Fahrzeuge und Maschinen.',
      focusKeyword: 'Garagencontainer',
    },
  }),

  // ────────────────────────────────────────────────────────────── Zubehör ──
  defineProduct({
    id: 'p-acc-lockbox',
    slug: 'schlosskasten-lockbox-verzinkt',
    sku: 'EMC-ACC-LB01',
    name: 'Schlosskasten (Lockbox) – feuerverzinkt',
    tagline: 'Umschließt das Vorhängeschloss vollständig. Die wirksamste einfache Sicherung.',
    description: [
      'Der Schlosskasten wird über die rechte Türhälfte geschweißt und umschließt das Vorhängeschloss von allen Seiten. Ein Bolzenschneider findet keine Angriffsfläche mehr – das ist die wirksamste einfache Aufbruchsicherung für Seecontainer.',
      'Der Kasten besteht aus 4 mm Stahlblech und ist feuerverzinkt, um Korrosion an der Schweißnaht vorzubeugen. Er passt auf alle ISO-Standardcontainer mit üblicher Verriegelungsstangenanordnung.',
      'Auf Wunsch schweißen wir den Schlosskasten vor Auslieferung an. Bestellen Sie ihn zusammen mit einem Container, entfällt die separate Versandpauschale.',
    ],
    highlights: [
      '4 mm Stahlblech, feuerverzinkt',
      'Umschließt das Schloss vollständig',
      'Passt auf alle ISO-Standardcontainer',
      'Montage bei Anlieferung möglich',
      'Kein separater Versand bei Kombibestellung',
    ],
    categorySlugs: ['container-zubehoer'],
    primaryCategory: 'container-zubehoer',
    condition: 'neu',
    size: 'sonder',
    priceNet: 8900,
    compareAtNet: 10900,
    availability: 'auf-lager',
    leadTimeDays: [2, 4],
    stock: 62,
    images: gallery('acc-lockbox', 'Feuerverzinkter Schlosskasten für Seecontainer', [
      'front',
      'side',
      'corner',
    ]),
    specs: {
      exterior: { length: 230, width: 180, height: 200 },
      material: '4 mm Stahlblech, feuerverzinkt nach DIN EN ISO 1461',
      csc: false,
      wwt: false,
    },
    extraSpecRows: [
      { label: 'Montage', value: 'Anschweißen an die rechte Türhälfte', group: 'aufbau' },
      {
        label: 'Passendes Schloss',
        value: 'Vorhangschloss mit verdecktem Bügel, Ø bis 70 mm',
        group: 'aufbau',
      },
      { label: 'Gewicht', value: '3,8 kg', group: 'gewicht' },
    ],
    faqs: [
      {
        question: 'Welches Schloss passt in den Schlosskasten?',
        answer:
          'Ein Vorhangschloss mit verdecktem Bügel (Discus- oder Puck-Schloss) bis 70 mm Durchmesser. Wir empfehlen ein Modell der Schutzklasse VdS – die Kombination aus Schlosskasten und hochwertigem Schloss hält gängigen Aufbruchversuchen stand.',
      },
      {
        question: 'Kann ich den Schlosskasten selbst montieren?',
        answer:
          'Nur mit Schweißgerät und entsprechender Erfahrung. Wir empfehlen die Montage durch uns bei der Anlieferung – dann sitzt der Kasten passgenau und die Schweißnaht wird fachgerecht versiegelt.',
      },
    ],
    warrantyMonths: 24,
    related: [
      'belueftungsgitter-set-4-stueck',
      '20-fuss-seecontainer-gebraucht-blau',
      'fundamentbloecke-set-8-stueck',
    ],
    keywords: [
      'Schlosskasten Container',
      'Lockbox Container',
      'Container sichern',
      'Containerschloss',
    ],
    featured: false,
    bestseller: true,
    updatedAt: '2026-07-10',
    seo: {
      title: 'Schlosskasten für Container kaufen – Lockbox feuerverzinkt',
      description:
        'Schlosskasten (Lockbox) aus 4 mm Stahl, feuerverzinkt. Umschließt das Vorhängeschloss vollständig und schützt vor Bolzenschneidern. Montage bei Anlieferung möglich.',
      focusKeyword: 'Schlosskasten Container',
    },
  }),

  defineProduct({
    id: 'p-acc-vents',
    slug: 'belueftungsgitter-set-4-stueck',
    sku: 'EMC-ACC-VT04',
    name: 'Belüftungsgitter-Set – 4 Stück mit Insektenschutz',
    tagline: 'Querlüftung gegen Kondenswasser. Der wirksamste Schutz für Ihr Lagergut.',
    description: [
      'Kondenswasser ist das häufigste Problem in ungedämmten Containern: Warme, feuchte Luft schlägt sich an der kalten Stahldecke nieder und tropft auf das Lagergut. Belüftungsgitter schaffen permanenten Luftaustausch und senken die Luftfeuchtigkeit deutlich.',
      'Das Set enthält vier Gitter aus Aluminium mit integriertem Insektenschutz und Regenabweiser. Montiert werden sie im oberen Wandbereich, diagonal versetzt auf beiden Längsseiten – so entsteht eine wirksame Querlüftung.',
      'Für einen 20-Fuß-Container ist ein Set ausreichend, für 40 Fuß empfehlen wir zwei. Montage auf Wunsch bei der Anlieferung durch unser Team.',
    ],
    highlights: [
      '4 Aluminiumgitter mit Insektenschutz und Regenabweiser',
      'Reduziert Kondenswasserbildung deutlich',
      'Passend für einen 20-Fuß-Container',
      'Korrosionsfrei, wartungsfrei',
      'Montage bei Anlieferung möglich',
    ],
    categorySlugs: ['container-zubehoer'],
    primaryCategory: 'container-zubehoer',
    condition: 'neu',
    size: 'sonder',
    priceNet: 14900,
    availability: 'auf-lager',
    leadTimeDays: [2, 4],
    stock: 38,
    images: gallery('acc-vents', 'Belüftungsgitter-Set für Seecontainer', [
      'front',
      'side',
      'corner',
    ]),
    specs: {
      exterior: { length: 300, width: 60, height: 200 },
      material: 'Aluminium, eloxiert, mit Edelstahl-Insektenschutzgitter',
      csc: false,
      wwt: false,
    },
    extraSpecRows: [
      { label: 'Lieferumfang', value: '4 Gitter inkl. Dichtband und Schrauben', group: 'aufbau' },
      { label: 'Freier Querschnitt', value: 'ca. 180 cm² je Gitter', group: 'aufbau' },
      { label: 'Empfehlung', value: '1 Set für 20 Fuß, 2 Sets für 40 Fuß', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Wo werden die Gitter montiert?',
        answer:
          'Im oberen Wandbereich beider Längsseiten, diagonal versetzt. So strömt die Luft quer durch den Container und die warme, feuchte Luft kann oben entweichen. Zwei Gitter je Längsseite sind für 20 Fuß ausreichend.',
      },
      {
        question: 'Kommt durch die Gitter Regen hinein?',
        answer:
          'Nein. Die Gitter haben einen abgewinkelten Regenabweiser und ein Insektenschutznetz. Bei starkem Schlagregen kann in Ausnahmefällen etwas Feuchtigkeit eindringen – deshalb montieren wir sie im oberen Drittel der Wand.',
      },
    ],
    warrantyMonths: 24,
    related: [
      'schlosskasten-lockbox-verzinkt',
      'luftentfeuchter-granulat-container',
      '20-fuss-seecontainer-gebraucht-blau',
    ],
    keywords: [
      'Belüftungsgitter Container',
      'Container Belüftung',
      'Kondenswasser Container',
      'Lüftungsgitter Seecontainer',
    ],
    featured: false,
    bestseller: true,
    updatedAt: '2026-07-10',
    seo: {
      title: 'Belüftungsgitter für Container kaufen – 4er-Set gegen Kondenswasser',
      description:
        'Belüftungsgitter-Set mit 4 Aluminiumgittern, Insektenschutz und Regenabweiser. Schafft Querlüftung und reduziert Kondenswasser im Seecontainer wirksam.',
      focusKeyword: 'Belüftungsgitter Container',
    },
  }),

  defineProduct({
    id: 'p-acc-shelving',
    slug: 'regalsystem-container-20-fuss',
    sku: 'EMC-ACC-RG20',
    name: 'Regalsystem für 20-Fuß-Container – beidseitig',
    tagline: 'Aus Volumen wird nutzbare Ordnung: 24 lfm Regalfläche auf beiden Längsseiten.',
    description: [
      'Ein leerer Container ist ein großer Haufen. Mit einem Regalsystem entlang beider Längswände entstehen 24 laufende Meter Ablagefläche auf vier Ebenen – Werkzeug, Ersatzteile, Kleinteile und Verbrauchsmaterial finden ihren festen Platz.',
      'Die Regalschienen werden direkt an den Wandprofilen verschraubt, ohne die Außenhaut zu durchbohren. Die Fachböden aus verzinktem Stahlblech tragen je 150 kg gleichmäßig verteilt und sind in der Höhe versetzbar.',
      'Das Set ist auf die Innenmaße eines 20-Fuß-Standardcontainers eingemessen. Für High-Cube- und 40-Fuß-Container liefern wir angepasste Varianten.',
    ],
    highlights: [
      '24 lfm Regalfläche auf 4 Ebenen',
      '150 kg Traglast je Fachboden',
      'Montage ohne Durchbohren der Außenhaut',
      'Fachböden höhenversetzbar',
      'Passgenau für 20-Fuß-Standardcontainer',
    ],
    categorySlugs: ['container-zubehoer', 'lagercontainer'],
    primaryCategory: 'container-zubehoer',
    condition: 'neu',
    size: 'sonder',
    priceNet: 89000,
    compareAtNet: 99000,
    availability: 'auf-lager',
    leadTimeDays: [4, 8],
    stock: 12,
    images: gallery('acc-shelving', 'Regalsystem für 20-Fuß-Container', [
      'front',
      'interior',
      'side',
    ]),
    specs: {
      exterior: { length: 5800, width: 500, height: 2200 },
      material: 'Verzinkter Stahl, Fachböden aus 1,5 mm Stahlblech',
      csc: false,
      wwt: false,
    },
    extraSpecRows: [
      { label: 'Regalfläche', value: '24 lfm auf 4 Ebenen, beidseitig', group: 'abmessungen' },
      { label: 'Fachbodentiefe', value: '500 mm', group: 'abmessungen' },
      { label: 'Traglast', value: '150 kg je Fachboden, gleichmäßig verteilt', group: 'gewicht' },
      {
        label: 'Montage',
        value: 'Verschraubt an den Wandprofilen, ohne Durchbohren',
        group: 'aufbau',
      },
    ],
    faqs: [
      {
        question: 'Passt das Regalsystem auch in einen High Cube?',
        answer:
          'Das Standardset ist für 2,39 m Innenhöhe ausgelegt. Für High-Cube-Container mit 2,70 m liefern wir eine Variante mit fünf statt vier Ebenen – dadurch steigt die Regalfläche auf 30 lfm.',
      },
    ],
    warrantyMonths: 24,
    related: [
      'schlosskasten-lockbox-verzinkt',
      'belueftungsgitter-set-4-stueck',
      '20-fuss-seecontainer-gebraucht-blau',
    ],
    keywords: [
      'Regalsystem Container',
      'Container Regal',
      'Lagerregal Seecontainer',
      'Containereinrichtung',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-04',
    seo: {
      title: 'Regalsystem für Container kaufen – 20 Fuß, beidseitig, 24 lfm',
      description:
        'Regalsystem für 20-Fuß-Container: 24 lfm auf 4 Ebenen, 150 kg Traglast je Boden, Montage ohne Durchbohren der Außenhaut. Passgenau eingemessen.',
      focusKeyword: 'Regalsystem Container',
    },
  }),

  defineProduct({
    id: 'p-acc-foundation',
    slug: 'fundamentbloecke-set-8-stueck',
    sku: 'EMC-ACC-FB08',
    name: 'Fundamentblöcke – Set mit 8 Stück',
    tagline: 'Container waagerecht und trocken aufstellen. Höhenausgleich inklusive.',
    description: [
      'Ein Container muss waagerecht stehen, sonst verwindet sich der Rahmen und die Türen schließen nicht mehr sauber. Fundamentblöcke aus Beton bilden tragfähige Punktauflager unter den Eckbeschlägen und halten den Container gleichzeitig vom feuchten Boden fern.',
      'Das Set enthält acht Blöcke: vier für die Eckbeschläge und vier zum Höhenausgleich bei unebenem Untergrund. Jeder Block trägt bis zu 12 Tonnen und hat eine rutschhemmende Oberfläche.',
      'Für einen 20-Fuß-Container genügen vier Auflagepunkte, für 40 Fuß empfehlen wir sechs bis acht, um ein Durchhängen in der Mitte zu vermeiden.',
    ],
    highlights: [
      '8 Betonblöcke, je 12 t Traglast',
      'Hält den Container trocken und waagerecht',
      'Rutschhemmende Auflagefläche',
      'Für Höhenausgleich stapelbar',
      'Kein aufwendiges Betonfundament nötig',
    ],
    categorySlugs: ['container-zubehoer'],
    primaryCategory: 'container-zubehoer',
    condition: 'neu',
    size: 'sonder',
    priceNet: 32000,
    availability: 'auf-lager',
    leadTimeDays: [3, 6],
    stock: 24,
    images: gallery('acc-foundation', 'Fundamentblöcke für Seecontainer', [
      'front',
      'side',
      'corner',
    ]),
    specs: {
      exterior: { length: 400, width: 400, height: 200 },
      material: 'Stahlbeton C35/45, frostbeständig',
      csc: false,
      wwt: false,
    },
    extraSpecRows: [
      { label: 'Maße je Block', value: '400 × 400 × 200 mm', group: 'abmessungen' },
      { label: 'Traglast je Block', value: '12 t', group: 'gewicht' },
      { label: 'Gewicht je Block', value: '68 kg', group: 'gewicht' },
      { label: 'Empfehlung', value: '4 Blöcke für 20 Fuß, 6–8 für 40 Fuß', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Reichen vier Blöcke für einen 40-Fuß-Container?',
        answer:
          'Statisch trägt der Container über die vier Eckbeschläge. Bei 12 m Länge und schwerer Beladung empfehlen wir jedoch zusätzliche Auflagepunkte in den Drittelspunkten, um ein Durchbiegen des Bodenrahmens zu vermeiden.',
      },
    ],
    warrantyMonths: 24,
    related: [
      'schlosskasten-lockbox-verzinkt',
      'auffahrrampe-container-stahl',
      '20-fuss-seecontainer-gebraucht-blau',
    ],
    keywords: [
      'Fundamentblöcke Container',
      'Container aufstellen',
      'Containerfundament',
      'Punktfundament Container',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-03',
    seo: {
      title: 'Fundamentblöcke für Container kaufen – 8er-Set, 12 t Traglast',
      description:
        'Fundamentblöcke aus Stahlbeton für Seecontainer: 8er-Set, je 12 t Traglast, frostbeständig. Container waagerecht und trocken aufstellen ohne Betonfundament.',
      focusKeyword: 'Fundamentblöcke Container',
    },
  }),

  defineProduct({
    id: 'p-acc-ramp',
    slug: 'auffahrrampe-container-stahl',
    sku: 'EMC-ACC-RP01',
    name: 'Auffahrrampe für Container – Stahl, 3 t',
    tagline: 'Mit Hubwagen oder Ameise direkt in den Container fahren.',
    description: [
      'Die Türschwelle eines Seecontainers liegt rund 15 cm über dem Boden – für einen Hubwagen ein unüberwindliches Hindernis. Die Auffahrrampe überbrückt diesen Absatz mit flachem Anlaufwinkel und trägt bis zu drei Tonnen.',
      'Gefertigt aus verzinktem Stahl mit rutschhemmender Riffelblechauflage und seitlicher Abrollsicherung. Zwei Handgriffe erleichtern das Umsetzen; die Rampe lässt sich bei Nichtgebrauch platzsparend an die Wand stellen.',
      'Passend für alle ISO-Standardcontainer. Auf Wunsch fertigen wir Sonderlängen für höhere Aufstellungen auf Fundamentblöcken.',
    ],
    highlights: [
      '3 t Traglast, für Hubwagen und Ameise',
      'Rutschhemmendes Riffelblech, verzinkt',
      'Seitliche Abrollsicherung',
      'Mit Handgriffen zum Umsetzen',
      'Sonderlängen auf Anfrage',
    ],
    categorySlugs: ['container-zubehoer', 'lagercontainer'],
    primaryCategory: 'container-zubehoer',
    condition: 'neu',
    size: 'sonder',
    priceNet: 54000,
    availability: 'auf-lager',
    leadTimeDays: [3, 6],
    stock: 16,
    images: gallery('acc-ramp', 'Auffahrrampe aus Stahl für Seecontainer', [
      'front',
      'side',
      'corner',
    ]),
    specs: {
      exterior: { length: 1500, width: 1250, height: 160 },
      material: 'Verzinkter Stahl mit Riffelblechauflage',
      csc: false,
      wwt: false,
    },
    extraSpecRows: [
      { label: 'Traglast', value: '3.000 kg', group: 'gewicht' },
      { label: 'Eigengewicht', value: '84 kg', group: 'gewicht' },
      { label: 'Nutzbreite', value: '1.250 mm', group: 'abmessungen' },
      { label: 'Überbrückte Höhe', value: 'bis 160 mm', group: 'abmessungen' },
    ],
    faqs: [
      {
        question: 'Passt die Rampe, wenn der Container auf Fundamentblöcken steht?',
        answer:
          'Die Standardrampe überbrückt bis zu 160 mm. Steht der Container auf 200 mm hohen Fundamentblöcken, liegt die Schwelle bei rund 360 mm – dafür fertigen wir eine längere Sonderrampe. Nennen Sie uns die tatsächliche Höhe.',
      },
    ],
    warrantyMonths: 24,
    related: [
      'fundamentbloecke-set-8-stueck',
      'regalsystem-container-20-fuss',
      '20-fuss-seecontainer-gebraucht-blau',
    ],
    keywords: [
      'Auffahrrampe Container',
      'Container Rampe',
      'Hubwagenrampe',
      'Ladebrücke Container',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-07-01',
    seo: {
      title: 'Auffahrrampe für Container kaufen – Stahl, 3 t Traglast',
      description:
        'Auffahrrampe aus verzinktem Stahl für Seecontainer: 3 t Traglast, rutschhemmendes Riffelblech, Abrollsicherung. Mit Hubwagen direkt in den Container.',
      focusKeyword: 'Auffahrrampe Container',
    },
  }),

  defineProduct({
    id: 'p-acc-dehumidifier',
    slug: 'luftentfeuchter-granulat-container',
    sku: 'EMC-ACC-DH06',
    name: 'Container-Luftentfeuchter – 6er-Set à 1 kg',
    tagline: 'Bindet bis zu 3 Liter Feuchtigkeit je Beutel. Schutz für empfindliches Lagergut.',
    description: [
      'Wo Belüftung allein nicht ausreicht – etwa bei Elektronik, Akten, Textilien oder Oldtimern – bindet Calciumchlorid-Granulat aktiv Feuchtigkeit aus der Luft. Ein Beutel nimmt bis zum Dreifachen seines Eigengewichts an Wasser auf.',
      'Das Set enthält sechs Beutel à 1 kg mit integriertem Auffangbehälter, sodass die gebundene Flüssigkeit nicht auslaufen kann. Aufgehängt werden sie an den Zurrösen im oberen Wandbereich.',
      'Die Standzeit beträgt je nach Luftfeuchtigkeit und Temperatur zwei bis vier Monate. In Kombination mit Belüftungsgittern erreichen Sie dauerhaft niedrige Feuchtewerte.',
    ],
    highlights: [
      '6 Beutel à 1 kg Calciumchlorid-Granulat',
      'Bindet bis zu 3 l Feuchtigkeit je Beutel',
      'Integrierter Auffangbehälter – kein Auslaufen',
      'Standzeit 2–4 Monate',
      'Ideal in Kombination mit Belüftungsgittern',
    ],
    categorySlugs: ['container-zubehoer', 'lagercontainer'],
    primaryCategory: 'container-zubehoer',
    condition: 'neu',
    size: 'sonder',
    priceNet: 6900,
    availability: 'auf-lager',
    leadTimeDays: [2, 4],
    stock: 85,
    images: gallery('acc-dehumidifier', 'Container-Luftentfeuchter Granulatbeutel', [
      'front',
      'side',
    ]),
    specs: {
      exterior: { length: 300, width: 180, height: 80 },
      material: 'Calciumchlorid-Granulat in PE-Vliesbeutel mit Auffangbehälter',
      csc: false,
      wwt: false,
    },
    extraSpecRows: [
      { label: 'Inhalt je Beutel', value: '1 kg Granulat', group: 'aufbau' },
      { label: 'Aufnahmekapazität', value: 'bis 3 l je Beutel', group: 'aufbau' },
      { label: 'Standzeit', value: '2–4 Monate je nach Klima', group: 'aufbau' },
      { label: 'Empfehlung', value: '3 Beutel je 20-Fuß-Container', group: 'aufbau' },
    ],
    faqs: [
      {
        question: 'Ersetzt das Granulat eine Belüftung?',
        answer:
          'Nein, beides ergänzt sich. Belüftungsgitter sorgen für dauerhaften Luftaustausch, das Granulat senkt die absolute Feuchte im geschlossenen Raum. Bei empfindlichem Lagergut empfehlen wir beides zusammen.',
      },
    ],
    warrantyMonths: 12,
    related: ['belueftungsgitter-set-4-stueck', 'schlosskasten-lockbox-verzinkt'],
    keywords: [
      'Luftentfeuchter Container',
      'Container Feuchtigkeit',
      'Trockenmittel Container',
      'Kondenswasser vermeiden',
    ],
    featured: false,
    bestseller: false,
    updatedAt: '2026-06-27',
    seo: {
      title: 'Luftentfeuchter für Container kaufen – 6er-Set Granulat',
      description:
        'Container-Luftentfeuchter mit Calciumchlorid-Granulat: 6 Beutel à 1 kg, bindet bis 3 l je Beutel, Auffangbehälter integriert. Schutz vor Kondenswasserschäden.',
      focusKeyword: 'Luftentfeuchter Container',
    },
  }),
];

export const productsBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return productsBySlug.get(slug);
}

export function productsInCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlugs.includes(categorySlug));
}

export function featuredProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function bestsellers(limit = 8): Product[] {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

export function productsBySize(size: SizeSlug): Product[] {
  return products.filter((p) => p.size === size);
}

export function relatedProducts(slug: string, limit = 4): Product[] {
  const product = getProduct(slug);
  if (!product) return [];

  const explicit = product.related
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p) && p!.slug !== slug);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Auffüllen mit Produkten aus derselben Primärkategorie
  const fallback = products.filter(
    (p) =>
      p.slug !== slug &&
      !explicit.some((e) => e.slug === p.slug) &&
      p.categorySlugs.some((c) => product.categorySlugs.includes(c)),
  );

  return [...explicit, ...fallback].slice(0, limit);
}

/**
 * Günstigster Nettopreis einer Kategorie – Grundlage für „ab X €"-Angaben.
 *
 * Zubehör bleibt ausgeschlossen, sobald die Kategorie auch Container enthält.
 * Andernfalls erschiene ein Luftentfeuchter für 69 € als Einstiegspreis eines
 * Lagercontainers – eine irreführende Preisangabe im Sinne der PAngV. In der
 * reinen Zubehörkategorie zählt Zubehör dagegen ganz normal mit.
 */
export function lowestPriceInCategory(categorySlug: string): number | null {
  const inCategory = productsInCategory(categorySlug);
  if (inCategory.length === 0) return null;

  const containers = inCategory.filter((p) => p.size !== 'sonder');
  const relevant = containers.length > 0 ? containers : inCategory;

  return Math.min(...relevant.map((p) => p.priceNet));
}

/** Preisspanne über das gesamte Sortiment, inklusive Zubehör. */
export const priceRange = {
  min: Math.min(...products.map((p) => p.priceNet)),
  max: Math.max(...products.map((p) => p.priceNet)),
};

/**
 * Preisspanne ausschließlich für Container.
 *
 * Für „Container ab X €"-Aussagen zwingend erforderlich: Zubehör wie
 * Schlosskästen oder Luftentfeuchter kostet einen Bruchteil eines Containers.
 * Würde man es einbeziehen, entstünde eine irreführende Preisangabe.
 */
const containerProducts = products.filter((p) => p.size !== 'sonder');

export const containerPriceRange = {
  min: Math.min(...containerProducts.map((p) => p.priceNet)),
  max: Math.max(...containerProducts.map((p) => p.priceNet)),
};
