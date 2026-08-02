# Inhalte pflegen

Zwei Wege, je nachdem was geändert wird.

| Was | Wo | Wirkt |
|---|---|---|
| Produktpreise, Bestand, Fotos, Sichtbarkeit | Adminbereich | sofort |
| Neue Städteseite, Ratgeberbeitrag, Kategorie, Rechtstext | Code | nach Deploy |

Inhalte mit SEO-Bezug liegen bewusst im Code: Sie sind versioniert,
überprüfbar und lassen sich im Pull Request diskutieren. Der Katalogtest im CI
verhindert dabei typische Fehler – zu lange Meta-Descriptions, doppelte Texte,
Verweise auf nicht existierende Produkte.

---

## Produkt anlegen (Adminbereich)

1. `/admin/produkte` → **Neues Produkt**
2. Stammdaten ausfüllen. Der Slug bestimmt die URL und sollte das
   Hauptsuchwort enthalten – etwa `20-fuss-seecontainer-gebraucht-blau`.
3. Preis **netto in Euro** eingeben; das Formular zeigt den Bruttopreis an.
4. Außenlänge korrekt eintragen – sie bestimmt die Lieferpauschale.
5. Speichern, danach Bilder hochladen. Das erste Bild wird zum Titelbild;
   die Reihenfolge lässt sich mit den Pfeiltasten ändern.
6. Alt-Text je Bild vergeben. Er beschreibt das Bild für Screenreader und die
   Bildersuche – ohne Eingabe verwenden wir den Produktnamen.

---

## Neue Städteseite

`packages/catalog/src/cities.ts` erweitern:

```ts
{
  slug: 'wuppertal',
  name: 'Wuppertal',
  adjective: 'Wuppertaler',
  state: 'Nordrhein-Westfalen',
  postalPrefix: '42',
  population: 355000,
  lat: 51.2562, lng: 7.1508,
  distanceKm: 120,
  deliveryDays: [2, 4],
  hub: 'Güterbahnhof Wuppertal-Langerfeld',
  intro: [ /* mindestens drei individuelle Absätze */ ],
  useCases: [ /* drei lokale Anwendungsfälle */ ],
  districts: [ /* Stadtteile für Longtail-Abdeckung */ ],
  logisticsNote: '…',   // muss sich von allen anderen unterscheiden
  seo: { title: '…', description: '…', focusKeyword: 'Seecontainer Wuppertal' },
}
```

Die Seite entsteht automatisch unter `/seecontainer-wuppertal`, samt Sitemap,
Schema.org und Verlinkung im Footer.

**Wichtig:** `intro[0]` und `logisticsNote` müssen sich von allen anderen
Städten unterscheiden. Der Test `hat für jede Stadt individuellen Text`
schlägt sonst fehl – aus gutem Grund: Kopierte Städteseiten mit ausgetauschtem
Namen erkennt Google zuverlässig und wertet sie ab.

---

## Neuer Ratgeberbeitrag

`packages/catalog/src/blog.ts` erweitern. Der Text ist als Blockliste
strukturiert statt als Markdown – so lassen sich Tabellen, Aufzählungen und
Hinweiskästen einheitlich gestalten, und das Inhaltsverzeichnis entsteht
automatisch aus den `h2`-Blöcken.

```ts
body: [
  { type: 'p',  text: '…' },
  { type: 'h2', text: 'Abschnittsüberschrift' },
  { type: 'ul', items: ['…', '…'] },
  { type: 'table', head: ['Format', 'Volumen'], rows: [['20 Fuß', '33,2 m³']] },
  { type: 'callout', title: 'Faustregel', text: '…' },
]
```

`relatedProducts` und `relatedCategories` erzeugen die interne Verlinkung. Die
Slugs werden im CI gegen den Katalog geprüft.

---

## Preise und Lieferzonen

`packages/catalog/src/pricing.ts`:

* `deliveryZones` – Grundpreis, Längenzuschlag und Lieferzeit je PLZ-Leitregion
* `FREE_DELIVERY_THRESHOLD_NET` – Freigrenze für versandkostenfreie Lieferung
* `financingTerms` – Laufzeiten und Zinssätze des Ratenrechners
* `STANDARD_LENGTH_METERS` – Referenzlänge, ab der der Längenzuschlag greift

Änderungen wirken gleichzeitig in Storefront, Warenkorb und serverseitiger
Bestellberechnung – es gibt nur diese eine Quelle.

---

## Rechtstexte

`apps/web/src/content/legal.ts`. Nach jeder inhaltlichen Änderung
`LEGAL_UPDATED_AT` anpassen – das Datum steht sichtbar über dem Text.

---

## Nach jeder Katalogänderung

```bash
npm test --workspace=@emc/catalog   # 38 Prüfungen
npm run build --workspace=@emc/catalog
npm run build --workspace=@emc/web
```

Die Tests prüfen unter anderem: eindeutige Slugs und SKUs, gültige
Kategoriereferenzen, plausible Preise, Länge aller SEO-Metadaten, Kollisionen
zwischen Landingpages und festen Routen sowie Duplicate Content in den
Städtetexten.
