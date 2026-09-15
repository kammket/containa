-- Anschrift für Kontakt- und Angebotsanfragen.
--
-- Beide Formulare verlangen jetzt Straße, Hausnummer und Ort zusätzlich zur
-- bereits erfassten Postleitzahl. Die Pflicht wird in der Validierung von
-- Formular und API durchgesetzt, nicht in der Datenbank: Bereits eingegangene
-- Anfragen haben keine Anschrift, eine NOT-NULL-Spalte würde die Migration an
-- genau diesen Zeilen scheitern lassen.

ALTER TABLE "inquiries" ADD COLUMN "street" TEXT;
ALTER TABLE "inquiries" ADD COLUMN "houseNumber" TEXT;
ALTER TABLE "inquiries" ADD COLUMN "city" TEXT;
