import type { Faq } from './types.ts';

export const faqCategories = [
  { slug: 'kauf', name: 'Kauf & Bestellung', icon: 'cart' },
  { slug: 'lieferung', name: 'Lieferung & Aufstellung', icon: 'truck' },
  { slug: 'technik', name: 'Technik & Ausstattung', icon: 'wrench' },
  { slug: 'recht', name: 'Recht & Genehmigung', icon: 'scale' },
  { slug: 'zahlung', name: 'Zahlung & Finanzierung', icon: 'euro' },
  { slug: 'service', name: 'Garantie & Service', icon: 'shield' },
] as const;

export const faqs: Faq[] = [
  // ── Kauf & Bestellung ─────────────────────────────────────────────────────
  {
    category: 'kauf',
    question: 'Welche Containergröße brauche ich?',
    answer:
      'Als Orientierung: Ein 10-Fuß-Container (16 m³) fasst den Inhalt einer Ein- bis Zwei-Zimmer-Wohnung, ein 20-Fuß-Container (33 m³) den einer Drei-Zimmer-Wohnung, ein 40-Fuß-Container (68 m³) den eines Einfamilienhauses. Für Palettenware gilt: 4 Europaletten bei 10 Fuß, 10 bei 20 Fuß, 21 bei 40 Fuß – jeweils in einer Lage.',
  },
  {
    category: 'kauf',
    question: 'Was ist der Unterschied zwischen neu, One-Trip und gebraucht?',
    answer:
      'Ein Neucontainer kommt direkt aus dem Werk und war nie beladen. Ein One-Trip-Container wurde nach der Produktion einmal mit Ladung nach Europa verschifft – optisch nahezu neuwertig, aber 15 bis 25 % günstiger. Ein Gebrauchtcontainer hat mehrere Jahre im Seeverkehr hinter sich, ist geprüft wind- und wasserdicht und weist normale Gebrauchsspuren auf.',
  },
  {
    category: 'kauf',
    question: 'Kann ich den Container vor dem Kauf besichtigen?',
    answer:
      'Ja. Nach telefonischer Terminvereinbarung zeigen wir Ihnen die verfügbaren Einheiten an unserem Standort in Altenkirchen. Alternativ senden wir Ihnen Fotos des konkreten Containers inklusive Containernummer per E-Mail zu.',
  },
  {
    category: 'kauf',
    question: 'Gibt es Mengenrabatte?',
    answer:
      'Ja. Ab drei Containern in einer Bestellung gewähren wir Staffelpreise. Besonders deutlich fallen die Einsparungen aus, wenn alle Einheiten an denselben Standort geliefert werden – dann teilen sich die Transportkosten. Fordern Sie ein individuelles Angebot an.',
  },
  {
    category: 'kauf',
    question: 'Verkaufen Sie auch an Privatpersonen?',
    answer:
      'Ja, wir verkaufen an Geschäfts- und Privatkunden. Privatkunden haben bei Onlinebestellungen das gesetzliche Widerrufsrecht von 14 Tagen. Bitte beachten Sie, dass die Rücksendung eines Containers erhebliche Transportkosten verursacht, die bei Widerruf zu Ihren Lasten gehen.',
  },
  {
    category: 'kauf',
    question: 'Wie kann ich ein individuelles Angebot anfordern?',
    answer:
      'Über unser Anfrageformular unter „Angebot anfordern" oder telefonisch. Nennen Sie uns Größe, Zustand, gewünschte Ausstattung und die Lieferpostleitzahl – Sie erhalten in der Regel innerhalb eines Werktages ein verbindliches Festpreisangebot.',
  },

  // ── Lieferung & Aufstellung ───────────────────────────────────────────────
  {
    category: 'lieferung',
    question: 'Wie lange dauert die Lieferung?',
    answer:
      'Lagerware liefern wir deutschlandweit innerhalb von 3 bis 7 Werktagen. Container mit individueller Lackierung benötigen 10 bis 20 Werktage, ausgebaute Büro- oder Sanitärcontainer 15 bis 40 Werktage. Den verbindlichen Termin stimmen wir nach Zahlungseingang telefonisch mit Ihnen ab.',
  },
  {
    category: 'lieferung',
    question: 'Welche Zufahrt wird benötigt?',
    answer:
      'Für einen 20-Fuß-Container: mindestens 3,5 m Zufahrtsbreite, 15 bis 20 m gerade Anfahrt und 4,2 m hindernisfreie Höhe. Für 40 Fuß: mindestens 4,0 m Breite und rund 25 m gerade Anfahrt. Der Untergrund muss befestigt und tragfähig sein. Bei beengten Verhältnissen setzen wir einen Autokran ein.',
  },
  {
    category: 'lieferung',
    question: 'Was kostet die Anlieferung?',
    answer:
      'Die Lieferpauschale richtet sich nach Postleitzahl und Containerlänge. Für einen 20-Fuß-Container liegt sie zwischen 390 € und 590 € netto. Sie wird im Warenkorb transparent berechnet. Ab einem Netto-Warenwert von 9.500 € liefern wir versandkostenfrei.',
  },
  {
    category: 'lieferung',
    question: 'Brauche ich ein Fundament?',
    answer:
      'Nein. Der Container trägt sein Gewicht über die vier Eckbeschläge. Vier tragfähige Punktauflager – Betonplatten von mindestens 40 × 40 cm oder unsere Fundamentblöcke – genügen. Entscheidend ist eine waagerechte Aufstellung, damit sich der Rahmen nicht verwindet und die Türen sauber schließen.',
  },
  {
    category: 'lieferung',
    question: 'Muss ich bei der Anlieferung anwesend sein?',
    answer:
      'Ja, es sollte jemand vor Ort sein, der die Stellposition freigibt und die Übergabe quittiert. Ist das nicht möglich, vereinbaren wir vorab schriftlich eine genaue Stellposition; die Aufstellung wird dann fotografisch dokumentiert.',
  },
  {
    category: 'lieferung',
    question: 'Können Sie den Container auch später umsetzen?',
    answer:
      'Ja. Für das Umsetzen auf dem Grundstück oder den Transport an einen anderen Standort erstellen wir ein separates Angebot. Ein leerer 20-Fuß-Container wiegt rund 2,25 t, ein 40-Fuß-Container etwa 3,75 t – beide lassen sich mit Kranfahrzeug oder Autokran bewegen.',
  },
  {
    category: 'lieferung',
    question: 'Liefern Sie auch auf unbefestigten Untergrund?',
    answer:
      'Bei trockener Witterung und tragfähigem Boden ja. Bei aufgeweichtem Untergrund besteht die Gefahr, dass das Fahrzeug einsinkt – dann verschieben wir den Termin oder liefern mit einem Autokran, der von befestigtem Grund aus arbeitet.',
  },

  // ── Technik & Ausstattung ─────────────────────────────────────────────────
  {
    category: 'technik',
    question: 'Wie verhindere ich Kondenswasser im Container?',
    answer:
      'Drei Maßnahmen wirken: Belüftungsgitter an beiden Längsseiten für permanenten Luftaustausch, eine Deckendämmung, die verhindert, dass die Stahlfläche den Taupunkt unterschreitet, und Luftentfeuchter-Granulat für empfindliches Lagergut. Die Kombination aus Belüftung und Dämmung ist die dauerhafteste Lösung.',
  },
  {
    category: 'technik',
    question: 'Was bedeutet „wind- und wasserdicht"?',
    answer:
      'WWT ist der Branchenstandard für gebrauchte Lagercontainer: Das Dach hält Regen, die Türdichtungen schließen umlaufend, es gibt keine Durchrostungen. Geprüft wird im Lichttest – bei geschlossenen Türen darf von innen kein Tageslicht sichtbar sein.',
  },
  {
    category: 'technik',
    question: 'Kann ich Regale im Container montieren?',
    answer:
      'Ja. Die Längswände sind über die Wellblechstruktur tragfähig; Regalschienen werden direkt an den Wandprofilen verschraubt. Bohren Sie keinesfalls durch die Außenhaut – dort entstehen Undichtigkeiten. Wir liefern passgenau eingemessene Regalsysteme und montieren sie auf Wunsch.',
  },
  {
    category: 'technik',
    question: 'Woran erkenne ich einen High-Cube-Container?',
    answer:
      'An der gelb-schwarz schraffierten Warnmarkierung über den Türen und am ISO-Code: Die dritte Stelle ist eine „5" statt einer „2", also 45G1 statt 42G1 beim 40-Fuß-Container. Die Außenhöhe beträgt 2.896 mm statt 2.591 mm.',
  },
  {
    category: 'technik',
    question: 'Rostet ein Seecontainer?',
    answer:
      'Corten-Stahl bildet eine schützende Oxidschicht, die tiefergehende Korrosion stark verlangsamt. Kritisch sind stehendes Wasser auf dem Dach und großflächig abgeplatzter Lack. Stellen Sie den Container leicht geneigt auf und bessern Sie Lackschäden mit Rostschutzfarbe aus.',
  },
  {
    category: 'technik',
    question: 'Kann ich Fenster und Türen nachträglich einbauen lassen?',
    answer:
      'Ja, das ist einer unserer häufigsten Umbauten. Wir schneiden die Öffnung, setzen einen verstärkten Rahmen ein und montieren Fenster oder Tür fachgerecht mit umlaufender Abdichtung. Bringen Sie den Container zu uns nach Altenkirchen oder wir holen ihn ab.',
  },
  {
    category: 'technik',
    question: 'Welchen Stromanschluss braucht ein Kühlcontainer?',
    answer:
      'Einen 400-V-Drehstromanschluss mit 32-A-CEE-Steckdose und eigener Absicherung. Ein Schuko-Anschluss reicht nicht aus. Der Anlaufstrom liegt deutlich über der Dauerleistung – die Zuleitung muss entsprechend dimensioniert und von einer Elektrofachkraft abgenommen sein.',
  },

  // ── Recht & Genehmigung ───────────────────────────────────────────────────
  {
    category: 'recht',
    question: 'Brauche ich eine Baugenehmigung für einen Container?',
    answer:
      'Das hängt von Nutzung, Größe, Standort und Bundesland ab. Reine Lagercontainer sind in mehreren Landesbauordnungen bis zu einer bestimmten Größe verfahrensfrei. Sobald der Container dem Aufenthalt von Menschen dient, dauerhaft aufgestellt wird oder im Außenbereich nach § 35 BauGB steht, ist in aller Regel eine Genehmigung erforderlich. Klären Sie das Vorhaben vorab mit Ihrem Bauamt – die Auskunft ist kostenlos und schützt vor Rückbauverfügungen.',
  },
  {
    category: 'recht',
    question: 'Gilt für Bürocontainer etwas anderes?',
    answer:
      'Ja. Sobald Menschen sich dauerhaft in einem Container aufhalten, gilt er bauordnungsrechtlich als Gebäude mit entsprechenden Anforderungen an Standsicherheit, Wärmeschutz, Brandschutz und Rettungswege. Für temporäre Baustelleneinrichtungen gelten Erleichterungen. Wir liefern die technischen Nachweise für Ihren Bauantrag mit.',
  },
  {
    category: 'recht',
    question: 'Darf ich einen Container auf öffentlichem Grund aufstellen?',
    answer:
      'Nur mit einer Sondernutzungserlaubnis der zuständigen Straßenverkehrsbehörde. Für Baustellen kommt in der Regel eine verkehrsrechtliche Anordnung hinzu. Auf Wunsch übernehmen wir die Beantragung – planen Sie dafür zwei bis vier Wochen Vorlauf ein.',
  },
  {
    category: 'recht',
    question: 'Muss ich meinen Nachbarn informieren?',
    answer:
      'Rechtlich in der Regel nicht, sofern Abstandsflächen eingehalten werden und keine Genehmigungspflicht besteht. Praktisch ist ein Gespräch vorab dennoch ratsam: Ein 2,6 m hoher Stahlkasten an der Grundstücksgrenze führt erfahrungsgemäß eher zu Konflikten als ein abgestimmter Standort.',
  },

  // ── Zahlung & Finanzierung ────────────────────────────────────────────────
  {
    category: 'zahlung',
    question: 'Welche Zahlungsarten akzeptieren Sie?',
    answer:
      'Vorkasse per Überweisung, SEPA-Lastschrift und – für Geschäftskunden nach Bonitätsprüfung – Kauf auf Rechnung. Karten- und PayPal-Zahlungen bieten wir nicht an; dadurch sparen wir die Anbietergebühren und geben den Vorteil über den Preis weiter. Bei Vorkasse gewähren wir 2 % Skonto.',
  },
  {
    category: 'zahlung',
    question: 'Bieten Sie eine Finanzierung an?',
    answer:
      'Ja, mit Laufzeiten von 12 bis 60 Monaten und Zinssätzen ab 4,9 % effektiv pro Jahr. Den monatlichen Ratenbetrag berechnen Sie direkt auf der Produktseite. Die Finanzierung läuft über unseren Partner; die Bonitätsprüfung erfolgt online innerhalb weniger Minuten.',
  },
  {
    category: 'zahlung',
    question: 'Wann wird die Rechnung fällig?',
    answer:
      'Bei Vorkasse mit der Bestellbestätigung, bei SEPA-Lastschrift mit dem Versand und bei Kauf auf Rechnung 14 Tage nach Lieferung. Die Rechnung erhalten Sie als PDF per E-Mail – ein Kundenkonto benötigen Sie dafür nicht.',
  },
  {
    category: 'zahlung',
    question: 'Sind die Preise netto oder brutto?',
    answer:
      'Wir weisen beide Werte aus. Der Bruttopreis inklusive 19 % Mehrwertsteuer steht im Vordergrund, der Nettopreis wird für Geschäftskunden zusätzlich angezeigt. Auf der Rechnung ist die Mehrwertsteuer gesondert ausgewiesen und für Vorsteuerabzugsberechtigte erstattungsfähig.',
  },

  // ── Garantie & Service ────────────────────────────────────────────────────
  {
    category: 'service',
    question: 'Welche Garantie gewähren Sie?',
    answer:
      'Auf fabrikneue Container 60 Monate auf Wind- und Wasserdichtheit, auf One-Trip-Container 36 Monate, auf generalüberholte und ausgebaute Container 24 Monate und auf Gebrauchtcontainer 12 Monate. Die gesetzlichen Gewährleistungsrechte bleiben davon unberührt.',
  },
  {
    category: 'service',
    question: 'Was tun bei einem Schaden nach der Lieferung?',
    answer:
      'Melden Sie den Schaden innerhalb von 7 Tagen mit Fotos per E-Mail. Transportschäden sollten bereits bei der Übergabe auf dem Lieferschein vermerkt werden. Wir prüfen den Fall und beheben berechtigte Mängel durch Reparatur vor Ort oder Austausch.',
  },
  {
    category: 'service',
    question: 'Bieten Sie Reparaturen an?',
    answer:
      'Ja. In unserer Werkstatt reparieren wir Durchrostungen, tauschen Türdichtungen und Verriegelungen, richten Beulen und führen Lackierungen aus. Für Reparaturen vor Ort in einem Umkreis von etwa 150 km um Altenkirchen setzen wir ein Servicefahrzeug ein.',
  },
  {
    category: 'service',
    question: 'Nehmen Sie Container in Zahlung?',
    answer:
      'Ja, bei Neukauf nehmen wir Ihren gebrauchten Container in Zahlung, sofern die Substanz es zulässt. Senden Sie uns Fotos und die Containernummer – Sie erhalten in der Regel innerhalb von zwei Werktagen ein Ankaufangebot.',
  },
];

export function faqsByCategory(categorySlug: string): Faq[] {
  return faqs.filter((f) => f.category === categorySlug);
}

/** Die häufigsten Fragen für die Startseite. */
export const topFaqs: Faq[] = [
  faqs[0]!,
  faqs[6]!,
  faqs[9]!,
  faqs[19]!,
  faqs[13]!,
  faqs[24]!,
].filter(Boolean);
