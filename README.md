# EMC Container

Onlineshop für Seecontainer – Storefront, REST-API und Adminbereich in einem
Monorepo. Vollständig auf Deutsch, ausgelegt auf organische Sichtbarkeit im
deutschen Markt.

---

## Überblick

| Teil | Verzeichnis | Stack | Ziel |
|---|---|---|---|
| Storefront | `apps/web` | Next.js 15, React 19, TypeScript, Tailwind 4 | Vercel |
| API | `apps/api` | NestJS 11, Prisma 6, PostgreSQL 17 | Railway |
| Katalog | `packages/catalog` | TypeScript | von beiden genutzt |

### Warum ein gemeinsames Katalogpaket

Produkte, Kategorien, Städte, Ratgeberinhalte, Preislogik und SEO-Metadaten
liegen in `packages/catalog` – nicht in der Datenbank und nicht doppelt.

* Die **Storefront** erzeugt daraus zur Bauzeit statische Seiten. Alle 128
  Seiten sind vorgerendert; es gibt keine Datenbankabfrage im Auslieferungspfad.
  Fällt die API aus, bleibt der gesamte Shop lesbar und crawlbar.
* Die **API** übernimmt denselben Katalog per Seed in die Datenbank und
  verwaltet ab dort die veränderlichen Teile: Bestand, Bestellungen, Anfragen.
* Beide teilen sich dieselbe **Preislogik** (`pricing.ts`). Der Betrag, den die
  Kundschaft im Warenkorb sieht, wird von exakt demselben Code berechnet, den
  der Server beim Anlegen der Bestellung erneut ausführt.

Das Paket wird zweifach ausgeliefert: als TypeScript-Quelle für den Bundler von
Next.js (gutes Tree-Shaking) und als CommonJS-Build für die NestJS-API.

---

## Schnellstart

Voraussetzungen: Node.js ≥ 20.11, Docker (oder ein lokaler PostgreSQL 16+).

```bash
git clone <repository-url> && cd containa
npm install

# 1. Datenbank starten
npm run docker:up

# 2. Konfiguration anlegen
cp apps/api/.env.example apps/api/.env.local
cp apps/web/.env.example apps/web/.env.local
# In apps/api/.env.local drei Geheimnisse setzen:
#   openssl rand -base64 48

# 3. Katalog bauen (die API bindet den CommonJS-Build ein)
npm run build --workspace=@emc/catalog

# 4. Schema anlegen und Katalog übernehmen
npm run db:migrate
npm run db:seed          # legt Administrator, 15 Kategorien, 26 Produkte an

# 5. Starten
npm run dev              # Storefront  → http://localhost:3000
npm run dev:api          # API         → http://localhost:4000
```

Ohne `ADMIN_PASSWORD` erzeugt der Seed ein Passwort und gibt es **einmalig** auf
der Konsole aus. Notieren Sie es – es lässt sich später nicht auslesen.

| Adresse | Inhalt |
|---|---|
| http://localhost:3000 | Storefront |
| http://localhost:3000/admin | Adminbereich |
| http://localhost:4000/api/docs | API-Dokumentation (Swagger) |
| http://localhost:4000/health | Health Check |

---

## Funktionsumfang

### Storefront

* 26 Produkte in 15 Kategorien, Filter nach Größe, Zustand, Verfügbarkeit und Preis
* Produktseiten mit Galerie und Lupe, Spezifikationstabelle, Lieferkostenrechner,
  Ratenrechner, FAQ, Bewertungen und verwandten Produkten
* Warenkorb und Merkzettel im Browser gespeichert (kein Konto nötig)
* Gast-Checkout mit Gutschein, Lieferkostenberechnung und Zahlungsartenwahl
* Sendungsverfolgung über Bestellnummer und E-Mail-Adresse
* Instant-Suche über Produkte, Kategorien, Städte und Ratgeber (⌘K)
* Ratgeber mit acht ausführlichen Fachbeiträgen
* Vollständige Rechtstexte: Impressum, Datenschutz, AGB, Widerruf, Cookies

### SEO

* Alle 128 Seiten statisch vorgerendert
* 20 Städteseiten (`/seecontainer-berlin` …) mit individuellem Text je Stadt –
  ein Test im CI stellt sicher, dass kein Duplicate Content entsteht
* 8 Landingpages für kaufstarke Suchbegriffe (`/seecontainer-kaufen`,
  `/container-preise` …)
* Strukturierte Daten als zusammenhängender `@graph`: Organization,
  LocalBusiness, WebSite, Product mit Offer und Versanddaten, BreadcrumbList,
  FAQPage, BlogPosting, CollectionPage
* XML-Sitemap inklusive Bildangaben, robots.txt, Canonicals, OpenGraph,
  Twitter Cards
* Automatische interne Verlinkung zwischen Produkten, Kategorien, Städten
  und Ratgeberbeiträgen

### API

* Öffentlich: Produktkatalog, Bestellung anlegen, Sendungsverfolgung,
  Kontakt- und Angebotsanfragen, Newsletter, Rechnungsdownload
* Adminbereich: Produktpflege inklusive Bildupload, Bestellübersicht mit
  Statuspflege, Anfragenbearbeitung
* Rechnungs-PDF mit fortlaufender Nummer nach GoBD
* Transaktionsmails auf Deutsch (Bestellbestätigung, Statusänderung,
  Anfragebestätigung, interne Benachrichtigung)
* Zahlung per Vorkasse, SEPA-Lastschrift oder Rechnung – der Zahlungseingang
  wird im Adminbereich bestätigt, kein externer Zahlungsanbieter

### Adminbereich

Bewusst auf drei Aufgaben begrenzt – Inhalte, Preise und Rechtstexte leben
versioniert im Code, nicht in einer Datenbankmaske:

1. **Produkte** – anlegen, bearbeiten, Bilder hochladen und sortieren,
   im Shop ein- und ausblenden
2. **Bestellungen** – Liste, Detailansicht, Statuspflege, Zahlungsbestätigung,
   Rechnungsdownload
3. **Anfragen** – Kontakt- und Angebotsanfragen mit Status und interner Notiz

Es gibt **keine Kundenkonten**: keine Registrierung, kein Login, kein
Passwort-Zurücksetzen. Bestellungen laufen als Gast-Checkout; den Status rufen
Kundinnen und Kunden über Bestellnummer und E-Mail ab.

---

## Sicherheit

| Maßnahme | Umsetzung |
|---|---|
| Preisberechnung | Ausschließlich serverseitig aus der Datenbank. Preisfelder in der Anfrage werden von der Validierung abgewiesen. |
| Passwörter | Argon2id. Bei unbekannter E-Mail läuft ein Dummy-Vergleich, damit die Antwortzeit keine Konten verrät. |
| Anmeldung | Sperre für 15 Minuten nach fünf Fehlversuchen, zusätzlich Ratenbegrenzung. |
| Sitzungen | Access-Token nur im Speicher, Refresh-Token als HttpOnly-Cookie. Tokens rotieren; ein wiederverwendetes Token beendet alle Sitzungen. |
| Eingaben | `class-validator` mit `forbidNonWhitelisted` – unbekannte Felder führen zur Ablehnung. |
| Uploads | Prüfung von MIME-Typ, Größe und Magic Bytes; Upload läuft serverseitig, das Cloudinary-Secret verlässt den Server nie. |
| Zahlungen | Kein Anbieter-Webhook vorhanden. Der Zahlungsstatus lässt sich ausschließlich authentifiziert aus dem Adminbereich setzen. |
| Fehlermeldungen | Nach außen verständliche deutsche Texte, keine Stacktraces oder Datenbankdetails. |
| HTTP-Header | Helmet, HSTS, `X-Content-Type-Options`, Referrer-Policy, restriktive Permissions-Policy. |
| Datenzugriff | Sendungsverfolgung und Rechnungsdownload erfordern Bestellnummer **und** E-Mail-Adresse. |

`npm audit` meldet über alle Workspaces hinweg **0 Schwachstellen**. Drei
transitive Pakete ohne nicht-brechenden Upstream-Fix (`postcss`, `sharp`,
`js-yaml`) werden über `overrides` in der Wurzel-`package.json` angehoben.

---

## Datenschutz

* Keine Statistik- oder Marketing-Skripte ohne Einwilligung. Das Cookie-Banner
  bietet Ablehnen und Zustimmen gleichwertig an.
* Google Maps wird erst nach ausdrücklicher Zustimmung geladen (Zwei-Klick).
  Vorher steht eine statische Vorschau mit Adresse.
* Schriften werden von `next/font` selbst ausgeliefert – keine Verbindung zu
  Google Fonts.
* Warenkorb und Merkzettel bleiben im Browser, bis eine Bestellung ausgelöst wird.
* Newsletter im Double-Opt-in-Verfahren mit protokollierter Einwilligung.

---

## Befehle

```bash
npm run dev              # Storefront (Port 3000)
npm run dev:api          # API (Port 4000)

npm run build            # Katalog + Storefront
npm run build:api        # Katalog + API

npm run typecheck        # alle Workspaces
npm test                 # Katalogtests (38 Prüfungen)
npm run format           # Prettier

npm run db:migrate       # Migration erzeugen und anwenden
npm run db:seed          # Katalog übernehmen, Administrator anlegen
npm run db:studio        # Prisma Studio
npm run db:reset         # Datenbank zurücksetzen (nur Entwicklung)

npm run docker:up        # PostgreSQL und Redis starten
npm run docker:down      # stoppen
```

---

## Projektstruktur

```
containa/
├── apps/
│   ├── web/                    Next.js 15 Storefront
│   │   ├── src/app/            App Router
│   │   │   ├── [slug]/         Städte- und Keyword-Landingpages
│   │   │   ├── admin/          Adminbereich
│   │   │   ├── container/      Kategorieseiten
│   │   │   ├── produkt/        Produktseiten
│   │   │   └── ratgeber/       Blog
│   │   ├── src/components/     UI, Commerce, Admin, Layout
│   │   ├── src/content/        Rechtstexte und Serviceinhalte
│   │   └── src/lib/            SEO, Schema.org, Warenkorb, API-Clients
│   │
│   └── api/                    NestJS REST-API
│       ├── prisma/             Schema, Migrationen, Seed
│       └── src/modules/        auth · products · orders · inquiries ·
│                               payments · invoices · uploads · mail
│
└── packages/
    └── catalog/                Gemeinsame Datenquelle
        └── src/                products · categories · cities · blog ·
                                pricing · seo · search
```

---

## Weiterführend

* [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) – Vercel, Railway, Domains, Zahlungsablauf
* [`docs/ARCHITEKTUR.md`](docs/ARCHITEKTUR.md) – Entwurfsentscheidungen und Begründungen
* [`docs/INHALTE-PFLEGEN.md`](docs/INHALTE-PFLEGEN.md) – Produkte, Städte und Ratgeber ergänzen

---

## Rechtlicher Hinweis

Die Rechtstexte in `apps/web/src/content/legal.ts` sind sorgfältig auf das
Geschäftsmodell zugeschnitten, ersetzen aber **keine anwaltliche Prüfung**. Vor
dem Livegang sollten AGB, Widerrufsbelehrung und Datenschutzerklärung von einer
fachkundigen Kanzlei freigegeben werden – insbesondere, weil die Rücksendung von
Speditionsware anderen Regeln folgt als bei üblichen Onlineshops.

Firmendaten (Anschrift, Handelsregister, USt-IdNr., Bankverbindung) in
`packages/catalog/src/brand.ts` sind Platzhalter und vor dem Livegang durch die
echten Angaben zu ersetzen.
