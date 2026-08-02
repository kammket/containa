import type { Category, Condition } from './types.ts';

export const conditions: Condition[] = [
  {
    slug: 'neu',
    label: 'Neu (fabrikneu)',
    short: 'Neu',
    description:
      'Fabrikneuer Container direkt ab Werk, unbenutzt und ohne Transportspuren. Frei wählbarer RAL-Farbton, neue Dichtungen, neuer Sperrholzboden.',
  },
  {
    slug: 'one-trip',
    label: 'One-Trip (einmal gelaufen)',
    short: 'One-Trip',
    description:
      'Nur eine einzige Überfahrt aus Asien nach Europa. Optisch nahezu neuwertig, technisch einwandfrei – das beste Preis-Leistungs-Verhältnis.',
  },
  {
    slug: 'generalueberholt',
    label: 'Generalüberholt',
    short: 'Überholt',
    description:
      'Gebrauchter Container, in unserer Werkstatt entrostet, ausgebeult, grundiert und neu lackiert. Dichtungen und Bodenplatten geprüft bzw. ersetzt.',
  },
  {
    slug: 'gebraucht',
    label: 'Gebraucht (wind- und wasserdicht)',
    short: 'Gebraucht',
    description:
      'Geprüfter Gebrauchtcontainer mit normalen Gebrauchsspuren. Wind- und wasserdicht, voll funktionsfähig – die wirtschaftlichste Lagerlösung.',
  },
];

export const categories: Category[] = [
  // ── Größen ────────────────────────────────────────────────────────────────
  {
    slug: '10-fuss-container',
    name: '10 Fuß Container',
    navLabel: '10 Fuß',
    tagline: 'Kompakte Lagerlösung für kleine Grundstücke und enge Zufahrten',
    description: [
      'Der 10-Fuß-Container ist mit knapp drei Metern Außenlänge unser kompaktester Seecontainer. Er passt auf Stellplätze, an denen ein 20-Fuß-Container keine Chance hat – etwa in Hinterhöfen, auf Reihenhausgrundstücken oder in Baulücken innerstädtischer Lagen.',
      'Trotz der geringen Grundfläche von rund 7,3 m² bietet er etwa 16 m³ Stauraum und trägt bis zu neun Tonnen. Damit eignet er sich hervorragend als Werkzeuglager auf der Baustelle, als Gartengerätehaus, als Vereinsdepot oder als Zwischenlager während einer Renovierung.',
      'Alle 10-Fuß-Container von EMC Container sind vollwertige Seecontainer aus Corten-Stahl mit verschweißtem Rahmen, Stapelecken und dichtschließenden Doppelflügeltüren. Sie können mit dem Kranfahrzeug punktgenau abgesetzt werden und benötigen keine Fundamentplatte – vier Betonplatten unter den Eckelementen genügen.',
    ],
    benefits: [
      {
        title: 'Passt fast überall',
        text: 'Mit 2,99 m Länge stellen Sie den Container auch dort auf, wo Platz knapp ist – Zufahrtsbreite ab 3,5 m genügt.',
      },
      {
        title: 'Sofort einsatzbereit',
        text: 'Kein Fundament nötig. Vier Gehwegplatten unter den Eckbeschlägen reichen als Unterbau vollkommen aus.',
      },
      {
        title: 'Einbruchhemmend',
        text: 'Optional mit Schlosskasten (Lockbox), der das Vorhängeschloss vollständig umschließt und Aufbruchversuche abwehrt.',
      },
    ],
    faqs: [
      {
        question: 'Wie groß ist ein 10-Fuß-Container genau?',
        answer:
          'Außen misst ein 10-Fuß-Standardcontainer 2.991 × 2.438 × 2.591 mm (L × B × H). Innen bleiben 2.831 × 2.352 × 2.393 mm, das entspricht rund 16 m³ Stauraum bei etwa 7,3 m² Stellfläche.',
      },
      {
        question: 'Welche Zufahrt braucht die Anlieferung?',
        answer:
          'Unser Absetzkipper benötigt eine befestigte Zufahrt von mindestens 3,5 m Breite und rund 15 m gerader Anfahrt vor der Stellfläche. Die lichte Höhe sollte 4,2 m betragen. Bei beengten Verhältnissen liefern wir mit Mitnahmestapler oder Autokran.',
      },
      {
        question: 'Was kostet ein 10-Fuß-Container?',
        answer:
          'Gebrauchte 10-Fuß-Container starten bei rund 1.590 € netto, One-Trip-Container in Wunschfarbe bei etwa 2.290 € netto. Die Lieferpauschale hängt von der Postleitzahl ab und wird im Warenkorb transparent ausgewiesen.',
      },
    ],
    image: {
      publicId: 'emc/categories/10ft-container',
      alt: '10 Fuß Seecontainer in Reinweiß auf einem Firmengelände',
      width: 1200,
      height: 800,
    },
    icon: 'box',
    menuGroup: 'groessen',
    order: 1,
    seo: {
      title: '10 Fuß Container kaufen – kompakter Seecontainer ab 1.590 €',
      description:
        '10 Fuß Seecontainer kaufen: neu, One-Trip und gebraucht. Nur 2,99 m Länge, 16 m³ Stauraum, CSC-zertifiziert. Deutschlandweite Lieferung per Kranfahrzeug.',
      focusKeyword: '10 Fuß Container kaufen',
      secondaryKeywords: ['10 Fuß Seecontainer', 'kleiner Lagercontainer', '10ft Container Preis'],
    },
  },
  {
    slug: '20-fuss-container',
    name: '20 Fuß Container',
    navLabel: '20 Fuß',
    tagline: 'Der meistverkaufte Seecontainer – das Maß aller Dinge in Deutschland',
    description: [
      'Der 20-Fuß-Container ist der Standard schlechthin: 6,06 m lang, 2,44 m breit und 2,59 m hoch, mit rund 33 m³ Ladevolumen und bis zu 28 Tonnen Zuladung. Kein anderes Format wird in Deutschland so häufig als Lagerraum, Baustellencontainer oder Materialdepot eingesetzt.',
      'Der Grund ist einfach: Er fasst genug, um eine komplette Wohnungseinrichtung, einen Maschinenpark oder Paletten in zwei Reihen aufzunehmen, bleibt aber transportabel genug, um mit einem normalen Absetzkipper geliefert und später umgesetzt zu werden. Die Stellfläche von rund 15 m² passt auf nahezu jedes Gewerbegrundstück.',
      'Wir führen 20-Fuß-Container in allen Zuständen – vom preiswerten wind- und wasserdichten Gebrauchtcontainer bis zum fabrikneuen Modell in Ihrem Wunsch-RAL-Ton. Auf Wunsch ergänzen wir Belüftungsgitter, Regalsysteme, Elektroinstallation oder eine Seitentür.',
    ],
    benefits: [
      {
        title: '33 m³ Stauraum',
        text: 'Platz für rund 10 Europaletten am Boden – oder eine komplette 3-Zimmer-Wohnung inklusive Hausrat.',
      },
      {
        title: 'Beste Verfügbarkeit',
        text: 'Als meistgehandeltes Format sofort ab Lager verfügbar. Lieferung in der Regel innerhalb von 3–5 Werktagen.',
      },
      {
        title: 'Höchster Wiederverkaufswert',
        text: '20-Fuß-Container sind auf dem Zweitmarkt am gefragtesten – Ihre Investition bleibt werthaltig.',
      },
    ],
    faqs: [
      {
        question: 'Wie viele Europaletten passen in einen 20-Fuß-Container?',
        answer:
          'Bei einer Innenbreite von 2,35 m stellen Sie 10 Europaletten (1,20 × 0,80 m) in einer Lage ab – längs in zwei Reihen. Bei Doppelstapelung sind bis zu 20 Paletten möglich, sofern das Ladegut stapelfähig ist.',
      },
      {
        question: 'Braucht ein 20-Fuß-Container ein Fundament?',
        answer:
          'Nein. Der Container trägt sein Gewicht über die vier Eckbeschläge. Vier tragfähige Punktfundamente oder Betonplatten (mind. 40 × 40 cm) genügen. Wichtig ist, dass der Container waagerecht steht, damit die Türen sauber schließen.',
      },
      {
        question: 'Ist eine Baugenehmigung erforderlich?',
        answer:
          'Ein reiner Lagercontainer gilt in den meisten Bundesländern bis zu einer bestimmten Größe als verfahrensfreies Vorhaben – die Grenzen unterscheiden sich je Landesbauordnung. Sobald der Container dauerhaft aufgestellt wird, dem Aufenthalt von Menschen dient oder im Außenbereich steht, ist eine Genehmigung nötig. Klären Sie das vorab mit Ihrem Bauamt.',
      },
    ],
    image: {
      publicId: 'emc/categories/20ft-container',
      alt: '20 Fuß Seecontainer in Enzianblau mit geöffneten Doppelflügeltüren',
      width: 1200,
      height: 800,
    },
    icon: 'container',
    menuGroup: 'groessen',
    order: 2,
    seo: {
      title: '20 Fuß Container kaufen – Seecontainer ab 1.190 € | EMC Container',
      description:
        '20 Fuß Seecontainer kaufen: neu, One-Trip & gebraucht. 33 m³ Stauraum, CSC-zertifiziert, wind- und wasserdicht. Lieferung deutschlandweit in 3–5 Werktagen.',
      focusKeyword: '20 Fuß Container kaufen',
      secondaryKeywords: [
        '20ft Container',
        '20 Fuß Seecontainer',
        'Seecontainer 20 Fuß Preis',
        'Lagercontainer 20 Fuß',
      ],
    },
  },
  {
    slug: '40-fuss-container',
    name: '40 Fuß Container',
    navLabel: '40 Fuß',
    tagline: 'Maximales Volumen für Industrie, Handel und Landwirtschaft',
    description: [
      'Mit 12,19 m Außenlänge verdoppelt der 40-Fuß-Container das Volumen seines kleineren Bruders auf rund 68 m³ – bei nahezu identischer Zuladung. Das macht ihn zur ersten Wahl, wenn viel Volumen bei geringem Gewicht gelagert werden soll: Verpackungsmaterial, Textilien, Möbel, Bauteile oder landwirtschaftliche Erzeugnisse.',
      'Als High-Cube-Variante wächst die Innenhöhe von 2,39 m auf 2,70 m. Diese 30 Zentimeter entscheiden in der Praxis darüber, ob ein Gabelstapler im Container arbeiten kann, ob sich Hochregale sinnvoll einbauen lassen oder ob ein späterer Innenausbau mit Dämmung und Zwischendecke lichte Höhen erreicht, in denen man aufrecht stehen kann.',
      'Für die Anlieferung eines 40-Fuß-Containers braucht es mehr Platz: Der Sattelzug ist mit Auflieger rund 18 m lang und benötigt eine ausreichend große Rangierfläche. Wir prüfen die Zufahrt vorab anhand von Kartenmaterial und stimmen die Anlieferung telefonisch mit Ihnen ab.',
    ],
    benefits: [
      {
        title: '68 m³ – doppeltes Volumen',
        text: 'Rund 21 Europaletten in einer Lage. Ideal für voluminöses, aber leichtes Ladegut.',
      },
      {
        title: 'Günstigster Preis pro m³',
        text: 'Bezogen auf den Kubikmeter Stauraum ist der 40-Fuß-Container die wirtschaftlichste Variante.',
      },
      {
        title: 'Basis für Umbauten',
        text: 'Die bevorzugte Grundlage für Werkstätten, Büros und Hallenerweiterungen – genug Länge für mehrere Zonen.',
      },
    ],
    faqs: [
      {
        question: 'Worin unterscheiden sich 40 Fuß Standard und High Cube?',
        answer:
          'Der einzige Unterschied ist die Höhe: Der Standardcontainer misst außen 2.591 mm, der High Cube 2.896 mm. Innen entspricht das 2.393 mm gegenüber 2.698 mm. Länge, Breite und Zuladung sind identisch. Der High Cube bietet rund 8,6 m³ mehr Volumen.',
      },
      {
        question: 'Welche Zufahrt benötigt die Lieferung eines 40-Fuß-Containers?',
        answer:
          'Der Sattelzug ist ca. 18 m lang, 2,55 m breit und benötigt rund 25 m gerade Anfahrt sowie eine befestigte, tragfähige Fläche. Für das Absetzen mit dem Ladekran sind seitlich etwa 6 m Arbeitsraum und eine hindernisfreie Höhe von 6 m erforderlich. Bei engen Verhältnissen setzen wir einen Autokran ein.',
      },
      {
        question: 'Kann ich einen 40-Fuß-Container später umsetzen?',
        answer:
          'Ja. Ein leerer 40-Fuß-Container wiegt rund 3,8 Tonnen und lässt sich mit Kran, Reach Stacker oder Schwerlaststapler bewegen. Für das Umsetzen auf dem eigenen Grundstück empfehlen wir einen Autokran; wir vermitteln auf Wunsch einen Partnerbetrieb in Ihrer Region.',
      },
    ],
    image: {
      publicId: 'emc/categories/40ft-container',
      alt: '40 Fuß High Cube Seecontainer in Anthrazitgrau auf einem Logistikgelände',
      width: 1200,
      height: 800,
    },
    icon: 'container-large',
    menuGroup: 'groessen',
    order: 3,
    seo: {
      title: '40 Fuß Container kaufen – Seecontainer & High Cube ab 2.190 €',
      description:
        '40 Fuß Seecontainer kaufen: Standard und High Cube, neu oder gebraucht. 68 m³ Volumen, CSC-zertifiziert. Deutschlandweite Lieferung mit Kranfahrzeug.',
      focusKeyword: '40 Fuß Container kaufen',
      secondaryKeywords: ['40ft Container', '40 Fuß High Cube', '40 Fuß Seecontainer Preis'],
    },
  },
  {
    slug: 'high-cube-container',
    name: 'High Cube Container',
    navLabel: 'High Cube',
    tagline: '30 cm mehr Innenhöhe – für Innenausbau, Hochregale und Staplerbetrieb',
    description: [
      'High-Cube-Container sind exakt 305 mm höher als Standardcontainer. Was nach einem Detail klingt, entscheidet in der Praxis über die Nutzbarkeit: Mit 2,70 m Innenhöhe passt ein Hochregal hinein, ein Elektrostapler kann im Container arbeiten, und bei einem Innenausbau bleiben nach Dämmung, Installationsebene und Bodenaufbau noch komfortable 2,40 m lichte Höhe.',
      'Erkennbar sind High Cubes an dem gelb-schwarz schraffierten Warnstreifen an der Türstirnseite, der auf die Überhöhe hinweist. Beim Transport auf der Straße ist die Gesamthöhe zu beachten – ein High Cube auf einem Standard-Tieflader überschreitet die 4 m schnell.',
      'Wir führen High-Cube-Container in 10, 20, 40 und 45 Fuß. Besonders gefragt ist der 40-Fuß-High-Cube: Er bietet mit 76 m³ das größte Volumen bei noch handhabbaren Transportmaßen und ist die Standardbasis für Werkstatt-, Büro- und Wohnumbauten.',
    ],
    benefits: [
      {
        title: '2,70 m Innenhöhe',
        text: 'Aufrecht stehen, Hochregale nutzen, mit dem Stapler einfahren – ohne Kompromisse.',
      },
      {
        title: 'Ideal für Ausbau',
        text: 'Nach Dämmung und Bodenaufbau bleiben rund 2,40 m lichte Höhe – wohnraumtauglich.',
      },
      {
        title: '+ 8,6 m³ Volumen',
        text: 'Ein 40-Fuß-High-Cube fasst 76,3 m³ statt 67,7 m³ – rund 13 % mehr bei identischer Stellfläche.',
      },
    ],
    faqs: [
      {
        question: 'Woran erkenne ich einen High-Cube-Container?',
        answer:
          'An der gelb-schwarz schraffierten Warnmarkierung oberhalb der Türen sowie am ISO-Code: Die dritte Stelle ist eine „5" statt einer „2", z. B. 45G1 für einen 40-Fuß-High-Cube gegenüber 42G1 für den Standard.',
      },
      {
        question: 'Lohnt sich der Aufpreis für einen High Cube?',
        answer:
          'Wenn Sie den Container ausbauen, Hochregale einsetzen oder mit einem Stapler hineinfahren wollen: uneingeschränkt ja. Für reine Palettenlagerung in einer Lage bringt die Mehrhöhe dagegen keinen Vorteil – dann ist der Standardcontainer die wirtschaftlichere Wahl.',
      },
      {
        question: 'Gibt es 10- und 20-Fuß-Container als High Cube?',
        answer:
          'Ja, allerdings sind sie seltener als das 40-Fuß-Format und werden überwiegend als One-Trip-Container aus Neuproduktion angeboten. Wir halten beide Größen regelmäßig vorrätig – fragen Sie die aktuelle Verfügbarkeit an.',
      },
    ],
    image: {
      publicId: 'emc/categories/high-cube',
      alt: 'High Cube Seecontainer mit Warnmarkierung an der Türstirnseite',
      width: 1200,
      height: 800,
    },
    icon: 'arrow-up',
    menuGroup: 'groessen',
    order: 4,
    seo: {
      title: 'High Cube Container kaufen – 2,70 m Innenhöhe | EMC Container',
      description:
        'High Cube Seecontainer in 10, 20, 40 und 45 Fuß kaufen. 30 cm mehr Innenhöhe für Ausbau, Hochregale und Staplerbetrieb. CSC-zertifiziert, deutschlandweite Lieferung.',
      focusKeyword: 'High Cube Container',
      secondaryKeywords: ['High Cube kaufen', '40 Fuß High Cube', 'Container extra hoch'],
    },
  },

  // ── Zustand ───────────────────────────────────────────────────────────────
  {
    slug: 'neue-container',
    name: 'Neue Container',
    navLabel: 'Neue Container',
    tagline: 'Fabrikneu ab Werk – in Ihrem Wunsch-RAL-Farbton',
    description: [
      'Ein fabrikneuer Seecontainer hat noch keine Ladung gesehen. Lack, Dichtungen, Bodenplatte und Verriegelung sind unbenutzt, es gibt keine Beulen, keinen Flugrost und keine Reparaturstellen. Für alle Anwendungen, bei denen der Container sichtbar bleibt – vor dem Firmengebäude, im Vorgarten, als Verkaufsstand – ist das der entscheidende Unterschied.',
      'Neucontainer erhalten Sie in nahezu jedem RAL-Farbton. Beliebt sind RAL 9010 Reinweiß, RAL 7016 Anthrazitgrau und RAL 6005 Moosgrün, weil sie sich unauffällig in Gewerbe- und Wohnumgebungen einfügen. Die Lackierung erfolgt werksseitig als Mehrschichtaufbau über einer Zinkphosphat-Grundierung.',
      'Auf fabrikneue Container gewähren wir 60 Monate Garantie auf Wind- und Wasserdichtheit. Die Lieferzeit beträgt je nach Farbwunsch und Ausstattung 10 bis 20 Werktage, da die Container nach Auftragseingang lackiert und ausgerüstet werden.',
    ],
    benefits: [
      {
        title: 'Wunschfarbe nach RAL',
        text: 'Werksseitige Mehrschichtlackierung in nahezu jedem RAL-Ton – passend zu Ihrem Corporate Design.',
      },
      {
        title: '60 Monate Garantie',
        text: 'Fünf Jahre Garantie auf Wind- und Wasserdichtheit, schriftlich mit dem Kaufvertrag.',
      },
      {
        title: 'Makelloser Zustand',
        text: 'Keine Beulen, kein Flugrost, keine Fremdbeschriftung. Neue Dichtungen und unbenutzter Bodenbelag.',
      },
    ],
    faqs: [
      {
        question: 'Was unterscheidet einen Neucontainer von einem One-Trip-Container?',
        answer:
          'Ein Neucontainer verlässt das Werk direkt zu Ihnen und war nie beladen. Ein One-Trip-Container wurde nach der Produktion einmal mit Ladung nach Europa verschifft. Optisch sind beide nahezu identisch; One-Trip-Container können vereinzelt leichte Transportspuren oder Reederei-Beschriftungen aufweisen – dafür sind sie rund 15 bis 25 % günstiger.',
      },
      {
        question: 'Wie lange dauert die Lieferung eines Neucontainers?',
        answer:
          'Bei Standardfarben aus dem Lagerbestand liefern wir innerhalb von 5 bis 8 Werktagen. Bei individuellem RAL-Farbton oder Sonderausstattung wie Belüftung, Seitentüren oder Elektrik beträgt die Lieferzeit 10 bis 20 Werktage.',
      },
      {
        question: 'Ist ein Neucontainer die Mehrkosten wert?',
        answer:
          'Für sichtbare Aufstellorte, für Lagerung feuchtigkeitsempfindlicher Güter und für geplante Umbauten: ja. Für ein Materialdepot auf dem Bauhof, das ohnehin schnell Gebrauchsspuren bekommt, ist ein wind- und wasserdichter Gebrauchtcontainer die wirtschaftlichere Entscheidung.',
      },
    ],
    image: {
      publicId: 'emc/categories/neue-container',
      alt: 'Fabrikneuer Seecontainer in Reinweiß mit unbeschädigter Lackierung',
      width: 1200,
      height: 800,
    },
    icon: 'sparkles',
    menuGroup: 'zustand',
    order: 5,
    seo: {
      title: 'Neue Container kaufen – fabrikneue Seecontainer in Wunschfarbe',
      description:
        'Neue Seecontainer kaufen: fabrikneu ab Werk, RAL-Wunschfarbe, 60 Monate Garantie auf Wind- und Wasserdichtheit. 10, 20 und 40 Fuß. Lieferung deutschlandweit.',
      focusKeyword: 'Neue Container kaufen',
      secondaryKeywords: ['neuer Seecontainer', 'fabrikneuer Container', 'Container neu kaufen'],
    },
  },
  {
    slug: 'gebrauchte-container',
    name: 'Gebrauchte Container',
    navLabel: 'Gebrauchte Container',
    tagline: 'Geprüft wind- und wasserdicht – die wirtschaftlichste Lagerlösung',
    description: [
      'Ein Seecontainer ist für 15 bis 20 Jahre Seeeinsatz konstruiert. Wenn er den Linienverkehr verlässt, hat er den härtesten Teil seines Lebens hinter sich – als stationärer Lagerraum an Land hält er noch Jahrzehnte. Genau darin liegt der wirtschaftliche Reiz des Gebrauchtcontainers.',
      'Jeder Container, der unser Lager verlässt, wird zuvor geprüft: Dach auf Standwasser und Durchrostung, Seitenwände auf Perforationen, Türdichtungen auf Elastizität, Verriegelungsstangen auf Gängigkeit und der Sperrholzboden auf Tragfähigkeit. Nur was den Lichttest besteht – kein Tageslicht von innen sichtbar – wird als wind- und wasserdicht (WWT) verkauft.',
      'Gebrauchtcontainer haben Gebrauchsspuren: Kratzer, Dellen, Farbunterschiede durch Ausbesserungen und Flugrost an Kanten. Das ist normal und beeinträchtigt die Funktion nicht. Wer optisch mehr erwartet, greift zum generalüberholten Container – entrostet, ausgebeult und neu lackiert.',
    ],
    benefits: [
      {
        title: 'Bis zu 60 % günstiger',
        text: 'Gegenüber einem Neucontainer sparen Sie deutlich – bei identischer Statik und Dichtheit.',
      },
      {
        title: 'Lichttest bestanden',
        text: 'Jeder Container wird im abgedunkelten Zustand geprüft. Nur nachweislich dichte Einheiten gehen in den Verkauf.',
      },
      {
        title: 'Sofort verfügbar',
        text: 'Aus dem Bestand lieferbar – in der Regel innerhalb von 3 bis 5 Werktagen bei Ihnen.',
      },
    ],
    faqs: [
      {
        question: 'Was bedeutet „wind- und wasserdicht"?',
        answer:
          'WWT (wind and watertight) ist der Branchenstandard für gebrauchte Lagercontainer: Das Dach hält Regen, die Türdichtungen schließen umlaufend, es gibt keine Durchrostungen oder Löcher. Geprüft wird im Lichttest – bei geschlossenen Türen darf von innen kein Tageslicht sichtbar sein.',
      },
      {
        question: 'Wie alt sind gebrauchte Container typischerweise?',
        answer:
          'Die meisten Container, die den Liniendienst verlassen, sind zwischen 10 und 15 Jahre alt. Das Baujahr steht auf dem CSC-Schild an der linken Türhälfte. Ein höheres Alter ist bei einem stationär genutzten Lagercontainer unkritisch, solange die Substanz stimmt.',
      },
      {
        question: 'Kann ich den Container vor dem Kauf besichtigen?',
        answer:
          'Ja. Nach telefonischer Terminvereinbarung zeigen wir Ihnen an unserem Standort in Altenkirchen die verfügbaren Einheiten. Auf Wunsch senden wir vorab Fotos des konkreten Containers inklusive Containernummer.',
      },
      {
        question: 'Rostet ein gebrauchter Container weiter?',
        answer:
          'Corten-Stahl bildet eine schützende Oxidschicht, die das Durchrosten stark verlangsamt. Kritisch sind nur stehendes Wasser auf dem Dach und beschädigte Lackstellen. Wir empfehlen, den Container leicht geneigt aufzustellen und Lackschäden mit Rostschutzfarbe auszubessern.',
      },
    ],
    image: {
      publicId: 'emc/categories/gebrauchte-container',
      alt: 'Gebrauchter Seecontainer in Blau mit typischen Gebrauchsspuren',
      width: 1200,
      height: 800,
    },
    icon: 'recycle',
    menuGroup: 'zustand',
    order: 6,
    seo: {
      title: 'Gebrauchte Container kaufen – wind- und wasserdicht ab 1.190 €',
      description:
        'Gebrauchte Seecontainer kaufen: geprüft wind- und wasserdicht, 10/20/40 Fuß, sofort verfügbar. Bis zu 60 % günstiger als Neuware. Lieferung deutschlandweit.',
      focusKeyword: 'Gebrauchte Container kaufen',
      secondaryKeywords: [
        'gebrauchter Seecontainer',
        'Container gebraucht',
        'günstiger Lagercontainer',
      ],
    },
  },
  {
    slug: 'one-trip-container',
    name: 'One Trip Container',
    navLabel: 'One-Trip',
    tagline: 'Nur einmal gelaufen – Neuwertoptik zum Gebrauchtpreis',
    description: [
      'One-Trip-Container werden in Asien produziert, einmalig mit Ladung nach Europa verschifft und dort verkauft. Sie haben genau eine Seereise hinter sich. Optisch sind sie von Neucontainern kaum zu unterscheiden, kosten aber deutlich weniger – für viele Käufer das beste Preis-Leistungs-Verhältnis im gesamten Sortiment.',
      'Typische Merkmale: makellose Lackierung mit allenfalls minimalen Transportspuren, neue Türdichtungen, unbenutzter Sperrholzboden aus Hartholz, gängige Verriegelung. Häufig tragen sie noch die Beschriftung der Reederei, die die Erstverschiffung durchgeführt hat – auf Wunsch überlackieren wir diese.',
      'Weil One-Trip-Container aus laufender Neuproduktion stammen, sind sie überwiegend als High Cube verfügbar und in modernen Farbtönen lackiert. Die Verfügbarkeit schwankt mit den Frachtströmen: In Zeiten hoher Importvolumen ist das Angebot groß, bei rückläufigem Handel wird es knapp.',
    ],
    benefits: [
      {
        title: 'Neuwertige Optik',
        text: 'Unbenutzter Innenraum, makellose Lackierung, neue Dichtungen – nur eine einzige Überfahrt.',
      },
      {
        title: '15–25 % günstiger',
        text: 'Deutlich preiswerter als ein fabrikneuer Container bei praktisch identischem Zustand.',
      },
      {
        title: 'Kurze Lieferzeit',
        text: 'Aus dem Hafenbestand sofort abrufbar – keine Produktionszeit wie bei Neucontainern.',
      },
    ],
    faqs: [
      {
        question: 'Sind One-Trip-Container wirklich nur einmal gefahren?',
        answer:
          'Ja. Der Container wird im Werk produziert, direkt mit Exportladung befüllt und nach Europa verschifft. Nach dem Entladen wird er nicht in den Linienumlauf übernommen, sondern verkauft. Das Baujahr auf dem CSC-Schild ist deshalb in der Regel das laufende oder vorherige Jahr.',
      },
      {
        question: 'Welche Größen sind als One-Trip verfügbar?',
        answer:
          'Am häufigsten 20 Fuß Standard sowie 40 Fuß High Cube, da dies die dominierenden Formate im Exportverkehr sind. 10-Fuß-One-Trip-Container gibt es ebenfalls, sie stammen jedoch meist aus Sonderproduktionen und sind entsprechend teurer pro Kubikmeter.',
      },
      {
        question: 'Kann ich die Reederei-Beschriftung entfernen lassen?',
        answer:
          'Ja. Wir überlackieren Logos und Containernummern auf Wunsch im passenden RAL-Ton. Die gesetzlich vorgeschriebene Containernummer und das CSC-Schild bleiben erhalten – sie sind für den Nachweis der Zulassung erforderlich.',
      },
    ],
    image: {
      publicId: 'emc/categories/one-trip',
      alt: 'One-Trip Seecontainer in Moosgrün mit neuwertiger Lackierung',
      width: 1200,
      height: 800,
    },
    icon: 'ship',
    menuGroup: 'zustand',
    order: 7,
    seo: {
      title: 'One Trip Container kaufen – neuwertig, nur einmal gelaufen',
      description:
        'One Trip Container kaufen: nur eine Seereise, neuwertige Optik, 15–25 % günstiger als Neuware. 20 Fuß & 40 Fuß High Cube. Deutschlandweite Lieferung.',
      focusKeyword: 'One Trip Container',
      secondaryKeywords: [
        'One Trip Container kaufen',
        'einmal gelaufener Container',
        'neuwertiger Seecontainer',
      ],
    },
  },

  // ── Bauart ────────────────────────────────────────────────────────────────
  {
    slug: 'open-side-container',
    name: 'Open Side Container',
    navLabel: 'Open Side',
    tagline: 'Seitentür über die volle Länge – Be- und Entladen mit dem Stapler',
    description: [
      'Beim Open-Side-Container – auch Seitentürcontainer genannt – öffnet sich die komplette Längsseite. Statt durch die schmale Stirnseite laden Sie über 5,8 m (20 Fuß) bzw. 11,8 m (40 Fuß) Breite. Der Gabelstapler fährt seitlich an jede beliebige Position, ohne dass Ware umgeschichtet werden muss.',
      'Das spart im laufenden Betrieb enorm Zeit. Wer täglich auf eingelagertes Material zugreift – Handwerksbetriebe, Baustoffhändler, Werkstätten, Landwirtschaft – amortisiert den Aufpreis gegenüber dem Standardcontainer schnell. Auch für sperrige Güter, die nicht durch die 2,34 m breite Stirntür passen, ist die Seitenöffnung oft die einzige Lösung.',
      'Konstruktiv sind Open-Side-Container verstärkt ausgeführt, da die durchgehende Öffnung die Aussteifung der Längswand ersetzt. Sie sind dadurch etwas schwerer als Standardcontainer und in der Anschaffung teurer. Die Stirnseite bleibt zusätzlich als klassische Doppelflügeltür nutzbar.',
    ],
    benefits: [
      {
        title: 'Volle Längsseite offen',
        text: '5,8 m bzw. 11,8 m freie Ladebreite – der Stapler erreicht jeden Punkt direkt.',
      },
      {
        title: 'Zwei Zugänge',
        text: 'Seitentüren plus klassische Stirntür – flexible Nutzung, auch als Durchlademöglichkeit.',
      },
      {
        title: 'Zeitersparnis im Alltag',
        text: 'Kein Umschichten, kein Rangieren. Bei täglichem Zugriff die deutlich effizientere Lösung.',
      },
    ],
    faqs: [
      {
        question: 'Ist ein Open-Side-Container genauso dicht wie ein Standardcontainer?',
        answer:
          'Ja. Die Seitentüren sind mit umlaufenden Gummidichtungen und Mehrpunktverriegelung ausgeführt und erfüllen dieselben Dichtheitsanforderungen. Wichtig ist eine ebene Aufstellung – bei Verwindung schließen die langen Türflügel schlechter.',
      },
      {
        question: 'Wie viel Platz brauche ich zum Öffnen der Seitentüren?',
        answer:
          'Die Flügel schwenken nach außen. Planen Sie seitlich mindestens 1,5 m freien Raum ein, besser 2,5 m, damit die geöffneten Türen am Container anliegen können und der Stapler ungehindert anfahren kann.',
      },
      {
        question: 'Gibt es Open-Side-Container auch gebraucht?',
        answer:
          'Sie sind auf dem Gebrauchtmarkt selten, weil sie im Seeverkehr als Spezialequipment gelten und selten abgestoßen werden. Wir führen sie überwiegend als One-Trip- oder Neucontainer. Fragen Sie die aktuelle Verfügbarkeit an – gebrauchte Einheiten vermitteln wir bei Bedarf.',
      },
    ],
    image: {
      publicId: 'emc/categories/open-side',
      alt: 'Open Side Container mit vollständig geöffneter Seitenwand',
      width: 1200,
      height: 800,
    },
    icon: 'panel-open',
    menuGroup: 'bauart',
    order: 8,
    seo: {
      title: 'Open Side Container kaufen – Seecontainer mit Seitentür',
      description:
        'Open Side Container mit Seitentür über die volle Länge kaufen. 20 & 40 Fuß, Beladung per Stapler von der Seite. CSC-zertifiziert, Lieferung deutschlandweit.',
      focusKeyword: 'Open Side Container',
      secondaryKeywords: [
        'Container mit Seitentür',
        'Seitentürcontainer',
        'Side Door Container kaufen',
      ],
    },
  },
  {
    slug: 'doppeltuer-container',
    name: 'Doppeltür Container',
    navLabel: 'Doppeltür',
    tagline: 'Türen an beiden Stirnseiten – durchladen statt umräumen',
    description: [
      'Der Doppeltürcontainer, im Handel auch Tunnel- oder Double-Door-Container genannt, hat an beiden Stirnseiten vollwertige Doppelflügeltüren. Sie können ihn von vorne beladen und von hinten entladen – oder umgekehrt. Das Prinzip First in, first out lässt sich damit ohne Umlagern umsetzen.',
      'Besonders sinnvoll ist die Bauart, wenn der Container als Durchgang oder Verbindungselement dient: etwa als überdachter Materialgang zwischen zwei Hallen, als Schleuse auf abgesperrten Baustellen oder als Lager, das von zwei Seiten zugänglich sein muss, weil der Platz zum Umfahren fehlt.',
      'Auch für die Lagerung langer Güter ist der Tunnelcontainer im Vorteil: Rohre, Profile oder Kanthölzer lassen sich durchschieben statt hineinwuchten. Bei 40-Fuß-Ausführung ergibt das eine durchgehende Länge von über zwölf Metern.',
    ],
    benefits: [
      {
        title: 'Zugriff von beiden Seiten',
        text: 'Beladen vorne, entladen hinten. Kein Umschichten, kein Rangieren im Container.',
      },
      {
        title: 'FIFO-Lagerung',
        text: 'Älteste Ware zuerst entnehmen – ideal für Materialien mit Verfallsdatum oder Chargenführung.',
      },
      {
        title: 'Als Durchgang nutzbar',
        text: 'Verbindet zwei Bereiche wetterfest und abschließbar – z. B. zwischen Hallen oder Bauabschnitten.',
      },
    ],
    faqs: [
      {
        question: 'Verliert der Container durch die zweite Tür an Stabilität?',
        answer:
          'Nein. Die Stirnwände sind ohnehin als Rahmenkonstruktion mit Eckpfosten ausgeführt; die Aussteifung übernehmen die Längswände und der Boden. Doppeltürcontainer sind uneingeschränkt stapelbar und seetüchtig.',
      },
      {
        question: 'Wie viel Platz brauche ich rundum?',
        answer:
          'An beiden Stirnseiten sollten je rund 2,5 m frei bleiben, damit sich die Türflügel um 270° an die Längswand anlegen lassen. Bei beengten Verhältnissen genügen 1,5 m für eine 90°-Öffnung.',
      },
    ],
    image: {
      publicId: 'emc/categories/doppeltuer',
      alt: 'Doppeltür Container mit geöffneten Türen an beiden Stirnseiten',
      width: 1200,
      height: 800,
    },
    icon: 'doors',
    menuGroup: 'bauart',
    order: 9,
    seo: {
      title: 'Doppeltür Container kaufen – Tunnelcontainer mit 2 Türen',
      description:
        'Doppeltür Container (Tunnelcontainer) mit Türen an beiden Stirnseiten kaufen. 20 & 40 Fuß, FIFO-Lagerung, durchladbar. Lieferung deutschlandweit.',
      focusKeyword: 'Doppeltür Container',
      secondaryKeywords: ['Tunnelcontainer', 'Double Door Container', 'Container mit zwei Türen'],
    },
  },
  {
    slug: 'kuehlcontainer',
    name: 'Kühlcontainer',
    navLabel: 'Kühlcontainer',
    tagline: 'Temperaturführung von −25 °C bis +25 °C – Reefer für Lebensmittel und Pharma',
    description: [
      'Kühlcontainer – im Fachjargon Reefer – sind isolierte Seecontainer mit eigenem Kälteaggregat. Sie halten Temperaturen von −25 °C bis +25 °C konstant und protokollieren den Verlauf. Was im Seeverkehr Bananen und Impfstoffe schützt, dient an Land als flexible Kühlzelle: für Gastronomie, Lebensmittelhandel, Getränkelogistik, Blumenlager oder Veranstaltungen.',
      'Der Aufbau unterscheidet sich deutlich vom Standardcontainer: Wände, Boden und Decke bestehen aus PU-Sandwichpaneelen mit rund 100 mm Dämmung, der Innenraum ist mit Edelstahl ausgekleidet, der Boden als T-Profil-Aluminiumrost ausgeführt, damit die Kaltluft zirkulieren kann. Dadurch fällt das Innenmaß kleiner aus als beim Trockencontainer.',
      'Für den Betrieb an Land ist ein 400-V-Drehstromanschluss (32 A CEE) erforderlich. Die Leistungsaufnahme liegt je nach Zieltemperatur und Außenbedingungen zwischen 3 und 9 kW. Wir prüfen jedes Aggregat vor Auslieferung im Dauerlauf und übergeben ein Prüfprotokoll (PTI).',
    ],
    benefits: [
      {
        title: '−25 °C bis +25 °C',
        text: 'Tiefkühlung, Frischebereich oder Klimatisierung – stufenlos einstellbar und protokolliert.',
      },
      {
        title: 'Lebensmittelecht',
        text: 'Edelstahlauskleidung, T-Profil-Aluboden, HACCP-konform reinigbar. Für Lebensmittel und Pharma geeignet.',
      },
      {
        title: 'Geprüftes Aggregat',
        text: 'Jeder Reefer durchläuft vor Auslieferung eine Pre-Trip-Inspection mit schriftlichem Protokoll.',
      },
    ],
    faqs: [
      {
        question: 'Welchen Stromanschluss braucht ein Kühlcontainer?',
        answer:
          'Einen 400-V-Drehstromanschluss mit 32-A-CEE-Steckdose und eigener Absicherung. Ein Schuko-Anschluss reicht nicht aus. Der Anlaufstrom liegt deutlich über der Dauerleistung – die Zuleitung sollte entsprechend dimensioniert und von einer Elektrofachkraft abgenommen sein.',
      },
      {
        question: 'Wie hoch sind die Betriebskosten?',
        answer:
          'Im Frischebereich (+2 °C bis +5 °C) rechnen Sie mit rund 3 bis 5 kW Durchschnittsleistung, im Tiefkühlbetrieb (−20 °C) mit 6 bis 9 kW. Bei 0,30 €/kWh entspricht das etwa 25 bis 65 € Stromkosten pro Tag, abhängig von Außentemperatur, Türöffnungen und Beladung.',
      },
      {
        question: 'Wie groß ist der nutzbare Innenraum?',
        answer:
          'Durch die Dämmung fällt der Innenraum kleiner aus: Ein 20-Fuß-Reefer bietet innen 5.449 × 2.294 × 2.244 mm, also rund 28 m³ statt 33 m³. Beim 40-Fuß-High-Cube-Reefer sind es circa 67 m³.',
      },
      {
        question: 'Kann ich einen Kühlcontainer auch nur mieten?',
        answer:
          'Ja. Für Veranstaltungen, Erntespitzen oder Ausfallzeiten der Festinstallation vermieten wir Kühlcontainer tage- und wochenweise inklusive Lieferung, Anschluss und Rückholung. Fordern Sie ein Mietangebot über das Anfrageformular an.',
      },
    ],
    image: {
      publicId: 'emc/categories/kuehlcontainer',
      alt: 'Weißer Kühlcontainer mit Kälteaggregat an der Stirnseite',
      width: 1200,
      height: 800,
    },
    icon: 'snowflake',
    menuGroup: 'bauart',
    order: 10,
    seo: {
      title: 'Kühlcontainer kaufen & mieten – Reefer von −25 °C bis +25 °C',
      description:
        'Kühlcontainer (Reefer) kaufen oder mieten: 20 & 40 Fuß, −25 °C bis +25 °C, Edelstahl-Innenraum, geprüftes Aggregat mit PTI-Protokoll. Lieferung deutschlandweit.',
      focusKeyword: 'Kühlcontainer kaufen',
      secondaryKeywords: ['Reefer Container', 'Kühlcontainer mieten', 'Tiefkühlcontainer'],
    },
  },

  // ── Ausbau ────────────────────────────────────────────────────────────────
  {
    slug: 'buerocontainer',
    name: 'Bürocontainer',
    navLabel: 'Bürocontainer',
    tagline: 'Schlüsselfertiger Arbeitsplatz – gedämmt, beheizt, verkabelt',
    description: [
      'Unsere Bürocontainer sind vollständig ausgebaute Arbeitsräume auf Basis eines Seecontainers. Sie kommen fertig auf den Hof: gedämmt nach GEG-Anforderungen, mit Elektroinstallation, Heizung, Fenstern, Tür, Bodenbelag und Innenverkleidung. Anschließen, einrichten, arbeiten.',
      'Der typische 20-Fuß-Bürocontainer bietet rund 13 m² Nutzfläche – Platz für zwei Arbeitsplätze, Besprechungstisch und Aktenschrank. Als 40-Fuß-Variante lassen sich zwei getrennte Räume realisieren, etwa Büro plus Aufenthaltsraum oder Meisterbüro plus Umkleide.',
      'Bürocontainer sind auf Baustellen, Betriebshöfen und Gewerbeflächen die schnellste Möglichkeit, zusätzliche Fläche zu schaffen. Sie sind versetzbar, benötigen kein aufwendiges Fundament und können bei Bedarf gestapelt oder zu größeren Einheiten gekoppelt werden. Zu beachten ist: Sobald Menschen sich dauerhaft darin aufhalten, ist das Vorhaben in aller Regel baugenehmigungspflichtig.',
    ],
    benefits: [
      {
        title: 'Bezugsfertig geliefert',
        text: 'Dämmung, Elektrik, Heizung, Fenster, Boden – komplett ausgebaut ab Werk.',
      },
      {
        title: 'Koppel- und stapelbar',
        text: 'Mehrere Module lassen sich zu größeren Bürolandschaften über zwei Etagen verbinden.',
      },
      {
        title: 'Versetzbar',
        text: 'Kein festes Fundament nötig. Standortwechsel jederzeit mit dem Kranfahrzeug möglich.',
      },
    ],
    faqs: [
      {
        question: 'Brauche ich für einen Bürocontainer eine Baugenehmigung?',
        answer:
          'In der Regel ja. Sobald ein Container dem dauerhaften Aufenthalt von Menschen dient, gilt er bauordnungsrechtlich als Gebäude. Die Anforderungen ergeben sich aus der Landesbauordnung Ihres Bundeslandes. Für temporäre Baustelleneinrichtungen gelten Erleichterungen. Klären Sie das Vorhaben frühzeitig mit dem zuständigen Bauamt.',
      },
      {
        question: 'Wie wird der Bürocontainer beheizt?',
        answer:
          'Standardmäßig mit einer elektrischen Konvektorheizung, die über die Hausinstallation läuft. Auf Wunsch installieren wir eine Split-Klimaanlage mit Wärmepumpenfunktion – die heizt im Winter und kühlt im Sommer und ist im Betrieb deutlich sparsamer.',
      },
      {
        question: 'Welche Dämmung ist verbaut?',
        answer:
          'Wände und Decke erhalten eine Mineralwoll- oder PU-Dämmung von 60 bis 100 mm zwischen einer Unterkonstruktion, dazu eine dampfbremsende Folie und eine Innenverkleidung aus beschichteten Spanplatten. Der Boden wird mit einer Dämmschicht unter dem Trägerbelag aufgebaut.',
      },
    ],
    image: {
      publicId: 'emc/categories/buerocontainer',
      alt: 'Ausgebauter Bürocontainer mit Fenstern, Tür und Außentreppe',
      width: 1200,
      height: 800,
    },
    icon: 'briefcase',
    menuGroup: 'ausbau',
    order: 11,
    seo: {
      title: 'Bürocontainer kaufen – ausgebaut, gedämmt & bezugsfertig',
      description:
        'Bürocontainer kaufen: gedämmt, beheizt, mit Elektroinstallation, Fenstern und Bodenbelag. 20 & 40 Fuß, koppel- und stapelbar. Lieferung deutschlandweit.',
      focusKeyword: 'Bürocontainer kaufen',
      secondaryKeywords: ['Container Büro', 'Baustellenbüro Container', 'Bürocontainer gebraucht'],
    },
  },
  {
    slug: 'lagercontainer',
    name: 'Lagercontainer',
    navLabel: 'Lagercontainer',
    tagline: 'Trockener, abschließbarer Stauraum – sofort einsatzbereit',
    description: [
      'Lagercontainer sind die pragmatischste Antwort auf Platzmangel. Statt Hallenfläche anzumieten oder anzubauen, stellen Sie einen abschließbaren, wetterfesten Raum genau dort auf, wo er gebraucht wird – auf dem Betriebshof, an der Baustelle, am Feldrand oder neben dem Vereinsheim.',
      'Technisch handelt es sich um geprüfte Seecontainer, die wir für den stationären Einsatz aufbereiten: Türdichtungen erneuert, Verriegelung gefettet, Boden geprüft, auf Wunsch mit Belüftungsgittern gegen Kondenswasser und einem Schlosskasten gegen Aufbruch. Ein Regalsystem an den Längswänden schafft aus dem Volumen nutzbare Ordnung.',
      'Das Thema Kondenswasser wird häufig unterschätzt: Warme, feuchte Luft schlägt sich an der kalten Stahldecke nieder und tropft auf das Lagergut. Abhilfe schaffen Zwangsbelüftung, eine Dämmung der Decke oder Luftentfeuchter-Granulat. Wir beraten Sie zur passenden Lösung für Ihr Lagergut.',
    ],
    benefits: [
      {
        title: 'Sofort nutzbar',
        text: 'Kein Bauantrag für temporäre Lagerung, kein Fundament, keine Wartezeit. Aufstellen und einlagern.',
      },
      {
        title: 'Einbruchsicher',
        text: 'Optional mit Schlosskasten, Sicherheitsschloss und verstärkter Verriegelung.',
      },
      {
        title: 'Günstiger als Hallenmiete',
        text: 'Nach 18 bis 30 Monaten hat sich der Kauf gegenüber einer angemieteten Lagerfläche amortisiert.',
      },
    ],
    faqs: [
      {
        question: 'Wie verhindere ich Kondenswasser im Lagercontainer?',
        answer:
          'Drei Maßnahmen helfen: Belüftungsgitter an den Längsseiten für permanenten Luftaustausch, eine Deckendämmung, die das Erreichen des Taupunkts an der Stahlfläche verhindert, und Luftentfeuchter-Granulat für empfindliches Lagergut. Die Kombination aus Belüftung und Dämmung ist die dauerhafteste Lösung.',
      },
      {
        question: 'Kann ich Regale im Container montieren?',
        answer:
          'Ja. Die Längswände sind über die Wellblechstruktur tragfähig; wir montieren Regalschienen direkt an den Wandprofilen. Bohren Sie nicht durch die Außenhaut, sonst entstehen Undichtigkeiten. Wir liefern Regalsysteme passend eingemessen mit.',
      },
      {
        question: 'Ist der Inhalt versichert?',
        answer:
          'Nicht automatisch. Prüfen Sie, ob Ihre Inhalts- oder Geschäftsversicherung Lagerung außerhalb von Gebäuden abdeckt. Viele Versicherer verlangen dafür bestimmte Sicherungsmaßnahmen wie einen Schlosskasten oder eine Alarmanlage.',
      },
    ],
    image: {
      publicId: 'emc/categories/lagercontainer',
      alt: 'Lagercontainer mit Regalsystem und Belüftungsgittern',
      width: 1200,
      height: 800,
    },
    icon: 'archive',
    menuGroup: 'ausbau',
    order: 12,
    seo: {
      title: 'Lagercontainer kaufen – abschließbarer Stauraum ab 1.190 €',
      description:
        'Lagercontainer kaufen: wetterfest, abschließbar, sofort einsatzbereit. 10/20/40 Fuß, optional mit Regalsystem, Belüftung und Schlosskasten. Lieferung deutschlandweit.',
      focusKeyword: 'Lagercontainer kaufen',
      secondaryKeywords: ['Container Lager', 'Materialcontainer', 'Lagercontainer Preis'],
    },
  },
  {
    slug: 'wohncontainer',
    name: 'Wohncontainer',
    navLabel: 'Wohncontainer',
    tagline: 'Vollausbau mit Bad und Küche – Tiny House auf Containerbasis',
    description: [
      'Wohncontainer sind der aufwendigste Ausbau in unserem Programm: Auf Basis eines 40-Fuß-High-Cube entsteht eine vollwertige Wohneinheit mit Wohnraum, Schlafbereich, Duschbad und Küchenzeile. Dämmung, Fenster, Elektrik, Sanitärinstallation und Innenausbau kommen fertig aus der Werkstatt.',
      'Typische Einsätze sind Monteurunterkünfte, Ferienhäuser, Gartenhäuser mit Übernachtungsmöglichkeit, betreute Wohnformen und temporärer Wohnraum bei Sanierungen. Die Bauweise ist robust, versetzbar und im Vergleich zu konventionellem Bauen kalkulierbar in Preis und Zeit.',
      'Wichtig: Wohncontainer sind ohne Ausnahme baugenehmigungspflichtig. Erforderlich sind ein Standsicherheitsnachweis, ein Nachweis des Wärmeschutzes nach GEG, ein Erschließungskonzept für Wasser, Abwasser und Strom sowie in der Regel ein Fundament. Wir stellen die notwendigen Unterlagen für den Bauantrag bereit und arbeiten auf Wunsch mit Ihrem Architekten zusammen.',
    ],
    benefits: [
      {
        title: 'Schlüsselfertig',
        text: 'Bad, Küche, Heizung, Elektrik und Möblierung – bezugsfertig geliefert und aufgestellt.',
      },
      {
        title: 'GEG-konform gedämmt',
        text: 'Mehrschichtaufbau mit Dampfsperre, U-Werte entsprechend Gebäudeenergiegesetz.',
      },
      {
        title: 'Planungsunterlagen inklusive',
        text: 'Statik, Wärmeschutznachweis und Ausführungspläne für Ihren Bauantrag.',
      },
    ],
    faqs: [
      {
        question: 'Darf ich einen Wohncontainer einfach aufstellen?',
        answer:
          'Nein. Ein Wohncontainer ist ein Gebäude im Sinne der Landesbauordnung und benötigt eine Baugenehmigung. Erforderlich sind unter anderem ein Standsicherheitsnachweis, der Nachweis des Wärmeschutzes und die gesicherte Erschließung. Im Außenbereich nach § 35 BauGB ist eine Genehmigung nur in eng begrenzten Ausnahmen möglich.',
      },
      {
        question: 'Wie gut ist ein Wohncontainer gedämmt?',
        answer:
          'Wir bauen einen Mehrschichtaufbau aus Dämmung zwischen Unterkonstruktion, Dampfbremse und Innenverkleidung – typischerweise 100 bis 140 mm in Wand und Dach. Damit werden U-Werte erreicht, die den Anforderungen des GEG an Wohngebäude entsprechen. Die genauen Werte weisen wir im Wärmeschutznachweis aus.',
      },
      {
        question: 'Was kostet ein ausgebauter Wohncontainer?',
        answer:
          'Ein 40-Fuß-Wohncontainer mit Bad, Küche und vollständiger Haustechnik liegt je nach Ausstattung zwischen 32.000 € und 55.000 € netto. Hinzu kommen Transport, Kranstellung, Fundament und die bauseitigen Anschlüsse für Wasser, Abwasser und Strom.',
      },
    ],
    image: {
      publicId: 'emc/categories/wohncontainer',
      alt: 'Ausgebauter Wohncontainer mit großer Fensterfront und Terrasse',
      width: 1200,
      height: 800,
    },
    icon: 'home',
    menuGroup: 'ausbau',
    order: 13,
    seo: {
      title: 'Wohncontainer kaufen – ausgebaut mit Bad & Küche | EMC Container',
      description:
        'Wohncontainer kaufen: 40 Fuß High Cube mit Bad, Küche, Heizung und GEG-konformer Dämmung. Inklusive Statik und Planungsunterlagen für den Bauantrag.',
      focusKeyword: 'Wohncontainer kaufen',
      secondaryKeywords: ['Container Haus', 'Containerhaus kaufen', 'Wohncontainer Preis'],
    },
  },
  {
    slug: 'umbau-container',
    name: 'Umbau & Sonderbau',
    navLabel: 'Umbau & Sonderbau',
    tagline: 'Vom Werkstattcontainer bis zum Verkaufsstand – nach Ihrer Zeichnung',
    description: [
      'Nicht jede Anforderung passt in ein Standardprodukt. In unserer Werkstatt bauen wir Seecontainer nach Ihren Vorgaben um: Fenster und Türen einschneiden, Wände dämmen, Elektro- und Sanitärinstallation verlegen, Trennwände einziehen, Rolltore einbauen, Container koppeln oder stapeln.',
      'Häufige Umbauten sind Werkstattcontainer mit Werkbank und Starkstromanschluss, Sanitärcontainer mit Dusche und WC, Technikcontainer für Serverräume mit Klimatisierung, Verkaufscontainer mit Klappe und Theke, Garagen mit Sektionaltor sowie Umkleide- und Pausencontainer für Baustellen.',
      'Der Ablauf ist immer gleich: Anforderung besprechen, Skizze und Festpreisangebot erstellen, Fertigung in 3 bis 6 Wochen, Anlieferung und Aufstellung. Bei genehmigungspflichtigen Vorhaben liefern wir die statischen und bauphysikalischen Unterlagen mit.',
    ],
    benefits: [
      {
        title: 'Nach Maß gefertigt',
        text: 'Jeder Umbau nach Ihrer Zeichnung oder gemeinsam entwickelter Skizze – kein Baukastenzwang.',
      },
      {
        title: 'Festpreis vorab',
        text: 'Verbindliches Angebot mit Leistungsverzeichnis vor Fertigungsbeginn. Keine Nachträge.',
      },
      {
        title: 'Eigene Werkstatt',
        text: 'Schlosserei, Elektrik und Innenausbau aus einer Hand – ein Ansprechpartner, ein Termin.',
      },
    ],
    faqs: [
      {
        question: 'Wie lange dauert ein Containerumbau?',
        answer:
          'Einfache Umbauten wie Fenster, Belüftung oder eine Elektroinstallation setzen wir in 2 bis 3 Wochen um. Vollausbauten mit Dämmung, Sanitär und Trennwänden benötigen 4 bis 6 Wochen. Die verbindliche Fertigungszeit nennen wir mit dem Angebot.',
      },
      {
        question: 'Kann ich mehrere Container verbinden?',
        answer:
          'Ja. Container lassen sich seitlich koppeln und übereinander stapeln. Beim Koppeln entfernen wir die Trennwand und ersetzen sie durch einen statisch nachgewiesenen Stahlrahmen. Für gestapelte Anlagen liefern wir Treppen, Podeste und Geländer. Ab zwei Ebenen ist ein Standsicherheitsnachweis erforderlich.',
      },
      {
        question: 'Übernehmen Sie auch Umbauten an meinem vorhandenen Container?',
        answer:
          'Ja, sofern die Substanz es zulässt. Bringen Sie den Container zu uns nach Altenkirchen oder wir holen ihn ab. Nach einer Bestandsaufnahme erhalten Sie ein Festpreisangebot. Bei stark durchgerosteten Einheiten raten wir in der Regel zum Austausch statt zur Instandsetzung.',
      },
    ],
    image: {
      publicId: 'emc/categories/umbau',
      alt: 'Umgebauter Werkstattcontainer mit Fenster, Tür und Rolltor',
      width: 1200,
      height: 800,
    },
    icon: 'wrench',
    menuGroup: 'ausbau',
    order: 14,
    seo: {
      title: 'Container Umbau – Werkstatt, Sanitär & Sonderbau nach Maß',
      description:
        'Container Umbau nach Maß: Werkstatt-, Sanitär-, Technik- und Verkaufscontainer. Fenster, Dämmung, Elektrik, Rolltore. Festpreis, eigene Werkstatt, 3–6 Wochen.',
      focusKeyword: 'Container Umbau',
      secondaryKeywords: ['Container umbauen lassen', 'Werkstattcontainer', 'Sonderbau Container'],
    },
  },
  {
    slug: 'container-zubehoer',
    name: 'Container Zubehör',
    navLabel: 'Zubehör',
    tagline: 'Schlosskästen, Regale, Belüftung, Rampen – alles für den Containeralltag',
    description: [
      'Mit dem richtigen Zubehör wird aus einem Stahlkasten ein durchdachter Arbeitsplatz. Wir führen alles, was im Containeralltag gebraucht wird – vom Schlosskasten über Regalsysteme und Belüftungsgitter bis zu Auffahrrampen, Fundamentblöcken und Ausbesserungslack im passenden RAL-Ton.',
      'Besonders empfehlenswert sind drei Ergänzungen: ein Schlosskasten (Lockbox), der das Vorhängeschloss vollständig umschließt und Bolzenschneidern keine Angriffsfläche bietet; Belüftungsgitter, die Kondenswasserbildung deutlich reduzieren; und Fundamentblöcke, die den Container waagerecht und trocken auf den Untergrund stellen.',
      'Sämtliches Zubehör ist auf Standard-Seecontainer abgestimmt und kann direkt mit dem Container geliefert werden – das spart eine separate Versandpauschale. Montage auf Wunsch durch unser Team bei der Anlieferung.',
    ],
    benefits: [
      {
        title: 'Passgenau',
        text: 'Alle Artikel sind auf ISO-Standardmaße abgestimmt – kein Anpassen, kein Improvisieren.',
      },
      {
        title: 'Mit dem Container geliefert',
        text: 'Zubehör reist mit Ihrem Container mit. Keine zweite Versandpauschale.',
      },
      {
        title: 'Montage möglich',
        text: 'Auf Wunsch montiert unser Team Schlosskasten, Regale und Belüftung direkt bei Anlieferung.',
      },
    ],
    faqs: [
      {
        question: 'Welches Schloss ist für einen Container geeignet?',
        answer:
          'Ein Vorhangschloss der Schutzklasse VdS oder ein spezielles Containerschloss mit verdecktem Bügel. In Kombination mit einem angeschweißten Schlosskasten ist das Schloss von außen nicht mehr mit dem Bolzenschneider erreichbar – die wirksamste einfache Sicherung.',
      },
      {
        question: 'Wie viele Belüftungsgitter brauche ich?',
        answer:
          'Für einen 20-Fuß-Container empfehlen wir vier Gitter, jeweils zwei pro Längsseite – diagonal versetzt, damit eine Querlüftung entsteht. Beim 40-Fuß-Container verdoppelt sich die Anzahl. Die Gitter werden im oberen Wandbereich gesetzt, damit die warme Luft entweichen kann.',
      },
    ],
    image: {
      publicId: 'emc/categories/zubehoer',
      alt: 'Containerzubehör: Schlosskasten, Belüftungsgitter und Regalsystem',
      width: 1200,
      height: 800,
    },
    icon: 'tools',
    menuGroup: 'ausbau',
    order: 15,
    seo: {
      title: 'Container Zubehör kaufen – Schlosskasten, Regale, Belüftung',
      description:
        'Container Zubehör: Schlosskästen, Regalsysteme, Belüftungsgitter, Auffahrrampen, Fundamentblöcke und Ausbesserungslack. Passgenau für ISO-Seecontainer.',
      focusKeyword: 'Container Zubehör',
      secondaryKeywords: ['Schlosskasten Container', 'Container Regalsystem', 'Lockbox Container'],
    },
  },
];

export const categoriesBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoriesBySlug.get(slug);
}

/** Mega-Menü-Gruppen mit Überschriften in der Reihenfolge der Darstellung. */
export const menuGroups = [
  { key: 'groessen', label: 'Nach Größe', description: 'Von 10 bis 45 Fuß' },
  { key: 'zustand', label: 'Nach Zustand', description: 'Neu, One-Trip oder gebraucht' },
  {
    key: 'bauart',
    label: 'Nach Bauart',
    description: 'Spezialcontainer für besondere Anforderungen',
  },
  { key: 'ausbau', label: 'Ausbau & Zubehör', description: 'Fertig ausgebaut oder nach Maß' },
] as const;

export function categoriesByGroup(group: Category['menuGroup']): Category[] {
  return categories.filter((c) => c.menuGroup === group).sort((a, b) => a.order - b.order);
}
