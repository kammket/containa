import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CreateOrderDto } from './dto/create-order.dto';
import { TrackOrderDto } from './dto/track-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Bestellungen')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // Bestellungen sind teuer und selten – 10 pro Stunde je IP genügen völlig.
  @Throttle({ default: { limit: 10, ttl: 3_600_000 } })
  @ApiOperation({
    summary: 'Bestellung anlegen (Gast-Checkout)',
    description:
      'Preise und Lieferkosten werden serverseitig aus dem Katalog berechnet. ' +
      'Vom Client übermittelte Beträge werden ignoriert.',
  })
  @ApiResponse({ status: 201, description: 'Bestellung angelegt' })
  @ApiResponse({ status: 400, description: 'Artikel nicht verfügbar oder Eingabe ungültig' })
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create(dto);
  }

  @Get('track')
  @Throttle({ default: { limit: 20, ttl: 600_000 } })
  @ApiOperation({
    summary: 'Bestellstatus abfragen',
    description: 'Erfordert Bestellnummer und die E-Mail-Adresse der Bestellung.',
  })
  @ApiQuery({ name: 'orderNumber', example: 'EMC-2026-04821' })
  @ApiQuery({ name: 'email', example: 'kunde@firma.de' })
  track(@Query() query: TrackOrderDto) {
    return this.orders.track(query.orderNumber, query.email);
  }
}
