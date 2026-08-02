# Deployment

Storefront auf Vercel, API und Datenbank auf Railway. Beide lassen sich in
etwa einer Stunde einrichten.

Die Build-Einstellungen beider Plattformen liegen als Datei im Repository –
[`vercel.json`](../vercel.json) und [`railway.json`](../railway.json). Was dort
steht, muss im Dashboard **nicht** noch einmal eingetragen werden.

---

## 0. Vorbereitung

Vor dem ersten Deploy einmalig erledigen – beides betrifft Inhalte, die später
in jeder ausgelieferten Seite stehen:

1. **Firmendaten eintragen.** `packages/catalog/src/brand.ts` enthält Anschrift,
   Handelsregister, USt-IdNr., Bankverbindung und Geschäftsführung. Die dortigen
   Werte erscheinen im Impressum, in den Rechnungen und in der
   JSON-LD-Auszeichnung.
2. **Domain festlegen.** `brand.url` in derselben Datei ist die Grundlage aller
   kanonischen URLs, der Sitemap und der OpenGraph-Tags. Weicht der Wert von der
   tatsächlichen Domain ab, verweist die Seite auf sich selbst unter falscher
   Adresse – ein SEO-Fehler, der schwer zu bemerken ist.

Drei Geheimnisse erzeugen, jeweils einzeln aufrufen und getrennt notieren:

```bash
openssl rand -base64 48   # JWT_SECRET
openssl rand -base64 48   # JWT_REFRESH_SECRET
openssl rand -base64 48   # COOKIE_SECRET
```

---

## 1. Datenbank und API auf Railway

### 1.1 Projekt anlegen

1. Auf [railway.app](https://railway.app) ein neues Projekt anlegen und das
   GitHub-Repository verbinden.
2. **Add Service → Database → PostgreSQL**. Railway setzt `DATABASE_URL`
   automatisch als Referenzvariable.
3. **Add Service → GitHub Repo** für die API. Unter *Settings*:
   * **Root Directory**: leer lassen (das Dockerfile arbeitet vom Monorepo-Root)
   * **Config as code**: `railway.json`

`railway.json` legt Builder, Dockerfile-Pfad, Startbefehl, Health Check auf
`/health` und die Neustartregel fest. Dockerfile-Pfad und Health Check daher
nicht zusätzlich im Dashboard setzen – doppelte Angaben führen dort zu
Verwirrung, wenn sie einmal auseinanderlaufen.

### 1.2 Umgebungsvariablen

Unter *Variables* setzen – die drei Geheimnisse stammen aus Abschnitt 0:

```bash
NODE_ENV=production
PORT=4000

DATABASE_URL=${{Postgres.DATABASE_URL}}   # Referenz auf den Datenbankdienst

JWT_SECRET=<erstes Geheimnis>
JWT_REFRESH_SECRET=<zweites Geheimnis>
COOKIE_SECRET=<drittes Geheimnis>
JWT_EXPIRES_IN=15m

# Ohne exakte Übereinstimmung schlägt die Anmeldung im Adminbereich fehl,
# weil das Refresh-Cookie nicht gesetzt wird.
CORS_ORIGINS=https://emccontainer.com,https://www.emccontainer.com
APP_URL=https://emccontainer.com

ENABLE_SWAGGER=false
```

Die Anwendung **startet nicht**, wenn ein Pflichtwert fehlt oder ein Geheimnis
kürzer als 32 Zeichen ist. Das ist Absicht – ein Abbruch beim Start ist deutlich
besser als ein laufender Dienst mit schwacher Konfiguration.

### 1.3 Optionale Dienste

```bash
# Cloudinary – ohne diese Werte ist der Bildupload deaktiviert
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# SMTP – ohne SMTP_HOST werden E-Mails nur protokolliert
SMTP_HOST=smtp.ihr-anbieter.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASSWORD=...
SMTP_FROM=EMC Container <info@emccontainer.com>
ADMIN_NOTIFY_EMAIL=vertrieb@emccontainer.com

```

### 1.4 Erster Start

Das Dockerfile führt `prisma migrate deploy` vor dem Start aus – das Schema
entsteht beim ersten Deploy automatisch.

Den Katalog anschließend einmalig übernehmen (Railway CLI):

```bash
railway run --service api npm run db:seed --workspace=@emc/api
```

Das legt 15 Kategorien, 26 Produkte und das erste Administratorkonto an. Setzen
Sie `ADMIN_EMAIL` und `ADMIN_PASSWORD` vorher als Variablen – sonst erzeugt der
Seed ein Passwort und gibt es einmalig im Log aus.

### 1.5 Domain

Unter *Settings → Networking → Custom Domain* `api.emccontainer.com` eintragen
und den angezeigten CNAME beim DNS-Anbieter setzen.

---

## 2. Storefront auf Vercel

### 2.1 Projekt anlegen

Repository importieren. **Root Directory auf dem Repository-Wurzelverzeichnis
belassen** – alles Weitere steht in `vercel.json`:

| Feld | Wert | Herkunft |
|---|---|---|
| Framework Preset | Next.js | `vercel.json` |
| Install Command | `npm ci` | `vercel.json` |
| Build Command | `npm run build` | `vercel.json` |
| Output Directory | `apps/web/.next` | `vercel.json` |
| Region | Frankfurt (`fra1`) | `vercel.json` |

`npm run build` im Wurzelverzeichnis baut erst das Katalogpaket, dann die
Storefront. Die Reihenfolge ist nicht beliebig: Ohne den CommonJS-Build des
Katalogs fehlt der API später das Modul, und ein gemeinsamer Befehl hält beide
Deployments auf demselben Stand.

Die Region ist bewusst Frankfurt – die Zielgruppe sitzt in Deutschland, und die
Serverfunktionen sollen nicht über den Atlantik laufen.

### 2.2 Umgebungsvariablen

```bash
NEXT_PUBLIC_API_URL=https://api.emccontainer.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Ihre Cloud>
```

Beide Werte landen im Browser-Bundle. Legen Sie hier niemals Geheimnisse ab.

Ohne Cloudinary erzeugt die Storefront deterministische SVG-Platzhalter statt
Produktfotos. Layout und Funktion bleiben vollständig erhalten – die Seite ist
also auch ohne konfigurierte Bilder ausrollbar.

### 2.3 Domain

`emccontainer.com` und `www.emccontainer.com` hinzufügen und `www` per Redirect
auf die Hauptdomain führen. Danach `CORS_ORIGINS` auf Railway prüfen: **beide**
Varianten müssen dort eingetragen sein.

---

## 3. Zahlungen

Der Shop bindet keinen Zahlungsanbieter ein. Angeboten werden Vorkasse,
SEPA-Lastschrift und Kauf auf Rechnung – alle drei laufen über das
Geschäftskonto. Es gibt daher weder Anbieterschlüssel noch einen
Webhook-Endpunkt einzurichten.

Der Ablauf nach einer Bestellung:

1. Die Bestellbestätigung nennt Bestellnummer, Betrag und Bankverbindung als
   Verwendungszweck.
2. Sobald der Betrag auf dem Konto sichtbar ist, wird die Bestellung im
   Adminbereich unter *Bestellungen → Details* auf **Bezahlt** gesetzt.
3. Das löst die Statusmail an die Kundschaft aus und gibt die Bestellung für
   den Versand frei.

Bei Kauf auf Rechnung entfällt Schritt 2 vor dem Versand – die Ware geht
heraus, die Zahlung wird nach Lieferung erfasst.

> **SEPA-Lastschrift ist nur teilweise umgesetzt.** Die Zahlungsart lässt sich
> im Checkout wählen, IBAN und Mandat werden derzeit aber nicht erhoben. Die
> Bestellung wird wie eine Überweisung behandelt und im Adminbereich manuell
> bestätigt. Wer echten Bankeinzug braucht, muss die Mandatserfassung
> nachrüsten – oder die Zahlungsart in `packages/catalog/src/brand.ts`
> entfernen.

---

## 4. Nach dem Livegang

### Sofort erledigen

- [ ] Firmendaten in `packages/catalog/src/brand.ts` gegenprüfen (Abschnitt 0)
- [ ] Administratorpasswort ändern und `ADMIN_PASSWORD` aus den Railway-Variablen
      löschen – der Seed braucht sie nur beim ersten Lauf
- [ ] AGB, Widerrufsbelehrung und Datenschutzerklärung anwaltlich prüfen lassen
- [ ] Echte Produktfotos hochladen (Adminbereich → Produkte → Bilder)
- [ ] Testbestellung über jede aktive Zahlungsart durchführen
- [ ] E-Mail-Zustellung prüfen (SPF-, DKIM- und DMARC-Einträge setzen)

### Suchmaschinen

- [ ] Google Search Console: Property anlegen, Domain verifizieren
- [ ] `https://emccontainer.com/sitemap.xml` einreichen
- [ ] Bing Webmaster Tools: dieselbe Sitemap
- [ ] Rich Results Test für je eine Produkt-, Städte- und Ratgeberseite
- [ ] Google Business Profile für den Standort anlegen und mit der
      LocalBusiness-Auszeichnung abgleichen

### Betrieb

- [ ] Automatische Datenbanksicherung auf Railway aktivieren
- [ ] Uptime-Monitoring auf `https://api.emccontainer.com/health` einrichten
- [ ] Fehlerüberwachung anbinden (z. B. Sentry)

---

## 5. Fehlersuche

**Anmeldung im Adminbereich schlägt fehl, Login-Antwort ist aber 200**
`CORS_ORIGINS` stimmt nicht exakt mit der aufgerufenen Domain überein. Ohne
Übereinstimmung verwirft der Browser das Refresh-Cookie. Protokoll und `www`
müssen exakt passen.

**„Cannot find module '@emc/catalog'" beim API-Build**
Der Katalog wurde nicht vor der API gebaut. `npm run build --workspace=@emc/catalog`
erzeugt den CommonJS-Build, den NestJS per `require` einbindet.

**Vercel-Build bricht ab: „No Next.js version detected"**
Das Root Directory wurde im Dashboard auf `apps/web` gesetzt. Dann greift die
`vercel.json` im Wurzelverzeichnis nicht mehr. Root Directory leeren.

**Railway-Build bricht in `npm ci` ab**
`package-lock.json` passt nicht zu den Manifesten – meist nach einem Merge.
Lokal `npm install` ausführen, den aktualisierten Lockfile committen. Der
Deps-Layer im Dockerfile kopiert bewusst alle Workspace-Manifeste, auch das der
Storefront, weil `npm ci` den Lockfile gegen den gesamten Baum prüft.

**Bildupload meldet 503**
Cloudinary ist nicht konfiguriert. Alle drei Variablen setzen und neu starten.

**Bestellungen bleiben auf „Eingegangen"**
Das ist der vorgesehene Zustand. Alle Zahlungsarten werden im Adminbereich
manuell bestätigt (Abschnitt 3) – es gibt keinen Anbieter, der den Status
automatisch weiterschaltet.

**Storefront zeigt Platzhalter statt Fotos**
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` fehlt oder die Produkte haben noch keine
Bilder. Der Wert wird zur **Bauzeit** eingebacken – nach dem Setzen ist ein
neuer Build nötig.

**API startet nicht, Log zeigt „Ungültige Konfiguration"**
Eine Pflichtvariable fehlt oder ein Geheimnis ist kürzer als 32 Zeichen. Die
Meldung nennt die betroffenen Namen einzeln.
