import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';

import { OrdersService } from '../orders/orders.service';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Zahlungsabwicklung.
 *
 * Der Shop nimmt bewusst keine Karten- oder PayPal-Zahlungen entgegen. Alle
 * Zahlungen laufen über das Bankkonto – Vorkasse, SEPA-Lastschrift oder Kauf
 * auf Rechnung. Der Zahlungseingang wird im Adminbereich geprüft und dort
 * freigegeben.
 *
 * Das hat zwei Vorteile: Es fallen keine Anbietergebühren an, die bei
 * Warenwerten im vierstelligen Bereich deutlich ins Gewicht fallen, und es
 * gibt keinen Webhook-Endpunkt, der eine Bestellung fälschlich als bezahlt
 * melden könnte.
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
  ) {}

  /**
   * Bestätigt den Zahlungseingang.
   *
   * Wird ausschließlich aus dem Adminbereich aufgerufen, nachdem der Betrag
   * auf dem Konto sichtbar ist. Setzt die Bestellung auf „Bezahlt" und löst
   * die Benachrichtigung an die Kundschaft aus.
   */
  async markPaidManually(orderNumber: string, note?: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { payments: true },
    });

    if (!order) throw new NotFoundException('Diese Bestellung existiert nicht.');

    const alreadyPaid = order.payments.some((p) => p.status === PaymentStatus.BEZAHLT);
    if (alreadyPaid) {
      this.logger.debug(`Zahlung für ${orderNumber} war bereits vermerkt.`);
      return this.orders.findOneForAdmin(orderNumber);
    }

    await this.prisma.payment.updateMany({
      where: {
        orderId: order.id,
        status: { in: [PaymentStatus.OFFEN, PaymentStatus.AUTORISIERT] },
      },
      data: { status: PaymentStatus.BEZAHLT, paidAt: new Date() },
    });

    this.logger.log(`Zahlungseingang für ${orderNumber} bestätigt.`);

    return this.orders.updateStatus(orderNumber, OrderStatus.BEZAHLT, { description: note });
  }

  /** Vermerkt eine Erstattung. Die Rücküberweisung erfolgt manuell. */
  async markRefunded(orderNumber: string, amount?: number) {
    const order = await this.prisma.order.findUnique({ where: { orderNumber } });
    if (!order) throw new NotFoundException('Diese Bestellung existiert nicht.');

    const refundAmount = amount ?? order.totalGross;

    await this.prisma.payment.updateMany({
      where: { orderId: order.id, status: PaymentStatus.BEZAHLT },
      data: {
        status:
          refundAmount >= order.totalGross ? PaymentStatus.ERSTATTET : PaymentStatus.TEILERSTATTET,
        refundedAt: new Date(),
        refundedAmount: refundAmount,
      },
    });

    return this.orders.updateStatus(orderNumber, OrderStatus.ERSTATTET, {
      description: 'Der Betrag wurde auf Ihr Konto zurücküberwiesen.',
    });
  }
}
