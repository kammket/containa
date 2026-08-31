import { formatPrice, grossFromNet, deliveryZones } from '@emc/catalog';

import type { ServiceSection } from '@/components/layout/service-page';

/** Inhalte der Serviceseiten – getrennt von der Darstellung. */

export const deliveryContent = {
  kicker: 'Deutschlandweit in 3–7 Werktagen',
  intro: [
    'Wir liefern Container in ganz Deutschland – per Absetzkipper, Kranfahrzeug oder Autokran. Die Lieferpauschale steht vor der Bestellung fest und ändert sich danach nicht mehr.',
  ],
  stats: [
    { value: '3–7', label: 'Werktage Lieferzeit' },
    { value: '16', label: 'Bundesländer' },
    {
      value: `ab ${formatPrice(grossFromNet(deliveryZones[0]!.baseNet))}`,
      label: 'Lieferpauschale',
    },
    { value: '0 €', label: 'ab 9.500 € netto' },
  ],
  sections: [
    {
      heading: 'Wie die Anlieferung abläuft',
      body: [
        'Nach Zahlungseingang meldet sich unsere Disposition telefonisch und stimmt einen Liefertermin mit Ihnen ab. Am Vortag erhalten Sie ein Zeitfenster von zwei Stunden per SMS, der Fahrer meldet sich zusätzlich etwa 30 Minuten vor Ankunft.',
        'Der Container wird mit dem Absetzkipper über die Fahrzeugrückseite abgerollt oder mit dem Ladekran seitlich abgesetzt. Der Vorgang dauert je nach Situation 20 bis 40 Minuten. Eine weisungsberechtigte Person sollte vor Ort sein, um die Stellposition freizugeben und die Übergabe zu quittieren.',
        'Prüfen Sie den Container bei der Übergabe auf Transportschäden und vermerken Sie sichtbare Schäden auf dem Lieferschein. Eine spätere Reklamation ohne diesen Vermerk ist erfahrungsgemäß schwer durchzusetzen.',
      ],
    },
    {
      heading: 'Was Ihr Stellplatz erfüllen muss',
      body: [
        'Die häufigste Ursache für gescheiterte Liefertermine ist eine nicht geprüfte Zufahrt. Diese Werte sollten Sie vorab kontrollieren:',
      ],
      table: {
        head: ['Anforderung', 'bis 20 Fuß', 'ab 40 Fuß'],
        rows: [
          ['Zufahrtsbreite', 'min. 3,5 m', 'min. 4,0 m'],
          ['Gerade Anfahrt vor Stellfläche', '15–20 m', 'ca. 25 m'],
          ['Lichte Durchfahrtshöhe', 'min. 4,2 m', 'min. 4,5 m'],
          ['Fahrzeuglänge', 'ca. 10 m', 'ca. 18 m'],
          ['Seitlicher Arbeitsraum (Kran)', 'ca. 4 m', 'ca. 6 m'],
          ['Freie Höhe über der Stellfläche', 'ca. 5 m', 'ca. 6 m'],
        ],
      },
      checklist: [
        'Befestigter, tragfähiger und möglichst ebener Untergrund',
        'Keine Freileitungen, Äste oder Vordächer über der Stellfläche',
        'Zufahrt frei von parkenden Fahrzeugen',
        'Vier tragfähige Punktauflager unter den Eckbeschlägen vorbereitet',
        'Bei öffentlichem Grund: Sondernutzungserlaubnis liegt vor',
      ],
    },
    {
      heading: 'Wenn der Stellplatz nicht anfahrbar ist',
      body: [
        'Liegt die Stellfläche hinter einem Gebäude, einer Mauer oder auf einer Terrasse, hebt ein Autokran den Container über das Hindernis. Das ist Routine – muss aber vorab eingeplant werden, weil der Kran separat disponiert wird.',
        'Der Kran benötigt einen tragfähigen Standplatz mit Raum für die ausgefahrenen Stützen, typischerweise 6 × 8 m. Die Hubdistanz bestimmt die erforderliche Krangröße: Je weiter, desto größer und teurer. Freileitungen im Schwenkbereich sind ein Ausschlusskriterium.',
        'Je nach Aufwand liegen die Zusatzkosten zwischen 450 und 1.200 € netto. Wir nennen den Betrag vor Auftragsbestätigung – Sie können die Bestellung dann kostenfrei stornieren.',
      ],
    },
    {
      heading: 'Lieferzonen und Preise',
      body: [
        'Die Lieferpauschale richtet sich nach der Leitregion Ihrer Postleitzahl und der Außenlänge des Containers. Für Einheiten über 6 m kommt ein Längenzuschlag hinzu. Ab einem Nettowarenwert von 9.500 € liefern wir versandkostenfrei.',
      ],
      table: {
        head: ['Zone', 'PLZ-Bereich', '20 Fuß (inkl. MwSt.)', 'Lieferzeit'],
        rows: deliveryZones.map((zone) => [
          zone.name,
          zone.prefixes.map((p) => `${p}xxxx`).join(', '),
          formatPrice(grossFromNet(zone.baseNet)),
          `${zone.days[0]}–${zone.days[1]} Werktage`,
        ]),
      },
    },
  ] satisfies ServiceSection[],
  faqs: [
    {
      question: 'Kann ich einen Wunschtermin angeben?',
      answer:
        'Ja. Nennen Sie Ihren Wunschtermin bei der Bestellung im Feld „Hinweise zur Anlieferung". Wir versuchen, ihn einzuhalten, und melden uns, falls er nicht darstellbar ist. Feste Uhrzeiten können wir nicht garantieren – wir arbeiten mit Zeitfenstern von zwei Stunden.',
    },
    {
      question: 'Liefern Sie auch samstags?',
      answer:
        'Samstagslieferungen sind nach Absprache und gegen Aufpreis möglich, sofern der Transportpartner in Ihrer Region verfügbar ist. Sprechen Sie uns frühzeitig an.',
    },
    {
      question: 'Was passiert, wenn die Lieferung scheitert?',
      answer:
        'Kann der Container aus Gründen, die in Ihrem Verantwortungsbereich liegen, nicht abgesetzt werden – etwa wegen zu enger Zufahrt, weichen Untergrunds oder Abwesenheit –, entstehen Kosten für die Fehlanfahrt und eine erneute Anlieferung. Genau deshalb klären wir die Zufahrt vorher gemeinsam.',
    },
    {
      question: 'Liefern Sie auch ins Ausland?',
      answer:
        'Nach Österreich und in die Schweiz liefern wir auf Anfrage. Bei Lieferungen in die Schweiz kommen Zollabwicklung und Einfuhrumsatzsteuer hinzu – wir erstellen dafür ein individuelles Angebot.',
    },
  ],
};

export const installationContent = {
  kicker: 'Kein Fundament erforderlich',
  intro: [
    'Ein Seecontainer trägt sein Gewicht über die vier Eckbeschläge. Ein durchgehendes Betonfundament ist deshalb überflüssig – vier tragfähige Punktauflager genügen. Entscheidend ist nur eines: Der Container muss waagerecht stehen.',
  ],
  sections: [
    {
      heading: 'Warum die waagerechte Aufstellung entscheidend ist',
      body: [
        'Der Rahmen eines Containers ist verwindungssteif, aber nicht starr. Steht er schief oder liegt eine Ecke in der Luft, verwindet sich die Konstruktion. Die Folge merkt man zuerst an den Türen: Sie lassen sich nur noch schwer schließen, die Verriegelungsstangen klemmen, und die Dichtung liegt nicht mehr umlaufend an.',
        'Prüfen Sie deshalb mit der Wasserwaage, bevor der Fahrer abfährt. Kleine Höhenunterschiede gleichen Sie mit Unterlegplatten aus – das ist in fünf Minuten erledigt und erspart später viel Ärger.',
        'Ein leichtes Gefälle nach hinten von etwa einem Prozent ist dagegen sinnvoll: So läuft Regenwasser vom Dach ab, statt in Dellen stehen zu bleiben. Stehendes Wasser ist die häufigste Ursache für Durchrostung.',
      ],
    },
    {
      heading: 'Geeignete Unterbauten',
      body: [
        'Für die vier Auflagepunkte unter den Eckbeschlägen eignen sich mehrere Varianten. Wichtig ist in allen Fällen, dass die Last punktuell aufgenommen wird und der Container Abstand zum Boden hat.',
      ],
      table: {
        head: ['Unterbau', 'Eignung', 'Hinweis'],
        rows: [
          [
            'Fundamentblöcke aus Beton',
            'sehr gut',
            '12 t Traglast, frostbeständig, stapelbar zum Höhenausgleich',
          ],
          ['Betonplatten 40 × 40 cm', 'gut', 'auf verdichtetem Schotterbett verlegen'],
          ['Verbundsteinpflaster', 'gut', 'nur bei ausreichender Tragschicht'],
          [
            'Punktfundamente aus Ortbeton',
            'sehr gut',
            'für dauerhafte Aufstellung, frostfrei ab 80 cm Tiefe',
          ],
          ['Direkt auf Erdreich', 'ungeeignet', 'Container sinkt ein, Bodenrahmen rostet'],
          ['Holzbalken', 'ungeeignet', 'verrottet, verliert Tragfähigkeit'],
        ],
      },
      checklist: [
        'Bei 20 Fuß: vier Auflagepunkte unter den Eckbeschlägen',
        'Bei 40 Fuß: sechs bis acht Punkte, zusätzlich in den Drittelspunkten',
        'Auflagefläche je Punkt mindestens 40 × 40 cm',
        'Untergrund vorher verdichten, bei weichem Boden Schotterbett anlegen',
        'Rund 1 % Gefälle nach hinten für den Wasserablauf',
      ],
    },
    {
      heading: 'Container umsetzen und stapeln',
      body: [
        'Ein leerer 20-Fuß-Container wiegt rund 2,25 Tonnen, ein 40-Fuß-Container etwa 3,75 Tonnen. Zum Umsetzen auf dem eigenen Grundstück eignen sich Autokran, Reach Stacker oder Schwerlaststapler. Heben Sie ausschließlich an den vier oberen Eckbeschlägen – niemals an Dach oder Seitenwänden.',
        'Container sind stapelbar; im Seeverkehr werden sie bis zu neunfach übereinander gesetzt. An Land empfehlen wir maximal zwei Ebenen. Ab zwei Ebenen ist ein Standsicherheitsnachweis erforderlich, außerdem müssen die Container mit Twistlocks verbunden werden.',
        'Wichtig beim Stapeln: Die Last wird über die Eckpfosten abgetragen, nicht über die Wände. Die Container müssen daher exakt übereinanderstehen. Ein versetzter Stapel ist statisch unzulässig.',
      ],
    },
  ] satisfies ServiceSection[],
  faqs: [
    {
      question: 'Brauche ich eine Bodenplatte aus Beton?',
      answer:
        'Nein. Eine durchgehende Bodenplatte ist technisch nicht erforderlich und teuer. Vier tragfähige Punktauflager unter den Eckbeschlägen genügen vollständig. Eine Bodenplatte ist nur dann sinnvoll, wenn Sie den Innenraum später als Werkstatt mit befahrbarem Boden nutzen wollen.',
    },
    {
      question: 'Kann ich den Container auf Rasen stellen?',
      answer:
        'Nicht direkt. Der Container würde einsinken und schief stehen, außerdem rostet der Bodenrahmen bei permanentem Bodenkontakt. Legen Sie Fundamentblöcke oder Betonplatten auf einem verdichteten Schotterbett unter die Eckbeschläge.',
    },
    {
      question: 'Wie viel Platz brauche ich zum Öffnen der Türen?',
      answer:
        'Für die volle Öffnung von 270 Grad rund 2,5 m vor der Stirnseite. Bei beengten Verhältnissen genügen 1,5 m für eine 90-Grad-Öffnung, was für die meisten Ladevorgänge ausreicht. Bei Open-Side-Containern gilt derselbe Wert für die Längsseite.',
    },
  ],
};

export const modificationsContent = {
  kicker: 'Eigene Werkstatt, Festpreis, 3–6 Wochen',
  intro: [
    'Nicht jede Anforderung passt in ein Standardprodukt. In unserer Werkstatt bauen wir Seecontainer nach Ihren Vorgaben um – vom eingeschnittenen Fenster bis zur schlüsselfertigen Wohneinheit.',
  ],
  stats: [
    { value: '3–6', label: 'Wochen Fertigungszeit' },
    { value: 'Festpreis', label: 'ohne Nachträge' },
    { value: '1', label: 'Ansprechpartner' },
    { value: '24', label: 'Monate Garantie' },
  ],
  sections: [
    {
      heading: 'Was wir umbauen',
      body: [
        'Unsere Schlosserei, Elektrik und Innenausbau sitzen unter einem Dach. Das bedeutet für Sie: ein Ansprechpartner, ein Termin, keine Abstimmungsverluste zwischen Gewerken.',
      ],
      checklist: [
        'Fenster und Türen einschneiden, Rahmen verstärken, fachgerecht abdichten',
        'Dämmung mit Dampfbremse und Innenverkleidung nach GEG-Anforderungen',
        'Elektroinstallation von der einzelnen Steckdose bis zur 400-V-Unterverteilung',
        'Sanitärinstallation mit Dusche, WC und Durchlauferhitzer',
        'Rolltore, Sektionaltore und Verkaufsklappen',
        'Trennwände, Zwischendecken und Regalsysteme',
        'Container koppeln und über zwei Ebenen stapeln – inklusive Treppen und Geländer',
        'Lackierung in jedem RAL-Ton, Beschriftung und Folierung',
      ],
    },
    {
      heading: 'Wie ein Umbauprojekt abläuft',
      body: [
        'Zuerst besprechen wir Ihre Anforderung – am Telefon oder vor Ort. Aus einer Skizze, einem Foto oder auch nur einer Beschreibung entwickeln wir einen konkreten Vorschlag.',
        'Sie erhalten ein Festpreisangebot mit Leistungsverzeichnis: Was gemacht wird, welche Materialien verbaut werden, welche Termine gelten. Erst nach Ihrer Freigabe beginnt die Fertigung.',
        'Während der Umsetzung senden wir auf Wunsch Fotos vom Baufortschritt. Nach Fertigstellung liefern und stellen wir den Container auf – bei genehmigungspflichtigen Vorhaben inklusive der statischen und bauphysikalischen Nachweise.',
      ],
      table: {
        head: ['Umbau', 'Fertigungszeit', 'Preis netto ab'],
        rows: [
          ['Fenster oder Tür einschneiden', '1–2 Wochen', '890 €'],
          ['Belüftung und Elektrik', '1–2 Wochen', '1.200 €'],
          ['Werkstattausbau', '3–4 Wochen', '9.900 €'],
          ['Bürocontainer 20 Fuß', '3–5 Wochen', '7.900 €'],
          ['Sanitärcontainer', '5–8 Wochen', '12.900 €'],
          ['Wohncontainer 40 Fuß', '8–14 Wochen', '38.900 €'],
        ],
      },
    },
    {
      heading: 'Umbau an Ihrem vorhandenen Container',
      body: [
        'Sie haben bereits einen Container? Bringen Sie ihn zu uns nach Altenkirchen oder wir holen ihn ab. Nach einer Bestandsaufnahme erhalten Sie ein Festpreisangebot.',
        'Eine ehrliche Einschränkung: Bei stark durchgerosteten Einheiten raten wir in der Regel vom Umbau ab. Die Instandsetzung kostet dann mehr, als ein besserer Ausgangscontainer gekostet hätte – und die Substanz bleibt trotzdem schwächer.',
      ],
    },
  ] satisfies ServiceSection[],
  faqs: [
    {
      question: 'Kann ich eigene Materialien beistellen?',
      answer:
        'Grundsätzlich ja, etwa bei Fenstern oder Sanitärobjekten. Bitte beachten Sie, dass wir für beigestellte Materialien keine Gewährleistung übernehmen können und die Terminplanung von der rechtzeitigen Anlieferung abhängt.',
    },
    {
      question: 'Erhalte ich Unterlagen für den Bauantrag?',
      answer:
        'Bei genehmigungspflichtigen Vorhaben liefern wir Standsicherheitsnachweis, Wärmeschutznachweis nach GEG sowie Ausführungspläne. Auf Wunsch arbeiten wir direkt mit Ihrem Architekten oder Statiker zusammen.',
    },
    {
      question: 'Was kostet ein individueller Umbau?',
      answer:
        'Das hängt vollständig vom Umfang ab. Ein eingeschnittenes Fenster mit Rahmen liegt bei rund 890 € netto, ein voll ausgebauter Wohncontainer bei 38.900 € netto aufwärts. Schildern Sie uns Ihr Vorhaben – Sie erhalten in wenigen Tagen ein belastbares Festpreisangebot.',
    },
  ],
};

export const shippingContent = {
  kicker: 'Transparent kalkuliert',
  intro: [
    'Die Lieferpauschale ist der Posten, der bei Onlineangeboten am häufigsten fehlt. Bei uns steht er vor der Bestellung fest und wird im Warenkorb ausgewiesen, sobald Sie Ihre Postleitzahl eingeben.',
  ],
  sections: [
    {
      heading: 'Versandkosten nach Zone',
      body: [
        'Die Pauschale gilt für einen Container bis 6 m Außenlänge bei befestigter, frei anfahrbarer Stellfläche. Für längere Einheiten kommt ein Längenzuschlag je angefangenem Meter hinzu.',
      ],
      table: {
        head: ['Zone', 'PLZ-Bereich', 'Grundpreis (inkl. MwSt.)', 'Zuschlag je Meter über 6 m'],
        rows: deliveryZones.map((zone) => [
          zone.name,
          zone.prefixes.map((p) => `${p}xxxx`).join(', '),
          formatPrice(grossFromNet(zone.baseNet)),
          formatPrice(grossFromNet(zone.perExtraMeterNet)),
        ]),
      },
    },
    {
      heading: 'Versandkostenfreie Lieferung',
      body: [
        'Ab einem Nettowarenwert von 9.500 € liefern wir innerhalb Deutschlands versandkostenfrei. Der Schwellenwert bezieht sich auf den Warenwert ohne Mehrwertsteuer und ohne Lieferkosten.',
        'Bei mehreren Containern in einer Bestellung an dieselbe Adresse berechnen wir für jede weitere Einheit lediglich 60 % der Grundpauschale, da sie in derselben Tour mitfährt. Zubehör wie Schlosskästen, Belüftungsgitter oder Regalsysteme reist kostenfrei mit.',
      ],
    },
    {
      heading: 'Zusatzkosten und wann sie entstehen',
      body: [
        'Wir kalkulieren so, dass nach der Bestellung nichts hinzukommt. Es gibt genau zwei Situationen, in denen Mehrkosten entstehen können – und beide klären wir vorher mit Ihnen ab:',
      ],
      checklist: [
        'Autokraneinsatz, wenn die Stellfläche nicht direkt anfahrbar ist – 450 bis 1.200 € netto je nach Aufwand',
        'Fehlanfahrt, wenn die Lieferung aus Gründen in Ihrem Verantwortungsbereich scheitert',
        'Beide Positionen nennen wir vor Auftragsbestätigung; Sie können dann kostenfrei stornieren',
      ],
    },
  ] satisfies ServiceSection[],
  faqs: [
    {
      question: 'Wann wird die Lieferpauschale berechnet?',
      answer:
        'Sobald Sie im Warenkorb Ihre Postleitzahl eingeben. Der Betrag erscheint sofort und ändert sich im weiteren Bestellverlauf nicht mehr.',
    },
    {
      question: 'Kann ich den Container selbst abholen?',
      answer:
        'Ja, Selbstabholung an unserem Standort in Altenkirchen ist möglich und spart die Lieferpauschale. Sie benötigen ein geeignetes Fahrzeug – ein Anhänger reicht nicht. Wir verladen mit Stapler oder Kran; bitte vereinbaren Sie den Termin vorher telefonisch.',
    },
  ],
};

export const warrantyContent = {
  kicker: 'Bis zu 60 Monate',
  intro: [
    'Zusätzlich zur gesetzlichen Gewährleistung gewähren wir eine Garantie auf die Wind- und Wasserdichtheit. Die Laufzeit hängt vom Zustand des Containers ab.',
  ],
  sections: [
    {
      heading: 'Garantielaufzeiten',
      body: [
        'Die Garantie beginnt mit der Ablieferung und wird Ihnen zusammen mit dem Kaufvertrag schriftlich bestätigt.',
      ],
      table: {
        head: ['Zustand', 'Garantie', 'Umfang'],
        rows: [
          ['Fabrikneu', '60 Monate', 'Wind- und Wasserdichtheit, Lackierung, Dichtungen'],
          ['One-Trip', '36 Monate', 'Wind- und Wasserdichtheit, Dichtungen'],
          ['Generalüberholt', '24 Monate', 'Wind- und Wasserdichtheit'],
          [
            'Ausgebaut (Büro, Sanitär, Werkstatt)',
            '24 Monate',
            'Gebäudehülle und verbaute Technik',
          ],
          ['Gebraucht', '12 Monate', 'Wind- und Wasserdichtheit'],
        ],
      },
    },
    {
      heading: 'Was die Garantie abdeckt',
      body: [
        'Im Garantiefall beseitigen wir Undichtigkeiten durch Reparatur vor Ort oder in unserer Werkstatt. Ist eine wirtschaftliche Instandsetzung nicht möglich, tauschen wir den Container aus.',
      ],
      checklist: [
        'Durchrostungen in Dach, Wänden und Boden',
        'Undichte oder gerissene Türdichtungen',
        'Defekte oder klemmende Verriegelungsmechanik',
        'Bei Neucontainern zusätzlich: Lackablösungen und Rostdurchschlag',
      ],
    },
    {
      heading: 'Was nicht abgedeckt ist',
      body: [
        'Ausgenommen sind Schäden, die nicht auf die Beschaffenheit des Containers zurückgehen:',
      ],
      checklist: [
        'Schäden durch nicht waagerechte Aufstellung – der häufigste Ausschlussgrund',
        'Eigenmächtige bauliche Veränderungen, insbesondere Durchbrüche der Außenhaut',
        'Gewalteinwirkung, Vandalismus und Unfallschäden',
        'Höhere Gewalt wie Sturm, Hochwasser oder Hagel',
        'Normale Abnutzung sowie Flugrost an Kanten und Kratzern',
        'Folgeschäden am eingelagerten Gut',
      ],
    },
    {
      heading: 'Garantiefall melden',
      body: [
        'Melden Sie den Schaden möglichst früh – bei Transportschäden bereits auf dem Lieferschein, sonst innerhalb von sieben Tagen nach Feststellung. Senden Sie uns Fotos der betroffenen Stelle sowie die Containernummer per E-Mail.',
        'Wir prüfen den Fall und melden uns in der Regel innerhalb von zwei Werktagen mit einem Vorschlag zur Behebung. Für Reparaturen vor Ort setzen wir im Umkreis von etwa 150 km um Altenkirchen ein eigenes Servicefahrzeug ein; darüber hinaus arbeiten wir mit Partnerbetrieben.',
      ],
    },
  ] satisfies ServiceSection[],
  faqs: [
    {
      question: 'Gilt die Garantie auch nach einem Standortwechsel?',
      answer:
        'Ja, solange der Container fachgerecht umgesetzt und wieder waagerecht aufgestellt wurde. Schäden, die durch unsachgemäßes Anheben entstehen – etwa Heben an Dach oder Wänden statt an den Eckbeschlägen –, sind ausgeschlossen.',
    },
    {
      question: 'Ist die Garantie übertragbar?',
      answer:
        'Ja. Verkaufen Sie den Container weiter, geht die Restlaufzeit auf den neuen Eigentümer über. Übergeben Sie dazu die Garantieurkunde und den Kaufbeleg.',
    },
    {
      question: 'Was ist der Unterschied zur gesetzlichen Gewährleistung?',
      answer:
        'Die Gewährleistung ist gesetzlich vorgeschrieben und betrifft Mängel, die bereits bei Übergabe vorlagen. Die Garantie ist eine freiwillige Zusatzleistung von uns und gilt auch für Mängel, die erst später auftreten. Ihre gesetzlichen Rechte werden durch die Garantie nicht eingeschränkt.',
    },
  ],
};
