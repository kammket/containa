import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { JwtPayload } from '../auth/auth.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { QueryProductsDto } from '../products/dto/query-products.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ProductsService } from '../products/products.service';
import { StorefrontRevalidationService } from '../products/storefront-revalidation.service';
import { UploadsService } from '../uploads/uploads.service';
import { AuditService } from './audit.service';
import { ReorderImagesDto } from './dto/reorder-images.dto';

/**
 * Produktverwaltung im Adminbereich.
 *
 * Umfang bewusst eng: Produkte anlegen, bearbeiten, Bilder hochladen und
 * sortieren, Produkte ein- und ausblenden sowie endgültig löschen.
 *
 * Ausblenden ist der Regelfall und umkehrbar. Löschen ist es nicht und bleibt
 * deshalb dem OWNER vorbehalten – gedacht für Fehlanlagen und Testdatensätze,
 * nicht für ausverkaufte Ware. Bestellungen überstehen es unbeschadet, weil
 * `OrderItem` die Produktdaten zum Bestellzeitpunkt selbst festhält.
 */
@ApiTags('Admin – Produkte')
@ApiBearerAuth('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(
    private readonly products: ProductsService,
    private readonly uploads: UploadsService,
    private readonly audit: AuditService,
    private readonly revalidation: StorefrontRevalidationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Produkte auflisten (inklusive deaktivierter)' })
  findAll(@Query() query: QueryProductsDto) {
    return this.products.findAll({ ...query, includeInactive: true });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Produkt abrufen' })
  findOne(@Param('id') id: string) {
    return this.products.findByIdForAdmin(id);
  }

  @Post()
  @ApiOperation({ summary: 'Produkt anlegen' })
  async create(@Body() dto: CreateProductDto, @CurrentUser() user: JwtPayload) {
    const product = await this.products.create(dto);
    await this.audit.log(user.sub, 'CREATE', 'Product', product.id, { slug: product.slug });
    this.revalidation.trigger(`Produkt angelegt: ${product.slug}`);
    return product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Produkt bearbeiten' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const product = await this.products.update(id, dto);
    await this.audit.log(user.sub, 'UPDATE', 'Product', id, dto as Record<string, unknown>);
    this.revalidation.trigger(`Produkt bearbeitet: ${product.slug}`);
    return product;
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Produkt deaktivieren (im Shop ausblenden)' })
  async deactivate(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const product = await this.products.deactivate(id);
    await this.audit.log(user.sub, 'DEACTIVATE', 'Product', id);
    this.revalidation.trigger(`Produkt ausgeblendet: ${product.slug}`);
    return product;
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Produkt wieder aktivieren' })
  async activate(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const product = await this.products.activate(id);
    await this.audit.log(user.sub, 'ACTIVATE', 'Product', id);
    this.revalidation.trigger(`Produkt eingeblendet: ${product.slug}`);
    return product;
  }

  @Delete(':id')
  @Roles('OWNER')
  @ApiOperation({
    summary: 'Produkt endgültig löschen',
    description:
      'Entfernt das Produkt samt Bildern unwiderruflich. Bestellungen bleiben ' +
      'vollständig lesbar, weil sie die Produktdaten selbst festhalten. Zum ' +
      'bloßen Ausblenden im Shop stattdessen /deactivate verwenden.',
  })
  async remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const removed = await this.products.remove(id);

    // Erst nach dem erfolgreichen Löschen in der Datenbank: Schlägt Cloudinary
    // fehl, bleibt höchstens eine verwaiste Datei zurück – ein halb gelöschtes
    // Produkt wäre schlimmer. `deleteImage` schluckt Fehler bereits selbst.
    await Promise.all(removed.publicIds.map((publicId) => this.uploads.deleteImage(publicId)));

    await this.audit.log(user.sub, 'DELETE', 'Product', id, {
      slug: removed.slug,
      name: removed.name,
      images: removed.publicIds.length,
      orderItems: removed.orderItems,
    });

    this.revalidation.trigger(`Produkt gelöscht: ${removed.slug}`);

    return { deleted: true, slug: removed.slug, orderItems: removed.orderItems };
  }

  // ── Bilder ───────────────────────────────────────────────────────────────

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: { type: 'string', format: 'binary' },
        alt: {
          type: 'string',
          description: 'Alt-Text für Barrierefreiheit und Bilder-SEO',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Produktbild hochladen' })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('alt') alt: string,
    @CurrentUser() user: JwtPayload,
  ) {
    const product = await this.products.findByIdForAdmin(id);
    const uploaded = await this.uploads.uploadProductImage(file, product.slug);

    const image = await this.products.addImage(id, {
      publicId: uploaded.publicId,
      url: uploaded.url,
      // Ohne Alt-Text wäre das Bild für Screenreader und Bildersuche wertlos –
      // deshalb ein sinnvoller Standard aus dem Produktnamen.
      alt: alt?.trim() || `${product.name} – Produktbild`,
      width: uploaded.width,
      height: uploaded.height,
    });

    await this.audit.log(user.sub, 'UPLOAD_IMAGE', 'Product', id, {
      publicId: uploaded.publicId,
    });

    this.revalidation.trigger(`Bild hochgeladen: ${product.slug}`);
    return image;
  }

  @Delete('images/:imageId')
  @ApiOperation({ summary: 'Produktbild löschen' })
  async deleteImage(@Param('imageId') imageId: string, @CurrentUser() user: JwtPayload) {
    const image = await this.products.removeImage(imageId);
    await this.uploads.deleteImage(image.publicId);
    await this.audit.log(user.sub, 'DELETE_IMAGE', 'Product', image.productId, {
      publicId: image.publicId,
    });
    this.revalidation.trigger(`Bild gelöscht: ${image.publicId}`);
    return { deleted: true };
  }

  @Patch(':id/images/order')
  @ApiOperation({
    summary: 'Bilderreihenfolge ändern',
    description: 'Das erste Bild der Liste wird zum Titelbild des Produkts.',
  })
  async reorderImages(@Param('id') id: string, @Body() dto: ReorderImagesDto) {
    const images = await this.products.reorderImages(id, dto.imageIds);
    this.revalidation.trigger(`Bilderreihenfolge geändert: ${id}`);
    return images;
  }
}
