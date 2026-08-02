import type { BlogCategory, BlogPost } from './types.ts';

export const blogCategories: BlogCategory[] = [
  {
    slug: 'kaufberatung',
    name: 'Kaufberatung',
    description:
      'Worauf Sie beim Containerkauf achten sollten – von der Größenwahl bis zur Zustandsprüfung.',
  },
  {
    slug: 'container-preise',
    name: 'Container Preise',
    description: 'Preisentwicklung, Kostenfaktoren und wie Sie beim Containerkauf sparen.',
  },
  {
    slug: 'container-transport',
    name: 'Container Transport',
    description: 'Anlieferung, Kranstellung, Zufahrten und was Sie vorbereiten müssen.',
  },
  {
    slug: 'wartung',
    name: 'Container Wartung',
    description:
      'Rostschutz, Dichtungen, Kondenswasser – so bleibt Ihr Container jahrzehntelang dicht.',
  },
  {
    slug: 'umbau',
    name: 'Container Umbau',
    description: 'Dämmung, Fenster, Elektrik: Was beim Ausbau technisch möglich und sinnvoll ist.',
  },
  {
    slug: 'lagerloesungen',
    name: 'Lagerlösungen',
    description: 'Container als Lager: Einrichtung, Sicherheit und Wirtschaftlichkeit.',
  },
  {
    slug: 'bauwesen',
    name: 'Bauwesen',
    description: 'Container auf der Baustelle – Einsatz, Genehmigung und Baustelleneinrichtung.',
  },
  {
    slug: 'landwirtschaft',
    name: 'Landwirtschaft',
    description: 'Container in der Agrarwirtschaft: Erntelager, Maschinendepot und Kühlung.',
  },
  {
    slug: 'gewerbe',
    name: 'Business & Gewerbe',
    description: 'Wirtschaftlichkeit, Abschreibung und betrieblicher Einsatz von Containern.',
  },
  {
    slug: 'industrie',
    name: 'Industrie',
    description: 'Spezialanwendungen, Gefahrstofflagerung und technische Anforderungen.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'seecontainer-kaufen-checkliste',
    title: 'Seecontainer kaufen: Die 12-Punkte-Checkliste vor dem Kauf',
    excerpt:
      'Welche Größe, welcher Zustand, welche Bauart? Und worauf achtet man bei der Besichtigung? Diese Checkliste führt Sie durch alle Entscheidungen vor dem Containerkauf.',
    categorySlug: 'kaufberatung',
    author: 'Emmanuel Ndifor',
    authorRole: 'Geschäftsführer, EMC Container',
    publishedAt: '2026-07-14',
    updatedAt: '2026-07-24',
    readingMinutes: 9,
    image: {
      publicId: 'emc/blog/checkliste-containerkauf',
      alt: 'Prüfung eines Seecontainers mit Klemmbrett und Taschenlampe',
      width: 1200,
      height: 675,
    },
    tags: ['Kaufberatung', 'Checkliste', 'Seecontainer'],
    relatedProducts: [
      '20-fuss-seecontainer-gebraucht-blau',
      '20-fuss-seecontainer-one-trip-ral-wunschfarbe',
      '40-fuss-high-cube-one-trip',
    ],
    relatedCategories: ['gebrauchte-container', '20-fuss-container', 'one-trip-container'],
    body: [
      {
        type: 'p',
        text: 'Ein Seecontainer ist eine Anschaffung, die zwanzig Jahre und länger hält. Entsprechend ärgerlich ist es, wenn man beim Kauf die falsche Größe wählt, den Zustand falsch einschätzt oder die Anlieferung nicht bedenkt. Diese Checkliste bündelt die Punkte, die in unserer Beratungspraxis am häufigsten übersehen werden.',
      },
      { type: 'h2', text: '1. Die richtige Größe bestimmen' },
      {
        type: 'p',
        text: 'Die häufigste Fehleinschätzung: Der Container wird zu klein gekauft. In der Praxis füllt sich Lagerraum schneller, als man plant. Wenn Sie zwischen zwei Größen schwanken und der Platz es zulässt, nehmen Sie die größere – der Preisunterschied pro Kubikmeter fällt bei der größeren Einheit deutlich günstiger aus.',
      },
      {
        type: 'table',
        head: ['Format', 'Volumen', 'Stellfläche', 'Europaletten (1 Lage)', 'Entspricht etwa'],
        rows: [
          ['10 Fuß', '16,0 m³', '7,3 m²', '4', '1–2-Zimmer-Wohnung'],
          ['20 Fuß', '33,2 m³', '14,8 m²', '10', '3-Zimmer-Wohnung'],
          ['20 Fuß HC', '37,4 m³', '14,8 m²', '10', '3-Zimmer-Wohnung + Keller'],
          ['40 Fuß', '67,7 m³', '29,7 m²', '21', 'Einfamilienhaus'],
          ['40 Fuß HC', '76,3 m³', '29,7 m²', '21', 'Einfamilienhaus + Garage'],
        ],
      },
      { type: 'h2', text: '2. Standard oder High Cube?' },
      {
        type: 'p',
        text: 'Der High Cube ist 305 mm höher – innen 2.698 mm statt 2.393 mm. Diese Frage entscheidet sich am geplanten Einsatz: Für Palettenlagerung in einer Lage bringt die Mehrhöhe nichts. Sobald Sie ausbauen, Hochregale einsetzen oder mit einem Stapler hineinfahren wollen, ist sie unverzichtbar.',
      },
      {
        type: 'callout',
        title: 'Faustregel für den Innenausbau',
        text: 'Rechnen Sie beim Ausbau mit rund 25 bis 30 cm Höhenverlust durch Dämmung, Installationsebene und Bodenaufbau. Aus 2,70 m werden so etwa 2,40 m lichte Höhe – aus 2,39 m dagegen nur noch rund 2,10 m.',
      },
      { type: 'h2', text: '3. Zustand realistisch einschätzen' },
      {
        type: 'p',
        text: 'Es gibt vier Zustandsstufen, und der Preisunterschied zwischen der günstigsten und der teuersten liegt beim Faktor zwei bis drei. Entscheidend ist, wo der Container steht: Ist er sichtbar, lohnt sich die Investition in Optik. Verschwindet er hinter der Halle, ist ein Gebrauchtcontainer die wirtschaftlichere Wahl.',
      },
      {
        type: 'ul',
        items: [
          'Neu (fabrikneu): nie beladen, RAL-Wunschfarbe, höchster Preis, längste Garantie.',
          'One-Trip: genau eine Seereise, optisch nahezu neuwertig, 15–25 % günstiger.',
          'Generalüberholt: entrostet, ausgebeult, neu lackiert – gute Optik zum mittleren Preis.',
          'Gebraucht (WWT): geprüft wind- und wasserdicht, deutliche Gebrauchsspuren, günstigster Preis.',
        ],
      },
      { type: 'h2', text: '4. Die Besichtigung: worauf achten?' },
      {
        type: 'p',
        text: 'Wenn Sie einen gebrauchten Container besichtigen können, prüfen Sie diese sechs Punkte. Nehmen Sie eine Taschenlampe mit – die wichtigste Prüfung findet bei geschlossenen Türen statt.',
      },
      {
        type: 'ol',
        items: [
          'Lichttest: Türen schließen, im Inneren stehen, Augen anpassen lassen. Sichtbares Tageslicht bedeutet eine Undichtigkeit.',
          'Dach: Auf Standwasser, Beulen und Durchrostung prüfen. Eine Delle, in der Wasser stehen bleibt, ist die häufigste Ursache für Durchrostung.',
          'Boden: Auf Durchbiegung, Fäulnis und lose Schrauben prüfen. Der Sperrholzboden trägt die gesamte Nutzlast.',
          'Türdichtungen: Gummis auf Elastizität und Risse prüfen. Spröde Dichtungen lassen Wasser ein.',
          'Verriegelung: Alle vier Stangen mehrfach betätigen. Schwergängige Verriegelungen sind ein Zeichen für Verwindung.',
          'CSC-Plakette: Baujahr und letzte Prüfung ablesen. Fehlt die Plakette, fehlt die Historie.',
        ],
      },
      { type: 'h2', text: '5. Die Anlieferung vorab klären' },
      {
        type: 'p',
        text: 'Der häufigste Grund für gescheiterte Liefertermine ist eine nicht geprüfte Zufahrt. Ein Absetzkipper braucht für einen 20-Fuß-Container mindestens 3,5 m Breite, rund 15 bis 20 m gerade Anfahrt und 4,2 m hindernisfreie Höhe. Bei 40 Fuß sind es 4,0 m Breite und etwa 25 m Anfahrt.',
      },
      {
        type: 'p',
        text: 'Prüfen Sie außerdem, was sich über der Stellfläche befindet: Freileitungen, Äste und Vordächer verhindern den Kraneinsatz. Und denken Sie an den Untergrund – bei aufgeweichtem Boden sinkt das Fahrzeug ein, bevor der Container steht.',
      },
      { type: 'h2', text: '6. Kondenswasser von Anfang an mitdenken' },
      {
        type: 'p',
        text: 'Der klassische Anfängerfehler: Der Container ist dicht, aber nach dem ersten Temperaturwechsel tropft es von der Decke. Ursache ist Kondensation an der kalten Stahlfläche. Vier Belüftungsgitter zur Querlüftung kosten wenig und lösen das Problem in den meisten Fällen. Bei empfindlichem Lagergut kommt Granulat oder eine Deckendämmung dazu.',
      },
      { type: 'h2', text: '7. Genehmigungsfrage früh klären' },
      {
        type: 'p',
        text: 'Ob ein Container genehmigungspflichtig ist, hängt von Nutzung, Größe, Standort und Bundesland ab. Reine Lagercontainer sind in mehreren Landesbauordnungen bis zu einer bestimmten Größe verfahrensfrei. Sobald sich Menschen dauerhaft darin aufhalten oder der Container im Außenbereich steht, wird es genehmigungspflichtig.',
      },
      {
        type: 'callout',
        title: 'Der günstigste Anruf Ihres Projekts',
        text: 'Eine Bauvoranfrage oder auch nur ein Anruf beim örtlichen Bauamt kostet nichts und schützt vor einer Rückbauverfügung. Machen Sie das, bevor Sie bestellen – nicht danach.',
      },
      { type: 'h2', text: '8. Bis 12: Die restlichen Punkte in Kürze' },
      {
        type: 'ol',
        items: [
          'Untergrund vorbereiten: Vier tragfähige Punktauflager reichen. Waagerecht muss er stehen, sonst schließen die Türen nicht.',
          'Sicherung planen: Ein Schlosskasten kostet unter 100 € und verhindert den Angriff mit dem Bolzenschneider.',
          'Zubehör mitbestellen: Belüftung, Regale und Rampen reisen mit dem Container – das spart eine zweite Versandpauschale.',
          'Festpreis schriftlich: Lassen Sie sich Container, Lieferung und eventuelle Kranstellung in einem Angebot bestätigen. Nachträge nach Vertragsschluss sind ein Warnsignal.',
          'Versicherung prüfen: Nicht jede Inhalts- oder Geschäftsversicherung deckt Lagerung außerhalb von Gebäuden ab.',
        ],
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Die meisten Fehlkäufe entstehen nicht am Container selbst, sondern an drei Punkten drumherum: zu kleine Größe, ungeprüfte Zufahrt und unterschätzte Kondenswasserbildung. Wer diese drei sauber klärt, macht beim Rest wenig falsch. Wenn Sie unsicher sind, rufen Sie uns an – ein zehnminütiges Gespräch erspart oft eine teure Fehlentscheidung.',
      },
    ],
    seo: {
      title: 'Seecontainer kaufen: 12-Punkte-Checkliste für den Kauf',
      description:
        'Größe, Zustand, Zufahrt, Genehmigung: Die vollständige Checkliste vor dem Seecontainer-Kauf. Inklusive Prüfpunkten für die Besichtigung gebrauchter Container.',
      focusKeyword: 'Seecontainer kaufen Checkliste',
      secondaryKeywords: ['Container kaufen worauf achten', 'Seecontainer prüfen'],
    },
  },
  {
    slug: 'container-preise-entwicklung-2026',
    title: 'Containerpreise 2026: Warum sie schwanken und wann Sie kaufen sollten',
    excerpt:
      'Containerpreise folgen den globalen Frachtströmen. Wer versteht, wie dieser Zusammenhang funktioniert, kann den Kaufzeitpunkt gezielt wählen und mehrere hundert Euro sparen.',
    categorySlug: 'container-preise',
    author: 'Emmanuel Ndifor',
    authorRole: 'Geschäftsführer, EMC Container',
    publishedAt: '2026-06-20',
    updatedAt: '2026-07-18',
    readingMinutes: 7,
    image: {
      publicId: 'emc/blog/containerpreise-2026',
      alt: 'Gestapelte Seecontainer in einem Hafenterminal',
      width: 1200,
      height: 675,
    },
    tags: ['Preise', 'Markt', 'Kaufzeitpunkt'],
    relatedProducts: ['20-fuss-seecontainer-gebraucht-blau', '40-fuss-seecontainer-gebraucht'],
    relatedCategories: ['gebrauchte-container', 'one-trip-container'],
    body: [
      {
        type: 'p',
        text: 'Wer über mehrere Jahre Containerpreise beobachtet, sieht kein stetiges Auf oder Ab, sondern deutliche Wellen. Der Grund liegt nicht im Container selbst – Stahl und Fertigung sind vergleichsweise stabil –, sondern in der Logistik dahinter.',
      },
      { type: 'h2', text: 'Der Mechanismus: Handelsungleichgewicht' },
      {
        type: 'p',
        text: 'Europa importiert deutlich mehr Containerladung aus Asien, als es dorthin exportiert. Jeder dieser Container muss irgendwo bleiben. Ein Teil geht leer zurück, was für die Reedereien Kosten verursacht. Der Rest wird verkauft – und landet auf dem Gebrauchtmarkt.',
      },
      {
        type: 'p',
        text: 'Daraus folgt der zentrale Zusammenhang: Steigt das Importvolumen, steigt das Angebot an gebrauchten Containern in Europa, und die Preise sinken. Bricht der Handel ein, versiegt der Nachschub, und die Preise ziehen an.',
      },
      {
        type: 'callout',
        title: 'Kurz gesagt',
        text: 'Hohe Frachtraten und volle Schiffe bedeuten mittelfristig günstige Gebrauchtcontainer in Europa. Rückläufiger Handel bedeutet steigende Preise – auch wenn das zunächst widersprüchlich klingt.',
      },
      { type: 'h2', text: 'Was den Preis noch beeinflusst' },
      {
        type: 'ul',
        items: [
          'Stahlpreis: Betrifft vor allem Neu- und One-Trip-Container aus laufender Produktion.',
          'Wechselkurs: Container werden überwiegend in US-Dollar gehandelt. Ein starker Euro verbilligt den Einkauf.',
          'Saison: Von März bis Oktober ist die Nachfrage in Deutschland am höchsten – Bausaison und Erntezeit fallen zusammen.',
          'Standort: Hafennahe Regionen wie Hamburg, Bremen und Duisburg haben strukturell mehr Angebot als das Binnenland.',
          'Transportkosten: Dieselpreis und Fahrermangel schlagen unmittelbar auf die Lieferpauschale durch.',
        ],
      },
      { type: 'h2', text: 'Der beste Kaufzeitpunkt' },
      {
        type: 'p',
        text: 'Wenn Sie zeitlich flexibel sind, kaufen Sie zwischen November und Februar. In diesen Monaten ruht die Bausaison, die Nachfrage ist niedrig, und Händler räumen Lagerbestände. Preisnachlässe von 5 bis 15 % gegenüber der Hochsaison sind in dieser Zeit realistisch.',
      },
      {
        type: 'p',
        text: 'Umgekehrt gilt: Wer im April kurzfristig einen Container braucht, zahlt Aufschlag – nicht aus Willkür, sondern weil dann alle gleichzeitig anfragen und die Transportkapazität knapp wird.',
      },
      { type: 'h2', text: 'Aktuelles Preisniveau (Stand Juli 2026)' },
      {
        type: 'table',
        head: ['Container', 'Gebraucht (netto)', 'One-Trip (netto)'],
        rows: [
          ['10 Fuß', 'ab 1.590 €', 'ab 2.290 €'],
          ['20 Fuß Standard', 'ab 1.190 €', 'ab 2.590 €'],
          ['20 Fuß High Cube', 'ab 1.690 €', 'ab 2.890 €'],
          ['40 Fuß Standard', 'ab 2.190 €', 'ab 3.990 €'],
          ['40 Fuß High Cube', 'ab 2.590 €', 'ab 4.490 €'],
        ],
      },
      {
        type: 'p',
        text: 'Diese Werte verstehen sich netto ab Lager. Hinzu kommt die Lieferpauschale von 390 bis 590 € netto je nach Postleitzahl und Containerlänge.',
      },
      { type: 'h2', text: 'Wo Sie tatsächlich sparen können' },
      {
        type: 'ol',
        items: [
          'Zustand ehrlich wählen: Ein Gebrauchtcontainer hinter der Halle spart gegenüber One-Trip schnell 1.400 € – bei identischer Funktion.',
          'Nebensaison nutzen: Zwischen November und Februar sind 5 bis 15 % Nachlass realistisch.',
          'Mehrere Einheiten bündeln: Ab drei Containern an einen Standort sinken die Transportkosten je Einheit deutlich.',
          'Standardfarben wählen: Sonderfarbtöne kosten rund 380 € netto Aufschlag.',
          'Vorkasse nutzen: Bei uns 2 % Skonto – bei einem 40-Fuß-Container sind das rund 90 €.',
        ],
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Containerpreise lassen sich nicht vorhersagen, aber ihre Treiber sind nachvollziehbar. Wer zeitlich flexibel ist, kauft im Winter. Wer es nicht ist, spart am wirksamsten über die richtige Zustandswahl – dort liegt der größte Hebel, nicht beim Verhandeln um die letzten fünfzig Euro.',
      },
    ],
    seo: {
      title: 'Containerpreise 2026: Entwicklung, Faktoren & bester Kaufzeitpunkt',
      description:
        'Warum Containerpreise schwanken, welche Faktoren sie treiben und wann der günstigste Kaufzeitpunkt ist. Mit aktueller Preisübersicht für 10, 20 und 40 Fuß.',
      focusKeyword: 'Containerpreise',
      secondaryKeywords: ['Container Preis Deutschland', 'Seecontainer Preise 2026'],
    },
  },
  {
    slug: 'kondenswasser-im-container-vermeiden',
    title: 'Kondenswasser im Container: Ursachen und drei wirksame Lösungen',
    excerpt:
      'Der Container ist dicht, und trotzdem tropft es von der Decke. Warum das passiert und was wirklich hilft – mit konkreten Empfehlungen je nach Lagergut.',
    categorySlug: 'wartung',
    author: 'Markus Feld',
    authorRole: 'Werkstattleiter, EMC Container',
    publishedAt: '2026-05-12',
    updatedAt: '2026-07-09',
    readingMinutes: 6,
    image: {
      publicId: 'emc/blog/kondenswasser',
      alt: 'Kondenswassertropfen an der Innendecke eines Seecontainers',
      width: 1200,
      height: 675,
    },
    tags: ['Wartung', 'Kondenswasser', 'Belüftung'],
    relatedProducts: ['belueftungsgitter-set-4-stueck', 'luftentfeuchter-granulat-container'],
    relatedCategories: ['container-zubehoer', 'lagercontainer'],
    body: [
      {
        type: 'p',
        text: 'Es ist die häufigste Beschwerde, die uns nach einem Containerkauf erreicht: „Der Container ist doch dicht – warum ist trotzdem alles nass?" Die Antwort hat nichts mit Undichtigkeit zu tun. Das Wasser kommt nicht von außen, sondern entsteht innen.',
      },
      { type: 'h2', text: 'Warum Kondenswasser entsteht' },
      {
        type: 'p',
        text: 'Luft kann Wasserdampf aufnehmen – umso mehr, je wärmer sie ist. Kühlt sie ab, sinkt diese Aufnahmefähigkeit. Am Taupunkt ist die Grenze erreicht, und der überschüssige Dampf schlägt sich als Wasser nieder. Genau das passiert an der Innenseite eines Stahlcontainers.',
      },
      {
        type: 'p',
        text: 'Tagsüber heizt die Sonne den Container auf, warme Luft nimmt Feuchtigkeit auf – aus dem Lagergut, vom Boden, aus der eingeschlossenen Luft. Nachts kühlt das Stahldach schnell aus, häufig unter die Umgebungstemperatur. Die warme, feuchte Luft trifft auf die kalte Decke und kondensiert. Im Fachjargon heißt das treffend „Container-Regen".',
      },
      {
        type: 'callout',
        title: 'Ein Rechenbeispiel',
        text: 'Ein 20-Fuß-Container enthält rund 33 m³ Luft. Bei 25 °C und 70 % relativer Feuchte sind darin etwa 540 Gramm Wasser gebunden. Kühlt die Luft auf 10 °C ab, kann sie nur noch rund 310 Gramm halten – über 200 Milliliter schlagen sich nieder. Und das an einem einzigen Tag.',
      },
      { type: 'h2', text: 'Lösung 1: Belüftung – die Basismaßnahme' },
      {
        type: 'p',
        text: 'Belüftungsgitter sorgen für permanenten Luftaustausch. Die feuchte Innenluft entweicht, trockenere Außenluft strömt nach. Das verhindert nicht jede Kondensation, senkt die Feuchtebelastung aber erheblich – und ist mit Abstand die kostengünstigste Maßnahme.',
      },
      {
        type: 'ul',
        items: [
          'Vier Gitter für einen 20-Fuß-Container, acht für 40 Fuß.',
          'Diagonal versetzt auf beiden Längsseiten montieren, damit eine Querströmung entsteht.',
          'Im oberen Wanddrittel platzieren – dort sammelt sich die warme, feuchte Luft.',
          'Immer mit Insektenschutz und Regenabweiser.',
        ],
      },
      { type: 'h2', text: 'Lösung 2: Deckendämmung – die dauerhafte Lösung' },
      {
        type: 'p',
        text: 'Kondensation entsteht dort, wo die Oberfläche kälter ist als der Taupunkt der Luft. Eine Dämmung der Decke verhindert genau das: Die Innenoberfläche bleibt wärmer, der Taupunkt wird nicht unterschritten, es kondensiert nichts.',
      },
      {
        type: 'p',
        text: 'Am einfachsten funktioniert das mit aufgesprühtem PU-Schaum, der fugenlos anliegt und keine Hohlräume lässt, in denen Feuchtigkeit stehen bleibt. Alternativ lassen sich Dämmplatten auf eine Unterkonstruktion setzen – dann ist eine sorgfältig verklebte Dampfbremse zwingend, sonst wandert die Feuchtigkeit hinter die Dämmung und kondensiert dort unsichtbar.',
      },
      { type: 'h2', text: 'Lösung 3: Entfeuchter-Granulat – für empfindliches Lagergut' },
      {
        type: 'p',
        text: 'Calciumchlorid-Granulat bindet Feuchtigkeit aktiv aus der Luft. Ein Beutel nimmt bis zum Dreifachen seines Eigengewichts auf. Für Elektronik, Akten, Textilien, Musikinstrumente oder eingelagerte Fahrzeuge ist das die richtige Ergänzung.',
      },
      {
        type: 'p',
        text: 'Wichtig: Granulat ersetzt keine Belüftung, es ergänzt sie. Und es muss regelmäßig getauscht werden – je nach Klima alle zwei bis vier Monate. Achten Sie auf Beutel mit integriertem Auffangbehälter, damit die gebundene Flüssigkeit nicht auf das Lagergut tropft.',
      },
      { type: 'h2', text: 'Was hilft wobei? Empfehlung nach Lagergut' },
      {
        type: 'table',
        head: ['Lagergut', 'Empfohlene Maßnahme'],
        rows: [
          ['Baumaterial, Werkzeug, Metall', 'Belüftung'],
          ['Möbel, Kartonage, Textilien', 'Belüftung + Granulat'],
          ['Elektronik, Akten, Dokumente', 'Belüftung + Deckendämmung + Granulat'],
          ['Fahrzeuge, Oldtimer', 'Deckendämmung + Granulat, Boden abdecken'],
          ['Lebensmittel', 'Klimatisierter Container oder Kühlcontainer'],
        ],
      },
      { type: 'h2', text: 'Drei Fehler, die es schlimmer machen' },
      {
        type: 'ol',
        items: [
          'Container luftdicht abkleben: Verstärkt das Problem massiv. Die Feuchtigkeit ist bereits drinnen und findet keinen Ausweg mehr.',
          'Feuchtes Gut einlagern: Nasses Holz, frisch gewaschene Planen oder feuchte Kartons bringen Wasser mit, das später an der Decke landet.',
          'Direkt auf den Boden stellen: Ohne Palette oder Rost staut sich Feuchtigkeit unter dem Lagergut. Immer aufständern.',
        ],
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Kondenswasser ist kein Mangel des Containers, sondern Physik. Für die meisten Anwendungen genügen vier Belüftungsgitter für unter 150 €. Wer empfindliches Gut lagert, kombiniert Belüftung mit Deckendämmung und Granulat. Was auf keinen Fall hilft: den Container abdichten.',
      },
    ],
    seo: {
      title: 'Kondenswasser im Container vermeiden – 3 wirksame Lösungen',
      description:
        'Warum im Seecontainer Kondenswasser entsteht und was dagegen hilft: Belüftung, Deckendämmung und Entfeuchter im Vergleich. Mit Empfehlung je nach Lagergut.',
      focusKeyword: 'Kondenswasser Container',
      secondaryKeywords: ['Container Feuchtigkeit', 'Container Belüftung', 'Container Regen'],
    },
  },
  {
    slug: 'container-anlieferung-vorbereiten',
    title: 'Container-Anlieferung vorbereiten: So läuft der Liefertag reibungslos',
    excerpt:
      'Zufahrt, Untergrund, Kranstellung: Die meisten gescheiterten Liefertermine haben dieselben drei Ursachen. Wie Sie Ihren Stellplatz richtig vorbereiten.',
    categorySlug: 'container-transport',
    author: 'Andrea Kluge',
    authorRole: 'Disposition, EMC Container',
    publishedAt: '2026-04-30',
    updatedAt: '2026-06-25',
    readingMinutes: 7,
    image: {
      publicId: 'emc/blog/anlieferung',
      alt: 'Kranfahrzeug setzt einen Seecontainer auf einem Firmengelände ab',
      width: 1200,
      height: 675,
    },
    tags: ['Transport', 'Anlieferung', 'Kran'],
    relatedProducts: ['fundamentbloecke-set-8-stueck', '20-fuss-seecontainer-gebraucht-blau'],
    relatedCategories: ['20-fuss-container', '40-fuss-container'],
    body: [
      {
        type: 'p',
        text: 'Ein Fahrzeug, das umkehren muss, kostet mehr als jeder Preisunterschied beim Container. In unserer Disposition sehen wir immer wieder dieselben drei Ursachen für gescheiterte Termine: zu enge Zufahrt, weicher Untergrund und Hindernisse über der Stellfläche. Alle drei lassen sich vorab prüfen.',
      },
      { type: 'h2', text: 'Die Zufahrt: Zahlen, die zählen' },
      {
        type: 'table',
        head: ['Anforderung', '20 Fuß', '40 Fuß'],
        rows: [
          ['Zufahrtsbreite', 'min. 3,5 m', 'min. 4,0 m'],
          ['Gerade Anfahrt vor Stellfläche', '15–20 m', 'ca. 25 m'],
          ['Lichte Höhe', 'min. 4,2 m', 'min. 4,5 m'],
          ['Fahrzeuglänge', 'ca. 10 m', 'ca. 18 m'],
          ['Seitlicher Arbeitsraum (Kran)', 'ca. 4 m', 'ca. 6 m'],
          ['Freie Höhe über Stellfläche (Kran)', 'ca. 5 m', 'ca. 6 m'],
        ],
      },
      {
        type: 'p',
        text: 'Diese Werte gelten für die Anlieferung mit dem Absetzkipper, der den Container über die Rückseite abrollt. Kritisch ist dabei die gerade Anfahrt: Das Fahrzeug muss rückwärts in einer Linie zur Stellfläche stehen können. Eine 90-Grad-Kurve unmittelbar davor macht den Vorgang unmöglich.',
      },
      { type: 'h2', text: 'Wann ein Autokran nötig wird' },
      {
        type: 'p',
        text: 'Ist die Stellfläche nicht direkt anfahrbar – etwa im Hinterhof hinter einem Gebäude, hinter einer Mauer oder auf einer Terrasse –, hebt ein Autokran den Container über das Hindernis. Das ist Routine, muss aber vorab bestellt werden.',
      },
      {
        type: 'ul',
        items: [
          'Der Kran benötigt einen tragfähigen Standplatz mit Platz für ausgefahrene Stützen, typischerweise 6 × 8 m.',
          'Die Hubdistanz bestimmt die erforderliche Krangröße – je weiter, desto größer und teurer.',
          'Freileitungen im Schwenkbereich sind ein Ausschlusskriterium. Prüfen Sie das unbedingt vorab.',
          'Kalkulieren Sie je nach Aufwand mit 450 bis 1.200 € netto Zusatzkosten.',
        ],
      },
      {
        type: 'callout',
        title: 'Der wirksamste Vorbereitungsschritt',
        text: 'Machen Sie vier Fotos: Zufahrt vom Straßenrand aus, die Stellfläche, der Blick nach oben über der Stellfläche und eine Aufnahme aus etwa 20 m Entfernung. Damit können wir die Machbarkeit ohne Vor-Ort-Termin beurteilen.',
      },
      { type: 'h2', text: 'Der Untergrund' },
      {
        type: 'p',
        text: 'Ein 40-Fuß-Sattelzug bringt beladen rund 40 Tonnen auf die Achsen. Aufgeweichter Rasen, frisch verfüllter Boden oder unverdichteter Schotter tragen das nicht. Bei nasser Witterung verschieben wir Termine auf unbefestigtem Untergrund lieber, als das Fahrzeug festzufahren.',
      },
      {
        type: 'p',
        text: 'Für die Stellfläche selbst genügen vier tragfähige Punktauflager unter den Eckbeschlägen. Betonplatten von mindestens 40 × 40 cm oder Fundamentblöcke sind ideal. Entscheidend ist, dass der Container waagerecht steht – prüfen Sie das mit der Wasserwaage, bevor der Fahrer abfährt.',
      },
      { type: 'h2', text: 'Der Ablauf am Liefertag' },
      {
        type: 'ol',
        items: [
          'Am Vortag erhalten Sie ein Zeitfenster von zwei Stunden per SMS.',
          'Der Fahrer meldet sich telefonisch etwa 30 Minuten vor Ankunft.',
          'Halten Sie die Zufahrt frei – parkende Fahrzeuge sind das häufigste Hindernis.',
          'Sie zeigen die Stellposition und geben sie frei.',
          'Absetzen dauert je nach Situation 20 bis 40 Minuten.',
          'Prüfen Sie den Container auf Transportschäden und quittieren Sie den Lieferschein.',
        ],
      },
      {
        type: 'p',
        text: 'Notieren Sie sichtbare Schäden direkt auf dem Lieferschein. Eine nachträgliche Reklamation ohne Vermerk ist erfahrungsgemäß schwierig durchzusetzen – bei allen Anbietern.',
      },
      { type: 'h2', text: 'Aufstellung auf öffentlichem Grund' },
      {
        type: 'p',
        text: 'Soll der Container auf einer öffentlichen Verkehrsfläche stehen, brauchen Sie eine Sondernutzungserlaubnis der Straßenverkehrsbehörde, bei Baustellen zusätzlich eine verkehrsrechtliche Anordnung. Planen Sie dafür zwei bis vier Wochen Vorlauf ein. Auf Wunsch übernehmen wir die Beantragung.',
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Zehn Minuten Vorbereitung – Zufahrt ausmessen, nach oben schauen, Untergrund prüfen, vier Fotos schicken – ersparen im Zweifel einen kompletten Fehlversuch mit Anfahrtskosten. Im Zweifel rufen Sie unsere Disposition an; wir klären die Machbarkeit im Gespräch.',
      },
    ],
    seo: {
      title: 'Container-Anlieferung vorbereiten – Zufahrt, Kran & Stellplatz',
      description:
        'So bereiten Sie die Container-Anlieferung richtig vor: erforderliche Zufahrtsmaße, Untergrund, wann ein Autokran nötig ist und wie der Liefertag abläuft.',
      focusKeyword: 'Container Anlieferung',
      secondaryKeywords: ['Container Transport', 'Container Kran', 'Seecontainer Lieferung'],
    },
  },
  {
    slug: 'container-daemmen-anleitung',
    title: 'Container dämmen: Aufbau, Materialien und der kritische Punkt Dampfbremse',
    excerpt:
      'Wer einen Container ausbaut, muss ihn dämmen. Welche Aufbauten funktionieren, welche Materialien sich eignen – und warum die Dampfbremse über Erfolg oder Schimmel entscheidet.',
    categorySlug: 'umbau',
    author: 'Markus Feld',
    authorRole: 'Werkstattleiter, EMC Container',
    publishedAt: '2026-03-22',
    updatedAt: '2026-07-15',
    readingMinutes: 10,
    image: {
      publicId: 'emc/blog/container-daemmen',
      alt: 'Innenansicht eines Containers mit Unterkonstruktion und Dämmung',
      width: 1200,
      height: 675,
    },
    tags: ['Umbau', 'Dämmung', 'Innenausbau'],
    relatedProducts: [
      '20-fuss-high-cube-one-trip',
      '40-fuss-high-cube-one-trip',
      '20-fuss-buerocontainer-ausgebaut',
    ],
    relatedCategories: ['umbau-container', 'high-cube-container', 'buerocontainer'],
    body: [
      {
        type: 'p',
        text: 'Ein ungedämmter Stahlcontainer ist im Sommer ein Backofen und im Winter ein Kühlschrank. Für die Lagerung von Werkzeug spielt das keine Rolle. Sobald Menschen sich darin aufhalten oder empfindliches Gut gelagert wird, führt an einer Dämmung kein Weg vorbei.',
      },
      { type: 'h2', text: 'Warum es beim Container schwieriger ist als beim Haus' },
      {
        type: 'p',
        text: 'Zwei Besonderheiten machen die Containerdämmung anspruchsvoll. Erstens ist die Außenhaut aus Stahl vollständig dampfdicht – Feuchtigkeit, die in die Konstruktion gelangt, kann nach außen nicht entweichen. Zweitens wirkt jede Rippe des Wellblechs und jeder Rahmenträger als Wärmebrücke.',
      },
      {
        type: 'p',
        text: 'Daraus folgt die zentrale Regel: Der Aufbau muss raumseitig dicht sein. Gelangt feuchte Innenraumluft in die Dämmebene, kondensiert sie an der kalten Stahlwand und kann nicht abtrocknen. Das Ergebnis ist Schimmel hinter der Verkleidung – unsichtbar, bis es zu spät ist.',
      },
      {
        type: 'callout',
        title: 'Die wichtigste Regel',
        text: 'Innen dicht, außen offen. Beim Container ist außen zwangsläufig dicht – also muss innen umso sorgfältiger abgedichtet werden. Eine lückenhaft verklebte Dampfbremse ist schlimmer als gar keine Dämmung.',
      },
      { type: 'h2', text: 'Variante 1: PU-Ortschaum (empfohlen)' },
      {
        type: 'p',
        text: 'Zweikomponenten-Polyurethanschaum wird direkt auf die Stahlwand gesprüht. Er haftet vollflächig, füllt jede Wellblechrippe aus und bildet zugleich seine eigene Dampfsperre. Damit entfällt die Fehlerquelle Dampfbremse fast vollständig.',
      },
      {
        type: 'ul',
        items: [
          'Wärmeleitfähigkeit λ ≈ 0,025 W/(m·K) – der beste Wert der gängigen Materialien.',
          'Keine Hohlräume, keine Kondensationsflächen, keine Wärmebrücken durch Fugen.',
          'Platzsparend: 60 mm Ortschaum dämmen etwa so gut wie 100 mm Mineralwolle.',
          'Nachteil: Fachbetrieb erforderlich, in Eigenleistung praktisch nicht sauber ausführbar.',
          'Nachteil: Rückbau ist aufwendig – der Schaum lässt sich kaum rückstandsfrei entfernen.',
        ],
      },
      { type: 'h2', text: 'Variante 2: Dämmplatten auf Unterkonstruktion' },
      {
        type: 'p',
        text: 'Der klassische Aufbau: Holz- oder Metallständer werden gesetzt, dazwischen kommen PIR- oder XPS-Platten, darüber die Dampfbremse und die Innenverkleidung. Das ist in Eigenleistung machbar, verlangt aber Sorgfalt.',
      },
      {
        type: 'ol',
        items: [
          'Untergrund entrosten, Roststellen behandeln und grundieren.',
          'Unterkonstruktion setzen – nach Möglichkeit thermisch getrennt, um Wärmebrücken zu reduzieren.',
          'Dämmplatten fugendicht einpassen, Stöße mit Dämmstoffkleber schließen.',
          'Dampfbremse vollflächig verlegen, alle Stöße und Durchdringungen mit Systemklebeband schließen.',
          'Installationsebene von etwa 30 mm vor der Dampfbremse anlegen – so bleibt sie bei Elektroarbeiten unverletzt.',
          'Innenverkleidung montieren, etwa beschichtete Spanplatten oder OSB.',
        ],
      },
      {
        type: 'p',
        text: 'Der fünfte Punkt wird am häufigsten übergangen und ist der wichtigste: Wer Steckdosen direkt durch die Dampfbremse setzt, perforiert genau die Schicht, die das Bauteil schützt. Eine vorgesetzte Installationsebene löst das Problem elegant.',
      },
      { type: 'h2', text: 'Variante 3: Mineralwolle' },
      {
        type: 'p',
        text: 'Mineralwolle ist günstig, nicht brennbar und schalldämmend. Für Container ist sie dennoch nur die dritte Wahl: Sie ist offenporig und nimmt Feuchtigkeit auf. Wird sie einmal nass, verliert sie ihre Dämmwirkung dauerhaft. In einem Bauteil, das nach außen nicht abtrocknen kann, ist das ein erhebliches Risiko.',
      },
      {
        type: 'p',
        text: 'Wenn Mineralwolle, dann ausschließlich mit sehr sorgfältig ausgeführter Dampfbremse und einer Hinterlüftungsebene zur Stahlwand.',
      },
      { type: 'h2', text: 'Materialvergleich' },
      {
        type: 'table',
        head: ['Material', 'λ [W/(m·K)]', 'Dicke für U ≈ 0,25', 'Kosten', 'Eignung'],
        rows: [
          ['PU-Ortschaum', '0,025', 'ca. 100 mm', 'hoch', 'sehr gut'],
          ['PIR-Platten', '0,023', 'ca. 90 mm', 'mittel–hoch', 'sehr gut'],
          ['XPS-Platten', '0,035', 'ca. 140 mm', 'mittel', 'gut'],
          ['Mineralwolle', '0,035', 'ca. 140 mm', 'niedrig', 'bedingt'],
          ['Holzfaser', '0,040', 'ca. 160 mm', 'mittel', 'bedingt'],
        ],
      },
      { type: 'h2', text: 'Was die Dämmung an Raum kostet' },
      {
        type: 'p',
        text: 'Bei 80 mm Dämmung plus Unterkonstruktion und Verkleidung verlieren Sie je Seite rund 10 bis 12 cm. Aus 2.352 mm Innenbreite werden etwa 2.130 mm, aus 2.393 mm Innenhöhe rund 2.180 mm. Genau deshalb empfehlen wir für Ausbauten grundsätzlich einen High Cube: Dort bleiben nach dem Aufbau noch komfortable 2,40 m Stehhöhe.',
      },
      { type: 'h2', text: 'Den Boden nicht vergessen' },
      {
        type: 'p',
        text: 'Der Sperrholzboden liegt auf Stahlquerträgern und ist nach unten offen. Ohne Bodendämmung geht ein erheblicher Teil der Heizwärme dort verloren. Bewährt hat sich XPS zwischen Lagerhölzern, darüber eine Ausgleichsplatte und der Nutzbelag. Achten Sie darauf, dass der Container aufgeständert steht, damit unter dem Boden Luft zirkulieren kann.',
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Wer die Dämmung selbst ausführt, sollte PIR-Platten mit sorgfältig verklebter Dampfbremse und vorgesetzter Installationsebene wählen. Wer es dauerhaft sicher haben will, nimmt PU-Ortschaum vom Fachbetrieb. Und wer ausbaut, kauft von vornherein einen High Cube – die 300 € Aufpreis holen Sie an Raumgefühl um ein Vielfaches wieder herein.',
      },
    ],
    seo: {
      title: 'Container dämmen: Aufbau, Materialien & Dampfbremse richtig machen',
      description:
        'Container richtig dämmen: PU-Ortschaum, PIR-Platten oder Mineralwolle im Vergleich, korrekter Wandaufbau, Dampfbremse und wie viel Innenraum die Dämmung kostet.',
      focusKeyword: 'Container dämmen',
      secondaryKeywords: ['Container isolieren', 'Container Innenausbau', 'Containerdämmung'],
    },
  },
  {
    slug: 'lagercontainer-vs-lagerhalle-kosten',
    title: 'Lagercontainer oder Hallenmiete? Eine ehrliche Wirtschaftlichkeitsrechnung',
    excerpt:
      'Ab wann rechnet sich der Kauf eines Lagercontainers gegenüber angemieteter Hallenfläche? Wir rechnen es mit realen Zahlen durch – inklusive der Punkte, die dagegen sprechen.',
    categorySlug: 'gewerbe',
    author: 'Emmanuel Ndifor',
    authorRole: 'Geschäftsführer, EMC Container',
    publishedAt: '2026-02-08',
    updatedAt: '2026-06-12',
    readingMinutes: 8,
    image: {
      publicId: 'emc/blog/container-vs-halle',
      alt: 'Lagercontainer auf einem Betriebshof neben einer Lagerhalle',
      width: 1200,
      height: 675,
    },
    tags: ['Wirtschaftlichkeit', 'Lager', 'Kostenvergleich'],
    relatedProducts: [
      '20-fuss-seecontainer-gebraucht-blau',
      '40-fuss-seecontainer-gebraucht',
      'regalsystem-container-20-fuss',
    ],
    relatedCategories: ['lagercontainer', 'gebrauchte-container'],
    body: [
      {
        type: 'p',
        text: 'Die Frage kommt in fast jedem Beratungsgespräch: Lohnt sich der Kauf, oder miete ich besser Hallenfläche? Die ehrliche Antwort lautet: Es kommt darauf an – aber die Faktoren sind überschaubar, und man kann sie durchrechnen.',
      },
      { type: 'h2', text: 'Die Ausgangszahlen' },
      {
        type: 'p',
        text: 'Ein gebrauchter 20-Fuß-Container kostet 1.190 € netto plus rund 450 € Lieferung, zusammen 1.640 € netto. Er bietet 33 m³ Volumen auf 14,8 m² Stellfläche. Angemietete Lagerfläche kostet in Deutschland je nach Region und Qualität zwischen 4 und 12 € netto pro m² und Monat.',
      },
      {
        type: 'table',
        head: ['Region', 'Lagermiete €/m²/Monat', '15 m² pro Monat', 'Amortisation Container'],
        rows: [
          ['München', '10–14 €', '150–210 €', '8–11 Monate'],
          ['Frankfurt, Stuttgart', '8–11 €', '120–165 €', '10–14 Monate'],
          ['Köln, Düsseldorf, Hamburg', '6–9 €', '90–135 €', '12–18 Monate'],
          ['Ruhrgebiet, Leipzig', '4,50–7 €', '68–105 €', '16–24 Monate'],
          ['Ländliche Regionen', '3–5 €', '45–75 €', '22–36 Monate'],
        ],
      },
      {
        type: 'p',
        text: 'Die Amortisationszeit liegt also je nach Region zwischen acht Monaten und drei Jahren. In Ballungsräumen ist die Rechnung eindeutig; auf dem Land muss man genauer hinsehen.',
      },
      { type: 'h2', text: 'Was in der einfachen Rechnung fehlt' },
      {
        type: 'p',
        text: 'Eine reine Gegenüberstellung von Kaufpreis und Miete greift zu kurz. Vier Faktoren gehören dazu:',
      },
      {
        type: 'ul',
        items: [
          'Restwert: Ein gebrauchter Container behält nach fünf Jahren typischerweise 50 bis 70 % seines Kaufpreises. Bei der Miete ist das Geld vollständig weg.',
          'Grundstückskosten: Der Container braucht Stellfläche. Haben Sie die ohnehin, ist sie kostenlos. Müssen Sie sie pachten, gehört das in die Rechnung.',
          'Steuerliche Behandlung: Container sind bewegliche Wirtschaftsgüter und werden linear über zehn Jahre abgeschrieben. Mietzahlungen sind sofort voll als Betriebsausgabe abzugsfähig.',
          'Zinsen und Kapitalbindung: 1.640 € gebunden statt am Markt angelegt – bei aktuellen Zinsen ein realer, wenn auch überschaubarer Posten.',
        ],
      },
      { type: 'h2', text: 'Fünf-Jahres-Vergleich, Region Köln' },
      {
        type: 'table',
        head: ['Position', 'Container kaufen', 'Halle mieten (15 m²)'],
        rows: [
          ['Anschaffung', '1.640 €', '0 €'],
          ['Laufende Kosten 5 Jahre', '150 € (Wartung, Farbe)', '6.750 € (112,50 €/Monat)'],
          ['Restwert nach 5 Jahren', '−850 €', '0 €'],
          ['Summe', '940 €', '6.750 €'],
        ],
      },
      {
        type: 'p',
        text: 'Über fünf Jahre spart der Kauf in diesem Szenario rund 5.800 € netto. Das ist der typische Fall – und der Grund, warum so viele Betriebe diesen Weg gehen.',
      },
      { type: 'h2', text: 'Wann die Miete trotzdem besser ist' },
      {
        type: 'p',
        text: 'Es gibt klare Fälle, in denen der Kauf die falsche Entscheidung wäre. Ehrlicherweise sollten Sie diese prüfen, bevor Sie bestellen:',
      },
      {
        type: 'ol',
        items: [
          'Bedarf unter 18 Monaten: Bei kurzer Nutzungsdauer schlägt die Miete den Kauf.',
          'Keine geeignete Stellfläche: Ohne befestigten, tragfähigen Platz mit Zufahrt geht es nicht.',
          'Beheizung oder Klimatisierung nötig: Ein ungedämmter Container ist dafür ungeeignet, ein ausgebauter kostet ein Vielfaches.',
          'Hoher Kommissionieraufwand: Wer täglich viele Einzelentnahmen hat, arbeitet in einer Halle mit Regalgassen effizienter.',
          'Genehmigungsrechtliche Hürden: Im Außenbereich oder in bestimmten Bebauungsplangebieten kann die Aufstellung unzulässig sein.',
        ],
      },
      {
        type: 'callout',
        title: 'Zwischenweg: Mietkauf',
        text: 'Wenn Sie unsicher sind, ob der Bedarf dauerhaft ist: Bei unserem Mietkaufmodell rechnen wir bis zu zwölf Monatsmieten vollständig auf den Kaufpreis an. Sie bleiben flexibel, ohne Geld zu verlieren.',
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Ab etwa 18 Monaten Nutzungsdauer und vorhandener Stellfläche ist der Kauf in den meisten Regionen deutlich günstiger – in Ballungsräumen schon nach unter einem Jahr. Gegen den Kauf sprechen kurzfristiger Bedarf, fehlende Stellfläche und die Notwendigkeit einer klimatisierten Lagerung. Rechnen Sie mit Ihren tatsächlichen Zahlen; die Faktoren oben decken die relevanten Posten ab.',
      },
    ],
    seo: {
      title: 'Lagercontainer oder Lagerhalle mieten? Kostenvergleich 2026',
      description:
        'Ab wann lohnt sich der Kauf eines Lagercontainers gegenüber angemieteter Hallenfläche? Vollständige Wirtschaftlichkeitsrechnung mit Restwert, Steuern und Regionen.',
      focusKeyword: 'Lagercontainer Kosten',
      secondaryKeywords: ['Container kaufen oder mieten', 'Lagerhalle mieten Kosten'],
    },
  },
  {
    slug: 'baugenehmigung-container-uebersicht',
    title: 'Baugenehmigung für Container: Wann Sie eine brauchen – und wann nicht',
    excerpt:
      'Lagercontainer, Bürocontainer, Wohncontainer: Die Genehmigungspflicht hängt von Nutzung, Größe und Bundesland ab. Ein Überblick über die Systematik – und wo Sie verbindlich nachfragen.',
    categorySlug: 'bauwesen',
    author: 'Emmanuel Ndifor',
    authorRole: 'Geschäftsführer, EMC Container',
    publishedAt: '2026-01-19',
    updatedAt: '2026-07-20',
    readingMinutes: 8,
    image: {
      publicId: 'emc/blog/baugenehmigung',
      alt: 'Bauplan und Container auf einem Grundstück',
      width: 1200,
      height: 675,
    },
    tags: ['Recht', 'Baugenehmigung', 'Bauordnung'],
    relatedProducts: ['20-fuss-buerocontainer-ausgebaut', '40-fuss-wohncontainer-vollausbau'],
    relatedCategories: ['buerocontainer', 'wohncontainer', 'lagercontainer'],
    body: [
      {
        type: 'p',
        text: 'Vorweg das Wichtigste: Dieser Artikel erklärt die Systematik, ersetzt aber keine Rechtsberatung und keine Auskunft Ihres Bauamts. Das Baurecht ist Ländersache – jedes Bundesland hat eine eigene Landesbauordnung mit eigenen Schwellenwerten. Verbindlich ist immer nur die Auskunft der zuständigen Behörde.',
      },
      { type: 'h2', text: 'Die drei Fragen, die alles entscheiden' },
      {
        type: 'p',
        text: 'Ob ein Container genehmigungspflichtig ist, hängt praktisch immer an denselben drei Punkten:',
      },
      {
        type: 'ol',
        items: [
          'Wofür wird er genutzt? Reine Lagerung oder Aufenthalt von Menschen?',
          'Wo steht er? Im Innenbereich mit Bebauungsplan, im unbeplanten Innenbereich oder im Außenbereich?',
          'Wie lange steht er? Vorübergehend im Rahmen einer Baustelle oder dauerhaft?',
        ],
      },
      { type: 'h2', text: 'Fall 1: Lagercontainer im Innenbereich' },
      {
        type: 'p',
        text: 'Das ist der häufigste und einfachste Fall. Mehrere Landesbauordnungen führen Gebäude ohne Aufenthaltsräume bis zu einem bestimmten Bruttorauminhalt in der Liste der verfahrensfreien Vorhaben. Ein 20-Fuß-Container liegt bei rund 38 m³ Bruttorauminhalt und bleibt damit in einigen Ländern unterhalb der Schwelle – in anderen nicht.',
      },
      {
        type: 'p',
        text: 'Verfahrensfrei bedeutet allerdings nicht regelfrei: Abstandsflächen zum Nachbargrundstück, Festsetzungen des Bebauungsplans zu überbaubaren Flächen und gestalterische Vorgaben gelten weiterhin. Wer verfahrensfrei baut, trägt selbst die Verantwortung dafür, dass alle materiellen Anforderungen eingehalten sind.',
      },
      {
        type: 'callout',
        title: 'Praxistipp',
        text: 'Fragen Sie beim Bauamt konkret: „Ich möchte einen 20-Fuß-Seecontainer als Lager auf meinem Gewerbegrundstück in [Adresse] aufstellen. Ist das verfahrensfrei?" Diese Auskunft ist kostenlos und dauert selten länger als ein Telefonat.',
      },
      { type: 'h2', text: 'Fall 2: Bürocontainer' },
      {
        type: 'p',
        text: 'Sobald ein Container Aufenthaltsräume enthält – und ein Arbeitsplatz ist ein Aufenthaltsraum –, greifen die vollen bauordnungsrechtlichen Anforderungen: Standsicherheit, Wärmeschutz nach GEG, Brandschutz, Rettungswege, Belichtung und Belüftung. Eine Genehmigung ist damit in aller Regel erforderlich.',
      },
      {
        type: 'p',
        text: 'Eine wichtige Ausnahme gilt für Baustelleneinrichtungen: Container, die ausschließlich während der Bauzeit auf der Baustelle stehen und dieser dienen, sind vielfach verfahrensfrei. Sie müssen nach Abschluss der Bauarbeiten aber auch wieder verschwinden.',
      },
      { type: 'h2', text: 'Fall 3: Wohncontainer' },
      {
        type: 'p',
        text: 'Hier gibt es keine Grauzone: Ein Wohncontainer ist ein Gebäude und benötigt eine Baugenehmigung. Erforderlich sind unter anderem Standsicherheitsnachweis, Wärmeschutznachweis nach GEG, Nachweis des Schallschutzes, gesicherte Erschließung mit Wasser, Abwasser und Strom sowie in der Regel ein frostfrei gegründetes Fundament.',
      },
      { type: 'h2', text: 'Fall 4: Der Außenbereich – die häufigste Fehleinschätzung' },
      {
        type: 'p',
        text: 'Im Außenbereich nach § 35 BauGB – also außerhalb bebauter Ortsteile und ohne Bebauungsplan – sind Bauvorhaben grundsätzlich unzulässig, sofern sie nicht privilegiert sind. Privilegiert sind vor allem land- und forstwirtschaftliche Vorhaben.',
      },
      {
        type: 'p',
        text: 'Das führt regelmäßig zu Konflikten: Ein Container auf der eigenen Wiese am Waldrand mag harmlos wirken, ist aber häufig unzulässig – auch wenn das Grundstück Ihnen gehört. Die Folge kann eine Rückbauverfügung sein. Ein landwirtschaftlicher Betrieb darf denselben Container am selben Ort dagegen unter Umständen aufstellen, wenn er dem Betrieb dient.',
      },
      { type: 'h2', text: 'Nachbarrecht: nicht Bauordnung, aber genauso relevant' },
      {
        type: 'p',
        text: 'Unabhängig von der Genehmigungsfrage gelten die Abstandsflächenregelungen der Landesbauordnung sowie die Nachbarrechtsgesetze der Länder. Ein 2,6 m hoher Stahlcontainer unmittelbar an der Grundstücksgrenze ist selbst bei formaler Zulässigkeit ein verlässlicher Konfliktherd.',
      },
      {
        type: 'p',
        text: 'Unsere Empfehlung aus der Praxis: Sprechen Sie mit dem Nachbarn, bevor der Container kommt. Ein abgestimmter Standort ein paar Meter weiter kostet nichts und erspart jahrelangen Ärger.',
      },
      { type: 'h2', text: 'So gehen Sie vor' },
      {
        type: 'ol',
        items: [
          'Nutzung und Standort schriftlich festhalten – Größe, Zweck, geplante Dauer, genaue Lage.',
          'Beim Bauamt anfragen. Formlos telefonisch für eine erste Einschätzung, schriftlich für Verbindlichkeit.',
          'Bei Unsicherheit: Bauvoranfrage stellen. Kostet je nach Kommune 50 bis 300 € und schafft Rechtssicherheit.',
          'Bebauungsplan prüfen – oft online im Geoportal der Kommune einsehbar.',
          'Nachbarn informieren.',
          'Erst dann bestellen.',
        ],
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Reine Lagercontainer im Innenbereich sind in vielen Bundesländern unproblematisch. Alles, worin sich Menschen aufhalten, ist genehmigungspflichtig. Und der Außenbereich ist die Falle, in die die meisten tappen. Ein Anruf beim Bauamt kostet zehn Minuten – eine Rückbauverfügung kostet den Container.',
      },
    ],
    seo: {
      title: 'Baugenehmigung für Container: Wann brauche ich eine?',
      description:
        'Lager-, Büro- oder Wohncontainer: Wann ist eine Baugenehmigung nötig? Systematik nach Nutzung, Standort und Dauer – inklusive der Fallstricke im Außenbereich.',
      focusKeyword: 'Baugenehmigung Container',
      secondaryKeywords: ['Container aufstellen Genehmigung', 'Container Baurecht'],
    },
  },
  {
    slug: 'container-landwirtschaft-einsatz',
    title: 'Container in der Landwirtschaft: Erntelager, Maschinendepot und Kühlung',
    excerpt:
      'Vom Saatgutlager bis zum mobilen Kühlraum: Wie landwirtschaftliche Betriebe Container einsetzen – und worauf bei Belüftung, Nagerschutz und Genehmigung zu achten ist.',
    categorySlug: 'landwirtschaft',
    author: 'Andrea Kluge',
    authorRole: 'Disposition, EMC Container',
    publishedAt: '2026-05-27',
    updatedAt: '2026-07-11',
    readingMinutes: 7,
    image: {
      publicId: 'emc/blog/container-landwirtschaft',
      alt: 'Seecontainer als Maschinenlager auf einem landwirtschaftlichen Betrieb',
      width: 1200,
      height: 675,
    },
    tags: ['Landwirtschaft', 'Lagerung', 'Kühlung'],
    relatedProducts: [
      '40-fuss-seecontainer-gebraucht',
      '20-fuss-kuehlcontainer-reefer',
      'belueftungsgitter-set-4-stueck',
    ],
    relatedCategories: ['lagercontainer', 'kuehlcontainer', '40-fuss-container'],
    body: [
      {
        type: 'p',
        text: 'Landwirtschaftliche Betriebe gehören zu unseren beständigsten Kunden. Der Grund liegt auf der Hand: Lagerbedarf entsteht saisonal und oft kurzfristig, während ein Hallenbau Monate dauert und eine Genehmigung braucht. Ein Container steht in einer Woche.',
      },
      { type: 'h2', text: 'Die vier häufigsten Anwendungen' },
      {
        type: 'h3',
        text: 'Maschinen- und Gerätelager',
      },
      {
        type: 'p',
        text: 'Anbaugeräte, Ersatzteile, Werkzeug und Betriebsstoffe verschwinden erfahrungsgemäß in dem Tempo, in dem sie unbeaufsichtigt herumstehen. Ein abschließbarer 20- oder 40-Fuß-Container mit Schlosskasten löst dieses Problem für unter 2.000 €. Mit einem beidseitigen Regalsystem wird daraus ein geordnetes Lager.',
      },
      { type: 'h3', text: 'Saatgut- und Futtermittellager' },
      {
        type: 'p',
        text: 'Hier ist Belüftung entscheidend. Saatgut und Futtermittel bringen Restfeuchte mit; ohne Luftaustausch entsteht Kondensat, das zu Schimmel und Verderb führt. Wir empfehlen mindestens acht Belüftungsgitter für einen 40-Fuß-Container sowie eine Aufständerung, damit auch unter dem Boden Luft zirkuliert.',
      },
      {
        type: 'callout',
        title: 'Nagerschutz nicht vergessen',
        text: 'Belüftungsgitter mit Edelstahlgewebe halten Mäuse ab, gewöhnliche Kunststoffgitter nicht. Achten Sie außerdem darauf, dass der Container auf Fundamentblöcken steht – der Abstand zum Boden erschwert den Zugang erheblich.',
      },
      { type: 'h3', text: 'Erntekühlung' },
      {
        type: 'p',
        text: 'Bei Obst, Gemüse, Blumen und Kräutern entscheidet die schnelle Rückkühlung nach der Ernte über Qualität und Haltbarkeit. Ein 20-Fuß-Kühlcontainer schafft Kühlkapazität genau dann, wenn sie gebraucht wird – und steht den Rest des Jahres nicht ungenutzt herum, wenn man ihn mietet.',
      },
      {
        type: 'p',
        text: 'Zu beachten ist der Stromanschluss: 400 V Drehstrom mit 32-A-CEE-Steckdose und eigener Absicherung. Auf vielen Höfen ist das vorhanden, muss aber bis zum Stellplatz geführt werden. Planen Sie das rechtzeitig mit Ihrem Elektrofachbetrieb.',
      },
      { type: 'h3', text: 'Hofladen und Direktvermarktung' },
      {
        type: 'p',
        text: 'Aus einem 10- oder 20-Fuß-Container lässt sich ein Verkaufsstand mit Klappe, Theke und Kühlung bauen. Für Direktvermarkter ist das eine günstige Möglichkeit, ohne Neubau eine ansprechende Verkaufsfläche zu schaffen. Hier greift allerdings meist die Genehmigungspflicht – siehe unten.',
      },
      { type: 'h2', text: 'Der Genehmigungsvorteil landwirtschaftlicher Betriebe' },
      {
        type: 'p',
        text: 'Im Außenbereich nach § 35 BauGB sind Bauvorhaben grundsätzlich unzulässig – mit einer wichtigen Ausnahme: Vorhaben, die einem land- oder forstwirtschaftlichen Betrieb dienen, sind privilegiert. Ein Container, der nachweislich dem Betrieb dient, kann daher zulässig sein, wo er für einen Privatmann unzulässig wäre.',
      },
      {
        type: 'p',
        text: 'Entscheidend ist das Wort „dienen": Der Container muss dem konkreten Betriebszweck zugeordnet sein. Ein Hofladen für zugekaufte Ware fällt in der Regel nicht darunter. Lassen Sie das im Zweifel über eine Bauvoranfrage klären.',
      },
      { type: 'h2', text: 'Praktische Hinweise für den Hof' },
      {
        type: 'ul',
        items: [
          'Aufständern: Fundamentblöcke halten den Container trocken und erschweren Nagern den Zugang.',
          'Leicht geneigt aufstellen: Rund 1 % Gefälle nach hinten, damit Regenwasser vom Dach abläuft.',
          'Zufahrt bei Nässe prüfen: Wirtschaftswege tragen einen 40-Tonner nach Regen oft nicht.',
          'Belüftung großzügig dimensionieren: Bei organischem Lagergut lieber zwei Gitter zu viel als eines zu wenig.',
          'Blitzschutz beachten: Frei stehende Metallcontainer in exponierter Lage sollten in ein vorhandenes Blitzschutzkonzept einbezogen werden.',
        ],
      },
      { type: 'h2', text: 'Fazit' },
      {
        type: 'p',
        text: 'Für landwirtschaftliche Betriebe ist der Container oft die pragmatischste Lösung: schnell verfügbar, versetzbar, im Außenbereich unter Umständen privilegiert und wirtschaftlich attraktiv. Die drei Punkte, an denen es in der Praxis scheitert, sind Belüftung, Nagerschutz und die Tragfähigkeit der Zufahrt bei Nässe. Alle drei lassen sich vorab lösen.',
      },
    ],
    seo: {
      title: 'Container in der Landwirtschaft – Erntelager, Kühlung & Maschinendepot',
      description:
        'Container im landwirtschaftlichen Betrieb: Maschinenlager, Saatgutlager, Erntekühlung und Hofladen. Mit Hinweisen zu Belüftung, Nagerschutz und § 35 BauGB.',
      focusKeyword: 'Container Landwirtschaft',
      secondaryKeywords: ['Lagercontainer Bauernhof', 'Kühlcontainer Ernte'],
    },
  },
];

export const blogPostsBySlug = new Map(blogPosts.map((p) => [p.slug, p]));
export const blogCategoriesBySlug = new Map(blogCategories.map((c) => [c.slug, c]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostsBySlug.get(slug);
}

export function postsInCategory(categorySlug: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const blogPostsByDate = [...blogPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

/** Verwandte Beiträge über gemeinsame Tags, aufgefüllt aus derselben Kategorie. */
export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getBlogPost(slug);
  if (!post) return [];

  const scored = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length * 2 +
        (p.categorySlug === post.categorySlug ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt));

  return scored.slice(0, limit).map((s) => s.post);
}
