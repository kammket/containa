import type { City } from './types.ts';

/**
 * Städteseiten für lokale Suchintention. Jede Stadt trägt individuellen Text –
 * bewusst kein Template mit ausgetauschtem Städtenamen, um Duplicate Content
 * zu vermeiden und echten Mehrwert für lokale Suchanfragen zu liefern.
 */
export const cities: City[] = [
  {
    slug: 'berlin',
    name: 'Berlin',
    adjective: 'Berliner',
    state: 'Berlin',
    postalPrefix: '10–14',
    population: 3755251,
    lat: 52.52,
    lng: 13.405,
    distanceKm: 590,
    deliveryDays: [4, 6],
    hub: 'Westhafen Berlin / BEHALA',
    intro: [
      'In Berlin ist Fläche das knappste Gut. Zwischen Gewerbehöfen in Neukölln, Kreativarealen in Friedrichshain und den Logistikflächen am Stadtrand konkurrieren Handwerk, Startups und Bauwirtschaft um jeden Quadratmeter. Ein Seecontainer schafft Lagerfläche genau dort, wo sie gebraucht wird – ohne Mietvertrag, ohne Baugenehmigung für die reine Lagernutzung und ohne monatelange Vorlaufzeit.',
      'Wir beliefern das gesamte Stadtgebiet sowie das Berliner Umland. Weil viele Berliner Grundstücke über schmale Hofdurchfahrten erschlossen sind, klären wir die Zufahrt grundsätzlich vor dem Liefertermin. Wo der Absetzkipper nicht durchkommt, arbeiten wir mit einem Autokran, der den Container über das Gebäude hinweg auf den Hof hebt.',
      'Für Baustellen im innerstädtischen Bereich organisieren wir auf Wunsch die verkehrsrechtliche Anordnung für die Aufstellfläche mit. In Bezirken mit angespannter Parkraumsituation ist das häufig der Schlüssel zu einem reibungslosen Liefertermin.',
    ],
    useCases: [
      {
        title: 'Baustellenlager im Altbaubestand',
        text: 'Bei Dachgeschossausbauten und Kernsanierungen in Prenzlauer Berg oder Charlottenburg ersetzt ein 10- oder 20-Fuß-Container das fehlende Materiallager im Haus.',
      },
      {
        title: 'Werkstatt- und Atelierlager',
        text: 'Kreativbetriebe in Lichtenberg und Treptow nutzen Container als abschließbaren Zusatzraum auf dem Hof – deutlich günstiger als angemietete Gewerbefläche.',
      },
      {
        title: 'Eventlogistik',
        text: 'Für Veranstaltungen auf dem Tempelhofer Feld oder in der Wuhlheide liefern wir Lager- und Kühlcontainer termingenau und holen sie nach dem Event wieder ab.',
      },
    ],
    districts: [
      'Mitte',
      'Charlottenburg-Wilmersdorf',
      'Pankow',
      'Neukölln',
      'Treptow-Köpenick',
      'Lichtenberg',
      'Marzahn-Hellersdorf',
      'Spandau',
      'Reinickendorf',
      'Steglitz-Zehlendorf',
    ],
    logisticsNote:
      'Viele Berliner Grundstücke sind nur über Hofdurchfahrten erreichbar. Prüfen Sie die lichte Höhe (mind. 4,2 m) und Breite (mind. 3,5 m). Bei engeren Verhältnissen setzen wir einen Autokran ein, der über das Vorderhaus hebt.',
    seo: {
      title: 'Seecontainer Berlin kaufen – Lieferung in alle Bezirke',
      description:
        'Seecontainer in Berlin kaufen: neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung per Kranfahrzeug in alle Bezirke – auch in enge Hinterhöfe. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Seecontainer Berlin',
      secondaryKeywords: ['Container kaufen Berlin', 'Lagercontainer Berlin', 'Container Berlin'],
    },
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    adjective: 'Hamburger',
    state: 'Hamburg',
    postalPrefix: '20–22',
    population: 1892122,
    lat: 53.5511,
    lng: 9.9937,
    distanceKm: 480,
    deliveryDays: [3, 5],
    hub: 'Hafen Hamburg / Waltershof',
    intro: [
      'Hamburg ist Deutschlands Containerstadt. Über den Hafen laufen jährlich Millionen TEU, und kaum ein anderer Ort im Land hat ein so selbstverständliches Verhältnis zu dem stählernen Kasten. Genau das macht den Markt hier auch anspruchsvoll: Hamburger Käufer wissen, worauf sie achten müssen – auf die CSC-Plakette, auf den Zustand des Bodens, auf die Dichtheit der Türgummis.',
      'Wir liefern in ganz Hamburg und im Umland bis nach Pinneberg, Norderstedt, Ahrensburg und Buxtehude. Die Nähe zum Hafen wirkt sich günstig auf Verfügbarkeit und Lieferzeit aus – viele Einheiten sind innerhalb weniger Tage bei Ihnen.',
      'Für Gewerbebetriebe in Billbrook, Rothenburgsort und Wilhelmsburg ist der Lagercontainer ein etabliertes Mittel, um Hallenfläche zu entlasten. In den Elbvororten und in Bergedorf sind es dagegen überwiegend private Käufer, die Garten-, Boots- oder Werkstattlager suchen.',
    ],
    useCases: [
      {
        title: 'Hafennahes Gewerbelager',
        text: 'Speditionen und Handwerksbetriebe in Billbrook und Waltershof nutzen 40-Fuß-Container als Pufferlager direkt auf dem Betriebshof.',
      },
      {
        title: 'Bootszubehör und Winterlager',
        text: 'An Elbe und Alster lagern Wassersportler Masten, Segel und Motoren trocken und diebstahlsicher – mit Belüftung gegen Kondenswasser.',
      },
      {
        title: 'Umbau zu Büro und Studio',
        text: 'In der Kreativwirtschaft rund um die Schanze und in Ottensen entstehen aus High-Cube-Containern Ateliers und Bürocontainer.',
      },
    ],
    districts: [
      'Hamburg-Mitte',
      'Altona',
      'Eimsbüttel',
      'Hamburg-Nord',
      'Wandsbek',
      'Bergedorf',
      'Harburg',
      'Billbrook',
      'Wilhelmsburg',
      'Norderstedt',
    ],
    logisticsNote:
      'Im Hafengebiet gelten teils eigene Zufahrtsregelungen und Zeitfenster. Für Lieferungen in Sperrbereiche benötigen wir vorab Ihre Hafenzugangsberechtigung bzw. den Ansprechpartner vor Ort.',
    seo: {
      title: 'Seecontainer Hamburg kaufen – hafennah, schnell geliefert',
      description:
        'Seecontainer in Hamburg kaufen: neu, One-Trip und gebraucht. Hafennahe Verfügbarkeit, Lieferung in ganz Hamburg und ins Umland. CSC-zertifiziert, Festpreis.',
      focusKeyword: 'Seecontainer Hamburg',
      secondaryKeywords: [
        'Container kaufen Hamburg',
        'Lagercontainer Hamburg',
        'Container Hamburg',
      ],
    },
  },
  {
    slug: 'muenchen',
    name: 'München',
    adjective: 'Münchner',
    state: 'Bayern',
    postalPrefix: '80–81',
    population: 1512491,
    lat: 48.1351,
    lng: 11.582,
    distanceKm: 480,
    deliveryDays: [4, 6],
    hub: 'Güterverkehrszentrum München-Riem',
    intro: [
      'Nirgendwo in Deutschland ist Gewerbefläche teurer als in München. Wer hier zusätzlichen Lagerraum anmietet, zahlt Quadratmeterpreise, die den Kauf eines Seecontainers innerhalb von anderthalb bis zwei Jahren amortisieren. Das ist der Hauptgrund, warum Münchner Betriebe so häufig zu dieser Lösung greifen.',
      'Wir liefern in das gesamte Stadtgebiet sowie in den Landkreis München, nach Dachau, Fürstenfeldbruck, Starnberg und Erding. Für Gewerbegebiete wie Freiham, Moosach oder Feldkirchen ist die Anlieferung unkompliziert; in dicht bebauten Vierteln wie Haidhausen oder der Maxvorstadt planen wir die Kranstellung im Vorfeld genau.',
      'Ein Hinweis zur Optik: In München wird bei sichtbar aufgestellten Containern häufiger als anderswo Wert auf ein gepflegtes Erscheinungsbild gelegt. One-Trip-Container in RAL 7016 Anthrazitgrau oder RAL 9010 Reinweiß fügen sich hier deutlich unauffälliger ein als ein gebrauchter Container in Reedereifarben.',
    ],
    useCases: [
      {
        title: 'Amortisation gegenüber Hallenmiete',
        text: 'Bei Münchner Lagermieten rechnet sich ein gekaufter 20-Fuß-Container in der Regel bereits nach 18 bis 24 Monaten.',
      },
      {
        title: 'Baustellencontainer im Stadtgebiet',
        text: 'Für Sanierungen in Schwabing und Bogenhausen liefern wir Material- und Bürocontainer inklusive abgestimmter Kranstellung.',
      },
      {
        title: 'Vereins- und Sportstättenlager',
        text: 'Sportvereine im Umland nutzen Container als Geräte- und Materiallager auf dem Vereinsgelände – schnell aufgestellt, abschließbar.',
      },
    ],
    districts: [
      'Altstadt-Lehel',
      'Ludwigsvorstadt-Isarvorstadt',
      'Maxvorstadt',
      'Schwabing',
      'Bogenhausen',
      'Sendling',
      'Pasing-Obermenzing',
      'Moosach',
      'Trudering-Riem',
      'Freiham',
    ],
    logisticsNote:
      'Im Münchner Stadtgebiet ist die Aufstellfläche häufig knapp bemessen. Wir empfehlen, vorab Fotos der Zufahrt und der geplanten Stellfläche zu senden – so klären wir die Machbarkeit ohne Vor-Ort-Termin.',
    seo: {
      title: 'Container kaufen München – Seecontainer mit Lieferung',
      description:
        'Container kaufen in München: Seecontainer neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung ins Stadtgebiet und Umland per Kranfahrzeug. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Container kaufen München',
      secondaryKeywords: ['Seecontainer München', 'Lagercontainer München', 'Container München'],
    },
  },
  {
    slug: 'koeln',
    name: 'Köln',
    adjective: 'Kölner',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '50–51',
    population: 1073096,
    lat: 50.9375,
    lng: 6.9603,
    distanceKm: 95,
    deliveryDays: [2, 3],
    hub: 'Niehler Hafen Köln',
    intro: [
      'Köln liegt für uns praktisch vor der Haustür: Von unserem Standort in Altenkirchen sind es rund 95 Kilometer. Das bedeutet kurze Lieferzeiten, niedrige Transportkosten und die Möglichkeit, kurzfristig zu reagieren – häufig liefern wir innerhalb von zwei Werktagen.',
      'Der Kölner Markt ist stark von Handwerk, Medienwirtschaft und Messebetrieb geprägt. Entsprechend breit ist der Bedarf: vom klassischen Materialcontainer für den Handwerksbetrieb in Ossendorf über den Lagercontainer für Messebauer in Deutz bis zum umgebauten Bürocontainer als Produktionsbüro.',
      'Für die rechtsrheinischen Gewerbegebiete Poll, Gremberghoven und Porz sowie die linksrheinischen Standorte in Marsdorf und Braunsfeld ist die Anlieferung unkompliziert. In der Innenstadt und in der Südstadt planen wir die Kranstellung wegen der Bebauungsdichte im Vorfeld ab.',
    ],
    useCases: [
      {
        title: 'Messe- und Eventlager',
        text: 'Messebauer nutzen 40-Fuß-Container als Zwischenlager für Standbauteile in unmittelbarer Nähe zur Koelnmesse.',
      },
      {
        title: 'Handwerksbetriebe',
        text: 'Dachdecker, Elektriker und Trockenbauer lagern Material und Maschinen auf dem eigenen Hof statt in angemieteten Boxen.',
      },
      {
        title: 'Kurzfristige Verfügbarkeit',
        text: 'Dank der Nähe zu unserem Standort liefern wir in Köln häufig innerhalb von zwei Werktagen – auch bei kurzfristigem Bedarf.',
      },
    ],
    districts: [
      'Innenstadt',
      'Ehrenfeld',
      'Nippes',
      'Lindenthal',
      'Chorweiler',
      'Porz',
      'Kalk',
      'Mülheim',
      'Rodenkirchen',
      'Ossendorf',
    ],
    logisticsNote:
      'Köln liegt nur rund 95 km von unserem Standort entfernt. Dadurch sind Expresslieferungen innerhalb von 48 Stunden möglich, sofern der gewünschte Container am Lager verfügbar ist.',
    seo: {
      title: 'Seecontainer Köln kaufen – Lieferung in 2 Werktagen',
      description:
        'Seecontainer in Köln kaufen: neu, One-Trip und gebraucht. Nur 95 km von unserem Lager – Lieferung oft schon in 2 Werktagen. CSC-zertifiziert, Festpreis inkl. Anlieferung.',
      focusKeyword: 'Seecontainer Köln',
      secondaryKeywords: ['Container kaufen Köln', 'Lagercontainer Köln', 'Container Köln'],
    },
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    adjective: 'Frankfurter',
    state: 'Hessen',
    postalPrefix: '60–65',
    population: 773068,
    lat: 50.1109,
    lng: 8.6821,
    distanceKm: 135,
    deliveryDays: [2, 4],
    hub: 'Frankfurter Osthafen',
    intro: [
      'Frankfurt verbindet Finanzplatz, Logistikdrehscheibe und Messestandort auf engem Raum. Der Bedarf an flexibler Lagerfläche ist entsprechend hoch – und die verfügbaren Flächen sind entsprechend teuer. Ein Seecontainer auf dem eigenen Betriebsgelände ist hier oft die wirtschaftlichste Antwort.',
      'Von Altenkirchen aus sind es rund 135 Kilometer nach Frankfurt. Wir liefern in das Stadtgebiet sowie in den gesamten Rhein-Main-Raum: Offenbach, Hanau, Bad Homburg, Rüsselsheim und die Gewerbestandorte rund um den Flughafen.',
      'Im Umfeld von Flughafen und Messe gelten besondere Zufahrtsregelungen mit festen Zeitfenstern und Sicherheitsanforderungen. Nennen Sie uns bei der Bestellung Ihren Ansprechpartner vor Ort, dann stimmen wir den Liefertermin direkt mit der Objektleitung ab.',
    ],
    useCases: [
      {
        title: 'Logistikpuffer im Rhein-Main-Gebiet',
        text: 'Speditionen nutzen 40-Fuß-High-Cube-Container als flexiblen Pufferraum bei saisonalen Volumenspitzen.',
      },
      {
        title: 'Baustelleneinrichtung im Hochbau',
        text: 'Bei den zahlreichen Hochhausprojekten im Bankenviertel dienen Büro- und Materialcontainer als kompakte Baustelleneinrichtung.',
      },
      {
        title: 'Gastronomie und Kühlung',
        text: 'Für Veranstaltungen auf dem Messegelände und am Mainufer vermieten und verkaufen wir Kühlcontainer mit PTI-Protokoll.',
      },
    ],
    districts: [
      'Innenstadt',
      'Bockenheim',
      'Sachsenhausen',
      'Ostend',
      'Nordend',
      'Höchst',
      'Niederrad',
      'Fechenheim',
      'Gallus',
      'Riederwald',
    ],
    logisticsNote:
      'Für Anlieferungen im Flughafen- und Messeumfeld sind Zeitfenster und teils Sicherheitsfreigaben erforderlich. Wir übernehmen die Abstimmung, benötigen dafür aber Ihren Ansprechpartner vor Ort.',
    seo: {
      title: '20ft Container Frankfurt kaufen – Seecontainer mit Lieferung',
      description:
        'Container kaufen in Frankfurt am Main: 10, 20 und 40 Fuß Seecontainer, neu und gebraucht. Lieferung ins gesamte Rhein-Main-Gebiet. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Container Frankfurt',
      secondaryKeywords: [
        '20ft Container Frankfurt',
        'Seecontainer Frankfurt',
        'Lagercontainer Frankfurt',
      ],
    },
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    adjective: 'Stuttgarter',
    state: 'Baden-Württemberg',
    postalPrefix: '70–71',
    population: 632865,
    lat: 48.7758,
    lng: 9.1829,
    distanceKm: 300,
    deliveryDays: [3, 5],
    hub: 'Hafen Stuttgart',
    intro: [
      'Stuttgart liegt im Kessel, und das prägt die Logistik. Steile Zufahrten, enge Kurven und Hanglagen stellen bei der Containeranlieferung besondere Anforderungen. Wir planen Lieferungen in den Stuttgarter Raum deshalb grundsätzlich mit einem Blick auf das Höhenprofil der Anfahrt.',
      'Wirtschaftlich dominiert die Zulieferindustrie: Maschinenbau, Automotive und Metallverarbeitung im Raum Stuttgart, Esslingen, Böblingen und Waiblingen. Für diese Betriebe sind Lagercontainer für Werkzeuge, Vorrichtungen und Ersatzteile Standard – häufig in Kombination mit einem Regalsystem.',
      'Wir beliefern das Stadtgebiet sowie die Region Stuttgart mit Ludwigsburg, Sindelfingen, Fellbach, Leonberg und Esslingen. Bei Hanggrundstücken empfehlen wir Fundamentblöcke zum Höhenausgleich, damit der Container waagerecht steht und die Türen sauber schließen.',
    ],
    useCases: [
      {
        title: 'Vorrichtungs- und Werkzeuglager',
        text: 'Zulieferbetriebe lagern Spannvorrichtungen und Werkzeugsätze in Containern mit Regalsystem direkt neben der Produktionshalle.',
      },
      {
        title: 'Hanglagen sicher aufstellen',
        text: 'Auf abschüssigen Grundstücken gleichen wir mit Fundamentblöcken aus, damit der Rahmen sich nicht verwindet.',
      },
      {
        title: 'Weinbau und Landwirtschaft',
        text: 'In den Weinbaulagen am Neckar dienen Container als Geräte- und Materiallager unmittelbar an den Rebflächen.',
      },
    ],
    districts: [
      'Stuttgart-Mitte',
      'Bad Cannstatt',
      'Feuerbach',
      'Zuffenhausen',
      'Vaihingen',
      'Degerloch',
      'Möhringen',
      'Untertürkheim',
      'Weilimdorf',
      'Fellbach',
    ],
    logisticsNote:
      'Hanglagen und enge Kurven sind im Stuttgarter Raum die Regel. Nennen Sie uns Steigung und Zufahrtsbreite – bei über 12 % Steigung setzen wir ein Fahrzeug mit Allradantrieb oder einen Autokran ein.',
    seo: {
      title: 'Container kaufen Stuttgart – Seecontainer für Region & Umland',
      description:
        'Container kaufen in Stuttgart: Seecontainer 10/20/40 Fuß, neu und gebraucht. Lieferung in die Region Stuttgart, auch in Hanglagen. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Container kaufen Stuttgart',
      secondaryKeywords: ['Seecontainer Stuttgart', 'Lagercontainer Stuttgart'],
    },
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    adjective: 'Düsseldorfer',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '40',
    population: 629047,
    lat: 51.2277,
    lng: 6.7735,
    distanceKm: 130,
    deliveryDays: [2, 4],
    hub: 'Hafen Düsseldorf',
    intro: [
      'Düsseldorf ist Messestadt, Handelsplatz und Sitz zahlreicher Unternehmenszentralen. Der Containerbedarf ist entsprechend vielfältig: Messebauer brauchen Zwischenlager, Handelsunternehmen suchen Pufferflächen, und im Hafenareal entstehen aus Containern zunehmend Büro- und Studioflächen.',
      'Von unserem Standort sind es rund 130 Kilometer – wir liefern in der Regel innerhalb von zwei bis vier Werktagen in das Stadtgebiet und den gesamten Niederrhein bis Neuss, Ratingen, Hilden und Krefeld.',
      'Im Medienhafen und in den umgebauten Industriearealen legen Kunden erfahrungsgemäß Wert auf die Optik. Hier liefern wir überwiegend One-Trip-Container in Anthrazitgrau oder Reinweiß, auf Wunsch mit überlackierter Reedereibeschriftung.',
    ],
    useCases: [
      {
        title: 'Messelogistik',
        text: 'Für Messen auf dem Düsseldorfer Gelände dienen Container als Zwischenlager für Standbauteile und Exponate.',
      },
      {
        title: 'Kreativflächen im Hafen',
        text: 'Im Medienhafen entstehen aus High-Cube-Containern Studios, Pop-up-Stores und Büroeinheiten in gehobener Optik.',
      },
      {
        title: 'Handelslager am Niederrhein',
        text: 'Groß- und Einzelhändler nutzen 40-Fuß-Container als saisonalen Pufferraum direkt am Betriebsstandort.',
      },
    ],
    districts: [
      'Stadtmitte',
      'Oberkassel',
      'Bilk',
      'Flingern',
      'Derendorf',
      'Gerresheim',
      'Benrath',
      'Rath',
      'Heerdt',
      'Medienhafen',
    ],
    logisticsNote:
      'Im Medienhafen und in der Altstadt gelten Lieferzeitfenster. Wir stimmen den Termin mit der jeweiligen Objekt- oder Standortleitung ab, sofern Sie uns den Ansprechpartner nennen.',
    seo: {
      title: 'Seecontainer Düsseldorf kaufen – Lieferung an den Niederrhein',
      description:
        'Seecontainer in Düsseldorf kaufen: neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung ins Stadtgebiet und an den Niederrhein. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Seecontainer Düsseldorf',
      secondaryKeywords: ['Container kaufen Düsseldorf', 'Lagercontainer Düsseldorf'],
    },
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    adjective: 'Dortmunder',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '44',
    population: 587696,
    lat: 51.5136,
    lng: 7.4653,
    distanceKm: 160,
    deliveryDays: [2, 4],
    hub: 'Dortmunder Hafen',
    intro: [
      'Dortmund hat den Strukturwandel zur Logistik- und Technologiestadt konsequent vollzogen. Auf den ehemaligen Zechen- und Hüttenarealen sind heute Gewerbeparks und Logistikzentren entstanden – mit großzügigen Flächen, auf denen sich Container problemlos aufstellen lassen.',
      'Der Dortmunder Hafen ist Europas größter Kanalhafen und ein wichtiger Umschlagpunkt. Für uns bedeutet das eine gute Verkehrsanbindung und unkomplizierte Anlieferung in nahezu allen Stadtteilen.',
      'Typische Anwendungen sind Materiallager für Handwerksbetriebe in Hörde und Huckarde, Pufferlager für Logistiker in Ellinghausen sowie Vereins- und Sportstättenlager – Dortmund hat eine ausgeprägte Vereinslandschaft mit entsprechendem Bedarf an Gerätelagern.',
    ],
    useCases: [
      {
        title: 'Logistikpuffer auf Gewerbeparks',
        text: 'Auf den weitläufigen Flächen ehemaliger Industrieareale lassen sich auch 40-Fuß-Container unkompliziert aufstellen und umsetzen.',
      },
      {
        title: 'Vereinsheime und Sportstätten',
        text: 'Sportvereine lagern Geräte, Netze und Pflegetechnik in abschließbaren Containern direkt am Platz.',
      },
      {
        title: 'Handwerk im Bestand',
        text: 'Bei Sanierungen in Hörde und der Nordstadt dient der Container als sicheres Material- und Werkzeuglager.',
      },
    ],
    districts: [
      'Innenstadt-West',
      'Innenstadt-Nord',
      'Hörde',
      'Huckarde',
      'Eving',
      'Aplerbeck',
      'Brackel',
      'Lütgendortmund',
      'Mengede',
      'Ellinghausen',
    ],
    logisticsNote:
      'Auf den ehemaligen Industrieflächen im Dortmunder Norden ist die Zufahrt in der Regel großzügig. Beachten Sie bei Altstandorten mögliche Auflagen zur Bodenversiegelung an der Aufstellfläche.',
    seo: {
      title: 'Container kaufen Dortmund – Seecontainer mit Lieferung',
      description:
        'Container kaufen in Dortmund: Seecontainer 10/20/40 Fuß, neu, One-Trip und gebraucht. Lieferung ins gesamte Stadtgebiet und östliche Ruhrgebiet. Festpreis.',
      focusKeyword: 'Container kaufen Dortmund',
      secondaryKeywords: ['Seecontainer Dortmund', 'Lagercontainer Dortmund'],
    },
  },
  {
    slug: 'essen',
    name: 'Essen',
    adjective: 'Essener',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '45',
    population: 584580,
    lat: 51.4556,
    lng: 7.0116,
    distanceKm: 145,
    deliveryDays: [2, 4],
    hub: 'Stadthafen Essen',
    intro: [
      'Essen liegt im Herzen des Ruhrgebiets und ist damit Teil der dichtesten Gewerbelandschaft Deutschlands. Zwischen Zeche Zollverein im Norden und den Villenlagen in Bredeney im Süden trifft man auf sehr unterschiedliche Aufstellsituationen – von der weiten Industriefläche bis zum knapp bemessenen Reihenhausgarten.',
      'Für den industriell geprägten Norden liefern wir überwiegend 20- und 40-Fuß-Container als Material- und Pufferlager. Im Süden dominieren kleinere Formate: 10-Fuß-Container als Gartenlager, Werkstatt oder Fahrradgarage.',
      'Von Altenkirchen sind es rund 145 Kilometer. Damit erreichen wir Essen in der Regel innerhalb von zwei bis vier Werktagen und können auch kurzfristige Termine bedienen.',
    ],
    useCases: [
      {
        title: 'Industrielager im Essener Norden',
        text: 'Auf den Gewerbeflächen rund um Zollverein und Altenessen dienen 40-Fuß-Container als Ersatzteil- und Materialdepot.',
      },
      {
        title: 'Kompaktlösungen im Süden',
        text: 'In Bredeney, Werden und Rüttenscheid sind 10-Fuß-Container als Garten- und Werkstattlager die passende Größe.',
      },
      {
        title: 'Stadtentwicklungsprojekte',
        text: 'Bei Quartiersentwicklungen dienen Bürocontainer als Projektbüro und Anlaufstelle vor Ort.',
      },
    ],
    districts: [
      'Stadtkern',
      'Rüttenscheid',
      'Altenessen',
      'Borbeck',
      'Steele',
      'Werden',
      'Bredeney',
      'Kray',
      'Katernberg',
      'Frillendorf',
    ],
    logisticsNote:
      'Im Essener Süden sind viele Wohngrundstücke nur über schmale Anliegerstraßen erreichbar. Für 10-Fuß-Container genügt meist der Absetzkipper; bei größeren Einheiten prüfen wir die Kranstellung vorab.',
    seo: {
      title: 'Seecontainer Essen kaufen – Lieferung ins Ruhrgebiet',
      description:
        'Seecontainer in Essen kaufen: neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung ins gesamte Ruhrgebiet per Kranfahrzeug. CSC-zertifiziert, Festpreis.',
      focusKeyword: 'Seecontainer Essen',
      secondaryKeywords: ['Container kaufen Essen', 'Lagercontainer Essen'],
    },
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    adjective: 'Leipziger',
    state: 'Sachsen',
    postalPrefix: '04',
    population: 616093,
    lat: 51.3397,
    lng: 12.3731,
    distanceKm: 430,
    deliveryDays: [4, 6],
    hub: 'Güterverkehrszentrum Leipzig',
    intro: [
      'Leipzig wächst schneller als fast jede andere deutsche Großstadt, und das schlägt sich unmittelbar im Containerbedarf nieder. Neue Wohnquartiere, expandierende Logistikstandorte am Flughafen und eine lebendige Gründerszene sorgen für konstante Nachfrage nach flexiblem Lagerraum.',
      'Wir liefern in das gesamte Stadtgebiet und in den Großraum bis Halle, Grimma, Markkleeberg und Schkeuditz. Für die Logistikansiedlungen rund um den Flughafen Leipzig/Halle sind größere Einheiten gefragt, in den Gründerzeitvierteln eher kompakte Formate.',
      'Ein Leipziger Besonderheit ist der große Bestand an Baulücken und Brachflächen in innenstadtnahen Lagen. Diese eignen sich gut für Zwischennutzungen – Container dienen dort als Lager, Werkstatt oder temporäre Verkaufsfläche.',
    ],
    useCases: [
      {
        title: 'Logistik am Flughafen',
        text: 'Die Frachtdrehkreuze rund um Leipzig/Halle nutzen 40-Fuß-Container als Puffer- und Werkstattfläche.',
      },
      {
        title: 'Zwischennutzung auf Brachflächen',
        text: 'Auf innenstadtnahen Baulücken entstehen aus Containern temporäre Werkstätten, Lager und Verkaufsstände.',
      },
      {
        title: 'Sanierung im Gründerzeitbestand',
        text: 'Bei Altbausanierungen in Plagwitz und Connewitz dient der Container als Materiallager auf dem Hof.',
      },
    ],
    districts: [
      'Zentrum',
      'Plagwitz',
      'Connewitz',
      'Gohlis',
      'Schleußig',
      'Lindenau',
      'Reudnitz',
      'Grünau',
      'Möckern',
      'Schkeuditz',
    ],
    logisticsNote:
      'In den Gründerzeitvierteln sind Hofzufahrten oft schmal und mit Torbögen versehen. Prüfen Sie die lichte Höhe – bei unter 4,2 m planen wir einen Autokran ein.',
    seo: {
      title: 'Container kaufen Leipzig – Seecontainer mit Lieferung',
      description:
        'Container kaufen in Leipzig: Seecontainer 10/20/40 Fuß, neu, One-Trip und gebraucht. Lieferung in Stadtgebiet und Großraum Halle/Leipzig. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Container kaufen Leipzig',
      secondaryKeywords: ['Seecontainer Leipzig', 'Lagercontainer Leipzig'],
    },
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    adjective: 'Bremer',
    state: 'Bremen',
    postalPrefix: '28',
    population: 569396,
    lat: 53.0793,
    lng: 8.8017,
    distanceKm: 420,
    deliveryDays: [3, 5],
    hub: 'Neustädter Hafen Bremen',
    intro: [
      'Bremen ist neben Hamburg der zweite große Containerstandort im Norden. Über Bremerhaven laufen erhebliche Umschlagvolumen, und der Bremer Markt ist entsprechend gut mit gebrauchten Einheiten versorgt.',
      'Wir liefern in das Stadtgebiet Bremen sowie nach Bremerhaven, Delmenhorst, Oldenburg und ins niedersächsische Umland. Die Anbindung über die A1 und A27 ist gut, sodass auch größere Einheiten unkompliziert zugestellt werden können.',
      'Charakteristisch für die Region ist der hohe Anteil landwirtschaftlicher Nutzung im Umland. Container dienen dort als Futtermittel-, Maschinen- und Erntelager – häufig in der 40-Fuß-Variante mit Belüftung.',
    ],
    useCases: [
      {
        title: 'Landwirtschaft im Umland',
        text: 'Höfe im Bremer Umland lagern Futtermittel, Saatgut und Maschinen in belüfteten 40-Fuß-Containern.',
      },
      {
        title: 'Hafen- und Werftbetriebe',
        text: 'Betriebe im Industriehafen nutzen Container als Werkzeug- und Ersatzteillager unmittelbar an der Kaikante.',
      },
      {
        title: 'Windenergie-Servicelager',
        text: 'Servicebetriebe der Windbranche lagern Ersatzteile und Werkzeug dezentral in Containern nahe der Anlagen.',
      },
    ],
    districts: [
      'Mitte',
      'Neustadt',
      'Findorff',
      'Schwachhausen',
      'Vegesack',
      'Hemelingen',
      'Osterholz',
      'Gröpelingen',
      'Bremerhaven',
      'Delmenhorst',
    ],
    logisticsNote:
      'Im Bremer Umland sind viele Zufahrten unbefestigt. Bei weichem Untergrund empfehlen wir eine Anlieferung in trockener Witterung sowie Fundamentblöcke als Auflager.',
    seo: {
      title: 'Seecontainer Bremen kaufen – Lieferung in Bremen & Umland',
      description:
        'Seecontainer in Bremen kaufen: neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung nach Bremen, Bremerhaven und ins niedersächsische Umland. Festpreis.',
      focusKeyword: 'Seecontainer Bremen',
      secondaryKeywords: ['Container kaufen Bremen', 'Lagercontainer Bremen'],
    },
  },
  {
    slug: 'dresden',
    name: 'Dresden',
    adjective: 'Dresdner',
    state: 'Sachsen',
    postalPrefix: '01',
    population: 563311,
    lat: 51.0504,
    lng: 13.7373,
    distanceKm: 520,
    deliveryDays: [4, 6],
    hub: 'Alberthafen Dresden-Friedrichstadt',
    intro: [
      'Dresden verbindet Halbleiterindustrie, Bauwirtschaft und Tourismus. Der Containerbedarf verteilt sich entsprechend auf technische Lager für die Hightech-Zulieferer im Dresdner Norden, Baustellencontainer im Zuge der anhaltenden Sanierungstätigkeit und saisonale Lagerflächen im Veranstaltungsbereich.',
      'Wir liefern in das Stadtgebiet sowie nach Radebeul, Freital, Pirna, Meißen und in die weitere Region. Die Anfahrt erfolgt über die A4 und A17; Lieferungen erreichen Dresden in der Regel innerhalb von vier bis sechs Werktagen.',
      'Im Elbtal ist bei der Standortwahl der Hochwasserschutz zu beachten. Wir empfehlen, Container in hochwassergefährdeten Lagen auf Fundamentblöcken aufzustellen und keine feuchteempfindlichen Güter bodennah zu lagern.',
    ],
    useCases: [
      {
        title: 'Zulieferer der Halbleiterindustrie',
        text: 'Technische Dienstleister im Dresdner Norden lagern Werkzeug und Ersatzteile in Containern mit Regalsystem.',
      },
      {
        title: 'Denkmalgerechte Sanierung',
        text: 'Bei Sanierungen in der Neustadt und in Blasewitz dient der Container als geschütztes Materiallager.',
      },
      {
        title: 'Hochwasserbewusst aufstellen',
        text: 'In elbnahen Lagen stellen wir Container erhöht auf Fundamentblöcke, um Schäden bei Hochwasser vorzubeugen.',
      },
    ],
    districts: [
      'Altstadt',
      'Neustadt',
      'Blasewitz',
      'Striesen',
      'Pieschen',
      'Cotta',
      'Prohlis',
      'Klotzsche',
      'Loschwitz',
      'Radebeul',
    ],
    logisticsNote:
      'In elbnahen Lagen empfehlen wir eine erhöhte Aufstellung auf Fundamentblöcken. Beachten Sie außerdem die Zufahrtsbeschränkungen in der Altstadt und der Äußeren Neustadt.',
    seo: {
      title: 'Container kaufen Dresden – Seecontainer mit Lieferung',
      description:
        'Container kaufen in Dresden: Seecontainer 10/20/40 Fuß, neu und gebraucht. Lieferung ins Stadtgebiet und nach Radebeul, Freital, Pirna und Meißen. Festpreis.',
      focusKeyword: 'Container kaufen Dresden',
      secondaryKeywords: ['Seecontainer Dresden', 'Lagercontainer Dresden'],
    },
  },
  {
    slug: 'hannover',
    name: 'Hannover',
    adjective: 'Hannoveraner',
    state: 'Niedersachsen',
    postalPrefix: '30',
    population: 545045,
    lat: 52.3759,
    lng: 9.732,
    distanceKm: 330,
    deliveryDays: [3, 5],
    hub: 'Nordhafen Hannover',
    intro: [
      'Hannover ist Messestadt und Verkehrsknoten zugleich. Am Kreuz der A2 und A7 gelegen, ist die Stadt für die Containeranlieferung außergewöhnlich gut erreichbar – wir liefern in der Regel innerhalb von drei bis fünf Werktagen.',
      'Der größte Bedarf entsteht rund um das Messegelände: Für Hannover Messe, Agritechnica und Ligna benötigen Aussteller und Standbauer kurzfristig Lagerfläche, oft nur für wenige Wochen. Hier bieten wir sowohl Kauf als auch Miete mit Abholung nach Veranstaltungsende an.',
      'Im Umland dominiert die Landwirtschaft. Betriebe in der Region Hannover, in Hildesheim und im Calenberger Land nutzen Container als Maschinen-, Futtermittel- und Erntelager – meist in der 40-Fuß-Variante.',
    ],
    useCases: [
      {
        title: 'Messelogistik',
        text: 'Für Hannover Messe, Agritechnica und Ligna liefern wir Lagercontainer termingenau und holen sie nach der Messe ab.',
      },
      {
        title: 'Landwirtschaftliches Lager',
        text: 'Höfe im Calenberger Land lagern Maschinen, Saatgut und Futtermittel in belüfteten 40-Fuß-Containern.',
      },
      {
        title: 'Zentrale Lage',
        text: 'Am Autobahnkreuz A2/A7 gelegen, ist Hannover für Transporte in alle Richtungen optimal angebunden.',
      },
    ],
    districts: [
      'Mitte',
      'Linden-Limmer',
      'List',
      'Vahrenwald',
      'Südstadt',
      'Kirchrode',
      'Ricklingen',
      'Bothfeld',
      'Misburg',
      'Laatzen',
    ],
    logisticsNote:
      'Während der großen Messen sind die Zufahrten rund um das Messegelände zeitweise stark belastet. Wir planen Lieferungen in dieser Zeit bevorzugt in den frühen Morgenstunden.',
    seo: {
      title: 'Seecontainer Hannover kaufen – Lieferung in Stadt & Region',
      description:
        'Seecontainer in Hannover kaufen: neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung ins Stadtgebiet und in die Region. Auch Messemiete möglich. Festpreis.',
      focusKeyword: 'Seecontainer Hannover',
      secondaryKeywords: ['Container kaufen Hannover', 'Lagercontainer Hannover'],
    },
  },
  {
    slug: 'nuernberg',
    name: 'Nürnberg',
    adjective: 'Nürnberger',
    state: 'Bayern',
    postalPrefix: '90',
    population: 523026,
    lat: 49.4521,
    lng: 11.0767,
    distanceKm: 390,
    deliveryDays: [4, 6],
    hub: 'Hafen Nürnberg-Roth',
    intro: [
      'Nürnberg ist das wirtschaftliche Zentrum Frankens und ein bedeutender Logistikstandort – der Hafen Nürnberg-Roth ist der größte trimodale Umschlagplatz Süddeutschlands. Für die Containerversorgung der Region ist das ein klarer Vorteil.',
      'Wir liefern in das Stadtgebiet Nürnberg sowie nach Fürth, Erlangen, Schwabach und in den weiteren Großraum. Die Anfahrt erfolgt über die A3 und A9; die Lieferzeit beträgt in der Regel vier bis sechs Werktage.',
      'Wirtschaftlich prägen Maschinenbau, Elektrotechnik und Spielwarenindustrie die Region. Entsprechend gefragt sind Lagercontainer mit Regalsystem für Kleinteile sowie belüftete Einheiten für feuchteempfindliche Produkte.',
    ],
    useCases: [
      {
        title: 'Kleinteilelager mit Regalsystem',
        text: 'Elektrotechnik- und Maschinenbaubetriebe lagern Komponenten in Containern mit beidseitigem Regalsystem.',
      },
      {
        title: 'Messe Nürnberg',
        text: 'Für Spielwarenmesse, BIOFACH und embedded world liefern wir Lagercontainer für Aussteller und Standbauer.',
      },
      {
        title: 'Fränkisches Umland',
        text: 'Handwerk und Landwirtschaft in Mittelfranken nutzen Container als Material- und Maschinendepot.',
      },
    ],
    districts: [
      'Altstadt',
      'Gostenhof',
      'Johannis',
      'Schweinau',
      'Langwasser',
      'Ziegelstein',
      'Eibach',
      'Röthenbach',
      'Fürth',
      'Erlangen',
    ],
    logisticsNote:
      'In der Nürnberger Altstadt gelten weitreichende Zufahrtsbeschränkungen. Für Lieferungen innerhalb der Stadtmauer benötigen wir eine Ausnahmegenehmigung, um die wir uns auf Wunsch kümmern.',
    seo: {
      title: 'Container kaufen Nürnberg – Seecontainer für Franken',
      description:
        'Container kaufen in Nürnberg: Seecontainer 10/20/40 Fuß, neu und gebraucht. Lieferung nach Nürnberg, Fürth, Erlangen und in den fränkischen Großraum. Festpreis.',
      focusKeyword: 'Container kaufen Nürnberg',
      secondaryKeywords: ['Seecontainer Nürnberg', 'Lagercontainer Nürnberg'],
    },
  },
  {
    slug: 'duisburg',
    name: 'Duisburg',
    adjective: 'Duisburger',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '47',
    population: 502211,
    lat: 51.4344,
    lng: 6.7623,
    distanceKm: 145,
    deliveryDays: [2, 4],
    hub: 'duisport – Duisburger Hafen',
    intro: [
      'Duisburg beherbergt den größten Binnenhafen der Welt. Über duisport laufen jährlich Millionen Tonnen Güter, und die Stadt ist europäischer Endpunkt zahlreicher Bahnverbindungen aus China. Wer in Duisburg einen Container kauft, kauft ihn dort, wo Container zu Hause sind.',
      'Für uns bedeutet die Nähe zum Hafen eine exzellente Verfügbarkeit gebrauchter Einheiten. Wir liefern in das gesamte Stadtgebiet sowie nach Oberhausen, Mülheim, Moers und Krefeld – meist innerhalb von zwei bis vier Werktagen.',
      'Typische Anwendungen in Duisburg sind Werkstatt- und Ersatzteillager für Hafen- und Logistikbetriebe, Materiallager im Stahl- und Metallbau sowie zunehmend Umbauten zu Werkstatt- und Bürocontainern auf Gewerbeflächen.',
    ],
    useCases: [
      {
        title: 'Hafen- und Logistikbetriebe',
        text: 'Betriebe im Hafenareal nutzen Container als Werkzeug-, Ersatzteil- und Werkstattlager direkt am Umschlagplatz.',
      },
      {
        title: 'Stahl- und Metallbau',
        text: 'Für Halbzeuge, Profile und Zuschnitte dienen Doppeltürcontainer als durchladbares Langgutlager.',
      },
      {
        title: 'Beste Verfügbarkeit',
        text: 'Die Nähe zum größten Binnenhafen Europas sorgt für eine breite Auswahl an gebrauchten Einheiten.',
      },
    ],
    districts: [
      'Duisburg-Mitte',
      'Hochfeld',
      'Ruhrort',
      'Meiderich',
      'Rheinhausen',
      'Homberg',
      'Walsum',
      'Hamborn',
      'Neudorf',
      'Buchholz',
    ],
    logisticsNote:
      'Für Anlieferungen in das Hafengelände von duisport ist eine Zufahrtsberechtigung erforderlich. Nennen Sie uns Ihren Ansprechpartner, damit wir den Zugang vorab klären können.',
    seo: {
      title: 'Seecontainer Duisburg kaufen – am größten Binnenhafen Europas',
      description:
        'Seecontainer in Duisburg kaufen: neu, One-Trip und gebraucht. Beste Verfügbarkeit durch Hafennähe, Lieferung ins Stadtgebiet und westliche Ruhrgebiet. Festpreis.',
      focusKeyword: 'Seecontainer Duisburg',
      secondaryKeywords: ['Container kaufen Duisburg', 'Lagercontainer Duisburg'],
    },
  },
  {
    slug: 'bochum',
    name: 'Bochum',
    adjective: 'Bochumer',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '44',
    population: 363441,
    lat: 51.4818,
    lng: 7.2162,
    distanceKm: 155,
    deliveryDays: [2, 4],
    hub: 'Gewerbepark MARK 51°7',
    intro: [
      'Bochum steht exemplarisch für den Wandel des Ruhrgebiets: Wo früher Opel produzierte, entsteht heute mit MARK 51°7 einer der modernsten Gewerbeparks Deutschlands. Auf diesen neu erschlossenen Flächen ist die Containeranlieferung unkompliziert – breite Zufahrten, tragfähiger Untergrund, ausreichend Rangierraum.',
      'Wir liefern in das gesamte Stadtgebiet sowie nach Herne, Witten, Hattingen und Wattenscheid. Von Altenkirchen sind es rund 155 Kilometer, die Lieferzeit beträgt üblicherweise zwei bis vier Werktage.',
      'Neben gewerblichen Anwendungen ist Bochum durch die Ruhr-Universität und zahlreiche Forschungseinrichtungen geprägt. Für Institute und universitätsnahe Ausgründungen liefern wir regelmäßig Lagercontainer für Geräte, Prüfstände und Materialproben.',
    ],
    useCases: [
      {
        title: 'Gewerbeparks mit guter Zufahrt',
        text: 'Auf neu erschlossenen Flächen wie MARK 51°7 lassen sich auch 40-Fuß-Container ohne Aufwand aufstellen.',
      },
      {
        title: 'Forschung und Institute',
        text: 'Universitätsnahe Einrichtungen lagern Prüfstände, Geräte und Materialproben in abschließbaren Containern.',
      },
      {
        title: 'Handwerk in Wattenscheid',
        text: 'Handwerksbetriebe nutzen Container als Materiallager auf dem eigenen Hof statt teurer Hallenmiete.',
      },
    ],
    districts: [
      'Bochum-Mitte',
      'Wattenscheid',
      'Langendreer',
      'Querenburg',
      'Weitmar',
      'Werne',
      'Riemke',
      'Hordel',
      'Herne',
      'Witten',
    ],
    logisticsNote:
      'In den neuen Gewerbeparks ist die Zufahrt großzügig dimensioniert. In den älteren Wohnquartieren Wattenscheids sind die Straßen enger – hier prüfen wir die Anfahrt im Vorfeld.',
    seo: {
      title: 'Container kaufen Bochum – Seecontainer mit Lieferung',
      description:
        'Container kaufen in Bochum: Seecontainer 10/20/40 Fuß, neu, One-Trip und gebraucht. Lieferung nach Bochum, Herne, Witten und Hattingen. Festpreis inkl. Anlieferung.',
      focusKeyword: 'Container kaufen Bochum',
      secondaryKeywords: ['Seecontainer Bochum', 'Lagercontainer Bochum'],
    },
  },
  {
    slug: 'bonn',
    name: 'Bonn',
    adjective: 'Bonner',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '53',
    population: 336465,
    lat: 50.7374,
    lng: 7.0982,
    distanceKm: 60,
    deliveryDays: [1, 3],
    hub: 'Bonner Hafen',
    intro: [
      'Bonn ist unser nächstgelegener Großstadtmarkt: Von Altenkirchen sind es nur rund 60 Kilometer. Kein anderer Standort dieser Größe ist für uns schneller erreichbar – Lieferungen innerhalb von 24 bis 48 Stunden sind bei verfügbarem Lagerbestand die Regel.',
      'Der Bonner Markt ist geprägt von UN-Einrichtungen, Bundesbehörden, DAX-Konzernen und einer starken Wissenschaftslandschaft. Entsprechend häufig gefragt sind repräsentative Lösungen: One-Trip-Container in RAL-Wunschfarbe, umgebaute Bürocontainer und Ausstellungscontainer für Veranstaltungen.',
      'Im Umland – Siegburg, Sankt Augustin, Bad Godesberg, Königswinter und der Rhein-Sieg-Kreis – dominieren dagegen klassische Anwendungen: Material-, Garten- und Werkstattlager für Handwerk und Privatkunden.',
    ],
    useCases: [
      {
        title: 'Expresslieferung',
        text: 'Nur 60 km von unserem Lager entfernt – bei verfügbarem Bestand liefern wir innerhalb von 24 bis 48 Stunden.',
      },
      {
        title: 'Repräsentative Aufstellung',
        text: 'Für Behörden, Institute und Unternehmen liefern wir One-Trip-Container in RAL-Wunschfarbe ohne Fremdbeschriftung.',
      },
      {
        title: 'Rhein-Sieg-Kreis',
        text: 'Im Umland nutzen Handwerk, Vereine und Privatkunden Container als Material- und Gartenlager.',
      },
    ],
    districts: [
      'Bonn-Zentrum',
      'Bad Godesberg',
      'Beuel',
      'Hardtberg',
      'Poppelsdorf',
      'Endenich',
      'Duisdorf',
      'Siegburg',
      'Sankt Augustin',
      'Königswinter',
    ],
    logisticsNote:
      'Bonn ist mit rund 60 km unser nächstgelegener Großstadtmarkt. Expresslieferungen innerhalb von 24 Stunden sind möglich, sofern der gewünschte Container am Lager verfügbar ist.',
    seo: {
      title: 'Seecontainer Bonn kaufen – Expresslieferung in 24 Stunden',
      description:
        'Seecontainer in Bonn kaufen: nur 60 km von unserem Lager. Expresslieferung in 24–48 Stunden möglich. Neu, One-Trip und gebraucht, 10/20/40 Fuß. Festpreis.',
      focusKeyword: 'Seecontainer Bonn',
      secondaryKeywords: ['Container kaufen Bonn', 'Lagercontainer Bonn', 'Container Rhein-Sieg'],
    },
  },
  {
    slug: 'karlsruhe',
    name: 'Karlsruhe',
    adjective: 'Karlsruher',
    state: 'Baden-Württemberg',
    postalPrefix: '76',
    population: 308436,
    lat: 49.0069,
    lng: 8.4037,
    distanceKm: 260,
    deliveryDays: [3, 5],
    hub: 'Rheinhafen Karlsruhe',
    intro: [
      'Karlsruhe ist Technologiestandort und Rheinhafenstadt zugleich. Das KIT, zahlreiche IT-Unternehmen und die Raffinerien am Rheinhafen prägen die Wirtschaftsstruktur – und damit auch die Anforderungen an Lagerlösungen.',
      'Wir liefern in das Stadtgebiet sowie nach Ettlingen, Bruchsal, Rastatt und in die Region Mittlerer Oberrhein. Die Anfahrt erfolgt über die A5; die Lieferzeit beträgt in der Regel drei bis fünf Werktage.',
      'Eine regionale Besonderheit ist die Nähe zu Frankreich. Für grenzüberschreitende Projekte im Elsass liefern wir ebenfalls – sprechen Sie uns an, wir klären die zolltechnischen Anforderungen im Einzelfall.',
    ],
    useCases: [
      {
        title: 'Technologie- und Forschungslager',
        text: 'Institute und IT-Unternehmen lagern Hardware, Prüfstände und Messtechnik in klimatisierten Containern.',
      },
      {
        title: 'Rheinhafen und Industrie',
        text: 'Betriebe am Rheinhafen nutzen Container als Werkzeug- und Ersatzteillager mit kurzen Wegen.',
      },
      {
        title: 'Grenznaher Einsatz',
        text: 'Für Projekte im Elsass liefern wir grenzüberschreitend – zolltechnische Anforderungen klären wir im Einzelfall.',
      },
    ],
    districts: [
      'Innenstadt',
      'Durlach',
      'Mühlburg',
      'Oststadt',
      'Weststadt',
      'Knielingen',
      'Neureut',
      'Rüppurr',
      'Ettlingen',
      'Bruchsal',
    ],
    logisticsNote:
      'Im Bereich des Rheinhafens und der Raffinerieanlagen gelten besondere Sicherheitsauflagen. Für Anlieferungen in diese Bereiche benötigen wir vorab die Zugangsdaten Ihres Werkschutzes.',
    seo: {
      title: 'Container kaufen Karlsruhe – Seecontainer mit Lieferung',
      description:
        'Container kaufen in Karlsruhe: Seecontainer 10/20/40 Fuß, neu und gebraucht. Lieferung nach Karlsruhe, Ettlingen, Bruchsal und in die Region. Festpreis.',
      focusKeyword: 'Container kaufen Karlsruhe',
      secondaryKeywords: ['Seecontainer Karlsruhe', 'Lagercontainer Karlsruhe'],
    },
  },
  {
    slug: 'mannheim',
    name: 'Mannheim',
    adjective: 'Mannheimer',
    state: 'Baden-Württemberg',
    postalPrefix: '68',
    population: 315554,
    lat: 49.4875,
    lng: 8.466,
    distanceKm: 200,
    deliveryDays: [3, 4],
    hub: 'Hafen Mannheim',
    intro: [
      'Mannheim verfügt über einen der größten Binnenhäfen Deutschlands und ist Zentrum der Metropolregion Rhein-Neckar. Chemie, Maschinenbau und Logistik prägen die Wirtschaft – Branchen mit konstant hohem Bedarf an flexiblen Lagerlösungen.',
      'Die Quadratestadt hat eine ungewöhnlich klare Struktur, was Anfahrten erleichtert. Wir liefern in das Stadtgebiet sowie nach Ludwigshafen, Heidelberg, Speyer, Worms und Viernheim.',
      'Für Betriebe im Umfeld der Chemieindustrie liefern wir häufig Container mit besonderen Anforderungen: Auffangwannen, explosionsgeschützte Beleuchtung oder chemikalienbeständige Bodenbeschichtungen. Diese Ausstattungen realisieren wir in unserer Werkstatt nach Ihren Vorgaben.',
    ],
    useCases: [
      {
        title: 'Gefahrstofflagerung',
        text: 'Für Betriebe der Chemiebranche rüsten wir Container mit Auffangwannen und beständiger Bodenbeschichtung aus.',
      },
      {
        title: 'Binnenhafenlogistik',
        text: 'Umschlagbetriebe nutzen 40-Fuß-Container als Pufferlager unmittelbar an den Umschlaganlagen.',
      },
      {
        title: 'Metropolregion Rhein-Neckar',
        text: 'Wir beliefern Mannheim, Ludwigshafen, Heidelberg, Speyer und Worms mit einheitlichen Lieferkonditionen.',
      },
    ],
    districts: [
      'Innenstadt',
      'Neckarstadt',
      'Lindenhof',
      'Käfertal',
      'Feudenheim',
      'Rheinau',
      'Sandhofen',
      'Seckenheim',
      'Ludwigshafen',
      'Viernheim',
    ],
    logisticsNote:
      'Für Anlieferungen in Werksgelände der Chemieindustrie gelten strenge Sicherheitsvorschriften mit Voranmeldung und Sicherheitsunterweisung. Planen Sie hierfür zusätzlichen Vorlauf ein.',
    seo: {
      title: 'Seecontainer Mannheim kaufen – Rhein-Neckar-Region',
      description:
        'Seecontainer in Mannheim kaufen: neu, One-Trip und gebraucht, 10/20/40 Fuß. Lieferung nach Mannheim, Ludwigshafen, Heidelberg und in die Metropolregion. Festpreis.',
      focusKeyword: 'Seecontainer Mannheim',
      secondaryKeywords: ['Container kaufen Mannheim', 'Lagercontainer Mannheim'],
    },
  },
  {
    slug: 'muenster',
    name: 'Münster',
    adjective: 'Münsteraner',
    state: 'Nordrhein-Westfalen',
    postalPrefix: '48',
    population: 320000,
    lat: 51.9607,
    lng: 7.6261,
    distanceKm: 210,
    deliveryDays: [3, 4],
    hub: 'Stadthafen Münster',
    intro: [
      'Münster ist Universitätsstadt, Verwaltungszentrum und landwirtschaftliches Zentrum des Münsterlandes zugleich. Diese Mischung erzeugt einen ungewöhnlich breiten Containerbedarf – von der studentischen Zwischennutzung bis zum großen Erntelager auf dem Hof.',
      'Wir liefern in das Stadtgebiet sowie ins gesamte Münsterland: Warendorf, Coesfeld, Steinfurt, Dülmen und Rheine. Die Anfahrt erfolgt über die A1 und A43, die Lieferzeit beträgt in der Regel drei bis vier Werktage.',
      'Der landwirtschaftlich geprägte Umlandmarkt fragt überwiegend 40-Fuß-Container mit Belüftung nach – für Futtermittel, Saatgut und Maschinen. In der Stadt selbst dominieren kleinere Formate und Umbauten für Vereine, Institute und Gastronomie.',
    ],
    useCases: [
      {
        title: 'Landwirtschaft im Münsterland',
        text: 'Höfe lagern Futtermittel, Saatgut und Maschinen in belüfteten 40-Fuß-Containern direkt an den Wirtschaftsgebäuden.',
      },
      {
        title: 'Universität und Institute',
        text: 'Forschungseinrichtungen nutzen Container als Geräte- und Probenlager auf dem Campus.',
      },
      {
        title: 'Gastronomie und Kühlung',
        text: 'Für Veranstaltungen am Aasee und in der Innenstadt vermieten wir Kühlcontainer mit geprüftem Aggregat.',
      },
    ],
    districts: [
      'Altstadt',
      'Kreuzviertel',
      'Hansaviertel',
      'Gievenbeck',
      'Mecklenbeck',
      'Hiltrup',
      'Coerde',
      'Roxel',
      'Wolbeck',
      'Handorf',
    ],
    logisticsNote:
      'Die Münsteraner Altstadt ist weitgehend Fußgängerzone mit Lieferzeitfenstern. Im landwirtschaftlich geprägten Umland achten wir auf die Tragfähigkeit von Wirtschaftswegen bei nasser Witterung.',
    seo: {
      title: 'Container kaufen Münster – Seecontainer fürs Münsterland',
      description:
        'Container kaufen in Münster: Seecontainer 10/20/40 Fuß, neu und gebraucht. Lieferung ins gesamte Münsterland – auch belüftete Container für die Landwirtschaft.',
      focusKeyword: 'Container kaufen Münster',
      secondaryKeywords: ['Seecontainer Münster', 'Lagercontainer Münsterland'],
    },
  },
];

export const citiesBySlug = new Map(cities.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return citiesBySlug.get(slug);
}

/** Die n nächstgelegenen Städte – für interne Verlinkung auf Städteseiten. */
export function nearbyCities(slug: string, limit = 5): City[] {
  const city = getCity(slug);
  if (!city) return [];

  const distance = (a: City, b: City) => {
    const dLat = a.lat - b.lat;
    const dLng = (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180);
    return Math.sqrt(dLat * dLat + dLng * dLng);
  };

  return cities
    .filter((c) => c.slug !== slug)
    .sort((a, b) => distance(city, a) - distance(city, b))
    .slice(0, limit);
}

/** Städte nach Einwohnerzahl – für Footer und Übersichtsseiten. */
export const citiesByPopulation = [...cities].sort((a, b) => b.population - a.population);
