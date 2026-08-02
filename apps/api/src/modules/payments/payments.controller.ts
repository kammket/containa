import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';

/**
 * Zahlungen werden ausschließlich im Adminbereich freigegeben. Öffentliche
 * Endpunkte gibt es hier bewusst nicht: Ohne Kartenzahlung existiert kein
 * Webhook, über den eine Bestellung von außen als bezahlt gemeldet werden
 * könnte.
 */
@ApiTags('Zahlungen')
@ApiBearerAuth('admin')
@UseGuards(JwtAuthGuard)
@Controller('admin/payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post(':orderNumber/mark-paid')
  @ApiOperation({
    summary: 'Zahlungseingang bestätigen',
    description: 'Für Vorkasse, SEPA-Lastschrift und Kauf auf Rechnung.',
  })
  markPaid(@Param('orderNumber') orderNumber: string, @Body('note') note?: string) {
    return this.payments.markPaidManually(orderNumber.toUpperCase().trim(), note);
  }

  @Post(':orderNumber/refund')
  @ApiOperation({
    summary: 'Erstattung vermerken',
    description: 'Die Rücküberweisung selbst erfolgt über das Bankkonto.',
  })
  refund(@Param('orderNumber') orderNumber: string, @Body('amount') amount?: number) {
    return this.payments.markRefunded(orderNumber.toUpperCase().trim(), amount);
  }
}
