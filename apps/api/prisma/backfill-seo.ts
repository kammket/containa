import { PrismaClient } from '@prisma/client';

import { products as catalogProducts } from '@emc/catalog';

/**
 * Nachtrag der Produktfelder, die es in der Datenbank vorher nicht gab:
 * Suchbegriffe, Nebenkeywords und kuratierte verwandte Produkte.
 *
 * Bewusst **nicht** über `db:seed` gelöst. Der Seed schreibt jedes Produkt
 * vollständig aus dem Katalog zurück und würde damit sämtliche Änderungen
 * überschreiben, die im Adminbereich vorgenommen wurden – Preise, Texte,
 * Verfügbarkeiten. Dieses Skript rührt ausschließlich die drei neuen Spalten
 * an, und auch die nur, solange sie leer sind. Wer sie im Adminbereich bereits
 * gepflegt hat, behält seine Werte.
 *
 * Mehrfaches Ausführen ist folgenlos.
 *
 *   npm run db:backfill-seo --workspace=@emc/api
 */
const prisma = new PrismaClient();

async function main() {
  console.log('\nSEO-Felder werden nachgetragen …\n');

  const existing = await prisma.product.findMany({
    select: { id: true, slug: true, keywords: true, secondaryKeywords: true, relatedSlugs: true },
  });

  const bySlug = new Map(catalogProducts.map((product) => [product.slug, product]));

  let updated = 0;
  let skipped = 0;
  let unknown = 0;

  for (const product of existing) {
    const source = bySlug.get(product.slug);
    if (!source) {
      // Im Adminbereich angelegt: Für dieses Produkt gibt es keine
      // Katalogvorlage, aus der sich etwas nachtragen ließe.
      unknown += 1;
      continue;
    }

    const data: {
      keywords?: string[];
      secondaryKeywords?: string[];
      relatedSlugs?: string[];
    } = {};

    if (product.keywords.length === 0 && source.keywords.length > 0) {
      data.keywords = source.keywords;
    }
    if (product.secondaryKeywords.length === 0 && source.seo.secondaryKeywords?.length) {
      data.secondaryKeywords = source.seo.secondaryKeywords;
    }
    if (product.relatedSlugs.length === 0 && source.related.length > 0) {
      data.relatedSlugs = source.related;
    }

    if (Object.keys(data).length === 0) {
      skipped += 1;
      continue;
    }

    await prisma.product.update({ where: { id: product.id }, data });
    updated += 1;
    console.log(`  ✓ ${product.slug} (${Object.keys(data).join(', ')})`);
  }

  console.log(
    `\nFertig: ${updated} ergänzt, ${skipped} bereits vollständig, ` +
      `${unknown} ohne Katalogvorlage.\n`,
  );
}

main()
  .catch((error) => {
    console.error('Nachtrag fehlgeschlagen:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
