import type { LandingPage } from './types.ts';

/**
 * SEO-Landingpages für kaufstarke Suchintentionen. Diese Seiten liegen auf
 * Root-Ebene (z. B. /seecontainer-kaufen), weil das für transaktionale
 * Keywords die kürzeste und stärkste URL-Struktur ist.
 */
export const landingPages: LandingPage[] = [
  {
    slug: 'seecontainer-kaufen',
    kicker: 'Deutschlandweit geliefert',
    h1: 'Seecontainer kaufen – neu, One-Trip und gebraucht',
    intro: [
      'Ein Seecontainer ist die schnellste Antwort auf fehlenden Lagerraum. Er ist sofort verfügbar, benötigt kein Fundament, ist abschließbar, wetterfest und lässt sich jederzeit wieder umsetzen oder verkaufen. Bei EMC Container erhalten Sie ihn zum Festpreis inklusive Anlieferung – ohne versteckte Zuschläge.',
      'Wir führen alle gängigen Größen von 10 bis 45 Fuß in allen Zuständen: fabrikneu in Wunschfarbe, One-Trip mit nur einer Seereise oder geprüft wind- und wasserdicht als Gebrauchtcontainer. Jede Einheit trägt eine gültige CSC-Plakette nach ISO 6346.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      '40-fuss-high-cube-one-trip',
      '10-fuss-seecontainer-gebraucht',
    ],
    categorySlugs: [
      '20-fuss-container',
      '40-fuss-container',
      'gebrauchte-container',
      'neue-container',
    ],
    sections: [
      {
        heading: 'Welcher Seecontainer passt zu Ihnen?',
        body: [
          'Die Entscheidung fällt in drei Schritten: Größe, Zustand, Bauart. Bei der Größe gilt die Faustregel, dass ein 20-Fuß-Container mit 33 m³ den Hausrat einer Drei-Zimmer-Wohnung fasst, während ein 40-Fuß-Container mit 68 m³ das Doppelte bietet. Wenn der Platz knapp ist, bleibt der 10-Fuß-Container mit knapp drei Metern Länge.',
          'Beim Zustand entscheidet der Aufstellort: Steht der Container sichtbar vor dem Betriebsgebäude, lohnt der Aufpreis für One-Trip oder Neuware. Verschwindet er hinter der Halle, ist ein geprüfter Gebrauchtcontainer die wirtschaftlichere Wahl.',
          'Die Bauart richtet sich nach dem Zugriff: Wer täglich Material entnimmt, profitiert von einer Seitentür. Wer Langgut lagert oder nach FIFO arbeitet, wählt den Doppeltürcontainer. Für alles andere genügt der Standardcontainer mit Stirntür.',
        ],
      },
      {
        heading: 'Was kostet ein Seecontainer in Deutschland?',
        body: [
          'Gebrauchte 20-Fuß-Container beginnen bei rund 1.190 € netto, One-Trip-Einheiten in Wunschfarbe bei etwa 2.590 € netto. Ein 40-Fuß-High-Cube liegt neuwertig bei rund 4.490 € netto, gebraucht ab 2.190 € netto. Kleine 10-Fuß-Container starten bei 1.590 € netto.',
          'Zum Kaufpreis kommt die Lieferpauschale, die sich nach Postleitzahl und Containerlänge richtet. Sie liegt zwischen 390 € und 590 € netto für einen 20-Fuß-Container. Ab 9.500 € netto Warenwert liefern wir deutschlandweit versandkostenfrei.',
          'Alle Preise sind Festpreise. Nach Vertragsabschluss kommen keine Zuschläge hinzu – weder für Kranstellung noch für Wartezeiten, sofern die im Vorfeld abgestimmten Bedingungen am Aufstellort vorliegen.',
        ],
      },
      {
        heading: 'Lieferung und Aufstellung',
        body: [
          'Wir liefern in ganz Deutschland per Absetzkipper oder Kranfahrzeug. Der Fahrer setzt den Container an der gewünschten Position ab; ein Kran ist nur nötig, wenn die Stellfläche nicht direkt anfahrbar ist.',
          'Erforderlich sind eine befestigte, tragfähige Fläche, eine Zufahrtsbreite ab 3,5 m (20 Fuß) bzw. ab 4,0 m (40 Fuß) und eine hindernisfreie Höhe von 4,2 m. Vier Punktauflager unter den Eckbeschlägen genügen als Unterbau – ein Betonfundament ist nicht erforderlich.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein Seecontainer?',
        answer:
          'Gebrauchte 20-Fuß-Container starten bei rund 1.190 € netto, One-Trip-Container bei etwa 2.590 € netto. 40-Fuß-High-Cube-Container liegen zwischen 2.190 € (gebraucht) und 4.490 € netto (One-Trip). Hinzu kommt eine Lieferpauschale von 390 bis 590 € netto je nach Postleitzahl.',
      },
      {
        question: 'Wie lange dauert die Lieferung?',
        answer:
          'Lagerware liefern wir innerhalb von 3 bis 7 Werktagen deutschlandweit. Container mit individueller Lackierung oder Sonderausstattung benötigen 10 bis 20 Werktage. Den verbindlichen Termin stimmen wir nach Zahlungseingang telefonisch mit Ihnen ab.',
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer:
          'Für die reine Lagernutzung ist ein Container in vielen Bundesländern bis zu einer bestimmten Größe verfahrensfrei – die Grenzen unterscheiden sich je Landesbauordnung. Sobald der Container dem Aufenthalt von Menschen dient, dauerhaft aufgestellt wird oder im Außenbereich steht, ist eine Genehmigung erforderlich. Klären Sie das vorab mit Ihrem Bauamt.',
      },
      {
        question: 'Ist ein Fundament erforderlich?',
        answer:
          'Nein. Der Container trägt sein Gewicht über die vier Eckbeschläge. Vier tragfähige Punktauflager – etwa Betonplatten oder unsere Fundamentblöcke – genügen. Wichtig ist eine waagerechte Aufstellung, damit die Türen sauber schließen.',
      },
      {
        question: 'Wie lange hält ein Seecontainer?',
        answer:
          'Seecontainer sind für 15 bis 20 Jahre Seeeinsatz ausgelegt. Als stationärer Lagerraum an Land, wo Salzwasser und mechanische Belastung entfallen, halten sie bei gelegentlicher Pflege deutlich länger – 25 bis 30 Jahre sind realistisch.',
      },
    ],
    seo: {
      title: 'Seecontainer kaufen – neu & gebraucht ab 1.190 € | EMC Container',
      description:
        'Seecontainer kaufen bei EMC Container: 10, 20, 40 und 45 Fuß, neu, One-Trip und gebraucht. CSC-zertifiziert, Festpreis inkl. Lieferung, deutschlandweite Anlieferung.',
      focusKeyword: 'Seecontainer kaufen',
      secondaryKeywords: [
        'Schiffscontainer kaufen',
        'Seecontainer Preise',
        'ISO Container kaufen',
        'Container kaufen Deutschland',
      ],
    },
  },
  {
    slug: 'container-kaufen',
    kicker: 'Über 25 Modelle ab Lager',
    h1: 'Container kaufen in Deutschland – Lager, Büro, Kühlung & Umbau',
    intro: [
      'Ob Lagerfläche, Baustellenbüro, Werkstatt oder Kühlzelle: Der Container ist die schnellste Möglichkeit, nutzbaren Raum zu schaffen. Er ist in Tagen statt Monaten verfügbar, benötigt keine aufwendige Gründung und behält als Sachwert seinen Wiederverkaufswert.',
      'Bei EMC Container finden Sie das gesamte Spektrum: vom einfachen Lagercontainer über Spezialbauarten mit Seiten- oder Doppeltür bis zum schlüsselfertig ausgebauten Büro-, Sanitär- oder Wohncontainer. Alles zum Festpreis mit deutschlandweiter Lieferung.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '20-fuss-buerocontainer-ausgebaut',
      '20-fuss-kuehlcontainer-reefer',
      '40-fuss-high-cube-one-trip',
    ],
    categorySlugs: ['lagercontainer', 'buerocontainer', 'kuehlcontainer', 'umbau-container'],
    sections: [
      {
        heading: 'Kaufen oder mieten – was rechnet sich?',
        body: [
          'Die Faustregel lautet: Ab einer geplanten Nutzungsdauer von 18 bis 24 Monaten ist der Kauf günstiger als die Miete. Ein 20-Fuß-Lagercontainer kostet in der Miete typischerweise 90 bis 150 € netto monatlich – nach zwei Jahren sind das 2.160 bis 3.600 €, also mehr als der Kaufpreis eines gebrauchten Containers.',
          'Hinzu kommt der Restwert: Gebrauchte Container lassen sich nach Jahren der Nutzung noch zu einem erheblichen Teil des Kaufpreises weiterverkaufen. Bei der Miete ist das Geld dagegen vollständig verbraucht.',
          'Für kurzfristigen Bedarf – Veranstaltungen, Erntespitzen, Überbrückung bei Umbauten – bleibt die Miete natürlich die richtige Wahl. Wir bieten beides an.',
        ],
      },
      {
        heading: 'Container für jeden Einsatzzweck',
        body: [
          'Lagercontainer sind die Basisvariante: wetterfest, abschließbar, sofort nutzbar. Mit Belüftungsgittern und Regalsystem wird daraus ein durchdachtes Materiallager.',
          'Bürocontainer kommen bezugsfertig – gedämmt, beheizt, mit Elektroinstallation und Fenstern. Sie sind koppel- und stapelbar und lassen sich zu größeren Einheiten kombinieren.',
          'Kühlcontainer halten Temperaturen von −25 °C bis +25 °C und ersetzen eine fest installierte Kühlkammer, wenn Flexibilität gefragt ist.',
          'Umbaucontainer entstehen nach Ihren Vorgaben in unserer Werkstatt: Werkstatt, Sanitärbereich, Garage mit Rolltor, Verkaufsstand oder Technikraum.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Ab wann lohnt sich der Kauf gegenüber der Miete?',
        answer:
          'Ab etwa 18 bis 24 Monaten Nutzungsdauer. Bei monatlichen Mietkosten von 90 bis 150 € netto für einen 20-Fuß-Container übersteigen die Mietzahlungen nach zwei Jahren bereits den Kaufpreis eines gebrauchten Containers – ohne den späteren Wiederverkaufswert zu berücksichtigen.',
      },
      {
        question: 'Welche Zahlungsarten bieten Sie an?',
        answer:
          'Vorkasse per Überweisung, SEPA-Lastschrift und – für Geschäftskunden nach Bonitätsprüfung – Kauf auf Rechnung. Bei Vorkasse gewähren wir 2 % Skonto. Zusätzlich bieten wir Finanzierung mit Laufzeiten von 12 bis 60 Monaten an.',
      },
      {
        question: 'Kann ich den Container vorher besichtigen?',
        answer:
          'Ja. Nach telefonischer Terminvereinbarung zeigen wir Ihnen die verfügbaren Einheiten an unserem Standort in Altenkirchen. Alternativ senden wir Fotos des konkreten Containers inklusive Containernummer per E-Mail.',
      },
    ],
    seo: {
      title: 'Container kaufen Deutschland – Lager, Büro & Kühlcontainer',
      description:
        'Container kaufen in Deutschland: Lager-, Büro-, Kühl- und Umbaucontainer in 10 bis 45 Fuß. Festpreis inkl. Lieferung, über 25 Modelle ab Lager. Kauf oder Miete.',
      focusKeyword: 'Container kaufen',
      secondaryKeywords: [
        'Container kaufen Deutschland',
        'Shipping Container kaufen Deutschland',
        'Container mieten',
      ],
    },
  },
  {
    slug: '20-fuss-container-kaufen',
    kicker: 'Meistverkauftes Format',
    h1: '20 Fuß Container kaufen – 33 m³ Stauraum ab 1.190 €',
    intro: [
      'Der 20-Fuß-Container ist in Deutschland das mit Abstand meistverkaufte Format. 6,06 m lang, 2,44 m breit, 33 m³ Volumen, bis zu 28 t Zuladung – und dabei kompakt genug, um mit einem normalen Absetzkipper geliefert und später umgesetzt zu werden.',
      'Er fasst rund zehn Europaletten in einer Lage oder den kompletten Hausrat einer Drei-Zimmer-Wohnung. Auf knapp 15 m² Stellfläche passt er auf nahezu jedes Gewerbegrundstück und auf viele private Grundstücke.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      '20-fuss-high-cube-one-trip',
      '20-fuss-seitentuer-container',
    ],
    categorySlugs: ['20-fuss-container', 'gebrauchte-container', 'one-trip-container'],
    sections: [
      {
        heading: 'Abmessungen im Detail',
        body: [
          'Außen misst ein 20-Fuß-Standardcontainer 6.058 × 2.438 × 2.591 mm. Innen bleiben 5.898 × 2.352 × 2.393 mm, die Türöffnung ist 2.340 mm breit und 2.280 mm hoch. Das Innenvolumen beträgt 33,2 m³, das Leergewicht 2.250 kg, die maximale Zuladung 28.230 kg.',
          'Als High Cube wächst die Außenhöhe auf 2.896 mm und die Innenhöhe auf 2.698 mm. Das Volumen steigt auf 37,4 m³ – ein Plus von rund 13 % bei identischer Stellfläche.',
        ],
      },
      {
        heading: 'Preise nach Zustand',
        body: [
          'Gebrauchte, geprüft wind- und wasserdichte 20-Fuß-Container beginnen bei 1.190 € netto. Sie haben Gebrauchsspuren, sind aber technisch einwandfrei.',
          'One-Trip-Container mit nur einer Seereise kosten ab 2.590 € netto und sind optisch nahezu neuwertig – auf Wunsch in RAL-Wunschfarbe.',
          'Spezialbauarten wie Seitentür- oder Doppeltürcontainer liegen zwischen 3.290 € und 3.890 € netto. Ausgebaute Bürocontainer starten bei 7.900 € netto.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Wie viele Europaletten passen in einen 20-Fuß-Container?',
        answer:
          'Zehn Europaletten (1,20 × 0,80 m) in einer Lage, längs in zwei Reihen angeordnet. Bei stapelfähigem Ladegut sind bis zu 20 Paletten in zwei Lagen möglich.',
      },
      {
        question: 'Wie schwer ist ein 20-Fuß-Container?',
        answer:
          'Das Leergewicht (Tara) beträgt etwa 2.250 kg beim Standardcontainer und 2.400 kg beim High Cube. Das zulässige Bruttogewicht liegt bei 30.480 kg.',
      },
      {
        question: 'Welche Zufahrt braucht die Anlieferung?',
        answer:
          'Eine befestigte Zufahrt von mindestens 3,5 m Breite, rund 15 bis 20 m gerade Anfahrt vor der Stellfläche und eine hindernisfreie Höhe von 4,2 m. Bei beengten Verhältnissen setzen wir einen Autokran ein.',
      },
    ],
    seo: {
      title: '20 Fuß Container kaufen – Seecontainer ab 1.190 € netto',
      description:
        '20 Fuß Container kaufen: 33 m³ Stauraum, neu, One-Trip und gebraucht ab 1.190 € netto. Abmessungen, Preise und Lieferbedingungen im Überblick. Deutschlandweit.',
      focusKeyword: '20 Fuß Container kaufen',
      secondaryKeywords: ['20ft Container kaufen', '20 Fuß Seecontainer Preis'],
    },
  },
  {
    slug: '40-fuss-container-kaufen',
    kicker: 'Maximales Volumen',
    h1: '40 Fuß Container kaufen – 68 m³ ab 2.190 €',
    intro: [
      'Wer viel Volumen bei geringem Gewicht lagert, fährt mit dem 40-Fuß-Container am wirtschaftlichsten. 12,19 m Länge, 67,7 m³ Volumen als Standard und 76,3 m³ als High Cube – bezogen auf den Kubikmeter Stauraum das günstigste Format überhaupt.',
      'Eingesetzt wird er als Großlager für Verpackungsmaterial, Textilien, Möbel und landwirtschaftliche Erzeugnisse sowie als bevorzugte Basis für Werkstatt-, Büro- und Wohnumbauten.',
    ],
    productSlugs: [
      '40-fuss-seecontainer-gebraucht',
      '40-fuss-high-cube-one-trip',
      '40-fuss-high-cube-seitentuer-container',
      '40-fuss-doppeltuer-container',
    ],
    categorySlugs: ['40-fuss-container', 'high-cube-container', 'gebrauchte-container'],
    sections: [
      {
        heading: 'Standard oder High Cube?',
        body: [
          'Der einzige Unterschied ist die Höhe: 2.591 mm außen beim Standard, 2.896 mm beim High Cube. Innen entspricht das 2.393 mm gegenüber 2.698 mm. Das Volumen wächst von 67,7 auf 76,3 m³.',
          'Für Palettenlagerung in einer Lage genügt der Standardcontainer. Sobald Sie ausbauen, Hochregale nutzen oder mit einem Stapler hineinfahren wollen, ist der High Cube die richtige Wahl – die 30 zusätzlichen Zentimeter entscheiden über die Nutzbarkeit.',
        ],
      },
      {
        heading: 'Anlieferung eines 40-Fuß-Containers',
        body: [
          'Der Sattelzug ist mit Auflieger rund 18 m lang und 2,55 m breit. Er benötigt etwa 25 m gerade Anfahrt und eine befestigte, tragfähige Fläche. Für das Absetzen mit dem Ladekran sind seitlich rund 6 m Arbeitsraum und 6 m hindernisfreie Höhe erforderlich.',
          'Ist die Stellfläche nicht direkt anfahrbar, setzen wir einen Autokran ein, der den Container über Hindernisse hinweg absetzt. Wir prüfen die Zufahrt vorab anhand von Kartenmaterial und stimmen den Ablauf telefonisch ab.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Wie viele Europaletten passen in einen 40-Fuß-Container?',
        answer:
          'Rund 21 Europaletten in einer Lage. Beim High Cube sind bei stapelfähigem Ladegut bis zu 42 Paletten in zwei Lagen möglich.',
      },
      {
        question: 'Kann ich einen 40-Fuß-Container später umsetzen?',
        answer:
          'Ja. Leer wiegt er etwa 3.750 kg (Standard) bzw. 3.940 kg (High Cube). Zum Umsetzen eignen sich Autokran, Reach Stacker oder Schwerlaststapler. Wir vermitteln auf Wunsch einen Partnerbetrieb in Ihrer Region.',
      },
    ],
    seo: {
      title: '40 Fuß Container kaufen – Seecontainer & High Cube ab 2.190 €',
      description:
        '40 Fuß Container kaufen: Standard mit 67,7 m³ oder High Cube mit 76,3 m³, neu und gebraucht ab 2.190 € netto. Günstigster Preis pro m³. Deutschlandweite Lieferung.',
      focusKeyword: '40 Fuß Container kaufen',
      secondaryKeywords: ['40ft Container kaufen', '40 Fuß High Cube Preis'],
    },
  },
  {
    slug: 'container-mieten',
    kicker: 'Flexibel statt gebunden',
    h1: 'Container mieten – tageweise, monatlich oder saisonal',
    intro: [
      'Nicht jeder Bedarf ist dauerhaft. Für Veranstaltungen, Erntespitzen, Baustellen mit begrenzter Laufzeit oder die Überbrückung während eines Umbaus ist die Miete die wirtschaftlichere Lösung – ohne Kapitalbindung und ohne Wiederverkauf am Ende.',
      'Wir vermieten Lager-, Büro-, Sanitär- und Kühlcontainer inklusive Anlieferung, Aufstellung und Rückholung. Die Mindestmietdauer beträgt bei Lagercontainern eine Woche, bei Kühlcontainern drei Tage.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '20-fuss-buerocontainer-ausgebaut',
      '20-fuss-kuehlcontainer-reefer',
      '20-fuss-sanitaercontainer',
    ],
    categorySlugs: ['lagercontainer', 'buerocontainer', 'kuehlcontainer'],
    sections: [
      {
        heading: 'Mietpreise im Überblick',
        body: [
          'Lagercontainer 20 Fuß: ab 89 € netto pro Monat. Lagercontainer 40 Fuß: ab 139 € netto pro Monat. Bürocontainer 20 Fuß: ab 249 € netto pro Monat. Kühlcontainer 20 Fuß: ab 39 € netto pro Tag bzw. 690 € netto pro Monat.',
          'Hinzu kommen einmalig An- und Abtransport, die sich nach Entfernung und Containergröße richten. Bei Mietdauern über sechs Monate gewähren wir Staffelrabatte.',
        ],
      },
      {
        heading: 'Miete mit Kaufoption',
        body: [
          'Wenn Sie noch nicht sicher sind, ob der Bedarf dauerhaft ist, bieten wir Mietkauf an: Bis zu zwölf Monatsmieten werden bei einem späteren Kauf vollständig auf den Kaufpreis angerechnet. So bleiben Sie flexibel, ohne Geld zu verlieren.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Wie lange ist die Mindestmietdauer?',
        answer:
          'Bei Lager- und Bürocontainern eine Woche, bei Kühlcontainern drei Tage. Für Veranstaltungen bieten wir auf Anfrage auch kürzere Zeiträume an.',
      },
      {
        question: 'Wird die Miete auf einen späteren Kauf angerechnet?',
        answer:
          'Ja. Bei unserem Mietkaufmodell rechnen wir bis zu zwölf Monatsmieten vollständig auf den Kaufpreis an, wenn Sie sich innerhalb der Mietdauer für den Kauf entscheiden.',
      },
      {
        question: 'Wer haftet für Schäden während der Mietzeit?',
        answer:
          'Der Mieter haftet für Schäden, die über die normale Abnutzung hinausgehen. Wir empfehlen den Abschluss einer Mietsachversicherung; auf Wunsch vermitteln wir eine passende Police.',
      },
    ],
    seo: {
      title: 'Container mieten – Lager, Büro & Kühlcontainer ab 89 €/Monat',
      description:
        'Container mieten in Deutschland: Lager-, Büro-, Sanitär- und Kühlcontainer ab 89 € netto/Monat. Inklusive Lieferung und Rückholung. Mietkauf mit Anrechnung möglich.',
      focusKeyword: 'Container mieten',
      secondaryKeywords: ['Lagercontainer mieten', 'Bürocontainer mieten', 'Kühlcontainer mieten'],
    },
  },
  {
    slug: 'container-preise',
    kicker: 'Transparente Kalkulation',
    h1: 'Container Preise 2026 – was kostet ein Container in Deutschland?',
    intro: [
      'Containerpreise schwanken mit den globalen Frachtströmen. Wenn viel importiert wird, steigt das Angebot an gebrauchten Einheiten und die Preise sinken; bei rückläufigem Handel wird es knapp und teurer. Diese Seite gibt Ihnen einen belastbaren Überblick über das aktuelle Preisniveau.',
      'Wichtig für die Kalkulation: Zum Containerpreis kommt immer die Lieferpauschale. Sie ist der Posten, der bei Onlineangeboten am häufigsten unterschlagen wird – und bei einem 40-Fuß-Container in eine entfernte Region schnell 600 € oder mehr ausmacht.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '10-fuss-seecontainer-gebraucht',
      '40-fuss-seecontainer-gebraucht',
      '40-fuss-high-cube-one-trip',
    ],
    categorySlugs: ['gebrauchte-container', 'one-trip-container', 'neue-container'],
    sections: [
      {
        heading: 'Preisübersicht nach Größe und Zustand',
        body: [
          '10 Fuß: gebraucht ab 1.590 €, One-Trip High Cube ab 2.290 € netto.',
          '20 Fuß Standard: gebraucht ab 1.190 €, One-Trip ab 2.590 € netto.',
          '20 Fuß High Cube: One-Trip ab 2.890 € netto.',
          '40 Fuß Standard: gebraucht ab 2.190 € netto.',
          '40 Fuß High Cube: One-Trip ab 4.490 € netto.',
          '45 Fuß High Cube: One-Trip ab 5.890 € netto.',
          'Spezialbauarten: Seitentür 20 Fuß ab 3.890 €, Doppeltür 20 Fuß ab 3.290 €, Kühlcontainer 20 Fuß ab 6.900 € netto.',
          'Ausgebaut: Bürocontainer 20 Fuß ab 7.900 €, Werkstattcontainer ab 9.900 €, Sanitärcontainer ab 12.900 €, Wohncontainer 40 Fuß ab 38.900 € netto.',
        ],
      },
      {
        heading: 'Was den Preis beeinflusst',
        body: [
          'Zustand ist der größte Hebel: Zwischen einem gebrauchten und einem fabrikneuen 20-Fuß-Container liegt der Faktor zwei bis drei. Danach folgt die Bauart – Seitentür- und Kühlcontainer sind konstruktiv aufwendiger und entsprechend teurer.',
          'Die Farbe spielt eine kleinere Rolle: Standard-RAL-Töne sind bei uns aufpreisfrei, Sonderfarbtöne kosten rund 380 € netto zusätzlich.',
          'Die Lieferentfernung schlägt mit 390 bis 590 € netto für einen 20-Fuß-Container zu Buche, bei 40 Fuß entsprechend mehr. Ab 9.500 € netto Warenwert entfällt die Lieferpauschale.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Sind die angegebenen Preise netto oder brutto?',
        answer:
          'Wir weisen im Shop beide Werte aus. Der Bruttopreis inklusive 19 % Mehrwertsteuer steht im Vordergrund, der Nettopreis wird für Geschäftskunden zusätzlich angezeigt. Auf der Rechnung ist die Mehrwertsteuer gesondert ausgewiesen.',
      },
      {
        question: 'Ist die Lieferung im Preis enthalten?',
        answer:
          'Die Lieferpauschale wird im Warenkorb anhand Ihrer Postleitzahl transparent berechnet und ausgewiesen. Ab einem Netto-Warenwert von 9.500 € liefern wir deutschlandweit versandkostenfrei.',
      },
      {
        question: 'Gibt es Mengenrabatte?',
        answer:
          'Ja. Ab drei Containern in einer Bestellung gewähren wir Staffelpreise. Sprechen Sie uns für ein individuelles Angebot an – insbesondere bei gleichzeitiger Lieferung an denselben Standort ergeben sich deutliche Einsparungen beim Transport.',
      },
    ],
    seo: {
      title: 'Container Preise 2026 – was kostet ein Seecontainer?',
      description:
        'Aktuelle Containerpreise in Deutschland: 10, 20, 40 und 45 Fuß, neu und gebraucht. Vollständige Preisübersicht inkl. Lieferkosten und Preisfaktoren. Stand 2026.',
      focusKeyword: 'Container Preise',
      secondaryKeywords: [
        'Schiffscontainer Preise',
        'Container Preis Deutschland',
        'Seecontainer Preise',
      ],
    },
  },
  {
    slug: 'container-mit-lieferung',
    kicker: 'Alles aus einer Hand',
    h1: 'Container mit Lieferung – deutschlandweit zum Festpreis',
    intro: [
      'Der Transport ist bei einem Containerkauf mindestens so wichtig wie der Container selbst. Ein Fahrzeug, das nicht auf das Grundstück kommt, oder ein Kran, der zu spät bestellt wurde, kostet mehr als jeder Preisunterschied beim Container.',
      'Deshalb liefern wir grundsätzlich selbst oder mit festen Partnerspediteuren – und prüfen die Zufahrt vor jedem Termin. Sie erhalten einen Festpreis, der Container und Anlieferung umfasst.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '40-fuss-high-cube-one-trip',
      '10-fuss-seecontainer-gebraucht',
      '20-fuss-buerocontainer-ausgebaut',
    ],
    categorySlugs: ['lagercontainer', '20-fuss-container', '40-fuss-container'],
    sections: [
      {
        heading: 'So läuft die Anlieferung ab',
        body: [
          'Nach Zahlungseingang meldet sich unsere Disposition telefonisch und stimmt einen Liefertermin ab. Am Vortag erhalten Sie ein Zeitfenster von zwei Stunden per SMS.',
          'Der Fahrer setzt den Container mit dem Absetzkipper oder dem Ladekran an der vereinbarten Position ab. Der Vorgang dauert in der Regel 20 bis 40 Minuten. Eine Person sollte vor Ort sein, um die Position freizugeben und die Übergabe zu quittieren.',
          'Ist die Stellfläche nicht direkt anfahrbar, setzen wir einen Autokran ein. Diesen bestellen wir vorab mit – der Aufpreis wird Ihnen vor Auftragsbestätigung mitgeteilt und ist Bestandteil des Festpreises.',
        ],
      },
      {
        heading: 'Was Sie vorbereiten sollten',
        body: [
          'Eine befestigte, tragfähige und möglichst ebene Stellfläche. Vier Punktauflager unter den Eckbeschlägen genügen als Unterbau.',
          'Eine freie Zufahrt ab 3,5 m Breite (20 Fuß) bzw. 4,0 m (40 Fuß), mit hindernisfreier Höhe von 4,2 m und ausreichend Rangierfläche.',
          'Keine Freileitungen, Äste oder Vordächer über der Stellfläche – der Ladekran benötigt freien Schwenkraum nach oben.',
          'Bei Aufstellung auf öffentlichem Grund: die erforderliche Sondernutzungserlaubnis. Auf Wunsch übernehmen wir die Beantragung.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet die Lieferung?',
        answer:
          'Die Lieferpauschale richtet sich nach Postleitzahl und Containerlänge und liegt für einen 20-Fuß-Container zwischen 390 und 590 € netto. Sie wird im Warenkorb transparent berechnet. Ab 9.500 € netto Warenwert liefern wir versandkostenfrei.',
      },
      {
        question: 'Muss ich bei der Anlieferung anwesend sein?',
        answer:
          'Ja, es sollte jemand vor Ort sein, der die Stellposition freigibt und die Übergabe quittiert. Ist das nicht möglich, vereinbaren wir vorab schriftlich eine genaue Stellposition und dokumentieren die Aufstellung fotografisch.',
      },
      {
        question: 'Liefern Sie auch auf unbefestigten Untergrund?',
        answer:
          'Bei trockener Witterung und tragfähigem Boden ja. Bei aufgeweichtem Untergrund besteht die Gefahr, dass das Fahrzeug einsinkt – dann verschieben wir den Termin oder liefern mit einem Autokran von befestigtem Grund aus.',
      },
    ],
    seo: {
      title: 'Container mit Lieferung – deutschlandweit zum Festpreis',
      description:
        'Container mit Lieferung kaufen: Anlieferung per Absetzkipper oder Kranfahrzeug in ganz Deutschland. Festpreis inkl. Transport, Zufahrtsprüfung vorab. So läuft es ab.',
      focusKeyword: 'Container mit Lieferung',
      secondaryKeywords: [
        'Seecontainer Lieferung',
        'Container Transport',
        'Container liefern lassen',
      ],
    },
  },
  {
    slug: 'schiffscontainer-kaufen',
    kicker: 'ISO-zertifiziert',
    h1: 'Schiffscontainer kaufen – ISO-Container für Lager und Ausbau',
    intro: [
      'Schiffscontainer, Seecontainer, ISO-Container – gemeint ist dasselbe: der genormte Stahlbehälter nach ISO 668, der den weltweiten Warenverkehr trägt. Genau diese Normung macht ihn als Lagerraum an Land so attraktiv: Maße, Beschläge und Statik sind weltweit identisch und über Jahrzehnte erprobt.',
      'Bei EMC Container erhalten Sie Schiffscontainer mit gültiger CSC-Plakette nach ISO 6346, geprüft nach ISO 1496-1. Vom gebrauchten Lagercontainer bis zum fabrikneuen High Cube in Wunschfarbe.',
    ],
    productSlugs: [
      '20-fuss-seecontainer-gebraucht-blau',
      '40-fuss-high-cube-one-trip',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      '45-fuss-high-cube-container',
    ],
    categorySlugs: ['20-fuss-container', '40-fuss-container', 'high-cube-container'],
    sections: [
      {
        heading: 'Was bedeutet ISO-Zertifizierung?',
        body: [
          'ISO 668 legt die Baugrößen fest – daraus stammen die bekannten Formate 10, 20, 40 und 45 Fuß mit ihren exakten Außenmaßen. ISO 6346 regelt die Kennzeichnung: die elfstellige Containernummer aus Eigner-Code, Seriennummer und Prüfziffer.',
          'ISO 1496-1 definiert die Prüfanforderungen: Stapelfestigkeit, Hebeprüfung, Längs- und Quersteifigkeit, Wetterdichtheit. Die bestandene Prüfung wird auf der CSC-Plakette dokumentiert, die an der linken Türhälfte angebracht ist.',
          'Für die Nutzung an Land ist die CSC-Plakette rechtlich nicht zwingend erforderlich – sie ist aber der beste Nachweis dafür, dass der Container ein geprüftes, normgerechtes Bauteil ist und nicht ein beliebiger Blechkasten.',
        ],
      },
      {
        heading: 'Corten-Stahl: warum Container so lange halten',
        body: [
          'Schiffscontainer bestehen aus wetterfestem Baustahl, umgangssprachlich Corten-Stahl. Dieser bildet an der Oberfläche eine festhaftende Oxidschicht, die als Sperrschicht wirkt und das Fortschreiten der Korrosion in die Tiefe stark verlangsamt.',
          'Kritisch sind deshalb nicht Flugrost oder Kratzer, sondern stehendes Wasser – etwa in einer Dachdelle – und großflächig abgeplatzter Lack. Wir empfehlen, den Container leicht geneigt aufzustellen, damit Wasser ablaufen kann, und Lackschäden gelegentlich auszubessern.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was bedeutet die Nummer auf dem Container?',
        answer:
          'Sie folgt ISO 6346 und besteht aus vier Buchstaben (Eigner-Code plus Kategoriekennzeichen „U" für Container), sechs Ziffern Seriennummer und einer Prüfziffer. Darunter steht der Baugrößencode, z. B. 22G1 für einen 20-Fuß-Standardcontainer.',
      },
      {
        question: 'Brauche ich die CSC-Plakette für die Nutzung an Land?',
        answer:
          'Rechtlich nicht. Sie ist für den internationalen Seetransport vorgeschrieben. Für die stationäre Nutzung an Land ist sie jedoch ein wertvoller Nachweis über Baujahr, Prüfhistorie und Normkonformität – und wichtig für den Wiederverkauf.',
      },
      {
        question: 'Ist Corten-Stahl rostfrei?',
        answer:
          'Nein, er ist wetterfest, nicht rostfrei. Die Oberfläche bildet eine schützende Oxidschicht, die tiefergehende Korrosion stark verlangsamt. Bei stehendem Wasser oder großflächigen Lackschäden kann dennoch Durchrostung entstehen – deshalb waagerecht bis leicht geneigt aufstellen und Lackschäden ausbessern.',
      },
    ],
    seo: {
      title: 'Schiffscontainer kaufen – ISO-Container mit CSC-Plakette',
      description:
        'Schiffscontainer kaufen: ISO-Container nach ISO 668 mit gültiger CSC-Plakette, 10 bis 45 Fuß, neu und gebraucht. Aus Corten-Stahl, deutschlandweit geliefert.',
      focusKeyword: 'Schiffscontainer kaufen',
      secondaryKeywords: ['ISO Container kaufen', 'Schiffscontainer Preise', 'Seecontainer ISO'],
    },
  },

  {
    slug: 'lagercontainer-kaufen',
    kicker: 'Lagerraum ohne Mietvertrag',
    h1: 'Lagercontainer kaufen – abschließbarer Stauraum ab 1.190 €',
    intro: [
      'Ein Lagercontainer kostet einmalig, was eine angemietete Lagerfläche in ein bis zwei Jahren verschlingt. Er steht auf Ihrem Grundstück, ist rund um die Uhr zugänglich, braucht kein Fundament und lässt sich verkaufen, wenn der Bedarf endet. Für Handwerk, Landwirtschaft, Vereine und Gewerbe ist das die günstigste Form von trockenem, abschließbarem Stauraum.',
      'Wir liefern geprüft wind- und wasserdichte Container in allen gängigen Größen zum Festpreis inklusive Anlieferung. Vom 10-Fuß-Container für Werkzeug und Geräte bis zum 40-Fuß-High-Cube für Paletten- und Langgutlagerung.',
    ],
    productSlugs: [],
    productFilter: { categorySlugs: ['lagercontainer'] },
    categorySlugs: ['lagercontainer', '20-fuss-container', 'gebrauchte-container', 'container-zubehoer'],
    sections: [
      {
        heading: 'Welche Größe brauchen Sie wirklich?',
        body: [
          'Der 20-Fuß-Container ist mit 33 m³ Volumen und 14,8 m² Stellfläche das meistverkaufte Format. Er fasst rund zehn Europaletten in einer Lage und trägt bis zu 28 Tonnen – mehr, als die allermeisten Lagernutzungen je ausreizen.',
          'Reicht das nicht, ist der 40-Fuß-Container mit 68 m³ die logische Erweiterung. Er braucht allerdings eine Zufahrt ab 4,0 m Breite und eine Stellfläche von gut 30 m². Wo der Platz knapp ist, sind zwei 20-Füßer flexibler als ein 40-Füßer, weil sie sich auf dem Gelände unabhängig positionieren lassen.',
          'Für Werkzeug, Gartengeräte, Vereinsmaterial oder Baustellenausrüstung genügt oft der 10-Fuß-Container mit knapp drei Metern Länge. Er passt in Hofeinfahrten, in denen ein 20-Füßer nicht mehr rangiert werden kann.',
        ],
      },
      {
        heading: 'Kaufen statt mieten – die Rechnung',
        body: [
          'Ein 20-Fuß-Lagercontainer zur Miete kostet je nach Region 80 bis 150 € netto im Monat, zuzüglich An- und Abtransport. Nach zwölf bis achtzehn Monaten haben Sie den Kaufpreis eines gebrauchten Containers erreicht – ab diesem Punkt lagern Sie kostenlos.',
          'Hinzu kommt der Restwert. Gebrauchte Seecontainer verlieren langsam an Wert; ein gepflegter Container lässt sich nach Jahren noch zu einem erheblichen Teil des Kaufpreises weiterverkaufen. Eine Miete ist dagegen vollständig verbraucht.',
          'Kurzfristiger Bedarf unter einem Jahr spricht weiterhin für die Miete. Alles darüber rechnet sich im Kauf – deshalb finden Sie unter „Container mieten" auch unsere ehrliche Einschätzung, wann welche Variante passt.',
        ],
      },
      {
        heading: 'Kondenswasser und Belüftung',
        body: [
          'Der häufigste Fehler beim Lagercontainer ist die fehlende Belüftung. Stahl reagiert schnell auf Temperaturwechsel; feuchte Luft schlägt sich nachts an der kalten Decke nieder und tropft auf das Lagergut. Vier Belüftungsgitter zur Querlüftung lösen das Problem für unter 200 €.',
          'Bei empfindlichem Gut – Elektronik, Papier, Textilien – empfehlen wir zusätzlich Granulat-Luftentfeuchter und eine Lagerung auf Paletten statt direkt auf dem Sperrholzboden. Wer den Container dauerhaft als Werkstatt nutzt, sollte über eine Dämmung nachdenken; wir übernehmen das im Umbau.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein Lagercontainer?',
        answer:
          'Gebrauchte 20-Fuß-Lagercontainer beginnen bei 1.190 € netto, 10-Fuß-Container bei 1.590 € netto und gebrauchte 40-Füßer bei 2.190 € netto. Neuwertige One-Trip-Container liegen zwischen 2.290 € und 5.890 € netto. Hinzu kommt die Lieferpauschale nach Postleitzahl.',
      },
      {
        question: 'Ist mein Lagergut im Container versichert?',
        answer:
          'Nicht automatisch. Der Container selbst gehört nach der Lieferung Ihnen und lässt sich über die Gebäude- oder Inhaltsversicherung mit abdecken – sprechen Sie das mit Ihrem Versicherer ab, da ein Container je nach Aufstellung als Gebäudebestandteil oder als bewegliche Sache eingestuft wird.',
      },
      {
        question: 'Wie sichere ich den Container gegen Einbruch?',
        answer:
          'Die Standard-Verriegelung lässt sich mit einem Bolzenschneider angreifen. Ein aufgeschweißter Schlosskasten umschließt das Vorhängeschloss vollständig und ist die wirksamste einfache Maßnahme. Wir schweißen ihn auf Wunsch bereits vor der Anlieferung an.',
      },
      {
        question: 'Brauche ich für einen Lagercontainer eine Baugenehmigung?',
        answer:
          'Für die reine Lagernutzung sind Container in vielen Bundesländern bis zu einer bestimmten Größe verfahrensfrei; die Grenzen stehen in der jeweiligen Landesbauordnung. Im Außenbereich, bei dauerhafter Aufstellung oder bei Aufenthaltsnutzung ist eine Genehmigung erforderlich. Klären Sie das vorab mit Ihrem Bauamt.',
      },
      {
        question: 'Kann der Container auf Rasen oder Schotter stehen?',
        answer:
          'Auf Schotter ja, sofern der Untergrund verdichtet und tragfähig ist. Auf gewachsenem Rasen sackt der Container mit der Zeit ungleichmäßig ein, wodurch sich der Rahmen verzieht und die Türen klemmen. Vier Betonplatten oder Fundamentblöcke unter den Eckbeschlägen verhindern das zuverlässig.',
      },
    ],
    seo: {
      title: 'Lagercontainer kaufen – abschließbar ab 1.190 € netto',
      description:
        'Lagercontainer kaufen statt mieten: 10, 20 und 40 Fuß, wind- und wasserdicht, abschließbar. Festpreis inklusive Anlieferung, deutschlandweite Lieferung in 3–7 Werktagen.',
      focusKeyword: 'Lagercontainer kaufen',
      secondaryKeywords: [
        'Lagercontainer Preise',
        'Materialcontainer kaufen',
        'Lagerbox kaufen',
        'Container Lagerraum',
      ],
    },
  },
  {
    slug: 'buerocontainer-kaufen',
    kicker: 'Arbeitsplatz zum Festpreis',
    h1: 'Bürocontainer kaufen – bezugsfertig ab 7.900 €',
    intro: [
      'Ein Bürocontainer schafft dort einen vollwertigen Arbeitsplatz, wo kein Gebäude steht: auf der Baustelle, dem Betriebshof, dem Werksgelände oder als Erweiterung, wenn das Bürogebäude aus allen Nähten platzt. Er kommt gedämmt, verkabelt und beheizbar an – anschließen und arbeiten.',
      'Unsere Bürocontainer sind aus Seecontainern aufgebaut, nicht aus Leichtbaumodulen. Das macht sie schwerer, aber auch deutlich robuster gegen Einbruch, Wind und wiederholtes Umsetzen. Wer den Container mehrfach versetzt, merkt den Unterschied im dritten Jahr.',
    ],
    productSlugs: [],
    productFilter: { categorySlugs: ['buerocontainer'] },
    categorySlugs: ['buerocontainer', 'umbau-container', 'wohncontainer', '20-fuss-container'],
    sections: [
      {
        heading: 'Was im Bürocontainer enthalten ist',
        body: [
          'Unsere ausgebauten Bürocontainer haben eine umlaufende Dämmung nach GEG-Anforderung, Vinylboden, weiße Wandpaneele, Deckenleuchten, Steckdosen mit FI-geschütztem Unterverteiler, Kunststofffenster mit Rollladen und eine gedämmte Eingangstür mit Sicherheitsschloss. Eine Elektroheizung ist eingebaut.',
          'Der 20-Fuß-Bürocontainer bietet rund 13 m² Bürofläche – ausreichend für zwei Arbeitsplätze plus Besprechungstisch. Der 40-Fuß-Container wird als Zweiraumlösung geliefert: ein größeres Büro und ein separater Raum für Besprechung, Umkleide oder Archiv.',
          'Klimaanlage, Netzwerkverkabelung, zusätzliche Fenster und ein individueller RAL-Farbton lassen sich im Umbau ergänzen. Sprechen Sie uns vor der Bestellung darauf an – nachträglich ist jeder Eingriff teurer.',
        ],
      },
      {
        heading: 'Genehmigung: hier wird es ernst',
        body: [
          'Anders als beim Lagercontainer ist ein Bürocontainer ein Aufenthaltsraum. Damit greift die Landesbauordnung praktisch immer: Es braucht in der Regel eine Baugenehmigung, und die Anforderungen an Raumhöhe, Belichtung, Rettungsweg und Wärmeschutz sind einzuhalten.',
          'Auf einer Baustelle gilt die Aufstellung meist als Baustelleneinrichtung und ist mit der Baugenehmigung des Hauptvorhabens abgedeckt. Auf einem Betriebsgelände als dauerhafte Erweiterung ist ein eigener Bauantrag der Regelfall.',
          'Wir liefern Ihnen auf Anfrage Maßzeichnungen und die technischen Angaben, die Ihr Architekt oder Statiker für den Antrag braucht. Den Antrag selbst stellen Sie – die Genehmigungsfähigkeit hängt von Grundstück und Bebauungsplan ab und lässt sich aus der Ferne nicht beurteilen.',
        ],
      },
      {
        heading: 'Kaufen oder mieten?',
        body: [
          'Bürocontainer zur Miete liegen bei 180 bis 350 € netto im Monat. Bei einer Bauzeit von sechs Monaten ist die Miete klar günstiger. Ab etwa drei Jahren Nutzungsdauer kippt die Rechnung zugunsten des Kaufs, und ab dann bleibt Ihnen zusätzlich der Restwert.',
          'Wer regelmäßig auf wechselnden Baustellen arbeitet, fährt mit dem Kauf fast immer besser: Der Container wird mitgenommen statt jedes Mal neu angemietet, und die Ausstattung bleibt die gewohnte.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein Bürocontainer?',
        answer:
          'Ein ausgebauter 20-Fuß-Bürocontainer kostet 7.900 € netto, die 40-Fuß-Variante mit zwei Räumen 16.900 € netto. Beide Preise verstehen sich inklusive Dämmung, Elektroinstallation, Heizung, Fenstern mit Rollladen und Bodenbelag – zuzüglich Lieferpauschale.',
      },
      {
        question: 'Ist der Bürocontainer im Winter warm genug?',
        answer:
          'Ja. Die umlaufende Dämmung und die eingebaute Elektroheizung halten den Raum auch bei Frost auf Arbeitstemperatur. Der Verbrauch hängt von der Aufstellung ab – ein windgeschützter Standort und eine gedämmte Unterlüftung des Bodens senken ihn spürbar.',
      },
      {
        question: 'Welchen Stromanschluss brauche ich?',
        answer:
          'Für Beleuchtung, Steckdosen und Heizung genügt ein 230-V-Anschluss mit 16 A, abgesichert über den mitgelieferten Unterverteiler. Bei zusätzlicher Klimaanlage oder mehreren Heizgeräten empfehlen wir einen Starkstromanschluss mit 400 V.',
      },
      {
        question: 'Kann ich mehrere Bürocontainer koppeln?',
        answer:
          'Ja. Container lassen sich nebeneinander stellen und über einen Wanddurchbruch verbinden oder übereinander stapeln, wobei die Eckbeschläge die Last tragen. Für Kombinationen ab zwei Einheiten ist ein statischer Nachweis erforderlich, den wir über unser Partnerbüro erstellen lassen.',
      },
    ],
    seo: {
      title: 'Bürocontainer kaufen – ausgebaut ab 7.900 € netto',
      description:
        'Bürocontainer kaufen: gedämmt, beheizbar, mit Elektroinstallation und Fenstern. 20 und 40 Fuß, aus robustem Seecontainer statt Leichtbaumodul. Festpreis inkl. Lieferung.',
      focusKeyword: 'Bürocontainer kaufen',
      secondaryKeywords: [
        'Bürocontainer Preise',
        'Baustellencontainer kaufen',
        'Raumcontainer Büro',
        'Containerbüro',
      ],
    },
  },
  {
    slug: 'kuehlcontainer-kaufen',
    kicker: 'Durchgehende Kühlkette',
    h1: 'Kühlcontainer kaufen – Reefer ab 6.900 €',
    intro: [
      'Ein Kühlcontainer – im Fachjargon Reefer – ist ein vollwertiger Kühlraum, der sich anliefern und anschließen lässt. Er hält Temperaturen von −25 °C bis +25 °C und regelt sie selbständig nach. Für Gastronomie, Lebensmittelhandel, Landwirtschaft, Events und Pharmalogistik ersetzt er einen gemauerten Kühlraum zum Bruchteil der Kosten.',
      'Wir führen generalüberholte Reefer mit geprüftem Kälteaggregat. Generalüberholt heißt bei uns: Aggregat gewartet und im Dauerlauf getestet, Dichtungen erneuert, Innenraum gereinigt, Temperaturprotokoll dokumentiert.',
    ],
    productSlugs: [],
    productFilter: { categorySlugs: ['kuehlcontainer'] },
    categorySlugs: ['kuehlcontainer', 'umbau-container', '20-fuss-container', '40-fuss-container'],
    sections: [
      {
        heading: 'Kühlen oder tiefkühlen?',
        body: [
          'Beide unserer Reefer decken den gesamten Bereich von −25 °C bis +25 °C ab. Entscheidend ist nicht der Container, sondern der Stromverbrauch: Im Kühlbetrieb bei +2 °C liegt er je nach Außentemperatur bei 3 bis 6 kWh pro Stunde, im Tiefkühlbetrieb bei −20 °C etwa doppelt so hoch.',
          'Der 20-Fuß-Reefer bietet 28 m³ nutzbares Volumen, der 40-Fuß-High-Cube 67 m³. Beachten Sie, dass das Kälteaggregat Bauraum kostet – der Innenraum ist deutlich kürzer als bei einem Standardcontainer gleicher Baugröße.',
          'Für die Lagerung von Lebensmitteln zum Verkauf gelten die Anforderungen der Lebensmittelhygiene-Verordnung. Die dokumentierte Temperaturaufzeichnung, die unsere Aggregate leisten, ist dafür regelmäßig eine Voraussetzung.',
        ],
      },
      {
        heading: 'Stromanschluss – der Punkt, an dem es hakt',
        body: [
          'Reefer brauchen Starkstrom: 400 V Drehstrom mit 32 A über CEE-Stecker. Eine Haushaltssteckdose reicht nicht, und ein normaler Baustromverteiler oft ebenfalls nicht. Prüfen Sie das vor der Bestellung – es ist der häufigste Grund, warum ein gelieferter Reefer nicht sofort in Betrieb gehen kann.',
          'Steht kein passender Anschluss zur Verfügung, ist ein Dieselgenerator mit mindestens 15 kVA die übliche Zwischenlösung, etwa bei Veranstaltungen oder in der Erntesaison auf dem Feld. Wir nennen Ihnen die konkrete Anschlussleistung des jeweiligen Aggregats.',
        ],
      },
      {
        heading: 'Aufstellung und Wartung',
        body: [
          'Der Reefer muss waagerecht stehen, damit das Kondensat sauber abläuft, und rundum belüftet sein – das Aggregat gibt die entzogene Wärme nach außen ab. Halten Sie vor der Aggregatseite mindestens einen Meter frei und stellen Sie den Container nicht in eine geschlossene Nische.',
          'Das Kälteaggregat ist wartungspflichtig wie jede Kälteanlage. Rechnen Sie mit einer jährlichen Wartung und, abhängig von der Füllmenge des Kältemittels, mit einer gesetzlich vorgeschriebenen Dichtheitsprüfung nach der F-Gase-Verordnung.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein Kühlcontainer?',
        answer:
          'Ein generalüberholter 20-Fuß-Reefer kostet 6.900 € netto, der 40-Fuß-High-Cube-Reefer 12.900 € netto. Beide mit geprüftem Kälteaggregat, erneuerten Dichtungen und dokumentiertem Temperaturtest – zuzüglich Lieferpauschale nach Postleitzahl.',
      },
      {
        question: 'Welchen Stromanschluss braucht ein Reefer?',
        answer:
          '400 V Drehstrom mit 32 A über CEE-Stecker. Eine 230-V-Steckdose genügt nicht. Ohne festen Anschluss lässt sich der Container über einen Dieselgenerator ab etwa 15 kVA betreiben, was bei Veranstaltungen und in der Erntesaison die übliche Lösung ist.',
      },
      {
        question: 'Wie hoch ist der Stromverbrauch?',
        answer:
          'Im Kühlbetrieb bei +2 °C rechnen Sie mit 3 bis 6 kWh pro Stunde, im Tiefkühlbetrieb bei −20 °C etwa mit dem Doppelten. Der tatsächliche Wert hängt stark von Außentemperatur, Türöffnungshäufigkeit und Beladung ab.',
      },
      {
        question: 'Kann ich einen Kühlcontainer als normales Lager nutzen?',
        answer:
          'Ja. Bei ausgeschaltetem Aggregat bleibt ein hervorragend gedämmter, dichter Raum mit Edelstahl-Innenauskleidung und Aluminiumboden – deutlich besser als ein Standardcontainer, aber auch deutlich teurer. Für reine Lagerung lohnt das nur, wenn Sie die Dämmung wirklich brauchen.',
      },
    ],
    seo: {
      title: 'Kühlcontainer kaufen – Reefer ab 6.900 € netto',
      description:
        'Kühlcontainer kaufen: generalüberholte Reefer von −25 °C bis +25 °C, 20 und 40 Fuß. Aggregat geprüft, Dichtungen erneuert, Temperaturprotokoll. Festpreis inkl. Lieferung.',
      focusKeyword: 'Kühlcontainer kaufen',
      secondaryKeywords: [
        'Reefer Container kaufen',
        'Kühlcontainer Preise',
        'Tiefkühlcontainer kaufen',
        'Kühlzelle Container',
      ],
    },
  },
  {
    slug: 'wohncontainer-kaufen',
    kicker: 'Vollausbau, bezugsfertig',
    h1: 'Wohncontainer kaufen – schlüsselfertig ab 38.900 €',
    intro: [
      'Ein Wohncontainer ist die Antwort, wenn schnell dauerhafter Wohnraum entstehen soll: als Ferienhaus, Tiny House, Personalunterkunft, Bürogebäude mit Übernachtung oder als Einliegerwohnung auf dem eigenen Grundstück. Er kommt fertig ausgebaut mit Bad, Küche und Heizung an und ist nach Anschluss von Strom, Wasser und Abwasser bezugsfertig.',
      'Grundlage ist ein 40-Fuß-High-Cube-Container mit knapp 2,70 m Innenhöhe. Anders als beim Standardcontainer bleibt nach Dämmung und Bodenaufbau genug lichte Höhe für ein Wohngefühl, das diesen Namen verdient.',
    ],
    productSlugs: [],
    productFilter: { categorySlugs: ['wohncontainer'] },
    categorySlugs: ['wohncontainer', 'umbau-container', 'buerocontainer', 'high-cube-container'],
    sections: [
      {
        heading: 'Was der Vollausbau umfasst',
        body: [
          'Umlaufende Dämmung nach Vorgabe des Gebäudeenergiegesetzes, Dampfsperre, Innenverkleidung, Vinyl- oder Laminatboden, Wohnraumfenster mit Dreifachverglasung und Rollladen, gedämmte Haustür, Elektroinstallation mit Verteiler, Sanitärinstallation mit Dusche und WC, Küchenzeile mit Anschlüssen sowie eine Infrarot- oder Elektroheizung.',
          'Die Aufteilung planen wir mit Ihnen: ein offener Wohn-Ess-Bereich mit abgetrenntem Schlafzimmer ist die häufigste Lösung, ebenso zwei getrennte Schlafräume für Personalunterkünfte. Die Trennwände sind nicht tragend und lassen sich später versetzen.',
          'Nicht enthalten sind Fundament, Hausanschlüsse, Außentreppe und Möblierung. Für diese Gewerke arbeiten wir mit örtlichen Betrieben zusammen oder Sie beauftragen sie selbst – wir liefern die Maßangaben.',
        ],
      },
      {
        heading: 'Baurecht: der entscheidende Punkt',
        body: [
          'Ein Wohncontainer ist baurechtlich ein Gebäude. Es braucht eine Baugenehmigung, das Grundstück muss bebaubar sein, und der Bebauungsplan muss die Wohnnutzung zulassen. Im Außenbereich nach § 35 BauGB ist eine Genehmigung nur in eng begrenzten Ausnahmefällen zu bekommen.',
          'Zusätzlich sind die Anforderungen an Wärmeschutz, Schallschutz, Brandschutz, Rettungswege und Standsicherheit nachzuweisen. Unser Ausbau ist darauf ausgelegt, den Nachweis führt aber Ihr Architekt oder Bauvorlageberechtigter anhand des konkreten Vorhabens.',
          'Klären Sie die Genehmigungsfähigkeit unbedingt vor der Bestellung. Ein Wohncontainer, der nicht aufgestellt werden darf, ist ein teures Missverständnis – und die Klärung kostet Sie nur ein Gespräch beim Bauamt.',
        ],
      },
      {
        heading: 'Was ein Wohncontainer nicht ist',
        body: [
          'Er ist kein billiges Fertighaus. Bezogen auf den Quadratmeter liegt ein vollausgebauter Wohncontainer im Bereich konventioneller Bauweise. Der Vorteil liegt in der Bauzeit, in der Versetzbarkeit und darin, dass die Kosten von Anfang an feststehen.',
          'Er ist auch nicht wartungsfrei. Die Außenhaut aus Corten-Stahl braucht alle paar Jahre eine Sichtprüfung auf Lackschäden, damit sich kein Rost festsetzt. Wer das im Blick behält, hat jahrzehntelang Ruhe.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein Wohncontainer?',
        answer:
          'Unser vollausgebauter 40-Fuß-Wohncontainer kostet 38.900 € netto inklusive Dämmung, Bad, Küchenzeile, Elektro- und Sanitärinstallation sowie Heizung. Nicht enthalten sind Fundament, Hausanschlüsse, Außentreppe und Möblierung.',
      },
      {
        question: 'Brauche ich für einen Wohncontainer eine Baugenehmigung?',
        answer:
          'Ja, praktisch immer. Ein Wohncontainer ist baurechtlich ein Gebäude mit Aufenthaltsräumen. Grundstück und Bebauungsplan müssen die Wohnnutzung zulassen, und die Nachweise zu Wärme-, Schall- und Brandschutz sind zu führen. Klären Sie das vor der Bestellung mit Ihrem Bauamt.',
      },
      {
        question: 'Wie lange dauert die Fertigung?',
        answer:
          'Für den Vollausbau nach Ihrer Aufteilung rechnen Sie mit 8 bis 12 Wochen ab Auftragsbestätigung, zuzüglich Lieferzeit. Vorgefertigte Standardausführungen sind kurzfristiger verfügbar – fragen Sie den aktuellen Stand an.',
      },
      {
        question: 'Ist der Wohncontainer winterfest?',
        answer:
          'Ja. Die Dämmung ist auf die Anforderungen des Gebäudeenergiegesetzes ausgelegt, die Fenster sind dreifach verglast. Wichtig ist ein frostfrei verlegter Wasseranschluss und eine unterlüftete, gedämmte Bodenkonstruktion – beides planen wir mit ein.',
      },
    ],
    seo: {
      title: 'Wohncontainer kaufen – Vollausbau ab 38.900 € netto',
      description:
        'Wohncontainer kaufen: 40 Fuß High Cube, vollausgebaut mit Bad, Küche, Dämmung und Heizung. Bezugsfertig nach Anschluss – mit ehrlicher Auskunft zum Baurecht.',
      focusKeyword: 'Wohncontainer kaufen',
      secondaryKeywords: [
        'Wohncontainer Preise',
        'Tiny House Container',
        'Containerhaus kaufen',
        'Wohnmodul Container',
      ],
    },
  },
  {
    slug: '20-fuss-container-gebraucht-kaufen',
    kicker: 'Der günstigste Weg zu 33 m³',
    h1: '20 Fuß Container gebraucht kaufen – geprüft ab 1.190 €',
    intro: [
      'Ein gebrauchter 20-Fuß-Container ist das beste Preis-Leistungs-Verhältnis im gesamten Sortiment. Er hat seine Zeit im Seeverkehr hinter sich, ist im Lichttest auf Dichtheit geprüft und kostet weniger als die Hälfte eines neuwertigen Containers – bei identischem Innenvolumen von 33 m³.',
      'Gebrauchsspuren gehören dazu und sind kein Mangel: Kratzer, Dellen im Wellblech, Farbunterschiede durch werkseitige Ausbesserungen und Flugrost an den Kanten. Auf Funktion, Dichtheit und Tragfähigkeit hat das keinen Einfluss. Wer den Container hinter der Halle aufstellt, zahlt für makellose Optik unnötig drauf.',
    ],
    productSlugs: [],
    productFilter: { sizes: ['20ft'], conditions: ['gebraucht', 'generalueberholt'] },
    categorySlugs: ['gebrauchte-container', '20-fuss-container', 'lagercontainer', 'one-trip-container'],
    sections: [
      {
        heading: 'Worauf Sie beim Gebrauchtkauf achten müssen',
        body: [
          'Entscheidend ist die Dichtheit, nicht die Optik. Ein Container gilt als wind- und wasserdicht, wenn im Lichttest bei geschlossenen Türen von innen kein Tageslicht durch Wände, Dach oder Türdichtungen zu sehen ist. Jeder Container, den wir als gebraucht verkaufen, hat diesen Test bestanden.',
          'Prüfen Sie zweitens den Boden. Die 28 mm starke Sperrholzplatte muss vollflächig tragfähig und trocken sein; durchgetretene oder aufgequollene Stellen sind teuer zu ersetzen. Drittens die Verriegelung: Die vier Verschlussstangen müssen leichtgängig laufen und die Nocken sauber greifen.',
          'Und viertens die CSC-Plakette. Sie dokumentiert Baujahr und Prüfstatus. Für die Lagernutzung an Land ist sie nicht zwingend, für jeden möglichen Weiterverkauf oder Transport aber bares Geld wert.',
        ],
      },
      {
        heading: 'Gebraucht, generalüberholt oder One-Trip?',
        body: [
          'Gebraucht ist der Container, der aus dem Umlauf kommt: geprüft dicht, sichtbar benutzt, günstigster Preis. Für Lagerung, Baustelle und alles, was nicht repräsentativ sein muss, die vernünftige Wahl.',
          'Generalüberholt bedeutet, dass wir zusätzlich Roststellen behandelt, Dichtungen erneuert und den Container neu lackiert haben. Optisch nah an neuwertig, im Preis dazwischen – sinnvoll, wenn der Container sichtbar steht, das Budget für One-Trip aber nicht reicht.',
          'One-Trip heißt: eine einzige Überfahrt, danach aus dem Umlauf genommen. Praktisch neuwertig, in Wunschfarbe lieferbar, rund doppelt so teuer wie gebraucht. Steht der Container vor dem Betriebsgebäude oder im Vorgarten, ist der Aufpreis meist gut angelegt.',
        ],
      },
      {
        heading: 'Was der 20-Füßer fasst',
        body: [
          'Bei 5,90 m Innenlänge, 2,35 m Breite und 2,39 m Höhe passen rund zehn Europaletten in einer Lage, gestapelt entsprechend mehr. Das Volumen von 33 m³ entspricht ungefähr dem Hausrat einer Drei-Zimmer-Wohnung.',
          'Die zulässige Zuladung von gut 28 Tonnen wird in der Lagernutzung praktisch nie erreicht – Sie stoßen deutlich früher an die Volumengrenze. Für schwere Punktlasten wie Maschinen sollte die Last über den Boden verteilt werden, damit die Sperrholzplatte nicht durchdrückt.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein gebrauchter 20-Fuß-Container?',
        answer:
          'Bei uns beginnt der geprüfte gebrauchte 20-Fuß-Seecontainer bei 1.190 € netto. Zum Vergleich: Ein One-Trip-Container derselben Größe liegt bei rund 2.590 € netto. Hinzu kommt in beiden Fällen die Lieferpauschale nach Postleitzahl.',
      },
      {
        question: 'Wie alt sind gebrauchte Container?',
        answer:
          'Die verfügbaren Einheiten sind typischerweise zwischen 11 und 15 Jahre alt. Das genaue Baujahr steht auf der CSC-Plakette und teilen wir Ihnen zur konkreten Containernummer auf Anfrage mit.',
      },
      {
        question: 'Kann ich mir den Container vorher ansehen?',
        answer:
          'Wir senden Ihnen vor der Auslieferung Fotos des konkreten Containers, damit Sie den tatsächlichen Zustand kennen. Eine Besichtigung vor Ort ist nach Terminabsprache möglich, sofern die Einheit auf einem unserer Depotstandorte steht.',
      },
      {
        question: 'Kann ich den Farbton auswählen?',
        answer:
          'Bei Gebrauchtcontainern nicht. Wir liefern in der jeweils verfügbaren Farbe, überwiegend Blau, Rot oder Grau. Ist der Farbton entscheidend, kommen ein generalüberholter Container in Wunschlackierung oder ein One-Trip-Container in RAL-Wunschfarbe infrage.',
      },
      {
        question: 'Bekomme ich auf einen Gebrauchtcontainer Garantie?',
        answer:
          'Ja. Wir geben 12 Monate Garantie auf Wind- und Wasserdichtheit. Sichtbare Gebrauchsspuren, die bei Übergabe dokumentiert sind, sind davon ausgenommen – sie sind Merkmal der Ware und kein Mangel.',
      },
    ],
    seo: {
      title: '20 Fuß Container gebraucht kaufen – ab 1.190 € netto',
      description:
        'Gebrauchte 20-Fuß-Container kaufen: im Lichttest geprüft wind- und wasserdicht, 33 m³, mit CSC-Plakette. Mit Prüfliste für den Gebrauchtkauf und 12 Monaten Garantie.',
      focusKeyword: '20 Fuß Container gebraucht kaufen',
      secondaryKeywords: [
        'gebrauchter 20 Fuß Seecontainer',
        '20ft Container gebraucht',
        'Seecontainer gebraucht kaufen',
        '20 Fuß Lagercontainer gebraucht',
      ],
    },
  },
  {
    slug: '40-fuss-container-gebraucht-kaufen',
    kicker: '68 m³ zum Gebrauchtpreis',
    h1: '40 Fuß Container gebraucht kaufen – geprüft ab 2.190 €',
    intro: [
      'Der gebrauchte 40-Fuß-Container bietet das doppelte Volumen eines 20-Füßers bei weit weniger als dem doppelten Preis. Mit 68 m³ und 12,03 m Innenlänge ist er die wirtschaftlichste Lösung für Langgut, Palettenlagerung in zwei Reihen und alles, was am Stück lang ist.',
      'Wie bei allen Gebrauchtcontainern gilt: Er ist im Lichttest auf Dichtheit geprüft, trägt Gebrauchsspuren und kostet dafür einen Bruchteil eines neuwertigen Containers. Prüfen Sie vor dem Kauf allerdings die Zufahrt – ein 40-Füßer stellt deutlich höhere Anforderungen als ein 20-Füßer.',
    ],
    productSlugs: [],
    productFilter: { sizes: ['40ft'], conditions: ['gebraucht', 'generalueberholt'] },
    categorySlugs: ['gebrauchte-container', '40-fuss-container', 'high-cube-container', 'lagercontainer'],
    sections: [
      {
        heading: 'Zufahrt und Stellfläche prüfen',
        body: [
          'Ein 40-Fuß-Container ist 12,19 m lang. Das Lieferfahrzeug braucht entsprechend Platz zum Rangieren: eine Zufahrtsbreite ab 4,0 m, eine hindernisfreie Höhe von 4,2 m und eine gerade Anfahrstrecke, auf der das Fahrzeug den Container abkippen oder abkranen kann.',
          'Die Stellfläche selbst muss rund 30 m² tragfähig und weitgehend eben sein. Unter jedem der vier Eckbeschläge gehört ein tragfähiges Punktauflager; bei einem 40-Füßer empfehlen wir zusätzlich zwei Auflager in der Mitte, weil sich der lange Rahmen sonst über die Jahre durchbiegt.',
          'Wo die Zufahrt nicht reicht, sind zwei 20-Fuß-Container die praktikablere Lösung: gleiche Gesamtkapazität, halbe Anforderung an den Rangierraum und flexibler auf dem Gelände zu verteilen.',
        ],
      },
      {
        heading: 'Standard oder High Cube?',
        body: [
          'Der Standard-40-Füßer misst innen 2,39 m in der Höhe, der High Cube 2,70 m. Der Aufpreis für den High Cube ist gering, der Gewinn erheblich: rund 9 m³ mehr Volumen und genug lichte Höhe, um nach einer späteren Dämmung noch aufrecht zu stehen.',
          'Wer den Container später zur Werkstatt, zum Büro oder zum Wohnraum umbauen will, sollte ausschließlich High Cube kaufen. Nach Bodenaufbau und Deckendämmung bleiben beim Standardcontainer knapp 2,20 m – das fühlt sich niedrig an und ist für Aufenthaltsräume baurechtlich oft nicht ausreichend.',
        ],
      },
      {
        heading: 'Preisvorteil gegenüber zwei 20-Füßern',
        body: [
          'Zwei gebrauchte 20-Fuß-Container kosten zusammen rund 2.380 € netto und bieten 66 m³. Ein gebrauchter 40-Füßer liegt bei 2.190 € netto für 68 m³ – bei einer statt zwei Lieferungen.',
          'Der Vorteil kehrt sich um, sobald die Zufahrt eng ist oder Sie die Container an verschiedenen Stellen brauchen. Rechnen Sie deshalb nicht nur den Kaufpreis, sondern auch die Lieferpauschale und die Gegebenheiten vor Ort – unser Lieferkostenrechner gibt Ihnen beide Varianten zur Postleitzahl aus.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Was kostet ein gebrauchter 40-Fuß-Container?',
        answer:
          'Der geprüfte gebrauchte 40-Fuß-Seecontainer beginnt bei 2.190 € netto. Ein neuwertiger 40-Fuß-High-Cube-Container in One-Trip-Qualität liegt bei rund 4.490 € netto. Hinzu kommt jeweils die Lieferpauschale nach Postleitzahl.',
      },
      {
        question: 'Welche Zufahrt braucht die Anlieferung?',
        answer:
          'Mindestens 4,0 m Breite, 4,2 m hindernisfreie Höhe und eine gerade Anfahrstrecke zum Abkippen oder Abkranen. Ist die Zufahrt enger, prüfen wir die Anlieferung per Autokran – oder zwei 20-Fuß-Container werden zur besseren Lösung.',
      },
      {
        question: 'Lohnt sich der High Cube?',
        answer:
          'Fast immer. Der Aufpreis ist gering, Sie gewinnen rund 9 m³ Volumen und 31 cm Innenhöhe. Wenn Sie den Container später dämmen oder ausbauen wollen, ist High Cube praktisch Voraussetzung – beim Standardcontainer bleiben danach nur noch gut 2,20 m.',
      },
      {
        question: 'Kann ich einen 40-Fuß-Container später versetzen?',
        answer:
          'Ja, per Kranfahrzeug oder Absetzkipper. Wichtig ist, dass der Container leer und der Rahmen nicht verzogen ist – deshalb die Empfehlung, ihn von Anfang an auf sechs Punktauflagern waagerecht zu stellen. Wir übernehmen das Umsetzen auf Anfrage.',
      },
    ],
    seo: {
      title: '40 Fuß Container gebraucht kaufen – ab 2.190 € netto',
      description:
        'Gebrauchte 40-Fuß-Container kaufen: 68 m³, im Lichttest geprüft, mit CSC-Plakette. Mit ehrlichem Vergleich zu zwei 20-Füßern und allen Anforderungen an die Zufahrt.',
      focusKeyword: '40 Fuß Container gebraucht kaufen',
      secondaryKeywords: [
        'gebrauchter 40 Fuß Seecontainer',
        '40ft Container gebraucht',
        '40 Fuß High Cube gebraucht',
        'großer Lagercontainer gebraucht',
      ],
    },
  },
];

export const landingPagesBySlug = new Map(landingPages.map((p) => [p.slug, p]));

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPagesBySlug.get(slug);
}
