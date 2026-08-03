-- Produkte vollständig in der Datenbank abbilden.
--
-- Diese drei Felder lagen bisher ausschließlich im Katalogpaket. Damit fehlten
-- sie jedem Produkt, das im Adminbereich angelegt wurde: keine Suchbegriffe für
-- die Instant-Suche, keine Nebenkeywords für die interne Verlinkung, keine
-- kuratierten verwandten Produkte.
--
-- Alle drei sind Arrays mit leerem Standardwert, die Migration ist damit
-- rückwirkungsfrei: Bestehende Zeilen erhalten leere Listen, bis der Seed die
-- Katalogwerte einträgt.

ALTER TABLE "products" ADD COLUMN "secondaryKeywords" TEXT[];
ALTER TABLE "products" ADD COLUMN "keywords" TEXT[];
ALTER TABLE "products" ADD COLUMN "relatedSlugs" TEXT[];
