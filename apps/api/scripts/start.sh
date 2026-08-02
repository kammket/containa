#!/bin/sh
# Startskript des Laufzeit-Containers.
#
# Vor den Migrationen wird DATABASE_URL geprüft. Ohne diese Prüfung meldet
# Prisma lediglich „P1012: Environment variable not found: DATABASE_URL“ – eine
# Meldung, die nach einem Fehler im Schema aussieht, obwohl schlicht eine
# Variable am Dienst fehlt. Die folgenden Zeilen benennen stattdessen die
# tatsächliche Ursache und zeigen, was im Container überhaupt ankommt.
set -e

# Namen aller gesetzten Variablen ausgeben – ausdrücklich ohne Werte, damit
# keine Geheimnisse ins Deployment-Protokoll geraten. Das beantwortet die
# entscheidende Frage: Erreichen die Variablen des Dienstes den Container?
dump_env_names() {
  echo "Im Container gesetzte Variablen (nur Namen, keine Werte):" >&2
  env | cut -d= -f1 | sort | sed 's/^/    /' >&2
  echo "" >&2
  echo "Fehlt hier die gesamte Konfiguration (JWT_SECRET, APP_URL …), wurden" >&2
  echo "die Variablen am falschen Dienst oder in der falschen Umgebung" >&2
  echo "hinterlegt. Fehlt allein DATABASE_URL, ist die Referenz auf die" >&2
  echo "Datenbank nicht aufgelöst worden." >&2
}

fail() {
  echo "────────────────────────────────────────────────────────────" >&2
  echo "Start abgebrochen: $1" >&2
  echo "" >&2
  echo "DATABASE_URL wird zur Laufzeit benötigt – die Migrationen und der" >&2
  echo "Server bauen damit ihre Verbindung auf. Auf Railway wird der Wert am" >&2
  echo "Dienst hinterlegt, und zwar als Referenz auf die Datenbank:" >&2
  echo "" >&2
  echo "    DATABASE_URL=\${{Postgres.DATABASE_URL}}" >&2
  echo "" >&2
  echo "Heißt der Datenbankdienst anders, muss der Name in der Referenz" >&2
  echo "angepasst werden – sonst bleibt sie unaufgelöst und wird gar nicht" >&2
  echo "erst in den Container gereicht." >&2
  echo "" >&2
  dump_env_names
  echo "────────────────────────────────────────────────────────────" >&2
  exit 1
}

[ -n "$DATABASE_URL" ] || fail "DATABASE_URL ist nicht gesetzt."

# Eine unaufgelöste Referenz kommt als Literal an. Das ist kein leerer Wert und
# würde die Prüfung oben passieren, führt aber unweigerlich zum Verbindungsfehler.
case "$DATABASE_URL" in
  *'${{'*) fail "DATABASE_URL enthält eine unaufgelöste Referenz: $DATABASE_URL" ;;
esac

case "$DATABASE_URL" in
  postgres://* | postgresql://*) ;;
  *) fail "DATABASE_URL ist keine PostgreSQL-Verbindungszeichenfolge." ;;
esac

echo "Migrationen werden angewendet …"
npx prisma migrate deploy

# exec: Der Node-Prozess übernimmt PID 1 und empfängt SIGTERM beim Herunterfahren.
exec node dist/src/main.js
