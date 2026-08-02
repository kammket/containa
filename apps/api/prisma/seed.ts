import { Availability, PrismaClient, ProductCondition } from '@prisma/client';
import argon2 from 'argon2';
import { randomBytes } from 'node:crypto';

import { categories as catalogCategories, products as catalogProducts } from '@emc/catalog';

/**
 * Seed.
 *
 * Übernimmt Kategorien und Produkte aus `@emc/catalog` in die Datenbank – der
 * Katalog bleibt damit die einzige Quelle der Wahrheit, und die Storefront
 * zeigt nach dem Seed exakt dieselben Daten wie die API.
 *
 * Der Administrator wird nur angelegt, wenn noch keiner existiert. Das
 * Passwort kommt aus ADMIN_PASSWORD; fehlt es, wird eines erzeugt und einmalig
 * ausgegeben.
 */
const prisma = new PrismaClient();

const conditionMap: Record<string, ProductCondition> = {
  neu: ProductCondition.NEU,
  'one-trip': ProductCondition.ONE_TRIP,
  generalueberholt: ProductCondition.GENERALUEBERHOLT,
  gebraucht: ProductCondition.GEBRAUCHT,
};

const availabilityMap: Record<string, Availability> = {
  'auf-lager': Availability.AUF_LAGER,
  kurzfristig: Availability.KURZFRISTIG,
  'auf-anfrage': Availability.AUF_ANFRAGE,
  ausverkauft: Availability.AUSVERKAUFT,
};

async function seedAdmin() {
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    console.log('→ Administrator vorhanden, wird übersprungen.');
    return;
  }

  const email = process.env.ADMIN_EMAIL ?? 'admin@emccontainer.com';
  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD ?? randomBytes(12).toString('base64url');

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19_456,
    timeCost: 2,
    parallelism: 1,
  });

  await prisma.adminUser.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      name: process.env.ADMIN_NAME ?? 'Administrator',
      role: 'OWNER',
    },
  });

  console.log(`✓ Administrator angelegt: ${email}`);
  if (generated) {
    console.log('\n─────────────────────────────────────────────');
    console.log(`  Generiertes Passwort: ${password}`);
    console.log('  Bitte notieren und nach dem ersten Login ändern.');
    console.log('─────────────────────────────────────────────\n');
  }
}

async function seedCategories() {
  for (const [index, category] of catalogCategories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: {
        slug: category.slug,
        name: category.name,
        navLabel: category.navLabel,
        tagline: category.tagline,
        menuGroup: category.menuGroup,
        sortOrder: category.order ?? index,
      },
      update: {
        name: category.name,
        navLabel: category.navLabel,
        tagline: category.tagline,
        menuGroup: category.menuGroup,
        sortOrder: category.order ?? index,
      },
    });
  }
  console.log(`✓ ${catalogCategories.length} Kategorien übernommen`);
}

async function seedProducts() {
  const categoryIds = new Map(
    (await prisma.category.findMany({ select: { id: true, slug: true } })).map((c) => [
      c.slug,
      c.id,
    ]),
  );

  for (const product of catalogProducts) {
    const data = {
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      highlights: product.highlights,
      condition: conditionMap[product.condition] ?? ProductCondition.GEBRAUCHT,
      size: product.size,
      availability: availabilityMap[product.availability] ?? Availability.AUF_LAGER,
      priceNet: product.priceNet,
      compareAtNet: product.compareAtNet ?? null,
      stock: product.stock,
      leadTimeDaysMin: product.leadTimeDays[0],
      leadTimeDaysMax: product.leadTimeDays[1],
      warrantyMonths: product.warrantyMonths,
      lengthMm: product.specs.exterior.length,
      widthMm: product.specs.exterior.width,
      heightMm: product.specs.exterior.height,
      specs: product.specs as object,
      specRows: product.specRows as object,
      faqs: product.faqs as object,
      isFeatured: product.featured,
      isBestseller: product.bestseller,
      seoTitle: product.seo.title,
      seoDescription: product.seo.description,
      focusKeyword: product.seo.focusKeyword,
    };

    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      create: data,
      update: data,
    });

    // Kategoriezuordnung und Bilder jeweils vollständig neu setzen,
    // damit wiederholte Seed-Läufe zum selben Ergebnis führen.
    await prisma.productCategory.deleteMany({ where: { productId: saved.id } });
    await prisma.productCategory.createMany({
      data: product.categorySlugs
        .map((slug) => categoryIds.get(slug))
        .filter((id): id is string => Boolean(id))
        .map((categoryId) => ({
          productId: saved.id,
          categoryId,
          isPrimary: categoryId === categoryIds.get(product.primaryCategory),
        })),
    });

    await prisma.productImage.deleteMany({ where: { productId: saved.id } });
    await prisma.productImage.createMany({
      data: product.images.map((image, index) => ({
        productId: saved.id,
        publicId: image.publicId,
        // Ohne konfigurierte Cloud bleibt die URL leer; die Storefront erzeugt
        // dann ihren eigenen Platzhalter aus der publicId.
        url: process.env.CLOUDINARY_CLOUD_NAME
          ? `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${image.publicId}`
          : '',
        alt: image.alt,
        width: image.width,
        height: image.height,
        sortOrder: index,
      })),
    });
  }

  console.log(`✓ ${catalogProducts.length} Produkte übernommen`);
}

async function seedCoupons() {
  const coupons = [
    {
      code: 'WILLKOMMEN50',
      type: 'FIXED' as const,
      value: 5000,
      minSubtotalNet: 100000,
      maxRedemptions: 500,
    },
    {
      code: 'WINTER5',
      type: 'PERCENT' as const,
      value: 5,
      minSubtotalNet: 200000,
      maxRedemptions: 200,
    },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      create: coupon,
      update: {},
    });
  }

  console.log(`✓ ${coupons.length} Gutscheine angelegt`);
}

async function main() {
  console.log('\nSeed wird ausgeführt …\n');

  await seedAdmin();
  await seedCategories();
  await seedProducts();
  await seedCoupons();

  console.log('\nSeed abgeschlossen.\n');
}

main()
  .catch((error) => {
    console.error('Seed fehlgeschlagen:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
