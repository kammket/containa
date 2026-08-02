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
];

export const landingPagesBySlug = new Map(landingPages.map((p) => [p.slug, p]));

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPagesBySlug.get(slug);
}
