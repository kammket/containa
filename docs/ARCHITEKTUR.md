# Architektur

Die Entscheidungen, die den Aufbau prägen – und die Gründe dafür.

---

## Katalog als eigenes Paket

**Entscheidung:** Produkte, Kategorien, Städte, Ratgeber, Preislogik und
SEO-Metadaten liegen in `packages/catalog` und werden von Storefront und API
gemeinsam genutzt.

**Warum:** Die Alternative wäre, alles in der Datenbank zu halten und die
Storefront bei jedem Aufruf abfragen zu lassen. Das hätte drei Nachteile: Jede
Seite bräuchte eine Datenbankabfrage im Auslieferungspfad, ein API-Ausfall
würde den gesamten Shop unsichtbar machen, und Inhalte mit SEO-Bezug wären
nicht versioniert.

**Wo der Katalog endet:** Produkte pflegt der Adminbereich in der Datenbank.
Der Katalog liefert für sie deshalb nur noch die Grundlage – Downloads,
Suchbegriffe, kuratierte Verweise – und den Notfallstand. Was die Storefront
tatsächlich zeigt, kommt aus der API (siehe „Produktdaten kommen live aus der
API"). Städte, Ratgeber und Rechtstexte bleiben ausschließlich im Katalog und
erfordern für eine Änderung weiterhin ein Deploy. Für Inhalte, die sich selten
ändern und SEO-relevant sind, ist das der richtige Kompromiss.

---

## Zwei Auslieferungsformen desselben Pakets

Das Katalogpaket wird doppelt bereitgestellt:

```jsonc
"exports": {
  ".": {
    // NestJS läuft als CommonJS und kann ESM nicht per require() laden
    "require": { "types": "./dist/cjs/index.d.ts", "default": "./dist/cjs/index.js" },
    // Next.js bekommt die Quelle – nötig für brauchbares Tree-Shaking
    "default": "./src/index.ts"
  }
}
```

Ohne die Quelle für den Bundler zieht ein einzelner Import den gesamten Katalog
ins Client-Bundle. Gemessen: 222 kB gegenüber 141 kB First Load JS.

---

## Warenkorb speichert Momentaufnahmen

**Entscheidung:** Der Warenkorb hält Name, Preis, Bild und Maße je Position –
keine Referenz in den Katalog.

**Warum zwei Gründe:**

1. **Bundle.** Würde der Warenkorb Produkte per Slug nachschlagen, müsste der
   vollständige Produktkatalog auf *jeder* Seite geladen werden, nur damit der
   Warenkorb Namen anzeigen kann.
2. **Korrektheit.** Es entspricht der üblichen Shop-Praxis: Der Preis wird beim
   Hinzufügen festgehalten. Verbindlich ist er trotzdem nicht – beim Checkout
   rechnet der Server aus der Datenbank neu.

---

## Preise ausschließlich serverseitig

`CreateOrderDto` akzeptiert **nur** SKU und Menge. Preisfelder in der Anfrage
werden von `forbidNonWhitelisted` abgewiesen, nicht etwa stillschweigend
ignoriert.

Der Server lädt die Produkte, prüft Verfügbarkeit und Bestand, berechnet
Zwischensumme, Rabatt, Lieferpauschale und Mehrwertsteuer neu und schreibt das
Ergebnis. Was der Browser gerechnet hat, ist reine Vorschau.

Beleg aus dem Abnahmetest:

```
POST /api/v1/orders  { "priceNet": 1, "totalGross": 1, … }
→ 400  "property priceNet should not exist"
```

---

## Alle Beträge als Cent-Ganzzahlen

Geld wird nirgends als Fließkommazahl geführt – weder in TypeScript noch in
Postgres. Preise sind `Int` in Cent, die Formatierung passiert erst in der
Darstellung. Das schließt Rundungsfehler aus, die sich bei Mehrwertsteuer und
Rabatten sonst summieren.

---

## Keine Kundenkonten

Bestellungen laufen als Gast-Checkout. Status und Rechnung ruft die Kundschaft
über Bestellnummer **und** E-Mail-Adresse ab.

**Warum:** Ein Container wird ein- bis zweimal im Leben gekauft. Ein Konto
brächte kaum Nutzen, aber zusätzliche Pflicht: Passwort-Zurücksetzen,
Kontolöschung nach DSGVO, Speicherung von Zugangsdaten. Der Verzicht entfernt
eine ganze Klasse von Angriffsflächen.

Die Zwei-Faktor-Abfrage (Nummer plus E-Mail) verhindert, dass sich fremde
Bestellungen durch Durchprobieren von Nummern einsehen lassen – geprüft im
Abnahmetest, Antwort ist 404.

---

## Adminbereich bewusst klein

Nur drei Aufgaben: Produkte, Bestellungen, Anfragen.

Was **nicht** im Adminbereich liegt: Rechtstexte, Städteseiten, Ratgeber,
Kategoriebeschreibungen, Preislogik. Diese Inhalte sind SEO-relevant und
gehören versioniert in den Code, wo sie überprüfbar sind und im Pull Request
diskutiert werden können. Eine CMS-Maske dafür würde die Qualitätskontrolle
umgehen, die der Katalogtest im CI leistet.

---

## Produktdaten kommen live aus der API

**Entscheidung:** Alles, was der Adminbereich pflegt – Preise, Bestand,
Verfügbarkeit, Texte, Maße, Fotos, Sichtbarkeit –, holt die Storefront über
`src/lib/live-catalog.ts` aus der API und legt es über den Katalogeintrag
desselben Slugs.

**Warum:** Ohne das ginge im Adminbereich zwar alles zu speichern, auf der
Seite erschiene aber nichts davon. Ein Shop, dessen Preispflege folgenlos
bleibt, ist schlimmer als einer ohne Adminbereich – dort weiß man wenigstens,
dass ein Deploy nötig ist.

Drei Eigenschaften machen das verträglich mit dem statischen Ansatz:

1. **Der Abruf wird zwischengespeichert.** Die Seiten bleiben statisch
   ausgeliefert und erneuern sich höchstens einmal pro Minute.
2. **Speichern wirkt sofort.** Nach jeder Produktänderung meldet die API das
   an `/api/revalidate` der Storefront; die betroffenen Seiten werden dann
   unmittelbar neu erzeugt statt nach Ablauf der Minute.
3. **Ausfall ändert nichts.** Antwortet die API nicht oder ist die Datenbank
   leer, rendert jede Seite aus dem statischen Katalog. Der Shop bleibt
   vollständig lesbar und crawlbar.

Produktseiten laufen deshalb mit `dynamicParams = true`: Ein im Adminbereich
neu angelegtes Produkt gab es zur Bauzeit noch nicht und würde sonst auf 404
laufen. Kategorie-, Städte-, Landing- und Ratgeberseiten bleiben bei
`dynamicParams = false` – ihre Slugs stehen im Katalog fest.

---

## Landingpages auf Root-Ebene

`/seecontainer-kaufen` statt `/landing/seecontainer-kaufen`, `/seecontainer-berlin`
statt `/standorte/berlin`. Kurze URLs mit dem Suchwort direkt hinter der Domain
sind für transaktionale Anfragen die stärkere Struktur.

Next.js unterstützt keine partiellen dynamischen Segmente – `seecontainer-[city]`
funktioniert nicht. Beide Seitentypen teilen sich deshalb eine `[slug]`-Route,
die anhand des Präfixes unterscheidet. Ein Test prüft, dass keine Landingpage
mit einer festen Route kollidiert.

---

## Fehlermeldungen auf Deutsch, Interna im Log

Der globale Exception-Filter wandelt jeden Fehler in eine verständliche
deutsche Meldung. Prisma-Fehlercodes, SQL und Stacktraces gehen ausschließlich
ins Log.

Das ist nicht nur Höflichkeit: Aus rohen Datenbankfehlern lassen sich
Tabellennamen, Spalten und Indizes ablesen.

---

## Was fehlt

Ehrlich benannt:

* **SEPA-Lastschrift erhebt kein Mandat.** Die Zahlungsart steht im Checkout,
  IBAN und Mandatsreferenz werden aber nicht abgefragt. Faktisch verhält sie
  sich wie eine Überweisung mit manueller Bestätigung im Adminbereich.
  Vorkasse und Rechnungskauf sind vollständig.
* **Kein Zahlungsanbieter angebunden.** Karten- und PayPal-Zahlung wurden
  bewusst entfernt: bei Warenwerten im vierstelligen Bereich fallen die
  Anbietergebühren spürbar ins Gewicht, und ohne Webhook-Endpunkt gibt es auch
  keinen Weg, eine Bestellung von außen fälschlich als bezahlt zu melden.
  Die Enumwerte `STRIPE` und `PAYPAL` bleiben im Datenmodell, damit
  Altbestellungen lesbar bleiben.
* **Kein Lighthouse-Nachweis.** Die Voraussetzungen sind da (statische Seiten,
  103 kB geteiltes JS, selbst ausgelieferte Schriften, keine Render-Blocker),
  gemessen wurde jedoch nicht.
* **Redis ist eingerichtet, aber ungenutzt.** Vorgesehen für Ratenbegrenzung
  über mehrere Instanzen hinweg; derzeit hält Nest die Zähler im Speicher.
