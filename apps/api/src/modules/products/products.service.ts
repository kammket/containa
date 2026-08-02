import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import type { QueryProductsDto } from './dto/query-products.dto';

const productInclude = {
  images: { orderBy: { sortOrder: 'asc' } },
  categories: { include: { category: true } },
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Öffentliche Produktliste – nur aktive Produkte. */
  async findAll(query: QueryProductsDto) {
    const { page = 1, limit = 24, size, condition, category, search, includeInactive } = query;

    const where: Prisma.ProductWhereInput = {
      ...(includeInactive ? {} : { isActive: true }),
      ...(size ? { size } : {}),
      ...(condition ? { condition } : {}),
      ...(category ? { categories: { some: { category: { slug: category } } } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { sku: { contains: search, mode: 'insensitive' } },
              { tagline: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: productInclude,
        orderBy: [{ isBestseller: 'desc' }, { priceNet: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug, isActive: true },
      include: productInclude,
    });

    if (!product) throw new NotFoundException('Dieses Produkt existiert nicht.');
    return product;
  }

  async findByIdForAdmin(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: productInclude,
    });

    if (!product) throw new NotFoundException('Dieses Produkt existiert nicht.');
    return product;
  }

  /**
   * Aktueller Bestand für eine Liste von Slugs.
   * Die Storefront ruft das auf Produktseiten ab, damit der statisch
   * gerenderte Bestand bei Bedarf aktualisiert wird.
   */
  async stockBySlugs(slugs: string[]) {
    const products = await this.prisma.product.findMany({
      where: { slug: { in: slugs.slice(0, 50) }, isActive: true },
      select: { slug: true, stock: true, availability: true },
    });

    return Object.fromEntries(products.map((p) => [p.slug, p.stock]));
  }

  async create(dto: CreateProductDto) {
    const { categorySlugs, primaryCategory, images, specs, specRows, faqs, ...data } = dto;

    const categories = await this.resolveCategories(categorySlugs, primaryCategory);

    return this.prisma.product.create({
      data: {
        ...data,
        ...this.jsonFields({ specs, specRows, faqs }),
        categories: { create: categories },
        ...(images && images.length > 0
          ? {
              images: {
                create: images.map((image, index) => ({
                  publicId: image.publicId,
                  url: image.url,
                  alt: image.alt,
                  width: image.width ?? 1200,
                  height: image.height ?? 900,
                  sortOrder: image.sortOrder ?? index,
                })),
              },
            }
          : {}),
      },
      include: productInclude,
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findByIdForAdmin(id);

    const { categorySlugs, primaryCategory, specs, specRows, faqs, ...data } = dto;

    // Kategoriezuordnung wird vollständig ersetzt, wenn sie mitgeschickt wird.
    const categoryUpdate =
      categorySlugs && categorySlugs.length > 0
        ? {
            categories: {
              deleteMany: {},
              create: await this.resolveCategories(categorySlugs, primaryCategory),
            },
          }
        : {};

    return this.prisma.product.update({
      where: { id },
      data: { ...data, ...this.jsonFields({ specs, specRows, faqs }), ...categoryUpdate },
      include: productInclude,
    });
  }

  /**
   * Produkte werden nicht gelöscht, sondern deaktiviert.
   * Bestellungen behalten damit ihre Produktreferenz und bleiben nachvollziehbar.
   */
  async deactivate(id: string) {
    await this.findByIdForAdmin(id);
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
      include: productInclude,
    });
  }

  async activate(id: string) {
    await this.findByIdForAdmin(id);
    return this.prisma.product.update({
      where: { id },
      data: { isActive: true },
      include: productInclude,
    });
  }

  // ── Bilder ───────────────────────────────────────────────────────────────

  async addImage(
    productId: string,
    image: { publicId: string; url: string; alt: string; width?: number; height?: number },
  ) {
    await this.findByIdForAdmin(productId);

    const last = await this.prisma.productImage.findFirst({
      where: { productId },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });

    return this.prisma.productImage.create({
      data: {
        productId,
        publicId: image.publicId,
        url: image.url,
        alt: image.alt,
        width: image.width ?? 1200,
        height: image.height ?? 900,
        sortOrder: (last?.sortOrder ?? -1) + 1,
      },
    });
  }

  async removeImage(imageId: string) {
    const image = await this.prisma.productImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundException('Dieses Bild existiert nicht.');

    await this.prisma.productImage.delete({ where: { id: imageId } });
    return image;
  }

  /** Setzt die Reihenfolge der Bilder neu – das erste ist das Titelbild. */
  async reorderImages(productId: string, imageIds: string[]) {
    await this.findByIdForAdmin(productId);

    await this.prisma.$transaction(
      imageIds.map((id, index) =>
        this.prisma.productImage.updateMany({
          where: { id, productId },
          data: { sortOrder: index },
        }),
      ),
    );

    return this.prisma.productImage.findMany({
      where: { productId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // ── intern ───────────────────────────────────────────────────────────────

  /**
   * Wandelt die JSON-Spalten in Prisma-taugliche Werte um. Nicht gesetzte
   * Felder werden ausgelassen, damit ein PATCH sie nicht versehentlich leert.
   */
  private jsonFields(fields: { specs?: unknown; specRows?: unknown; faqs?: unknown }) {
    const result: {
      specs?: Prisma.InputJsonValue;
      specRows?: Prisma.InputJsonValue;
      faqs?: Prisma.InputJsonValue;
    } = {};

    if (fields.specs !== undefined) result.specs = fields.specs as Prisma.InputJsonValue;
    if (fields.specRows !== undefined) result.specRows = fields.specRows as Prisma.InputJsonValue;
    if (fields.faqs !== undefined) result.faqs = fields.faqs as Prisma.InputJsonValue;

    return result;
  }

  private async resolveCategories(slugs: string[] | undefined, primary: string | undefined) {
    if (!slugs || slugs.length === 0) return [];

    const categories = await this.prisma.category.findMany({
      where: { slug: { in: slugs } },
      select: { id: true, slug: true },
    });

    const missing = slugs.filter((slug) => !categories.some((c) => c.slug === slug));
    if (missing.length > 0) {
      throw new NotFoundException(`Unbekannte Kategorie(n): ${missing.join(', ')}`);
    }

    const primarySlug = primary ?? slugs[0];

    return categories.map((category) => ({
      categoryId: category.id,
      isPrimary: category.slug === primarySlug,
    }));
  }
}
