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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { JwtPayload } from '../auth/auth.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { QueryProductsDto } from '../products/dto/query-products.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ProductsService } from '../products/products.service';
import { UploadsService } from '../uploads/uploads.service';
import { AuditService } from './audit.service';
import { ReorderImagesDto } from './dto/reorder-images.dto';

/**
 * Produktverwaltung im Adminbereich.
 *
 * Umfang bewusst eng: Produkte anlegen, bearbeiten, Bilder hochladen und
 * sortieren, Produkte aktivieren oder deaktivieren. Gelöscht wird nichts –
 * Bestellungen sollen ihre Produktreferenz behalten.
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
    return product;
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Produkt deaktivieren (im Shop ausblenden)' })
  async deactivate(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const product = await this.products.deactivate(id);
    await this.audit.log(user.sub, 'DEACTIVATE', 'Product', id);
    return product;
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Produkt wieder aktivieren' })
  async activate(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const product = await this.products.activate(id);
    await this.audit.log(user.sub, 'ACTIVATE', 'Product', id);
    return product;
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
    return { deleted: true };
  }

  @Patch(':id/images/order')
  @ApiOperation({
    summary: 'Bilderreihenfolge ändern',
    description: 'Das erste Bild der Liste wird zum Titelbild des Produkts.',
  })
  reorderImages(@Param('id') id: string, @Body() dto: ReorderImagesDto) {
    return this.products.reorderImages(id, dto.imageIds);
  }
}
