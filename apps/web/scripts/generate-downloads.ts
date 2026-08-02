/**
 * Erzeugt die PDF-Dokumente unter public/downloads.
 *
 * Die Produkt- und Downloadseiten verlinken neun Dateien. Fehlen sie, liefert
 * jeder Klick einen 404 – die Seite sieht vollständig aus, ist es aber nicht.
 *
 * Zwei Dokumente stammen unmittelbar aus den Rechtstexten der Website (AGB und
 * Muster-Widerrufsformular). Sie werden hier aus derselben Quelle erzeugt, aus
 * der auch die HTML-Seiten entstehen. Damit können PDF und Website nicht
 * auseinanderlaufen – ein Fehler, der sonst erst auffällt, wenn sich jemand auf
 * die veraltete Fassung beruft.
 *
 * Aufruf: npm run downloads --workspace=@emc/web
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import PDFDocument from 'pdfkit';

import { address, bank, brand, contact, legal, products } from '@emc/catalog';

import { termsSections, withdrawalSections, LEGAL_UPDATED_AT } from '../src/content/legal.ts';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'downloads');

const NAVY = '#0f2038';
const ORANGE = '#e8590c';
const GREY = '#6b7280';

type Block =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'checklist'; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'spacer' };

/** Kopf- und Fußzeile, Seitenzahlen, Ränder – für alle Dokumente identisch. */
function render(fileName: string, title: string, subtitle: string, blocks: Block[]) {
  const doc = new PDFDocument({ size: 'A4', margin: 56, bufferPages: true });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));

  const left = doc.page.margins.left;
  const right = doc.page.width - doc.page.margins.right;
  const width = right - left;

  // ── Titelkopf ──────────────────────────────────────────────────────────────
  doc.rect(0, 0, doc.page.width, 104).fill(NAVY);
  doc
    .fillColor('#ffffff')
    .font('Helvetica-Bold')
    .fontSize(20)
    .text(brand.name.toUpperCase(), left, 30);
  doc
    .fillColor(ORANGE)
    .font('Helvetica-Bold')
    .fontSize(9)
    .text(brand.claim, left, 56, { width: doc.page.width - left * 2, lineBreak: false });
  doc
    .fillColor('#ffffff')
    .font('Helvetica')
    .fontSize(8)
    .text(`${contact.phoneDisplay}  ·  ${contact.email}  ·  ${brand.url}`, left, 74);

  doc.y = 132;
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(17).text(title, left, doc.y);
  doc.moveDown(0.2);
  doc.fillColor(GREY).font('Helvetica').fontSize(9.5).text(subtitle, { width });
  doc.moveDown(1);

  const ensureSpace = (needed: number) => {
    if (doc.y + needed > doc.page.height - 92) doc.addPage();
  };

  for (const block of blocks) {
    // Nach Tabellenzellen steht doc.x auf einer Spaltenposition. Ohne diesen
    // Rücksprung würde die nächste Überschrift eingerückt bzw. rechtsbündig
    // erscheinen, weil pdfkit die aktuelle x-Position weiterverwendet.
    doc.x = left;

    switch (block.type) {
      case 'heading':
        ensureSpace(46);
        doc.moveDown(0.7);
        doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(12.5).text(block.text, { width });
        doc.moveDown(0.3);
        break;

      case 'subheading':
        ensureSpace(32);
        doc.moveDown(0.4);
        doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(10.5).text(block.text, { width });
        doc.moveDown(0.2);
        break;

      case 'text':
        ensureSpace(30);
        doc
          .fillColor('#1f2937')
          .font('Helvetica')
          .fontSize(9.5)
          .text(block.text, { width, align: 'left', lineGap: 2.5 });
        doc.moveDown(0.4);
        break;

      case 'bullets':
        for (const item of block.items) {
          ensureSpace(24);
          const y = doc.y;
          doc.circle(left + 3, y + 5, 1.8).fill(ORANGE);
          doc
            .fillColor('#1f2937')
            .font('Helvetica')
            .fontSize(9.5)
            .text(item, left + 14, y, { width: width - 14, lineGap: 2 });
          doc.moveDown(0.25);
        }
        doc.moveDown(0.3);
        break;

      case 'checklist':
        for (const item of block.items) {
          ensureSpace(26);
          const y = doc.y;
          doc
            .rect(left, y + 1, 9, 9)
            .lineWidth(1)
            .strokeColor(NAVY)
            .stroke();
          doc
            .fillColor('#1f2937')
            .font('Helvetica')
            .fontSize(9.5)
            .text(item, left + 18, y, { width: width - 18, lineGap: 2 });
          doc.moveDown(0.45);
        }
        doc.moveDown(0.3);
        break;

      case 'table': {
        const colW = width / block.columns.length;
        ensureSpace(40 + block.rows.length * 18);
        let y = doc.y;
        doc.rect(left, y, width, 20).fill(NAVY);
        block.columns.forEach((c, i) => {
          doc
            .fillColor('#ffffff')
            .font('Helvetica-Bold')
            .fontSize(8.5)
            .text(c, left + 6 + i * colW, y + 6, { width: colW - 12 });
        });
        y += 20;
        doc.font('Helvetica').fontSize(8.5);
        block.rows.forEach((row, ri) => {
          // Zeilenhöhe aus dem höchsten Feld ableiten. Eine feste Höhe schnitt
          // längere Produktnamen ab, die auf zwei Zeilen umbrechen.
          const cellHeight = Math.max(
            ...row.map((cell) => doc.heightOfString(cell, { width: colW - 12 })),
          );
          const rowH = Math.max(18, cellHeight + 10);

          if (y + rowH > doc.page.height - 92) {
            doc.addPage();
            y = doc.page.margins.top;
          }
          if (ri % 2 === 1) doc.rect(left, y, width, rowH).fill('#f4f5f7');
          row.forEach((cell, i) => {
            doc
              .fillColor('#1f2937')
              .font('Helvetica')
              .fontSize(8.5)
              .text(cell, left + 6 + i * colW, y + 5, { width: colW - 12 });
          });
          y += rowH;
        });
        doc.x = left;
        doc.y = y + 8;
        break;
      }

      case 'spacer':
        doc.moveDown(0.8);
        break;
    }
  }

  // ── Fußzeile auf jeder Seite ───────────────────────────────────────────────
  // Der Seitenbereich wird einmal vor der Schleife gelesen. Entscheidend ist
  // außerdem der untere Rand: Die Fußzeile steht unterhalb davon, und pdfkit
  // hängt beim Schreiben unterhalb des Randes automatisch eine neue Seite an.
  // Genau das erzeugte zuvor in jedem Dokument leere Folgeseiten.
  const range = doc.bufferedPageRange();
  const pageCount = range.count;
  for (let i = 0; i < pageCount; i += 1) {
    doc.switchToPage(range.start + i);
    const bottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    const y = doc.page.height - 62;
    doc.moveTo(left, y).lineTo(right, y).lineWidth(0.6).strokeColor('#d4d4d8').stroke();
    doc
      .fillColor(GREY)
      .font('Helvetica')
      .fontSize(7.5)
      .text(
        `${brand.legalName} · ${address.street} · ${address.postalCode} ${address.city} · ` +
          `${legal.registerCourt} ${legal.registerNumber} · USt-IdNr. ${legal.vatId}`,
        left,
        y + 8,
        { width, lineBreak: false },
      );
    doc.text(`Stand: ${LEGAL_UPDATED_AT}`, left, y + 20, { width: width / 2, lineBreak: false });
    doc.text(`Seite ${i + 1} von ${pageCount}`, left, y + 20, {
      width,
      align: 'right',
      lineBreak: false,
    });
    doc.page.margins.bottom = bottomMargin;
  }

  doc.end();
  return new Promise<void>((resolve) => {
    doc.on('end', () => {
      const buf = Buffer.concat(chunks);
      writeFileSync(join(OUT_DIR, fileName), buf);
      console.log(`  ✓ ${fileName.padEnd(38)} ${(buf.length / 1024).toFixed(0)} KB`);
      resolve();
    });
  });
}

/** Wandelt die Abschnitte der Rechtstexte in Blöcke um. */
function fromLegal(sections: { heading: string; body: string[] }[]): Block[] {
  return sections.flatMap((s) => [
    { type: 'heading', text: s.heading } as Block,
    ...s.body.map((t) => ({ type: 'text', text: t }) as Block),
  ]);
}

/** Maßtabelle aus den echten Katalogdaten – keine doppelte Pflege. */
function dimensionRows(filter: (slug: string) => boolean) {
  return products
    .filter((p) => p.size !== 'sonder' && filter(p.slug))
    .slice(0, 14)
    .map((p) => [
      p.name.replace(/ – .*/, ''),
      `${p.specs.exterior.length} × ${p.specs.exterior.width} × ${p.specs.exterior.height}`,
      p.specs.interior
        ? `${p.specs.interior.length} × ${p.specs.interior.width} × ${p.specs.interior.height}`
        : '–',
      p.specs.tareWeight ? `${p.specs.tareWeight} kg` : '–',
    ]);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log('Erzeuge PDF-Dokumente …\n');

  const dimHeader = ['Typ', 'Außen L × B × H (mm)', 'Innen L × B × H (mm)', 'Leergewicht'];

  await render(
    'emc-massblatt-seecontainer.pdf',
    'Maßblatt – alle Containergrößen',
    'Außen- und Innenmaße, Leergewichte und Türöffnungen unserer Standardcontainer.',
    [
      {
        type: 'text',
        text:
          'Alle Angaben sind Nennmaße nach ISO 668 und ISO 1496. Fertigungsbedingte ' +
          'Abweichungen von wenigen Millimetern sind branchenüblich. Planen Sie bei ' +
          'Einbauten und Zufahrten stets eine Toleranz von mindestens 50 mm ein.',
      },
      { type: 'heading', text: 'Übersicht' },
      { type: 'table', columns: dimHeader, rows: dimensionRows(() => true) },
      { type: 'heading', text: 'Hinweise zur Planung' },
      {
        type: 'bullets',
        items: [
          'Für die Anlieferung per LKW werden mindestens 3,50 m Durchfahrtsbreite benötigt.',
          'Der Stellplatz muss tragfähig, eben und frei von Hindernissen sein.',
          'High-Cube-Container sind 300 mm höher als Standardcontainer – Durchfahrtshöhen prüfen.',
          'Türöffnungen sind rund 60 mm schmaler als das Innenmaß der Stirnseite.',
        ],
      },
    ],
  );

  await render(
    'emc-zeichnung-20ft.pdf',
    'Technische Zeichnung – 20 Fuß Standardcontainer',
    'Bemaßte Ansichten, Innenmaße und Türöffnung des 20-Fuß-Containers.',
    [
      { type: 'heading', text: 'Maße' },
      { type: 'table', columns: dimHeader, rows: dimensionRows((s) => s.startsWith('20-fuss')) },
      { type: 'heading', text: 'Konstruktion' },
      {
        type: 'bullets',
        items: [
          'Rahmen aus Corten-Stahl, Wände als Trapezblech (Wellblechprofil).',
          'Boden: 28 mm Sperrholz auf Querträgern, punktbelastbar bis rund 5.000 kg/m².',
          'Doppelflügeltür an der Stirnseite mit vier Verriegelungsstangen und Gummidichtung.',
          'Vier Eckbeschläge nach ISO 1161 für Kran- und Staplerhandling.',
          'Belüftungsöffnungen an den Längsseiten oberhalb der Mittellinie.',
        ],
      },
      { type: 'heading', text: 'Belastung und Stapelung' },
      {
        type: 'bullets',
        items: [
          'Zulässige Stapelung: bis zu sechs beladene Einheiten (CSC-geprüft).',
          'Anschlagpunkte ausschließlich an den Eckbeschlägen verwenden.',
          'Für ebene Lastverteilung Fundamentblöcke unter allen vier Ecken setzen.',
        ],
      },
    ],
  );

  await render(
    'emc-zeichnung-40ft-hc.pdf',
    'Technische Zeichnung – 40 Fuß High Cube',
    'Bemaßte Ansichten, Innenmaße und Türöffnung des 40-Fuß-High-Cube-Containers.',
    [
      { type: 'heading', text: 'Maße' },
      { type: 'table', columns: dimHeader, rows: dimensionRows((s) => s.startsWith('40-fuss')) },
      { type: 'heading', text: 'Besonderheiten des High Cube' },
      {
        type: 'bullets',
        items: [
          'Die Außenhöhe beträgt 2.896 mm statt 2.591 mm beim Standardcontainer.',
          'Die zusätzliche Höhe erleichtert Regalsysteme und den Einbau von Zwischendecken.',
          'Durchfahrten und Tore am Zielort auf mindestens 3,10 m lichte Höhe prüfen.',
          'Für den Transport ist ein Tieflader erforderlich, kein Standardfahrzeug.',
        ],
      },
      { type: 'heading', text: 'Anlieferung' },
      {
        type: 'bullets',
        items: [
          'Benötigte Stellfläche für das Absetzen: rund 18 m Länge und 4 m Breite.',
          'Der Kranausleger benötigt zusätzlich freien Raum nach oben.',
          'Die Zufahrt muss für ein Gesamtgewicht von bis zu 40 t ausgelegt sein.',
        ],
      },
    ],
  );

  await render(
    'emc-checkliste-anlieferung.pdf',
    'Checkliste – Stellplatz und Anlieferung',
    'Zum Ausdrucken und Abhaken. Prüfen Sie diese Punkte vor dem Liefertermin.',
    [
      {
        type: 'text',
        text:
          'Die meisten Verzögerungen am Liefertag entstehen nicht am Container, sondern ' +
          'am Stellplatz. Wer diese Liste vorab durchgeht, spart im Zweifel eine ' +
          'kostenpflichtige zweite Anfahrt.',
      },
      { type: 'heading', text: 'Zufahrt' },
      {
        type: 'checklist',
        items: [
          'Durchfahrtsbreite mindestens 3,50 m auf der gesamten Strecke.',
          'Durchfahrtshöhe mindestens 4,00 m, bei High Cube mindestens 4,50 m.',
          'Kurvenradien für einen Sattelzug ausreichend (Wendekreis rund 12 m).',
          'Keine Gewichtsbeschränkung auf Brücken oder Zufahrtswegen.',
          'Tiefgaragen, Bahnübergänge und enge Ortsdurchfahrten geprüft.',
          'Falls nötig: Halteverbotszone rechtzeitig bei der Gemeinde beantragt.',
        ],
      },
      { type: 'heading', text: 'Stellplatz' },
      {
        type: 'checklist',
        items: [
          'Untergrund tragfähig und eben (Schotter, Beton oder verdichteter Boden).',
          'Fundamentblöcke oder Betonplatten unter allen vier Eckbeschlägen vorbereitet.',
          'Mindestens 1 m Freiraum ringsum für Montage und spätere Wartung.',
          'Türseite frei zugänglich, Öffnungsbereich der Flügeltüren beachtet.',
          'Keine Leitungen, Schächte oder Kanäle unter der Stellfläche.',
          'Gefälle unter 2 % – sonst staut sich Wasser an der Türseite.',
        ],
      },
      { type: 'heading', text: 'Kranstellung' },
      {
        type: 'checklist',
        items: [
          'Freier Luftraum über dem Stellplatz, keine Freileitungen oder Äste.',
          'Standfläche für die Kranabstützung befestigt und ausreichend groß.',
          'Abstand zwischen LKW-Standplatz und Stellplatz höchstens 8 m.',
          'Ansprechpartner am Liefertag vor Ort und telefonisch erreichbar.',
        ],
      },
      { type: 'heading', text: 'Am Liefertag' },
      {
        type: 'checklist',
        items: [
          'Container vor Abfahrt des Fahrzeugs auf Transportschäden prüfen.',
          'Türen öffnen und schließen, Dichtungen und Verriegelung testen.',
          'Schäden sofort auf dem Lieferschein vermerken und fotografieren.',
          'Lieferschein erst nach der Sichtprüfung unterschreiben.',
        ],
      },
    ],
  );

  await render(
    'emc-leitfaden-kondenswasser.pdf',
    'Leitfaden – Kondenswasser vermeiden',
    'Warum es im Container regnet und was zuverlässig dagegen hilft.',
    [
      { type: 'heading', text: 'Wie Kondenswasser entsteht' },
      {
        type: 'text',
        text:
          'Ein Stahlcontainer kühlt nachts schneller aus als die Luft in seinem Inneren. ' +
          'Trifft warme, feuchte Luft auf die kalte Decke, fällt sie unter den Taupunkt und ' +
          'der Wasserdampf schlägt sich nieder. Das Ergebnis tropft von oben und wird ' +
          'gern für ein undichtes Dach gehalten – tatsächlich ist der Container dicht.',
      },
      { type: 'heading', text: 'Die drei wirksamen Maßnahmen' },
      { type: 'subheading', text: '1. Belüftung' },
      {
        type: 'text',
        text:
          'Belüftungsgitter an beiden Längsseiten erzeugen einen ständigen Luftaustausch. ' +
          'Wichtig ist die diagonale Anordnung: je ein Gitter oben und eines auf der ' +
          'gegenüberliegenden Seite unten. Ohne Querschnitt entsteht keine Strömung.',
      },
      { type: 'subheading', text: '2. Isolierung' },
      {
        type: 'text',
        text:
          'Eine Dämmung der Decke verhindert, dass die Stahlfläche unter den Taupunkt ' +
          'abkühlt. Sie ist die einzige Maßnahme, die das Problem an der Ursache löst – ' +
          'und die einzige, die bei sensibler Lagerware wirklich zu empfehlen ist.',
      },
      { type: 'subheading', text: '3. Luftentfeuchter' },
      {
        type: 'text',
        text:
          'Granulatentfeuchter binden Restfeuchte und sind als Ergänzung sinnvoll, nicht ' +
          'als Ersatz. Rechnen Sie mit rund einem Beutel je 10 m² und einem Wechsel alle ' +
          'zwei bis drei Monate, im Winter häufiger.',
      },
      { type: 'heading', text: 'Was nicht hilft' },
      {
        type: 'bullets',
        items: [
          'Türen gelegentlich öffnen: bringt kurzfristig frische, oft ebenso feuchte Luft.',
          'Planen über dem Container: verhindert die Abstrahlung nicht, staut Feuchte darunter.',
          'Heizen ohne Belüftung: erhöht die Aufnahmefähigkeit der Luft und verlagert das Problem.',
        ],
      },
      { type: 'heading', text: 'Faustregel' },
      {
        type: 'text',
        text:
          'Trockene Lagerware wie Werkzeug oder Möbel: Belüftung plus Entfeuchter genügt. ' +
          'Feuchteempfindliche Güter, Elektronik oder Aktenlagerung: Decke dämmen.',
      },
    ],
  );

  await render(
    'emc-uebersicht-baugenehmigung.pdf',
    'Übersicht – Baugenehmigung nach Bundesland',
    'Wann ein Container genehmigungsfrei aufgestellt werden darf. Ohne Gewähr.',
    [
      {
        type: 'text',
        text:
          'Baurecht ist Ländersache. Ob ein Container eine Genehmigung braucht, hängt ' +
          'vom Bundesland, vom umbauten Raum, von der Nutzung und von der Aufstelldauer ' +
          'ab. Die folgenden Werte sind Anhaltspunkte aus den Landesbauordnungen für ' +
          'verfahrensfreie Vorhaben im Außenbereich eines Grundstücks.',
      },
      {
        type: 'table',
        columns: ['Bundesland', 'Verfahrensfrei bis', 'Anmerkung'],
        rows: [
          ['Baden-Württemberg', '40 m³', 'nicht im Außenbereich'],
          ['Bayern', '75 m³', 'nicht im Außenbereich'],
          ['Berlin', '10 m³', 'im Außenbereich abweichend'],
          ['Brandenburg', '75 m³', 'ohne Aufenthaltsraum'],
          ['Bremen', '30 m³', 'ohne Feuerstätte'],
          ['Hamburg', '30 m³', 'ohne Aufenthaltsraum'],
          ['Hessen', '30 m³', 'nicht im Außenbereich'],
          ['Mecklenburg-Vorpommern', '10 m³', 'im Innenbereich'],
          ['Niedersachsen', '40 m³', 'ohne Aufenthaltsraum'],
          ['Nordrhein-Westfalen', '30 m³', 'nicht im Außenbereich'],
          ['Rheinland-Pfalz', '50 m³', 'ohne Aufenthaltsraum'],
          ['Saarland', '10 m³', 'im Innenbereich'],
          ['Sachsen', '10 m³', 'ohne Aufenthaltsraum'],
          ['Sachsen-Anhalt', '10 m³', 'ohne Aufenthaltsraum'],
          ['Schleswig-Holstein', '30 m³', 'nicht im Außenbereich'],
          ['Thüringen', '10 m³', 'ohne Aufenthaltsraum'],
        ],
      },
      { type: 'heading', text: 'Zur Einordnung' },
      {
        type: 'bullets',
        items: [
          'Ein 20-Fuß-Container umbaut rund 33 m³, ein 40-Fuß-High-Cube rund 76 m³.',
          'Wird der Container als Aufenthaltsraum, Büro oder Werkstatt genutzt, entfällt die Verfahrensfreiheit in der Regel.',
          'Im Außenbereich nach § 35 BauGB gelten durchweg strengere Regeln.',
          'Eine rein vorübergehende Aufstellung auf einer Baustelle ist meist unkritisch.',
        ],
      },
      { type: 'heading', text: 'Empfehlung' },
      {
        type: 'text',
        text:
          'Diese Übersicht ersetzt keine Auskunft der Bauaufsicht. Ein kurzer Anruf beim ' +
          'zuständigen Bauamt kostet nichts und schafft Klarheit – anders als ein ' +
          'nachträglicher Rückbau.',
      },
    ],
  );

  await render(
    'emc-garantiebedingungen.pdf',
    'Garantiebedingungen',
    'Umfang, Laufzeiten und Ausschlüsse unserer Garantieleistungen.',
    [
      {
        type: 'text',
        text:
          `Zusätzlich zur gesetzlichen Gewährleistung gewährt ${brand.legalName} auf ` +
          'bestimmte Container eine Garantie. Die gesetzlichen Rechte der Kundschaft ' +
          'werden dadurch nicht eingeschränkt.',
      },
      { type: 'heading', text: 'Laufzeiten' },
      {
        type: 'table',
        columns: ['Zustand', 'Garantie', 'Umfang'],
        rows: [
          ['Neu / One-Trip', '60 Monate', 'Wind- und Wasserdichtheit, Rahmen, Türmechanik'],
          ['Generalüberholt', '24 Monate', 'Wind- und Wasserdichtheit, Türmechanik'],
          ['Gebraucht (WWT)', '12 Monate', 'Wind- und Wasserdichtheit'],
          ['Zubehör', '24 Monate', 'Material- und Verarbeitungsfehler'],
        ],
      },
      { type: 'heading', text: 'Was die Garantie umfasst' },
      {
        type: 'bullets',
        items: [
          'Durchrostungen der Wand-, Dach- und Bodenbleche.',
          'Undichtigkeiten an Dach, Wänden und Türdichtungen.',
          'Verzug oder Bruch tragender Rahmenteile bei bestimmungsgemäßer Nutzung.',
          'Funktionsstörungen der Verriegelungsstangen und Scharniere.',
        ],
      },
      { type: 'heading', text: 'Was ausgeschlossen ist' },
      {
        type: 'bullets',
        items: [
          'Oberflächlicher Flugrost und optische Alterung der Lackierung.',
          'Kondenswasserbildung im Innenraum (siehe Leitfaden Kondenswasser).',
          'Schäden durch Überladung, unsachgemäßes Anschlagen oder Stapeln.',
          'Schäden durch nachträgliche Umbauten, Bohrungen oder Schweißarbeiten.',
          'Sturm, Hochwasser, Vandalismus und andere äußere Einwirkungen.',
          'Container, die ohne Fundament auf unbefestigtem Untergrund stehen.',
        ],
      },
      { type: 'heading', text: 'Geltendmachung' },
      {
        type: 'text',
        text:
          `Melden Sie einen Garantiefall unter ${contact.email} mit Bestellnummer, ` +
          'Beschreibung und aussagekräftigen Fotos. Wir entscheiden nach Prüfung über ' +
          'Nachbesserung, Ersatzlieferung oder Erstattung. Die Garantie ist an den ' +
          'Container gebunden und geht bei Weiterverkauf auf den neuen Eigentümer über.',
      },
    ],
  );

  await render(
    'emc-agb.pdf',
    'Allgemeine Geschäftsbedingungen',
    `${brand.legalName} · Stand ${LEGAL_UPDATED_AT}`,
    fromLegal(termsSections),
  );

  await render(
    'emc-widerrufsformular.pdf',
    'Muster-Widerrufsformular',
    'Nur ausfüllen und zurücksenden, wenn Sie den Vertrag widerrufen wollen.',
    [
      ...fromLegal(withdrawalSections.slice(-1)),
      { type: 'spacer' },
      { type: 'heading', text: 'An' },
      {
        type: 'text',
        text:
          `${brand.legalName}\n${address.street}\n${address.postalCode} ${address.city}\n` +
          `E-Mail: ${contact.email}`,
      },
      { type: 'spacer' },
      {
        type: 'text',
        text:
          'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag ' +
          'über den Kauf der folgenden Waren:',
      },
      {
        type: 'checklist',
        items: [
          'Bestellt am / erhalten am: ______________________________________________',
          'Bestellnummer: __________________________________________________________',
          'Name der/des Verbraucher(s): ____________________________________________',
          'Anschrift: ______________________________________________________________',
          'IBAN für die Rückzahlung: _______________________________________________',
          'Datum und Unterschrift (nur bei Mitteilung auf Papier): _________________',
        ],
      },
      { type: 'spacer' },
      { type: 'text', text: '(*) Unzutreffendes streichen.' },
      { type: 'heading', text: 'Rückzahlung' },
      {
        type: 'text',
        text:
          `Die Rückzahlung erfolgt auf das von Ihnen angegebene Konto. Bankverbindung ` +
          `für Rückfragen: ${bank.bankName}, IBAN ${bank.iban}.`,
      },
    ],
  );

  console.log('\nFertig.');
}

main().catch((error) => {
  console.error('Fehler beim Erzeugen der PDFs:', error);
  process.exit(1);
});
