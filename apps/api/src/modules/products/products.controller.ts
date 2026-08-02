import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { QueryProductsDto } from './dto/query-products.dto';

/** Öffentlicher Katalogzugriff – ohne Authentifizierung. */
@ApiTags('Produkte')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Produkte auflisten (nur aktive)' })
  findAll(@Query() query: QueryProductsDto) {
    // Inaktive Produkte sind über den öffentlichen Endpunkt nie erreichbar,
    // auch wenn der Parameter mitgeschickt wird.
    return this.products.findAll({ ...query, includeInactive: false });
  }

  @Get('stock')
  @ApiOperation({ summary: 'Aktuellen Bestand für mehrere Produkte abfragen' })
  @ApiQuery({ name: 'slugs', description: 'Kommagetrennte Liste von Produkt-Slugs' })
  stock(@Query('slugs') slugs?: string) {
    if (!slugs) throw new BadRequestException('Bitte geben Sie mindestens einen Slug an.');
    return this.products.stockBySlugs(
      slugs
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    );
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Einzelnes Produkt abrufen' })
  @ApiParam({ name: 'slug', example: '20-fuss-seecontainer-gebraucht-blau' })
  findOne(@Param('slug') slug: string) {
    return this.products.findBySlug(slug);
  }
}
