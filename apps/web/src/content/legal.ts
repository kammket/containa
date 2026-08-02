import { address, bank, brand, contact, legal } from '@emc/catalog';

import type { LegalSection } from '@/components/layout/legal-page';

/**
 * Rechtstexte.
 *
 * Hinweis für den Betrieb: Diese Texte sind sorgfältig auf das Geschäftsmodell
 * zugeschnitten, ersetzen aber keine anwaltliche Prüfung. Vor dem Livegang
 * sollten AGB, Widerrufsbelehrung und Datenschutzerklärung von einer
 * fachkundigen Kanzlei freigegeben werden – insbesondere, weil sich die
 * Anforderungen an Widerruf und Rücktransport bei Sperrgut wie Containern von
 * üblichen Onlineshops unterscheiden.
 */

export const LEGAL_UPDATED_AT = '2026-07-01';

const companyBlock = `${brand.legalName}, ${address.street}, ${address.postalCode} ${address.city}, ${address.country}`;

export const imprintSections: LegalSection[] = [
  {
    heading: 'Angaben gemäß § 5 DDG',
    body: [
      brand.legalName,
      `${address.street}`,
      `${address.postalCode} ${address.city}`,
      address.country,
    ],
  },
  {
    heading: 'Vertreten durch',
    body: [`Geschäftsführer: ${legal.managingDirector}`],
  },
  {
    heading: 'Kontakt',
    body: [
      `Telefon: ${contact.phoneDisplay}`,
      `Telefax: ${contact.fax}`,
      `E-Mail: ${contact.email}`,
    ],
  },
  {
    heading: 'Registereintrag',
    body: [
      `Eintragung im Handelsregister`,
      `Registergericht: ${legal.registerCourt}`,
      `Registernummer: ${legal.registerNumber}`,
    ],
  },
  {
    heading: 'Umsatzsteuer-Identifikationsnummer',
    body: [
      `Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: ${legal.vatId}`,
      `Steuernummer: ${legal.taxNumber}`,
    ],
  },
  {
    heading: 'Redaktionell verantwortlich',
    body: [`Verantwortlich gemäß § 18 Abs. 2 MStV: ${legal.contentResponsible}`],
  },
  {
    heading: 'EU-Streitschlichtung',
    body: [
      `Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ${legal.disputeResolution}`,
      `Unsere E-Mail-Adresse finden Sie oben im Impressum.`,
    ],
  },
  {
    heading: 'Verbraucherstreitbeilegung',
    body: [
      'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
  {
    heading: 'Haftung für Inhalte',
    body: [
      'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    ],
  },
  {
    heading: 'Haftung für Links',
    body: [
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
      'Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.',
    ],
  },
  {
    heading: 'Urheberrecht',
    body: [
      'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      'Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    heading: '1. Verantwortlicher',
    body: [
      'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
      companyBlock,
      `Telefon: ${contact.phoneDisplay}`,
      `E-Mail: ${contact.email}`,
      `Bei Fragen zum Datenschutz erreichen Sie uns außerdem unter ${legal.dsbEmail}.`,
    ],
  },
  {
    heading: '2. Grundsätze der Datenverarbeitung',
    body: [
      'Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Ihrer Einwilligung oder wenn eine gesetzliche Erlaubnis vorliegt.',
      'Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), lit. b DSGVO (Vertragserfüllung und vorvertragliche Maßnahmen), lit. c DSGVO (rechtliche Verpflichtung) und lit. f DSGVO (berechtigte Interessen).',
    ],
  },
  {
    heading: '3. Hosting und Server-Logfiles',
    body: [
      'Unsere Website wird bei einem Dienstleister innerhalb der Europäischen Union gehostet. Beim Aufruf unserer Seiten erhebt der Hoster automatisch Informationen, die Ihr Browser übermittelt (Server-Logfiles):',
      '- Browsertyp und Browserversion',
      '- verwendetes Betriebssystem',
      '- Referrer-URL',
      '- Hostname des zugreifenden Rechners',
      '- Uhrzeit der Serveranfrage',
      '- IP-Adresse (gekürzt bzw. anonymisiert)',
      'Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Sicherheit unserer Website. Die Logfiles werden nach spätestens 7 Tagen gelöscht.',
    ],
  },
  {
    heading: '4. Cookies und lokale Speicherung',
    body: [
      'Wir setzen technisch notwendige Cookies und den lokalen Browserspeicher (localStorage) ein, um Grundfunktionen bereitzustellen – insbesondere Warenkorb, Merkzettel und Ihre Einwilligungsentscheidung. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TTDSG in Verbindung mit Art. 6 Abs. 1 lit. f DSGVO.',
      'Statistik- und Marketing-Cookies setzen wir ausschließlich nach Ihrer ausdrücklichen Einwilligung ein (§ 25 Abs. 1 TTDSG, Art. 6 Abs. 1 lit. a DSGVO). Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookie-Einstellungen im Cookie-Banner erneut aufrufen.',
      'Die Daten in Warenkorb und Merkzettel verbleiben ausschließlich in Ihrem Browser und werden nicht an uns übertragen, solange Sie keine Bestellung abschließen.',
    ],
  },
  {
    heading: '5. Kontaktaufnahme und Anfragen',
    body: [
      'Wenn Sie uns per Kontaktformular, Angebotsanfrage, E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihres Anliegens. Dazu gehören Name, Kontaktdaten, gegebenenfalls Firma und Lieferpostleitzahl sowie der Inhalt Ihrer Nachricht.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage der Vertragsanbahnung dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der Beantwortung von Anfragen.',
      'Wir löschen diese Daten, sobald sie für die Zweckerreichung nicht mehr erforderlich sind, spätestens jedoch nach Ablauf der handels- und steuerrechtlichen Aufbewahrungsfristen.',
    ],
  },
  {
    heading: '6. Bestellabwicklung',
    body: [
      'Zur Abwicklung Ihrer Bestellung verarbeiten wir Ihre Bestands- und Vertragsdaten: Name, Anschrift, Rechnungs- und Lieferadresse, Kontaktdaten, gegebenenfalls USt-IdNr., Bestellpositionen und Zahlungsinformationen.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Aufbewahrung erfolgt anschließend nach den handels- und steuerrechtlichen Fristen von 6 bzw. 10 Jahren (§ 257 HGB, § 147 AO).',
      'Zur Auslieferung geben wir Ihre Lieferadresse und Telefonnummer an das ausführende Transportunternehmen weiter. Dies ist zur Vertragserfüllung erforderlich; ohne diese Weitergabe ist eine Terminabstimmung nicht möglich.',
    ],
  },
  {
    heading: '7. Zahlungsabwicklung',
    body: [
      'Wir setzen keine externen Zahlungsdienstleister ein. Karten- und PayPal-Zahlungen bieten wir nicht an; es werden daher keine Zahlungsdaten an Dritte übermittelt.',
      'Die Abwicklung erfolgt ausschließlich über unsere Hausbank – per Vorkasse, SEPA-Lastschrift oder Kauf auf Rechnung. Verarbeitet werden dabei Ihre Kontoverbindung sowie die Zuordnung zur Bestellung.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Beim Kauf auf Rechnung führen wir zusätzlich eine Bonitätsprüfung durch; Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses am Schutz vor Zahlungsausfällen.',
    ],
  },
  {
    heading: '8. Kundenkonto',
    body: [
      'Sie können ein Kundenkonto anlegen, um Bestellungen einzusehen und Adressen zu speichern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.',
      'Passwörter speichern wir ausschließlich als kryptografischen Hash; eine Wiederherstellung im Klartext ist technisch nicht möglich. Sie können Ihr Konto jederzeit löschen lassen – gesetzliche Aufbewahrungspflichten für abgeschlossene Bestellungen bleiben davon unberührt.',
    ],
  },
  {
    heading: '9. Newsletter',
    body: [
      'Für den Newsletterversand nutzen wir das Double-Opt-in-Verfahren: Nach Ihrer Anmeldung erhalten Sie eine E-Mail mit einem Bestätigungslink. Erst nach Bestätigung nehmen wir Sie in den Verteiler auf.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Ihre Einwilligung können Sie jederzeit widerrufen – über den Abmeldelink in jeder E-Mail oder formlos per Nachricht an uns. Wir protokollieren Anmeldung und Bestätigung, um die Einwilligung nachweisen zu können.',
    ],
  },
  {
    heading: '10. Google Maps',
    body: [
      'Auf unserer Kontaktseite binden wir eine Karte von Google Maps ein (Google Ireland Limited, Irland). Die Karte wird erst geladen, nachdem Sie ausdrücklich zugestimmt haben (Zwei-Klick-Lösung).',
      'Beim Laden werden Ihre IP-Adresse und weitere Nutzungsdaten an Google übertragen, gegebenenfalls auch in die USA. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Ohne Ihre Zustimmung findet keine Übertragung statt; stattdessen zeigen wir eine statische Vorschau mit unserer Adresse.',
    ],
  },
  {
    heading: '11. Ihre Rechte als betroffene Person',
    body: [
      'Sie haben uns gegenüber folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:',
      '- Recht auf Auskunft (Art. 15 DSGVO)',
      '- Recht auf Berichtigung (Art. 16 DSGVO)',
      '- Recht auf Löschung (Art. 17 DSGVO)',
      '- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
      '- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
      '- Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
      '- Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)',
      `Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an ${legal.dsbEmail}.`,
      'Darüber hinaus haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig ist für uns der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.',
    ],
  },
  {
    heading: '12. Datensicherheit',
    body: [
      'Wir verwenden eine SSL- bzw. TLS-Verschlüsselung für die Übertragung vertraulicher Inhalte. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile Ihres Browsers mit „https://" beginnt.',
      'Zusätzlich setzen wir technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Manipulation, Verlust und unberechtigten Zugriff zu schützen. Unsere Maßnahmen werden entsprechend der technischen Entwicklung fortlaufend angepasst.',
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: '§ 1 Geltungsbereich',
    body: [
      `Für alle Lieferungen von ${brand.legalName} (nachfolgend „Verkäufer") an Verbraucher und Unternehmer gelten diese Allgemeinen Geschäftsbedingungen (AGB) in der zum Zeitpunkt der Bestellung gültigen Fassung.`,
      'Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).',
      'Unternehmer ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss des Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt (§ 14 BGB).',
      'Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.',
    ],
  },
  {
    heading: '§ 2 Vertragsschluss',
    body: [
      'Die Darstellung der Produkte im Onlineshop stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Bestellung (invitatio ad offerendum).',
      'Mit dem Absenden der Bestellung über die Schaltfläche „Zahlungspflichtig bestellen" geben Sie ein verbindliches Angebot zum Kauf der im Warenkorb enthaltenen Waren ab.',
      'Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per E-Mail. Diese Eingangsbestätigung stellt noch keine Annahme des Angebots dar. Der Kaufvertrag kommt erst mit der ausdrücklichen Annahmeerklärung (Auftragsbestätigung) oder mit der Auslieferung der Ware zustande.',
      'Der Verkäufer behält sich vor, das Angebot nicht anzunehmen, insbesondere wenn die bestellte Ware nicht verfügbar ist oder die Anlieferung an der angegebenen Adresse technisch nicht möglich ist.',
    ],
  },
  {
    heading: '§ 3 Preise und Versandkosten',
    body: [
      'Alle Preisangaben verstehen sich als Endpreise. Gegenüber Verbrauchern werden die Preise inklusive der gesetzlichen Umsatzsteuer ausgewiesen; der Nettopreis wird zusätzlich angezeigt.',
      'Die Lieferpauschale richtet sich nach der Postleitzahl des Lieferorts und der Außenlänge des Containers. Sie wird im Bestellprozess vor Absenden der Bestellung gesondert ausgewiesen.',
      'Ab einem Nettowarenwert von 9.500 EUR erfolgt die Lieferung innerhalb Deutschlands versandkostenfrei.',
      'Ist zur Anlieferung ein Autokran erforderlich, weil die Stellfläche nicht direkt anfahrbar ist, teilt der Verkäufer die Mehrkosten vor Auftragsbestätigung mit. Der Kunde kann die Bestellung in diesem Fall kostenfrei stornieren.',
    ],
  },
  {
    heading: '§ 4 Zahlungsbedingungen',
    body: [
      'Es stehen die im Bestellprozess angegebenen Zahlungsarten zur Verfügung: Vorkasse per Überweisung, SEPA-Lastschrift sowie – für Unternehmer nach Bonitätsprüfung – Kauf auf Rechnung. Karten- und PayPal-Zahlungen bieten wir nicht an.',
      'Bei Vorkasse gewährt der Verkäufer 2 % Skonto. Der Rechnungsbetrag ist innerhalb von 7 Tagen nach Bestellbestätigung zu überweisen.',
      'Beim Kauf auf Rechnung ist der Rechnungsbetrag innerhalb von 14 Tagen nach Lieferung ohne Abzug fällig.',
      `Bankverbindung: ${bank.bankName}, IBAN ${bank.iban}, BIC ${bank.bic}, Kontoinhaber ${bank.accountHolder}.`,
      'Gerät der Kunde in Zahlungsverzug, ist der Verkäufer berechtigt, Verzugszinsen in gesetzlicher Höhe zu verlangen.',
    ],
  },
  {
    heading: '§ 5 Lieferung und Anlieferungsbedingungen',
    body: [
      'Die Lieferung erfolgt innerhalb Deutschlands an die vom Kunden angegebene Lieferadresse. Die angegebenen Lieferzeiten sind unverbindliche Richtwerte und beginnen mit Zahlungseingang bzw. bei Kauf auf Rechnung mit der Auftragsbestätigung.',
      'Der Kunde hat sicherzustellen, dass folgende Voraussetzungen am Lieferort erfüllt sind:',
      '- eine befestigte, tragfähige und ausreichend große Stellfläche',
      '- eine freie Zufahrt von mindestens 3,5 m Breite (bis 20 Fuß) bzw. 4,0 m (ab 40 Fuß)',
      '- eine hindernisfreie Durchfahrtshöhe von mindestens 4,2 m',
      '- ausreichend Rangier- und Arbeitsraum für das Absetzfahrzeug bzw. den Kran',
      '- die Anwesenheit einer weisungsberechtigten Person zum Liefertermin',
      'Kann die Lieferung aus Gründen, die der Kunde zu vertreten hat, nicht durchgeführt werden – insbesondere wegen unzureichender Zufahrt, nicht tragfähigen Untergrunds oder Abwesenheit –, trägt der Kunde die Kosten der Fehlanfahrt sowie einer erneuten Anlieferung.',
      'Der Verkäufer schuldet das Absetzen des Containers an der vereinbarten Stelle. Ein Verbringen auf das Grundstück über Hindernisse hinweg, das Herstellen eines Fundaments sowie behördliche Genehmigungen sind nicht Bestandteil der Leistung, sofern nicht ausdrücklich vereinbart.',
    ],
  },
  {
    heading: '§ 6 Eigentumsvorbehalt',
    body: [
      'Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers.',
      'Gegenüber Unternehmern behält sich der Verkäufer das Eigentum bis zur vollständigen Begleichung aller Forderungen aus der laufenden Geschäftsbeziehung vor. Der Unternehmer ist verpflichtet, die Ware pfleglich zu behandeln und den Verkäufer unverzüglich zu informieren, wenn Dritte auf die Ware zugreifen.',
    ],
  },
  {
    heading: '§ 7 Gewährleistung',
    body: [
      'Es gelten die gesetzlichen Gewährleistungsrechte.',
      'Gegenüber Unternehmern beträgt die Gewährleistungsfrist für gebrauchte Container ein Jahr ab Ablieferung.',
      'Bei gebrauchten Containern stellen alters- und gebrauchsbedingte Erscheinungen keinen Mangel dar. Dazu zählen insbesondere Kratzer, Dellen, Farbabweichungen, Ausbesserungslackierungen, Flugrost sowie Reparaturstellen aus dem Vorbetrieb, soweit die Wind- und Wasserdichtheit nicht beeinträchtigt ist.',
      'Der Kunde hat die Ware bei Anlieferung auf Transportschäden zu untersuchen und erkennbare Schäden auf dem Lieferschein zu vermerken. Unternehmer trifft darüber hinaus die Untersuchungs- und Rügepflicht nach § 377 HGB.',
    ],
  },
  {
    heading: '§ 8 Garantie',
    body: [
      'Zusätzlich zur gesetzlichen Gewährleistung gewährt der Verkäufer eine Garantie auf die Wind- und Wasserdichtheit mit folgenden Laufzeiten ab Ablieferung:',
      '- fabrikneue Container: 60 Monate',
      '- One-Trip-Container: 36 Monate',
      '- generalüberholte sowie ausgebaute Container: 24 Monate',
      '- gebrauchte Container: 12 Monate',
      'Die Garantie umfasst die Beseitigung von Undichtigkeiten durch Reparatur oder – nach Wahl des Verkäufers – den Austausch der Ware. Von der Garantie ausgenommen sind Schäden durch unsachgemäße Aufstellung (insbesondere nicht waagerechte Aufstellung), eigenmächtige bauliche Veränderungen, Gewalteinwirkung, höhere Gewalt sowie normale Abnutzung.',
      'Die gesetzlichen Gewährleistungsrechte des Kunden werden durch die Garantie nicht eingeschränkt.',
    ],
  },
  {
    heading: '§ 9 Haftung',
    body: [
      'Der Verkäufer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, bei Vorsatz und grober Fahrlässigkeit, bei arglistigem Verschweigen eines Mangels sowie nach dem Produkthaftungsgesetz.',
      'Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.',
      'Im Übrigen ist die Haftung ausgeschlossen.',
    ],
  },
  {
    heading: '§ 10 Genehmigungen und Aufstellung',
    body: [
      'Der Kunde ist allein dafür verantwortlich, die für die Aufstellung des Containers erforderlichen behördlichen Genehmigungen einzuholen. Dies betrifft insbesondere baurechtliche Genehmigungen nach der jeweiligen Landesbauordnung sowie Sondernutzungserlaubnisse bei Aufstellung auf öffentlichem Grund.',
      'Der Verkäufer erteilt hierzu allenfalls unverbindliche Hinweise und übernimmt keine Prüfung der Genehmigungsfähigkeit. Eine ausbleibende oder versagte Genehmigung berührt die Wirksamkeit des Kaufvertrags nicht.',
    ],
  },
  {
    heading: '§ 11 Schlussbestimmungen',
    body: [
      'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern gilt diese Rechtswahl nur, soweit dadurch der Schutz zwingender Verbraucherschutzvorschriften des Staates des gewöhnlichen Aufenthalts nicht entzogen wird.',
      'Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand der Sitz des Verkäufers.',
      'Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
    ],
  },
];

export const withdrawalSections: LegalSection[] = [
  {
    heading: 'Widerrufsrecht',
    body: [
      'Verbraucher haben ein vierzehntägiges Widerrufsrecht.',
      'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
      'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.',
      `Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${companyBlock}, Telefon: ${contact.phoneDisplay}, E-Mail: ${contact.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.`,
      'Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.',
    ],
  },
  {
    heading: 'Folgen des Widerrufs',
    body: [
      'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.',
      'Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.',
      'Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.',
      'Wir holen die Waren ab, da diese aufgrund ihrer Beschaffenheit nicht normal mit der Post zurückgesandt werden können.',
      'Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Da es sich um Speditionsware handelt, werden diese Kosten auf höchstens etwa 1.200 EUR geschätzt; die tatsächliche Höhe hängt von Entfernung, Containergröße und den Gegebenheiten am Abholort ab.',
      'Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.',
    ],
  },
  {
    heading: 'Ausschluss des Widerrufsrechts',
    body: [
      'Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB).',
      'Das betrifft insbesondere Container mit individueller RAL-Sonderlackierung sowie nach Kundenvorgabe umgebaute Container (Büro-, Sanitär-, Werkstatt- und Wohncontainer sowie sonstige Sonderanfertigungen).',
      'Auf diesen Ausschluss weisen wir vor Abschluss der Bestellung gesondert hin.',
    ],
  },
  {
    heading: 'Muster-Widerrufsformular',
    body: [
      'Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.',
      `An: ${companyBlock} · E-Mail: ${contact.email}`,
      'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):',
      'Bestellt am (*) / erhalten am (*):',
      'Name des/der Verbraucher(s):',
      'Anschrift des/der Verbraucher(s):',
      'Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):',
      'Datum:',
      '(*) Unzutreffendes streichen.',
    ],
  },
];

export const cookieSections: LegalSection[] = [
  {
    heading: 'Was sind Cookies?',
    body: [
      'Cookies sind kleine Textdateien, die eine Website auf Ihrem Endgerät speichert. Ähnlich funktioniert der lokale Browserspeicher (localStorage). Beide dienen dazu, Informationen zwischen Seitenaufrufen zu erhalten.',
      'Wir setzen diese Techniken sparsam ein und trennen strikt zwischen technisch notwendigen Funktionen und solchen, die Ihre Einwilligung erfordern.',
    ],
  },
  {
    heading: 'Technisch notwendige Speicherung',
    body: [
      'Diese Einträge sind für den Betrieb des Shops erforderlich und werden ohne Einwilligung gesetzt (§ 25 Abs. 2 Nr. 2 TTDSG):',
      '- emc.cart.v2 – Inhalt Ihres Warenkorbs, Speicherung im localStorage, unbegrenzt bis zur Löschung durch Sie',
      '- emc.wishlist.v1 – Ihr Merkzettel, Speicherung im localStorage, unbegrenzt bis zur Löschung durch Sie',
      '- emc.plz.v1 – Ihre Lieferpostleitzahl zur Berechnung der Lieferkosten, localStorage',
      '- emc.consent.v1 – Ihre Entscheidung im Cookie-Banner, localStorage, 12 Monate',
      'Diese Daten verbleiben ausschließlich in Ihrem Browser und werden nicht an uns übertragen, solange Sie keine Bestellung abschließen.',
    ],
  },
  {
    heading: 'Einwilligungspflichtige Dienste',
    body: [
      'Statistik- und Marketing-Dienste setzen wir ausschließlich nach Ihrer ausdrücklichen Einwilligung ein. Solange Sie nicht zugestimmt haben, werden diese Skripte nicht geladen und es werden keine entsprechenden Daten erhoben.',
      'Ebenfalls einwilligungspflichtig ist das Laden der Google-Maps-Karte auf unserer Kontaktseite. Ohne Zustimmung zeigen wir dort lediglich eine statische Vorschau mit unserer Adresse.',
    ],
  },
  {
    heading: 'Einwilligung widerrufen',
    body: [
      'Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Löschen Sie dazu die lokal gespeicherten Daten in Ihren Browsereinstellungen; beim nächsten Besuch erscheint das Auswahlfenster erneut.',
      'Alternativ können Sie das Setzen von Cookies in Ihrem Browser generell einschränken. Bitte beachten Sie, dass in diesem Fall Warenkorb und Merkzettel nicht mehr über den Seitenwechsel hinaus erhalten bleiben.',
    ],
  },
];
