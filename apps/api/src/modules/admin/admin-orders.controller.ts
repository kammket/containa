import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { JwtPayload } from '../auth/auth.service';
import { InvoicesService } from '../invoices/invoices.service';
import { OrdersService } from '../orders/orders.service';
import { AuditService } from './audit.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

/** Bestellübersicht im Adminbereich – ansehen und Status pflegen. */
@ApiTags('Admin – Bestellungen')
@ApiBearerAuth('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(
    private readonly orders: OrdersService,
    private readonly invoices: InvoicesService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Bestellungen auflisten' })
  @ApiQuery({ name: 'status', enum: OrderStatus, required: false })
  @ApiQuery({ name: 'search', required: false, description: 'Bestellnummer, E-Mail, Name, Firma' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string,
  ) {
    return this.orders.findAllForAdmin({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      status,
      search,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Kennzahlen für die Übersicht' })
  stats() {
    return this.orders.stats();
  }

  @Get(':orderNumber')
  @ApiOperation({ summary: 'Bestelldetails abrufen' })
  findOne(@Param('orderNumber') orderNumber: string) {
    return this.orders.findOneForAdmin(orderNumber);
  }

  @Patch(':orderNumber/status')
  @ApiOperation({
    summary: 'Bestellstatus ändern',
    description:
      'Legt einen Eintrag im Verlauf an und benachrichtigt die Kundin bzw. den Kunden per E-Mail.',
  })
  async updateStatus(
    @Param('orderNumber') orderNumber: string,
    @Body() dto: UpdateOrderStatusDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const order = await this.orders.updateStatus(orderNumber, dto.status, {
      description: dto.description,
      carrier: dto.carrier,
      estimatedDelivery: dto.estimatedDelivery ? new Date(dto.estimatedDelivery) : undefined,
    });

    await this.audit.log(user.sub, 'UPDATE_STATUS', 'Order', order.id, { status: dto.status });
    return order;
  }

  @Get(':orderNumber/invoice')
  @ApiOperation({ summary: 'Rechnung zur Bestellung erzeugen oder abrufen' })
  invoice(@Param('orderNumber') orderNumber: string) {
    return this.invoices.getOrCreate(orderNumber);
  }
}
