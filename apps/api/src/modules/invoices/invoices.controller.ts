import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';

import { OrdersService } from '../orders/orders.service';
import { InvoicesService } from './invoices.service';

@ApiTags('Bestellungen')
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoices: InvoicesService,
    private readonly orders: OrdersService,
  ) {}

  /**
   * Rechnungsdownload für Gäste.
   *
   * Bestellnummer und E-Mail-Adresse dienen als Nachweis. Die Prüfung läuft
   * über `orders.track()`, das bei falscher Kombination 404 wirft – so ist
   * ein Durchprobieren von Bestellnummern wirkungslos.
   */
  @Get('download')
  @Throttle({ default: { limit: 10, ttl: 600_000 } })
  @ApiOperation({ summary: 'Rechnung als PDF herunterladen' })
  @ApiQuery({ name: 'orderNumber', example: 'EMC-2026-04821' })
  @ApiQuery({ name: 'email', example: 'kunde@firma.de' })
  async download(
    @Query('orderNumber') orderNumber: string,
    @Query('email') email: string,
    @Res() response: Response,
  ) {
    await this.orders.track(orderNumber, email);

    const { buffer, filename } = await this.invoices.renderPdf(orderNumber.toUpperCase().trim());

    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(buffer.length),
      'Cache-Control': 'no-store',
    });
    response.end(buffer);
  }
}
