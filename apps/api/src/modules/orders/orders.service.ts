import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CustomerType, OrderStatus, PaymentMethod, PaymentStatus, Prisma } from '@prisma/client';
import { FREE_DELIVERY_THRESHOLD_NET, quoteDelivery, VAT_RATE } from '@emc/catalog';
import { randomInt } from 'node:crypto';

import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateOrderDto } from './dto/create-order.dto';

/**
 * Die Enumwerte STRIPE und PAYPAL bleiben im Datenmodell erhalten, damit
 * bereits erfasste Bestellungen lesbar bleiben. Neu auswählbar sind sie nicht
 * mehr – die Prüfung im DTO lässt sie gar nicht erst durch.
 */
const paymentMethodMap: Record<string, PaymentMethod> = {
  banktransfer: PaymentMethod.BANKTRANSFER,
  sepa: PaymentMethod.SEPA,
  invoice: PaymentMethod.INVOICE,
};

const statusLabels: Record<OrderStatus, string> = {
  EINGEGANGEN: 'Bestellung eingegangen',
  ZAHLUNG_AUSSTEHEND: 'Zahlung ausstehend',
  BEZAHLT: 'Zahlung eingegangen',
  IN_BEARBEITUNG: 'In Bearbeitung',
  VERSANDBEREIT: 'Versandbereit',
  IN_ZUSTELLUNG: 'In Zustellung',
  GELIEFERT: 'Geliefert',
  STORNIERT: 'Storniert',
  ERSTATTET: 'Erstattet',
};

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  /**
   * Legt eine Bestellung an.
   *
   * Sicherheitsrelevant: Preise und Lieferkosten werden **ausschließlich
   * serverseitig** aus der Datenbank berechnet. Vom Client kommen nur SKU und
   * Menge – manipulierte Preise aus dem Browser haben keinerlei Wirkung.
   */
  async create(dto: CreateOrderDto) {
    if (dto.items.length === 0) {
      throw new BadRequestException('Der Warenkorb ist leer.');
    }

    // 1. Produkte laden und Verfügbarkeit prüfen
    const skus = dto.items.map((item) => item.sku);
    const products = await this.prisma.product.findMany({
      where: { sku: { in: skus }, isActive: true },
    });

    if (products.length !== new Set(skus).size) {
      const found = new Set(products.map((p) => p.sku));
      const missing = skus.filter((sku) => !found.has(sku));
      throw new BadRequestException(
        `Diese Artikel sind nicht mehr verfügbar: ${missing.join(', ')}. Bitte aktualisieren Sie Ihren Warenkorb.`,
      );
    }

    // 2. Positionen mit Serverpreisen aufbauen
    const lines = dto.items.map((item) => {
      const product = products.find((p) => p.sku === item.sku)!;

      if (product.availability === 'AUSVERKAUFT') {
        throw new BadRequestException(`„${product.name}" ist derzeit nicht verfügbar.`);
      }

      if (product.stock > 0 && item.quantity > product.stock) {
        throw new BadRequestException(
          `Von „${product.name}" sind nur noch ${product.stock} Stück verfügbar.`,
        );
      }

      return {
        productId: product.id,
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        priceNet: product.priceNet,
        quantity: item.quantity,
        lineNet: product.priceNet * item.quantity,
        lengthMeters: product.lengthMm / 1000,
        isAccessory: product.size === 'sonder',
      };
    });

    const subtotalNet = lines.reduce((sum, line) => sum + line.lineNet, 0);

    // 3. Gutschein serverseitig prüfen
    const discountNet = await this.resolveDiscount(dto.couponCode, subtotalNet);

    // 4. Lieferkosten aus der Postleitzahl der Lieferadresse berechnen
    const shippingAddress = dto.shippingSameAsBilling ? dto.billingAddress : dto.shippingAddress!;
    const shippingNet = this.calculateShipping(
      shippingAddress.postalCode,
      lines,
      subtotalNet - discountNet,
    );

    // 5. Summen bilden
    const netTotal = subtotalNet - discountNet + shippingNet;
    const vatAmount = Math.round(netTotal * VAT_RATE);
    const totalGross = netTotal + vatAmount;

    const orderNumber = await this.generateOrderNumber();

    // 6. Bestellung, Adressen, Positionen und Zahlung in einer Transaktion
    const order = await this.prisma.$transaction(async (tx) => {
      const billing = await tx.address.create({ data: this.toAddressData(dto.billingAddress) });
      const shipping = dto.shippingSameAsBilling
        ? await tx.address.create({ data: this.toAddressData(dto.billingAddress) })
        : await tx.address.create({ data: this.toAddressData(dto.shippingAddress!) });

      const created = await tx.order.create({
        data: {
          orderNumber,
          email: dto.email.toLowerCase().trim(),
          customerType:
            dto.customerType === 'gewerblich' ? CustomerType.GEWERBLICH : CustomerType.PRIVAT,
          vatId: dto.vatId?.toUpperCase().replace(/\s/g, ''),
          status: OrderStatus.EINGEGANGEN,
          subtotalNet,
          discountNet,
          shippingNet,
          vatAmount,
          totalGross,
          vatRate: new Prisma.Decimal(VAT_RATE),
          couponCode: dto.couponCode?.toUpperCase(),
          deliveryNotes: dto.deliveryNotes,
          billingAddressId: billing.id,
          shippingAddressId: shipping.id,
          items: {
            create: lines.map((line) => ({
              productId: line.productId,
              sku: line.sku,
              slug: line.slug,
              name: line.name,
              priceNet: line.priceNet,
              quantity: line.quantity,
              lineNet: line.lineNet,
            })),
          },
          payments: {
            create: {
              method: paymentMethodMap[dto.paymentMethod] ?? PaymentMethod.BANKTRANSFER,
              status: PaymentStatus.OFFEN,
              amount: totalGross,
            },
          },
          events: {
            create: {
              status: OrderStatus.EINGEGANGEN,
              label: statusLabels.EINGEGANGEN,
              description:
                'Ihre Bestellung ist bei uns eingegangen. Wir prüfen die Anlieferung und melden uns zur Terminabstimmung.',
            },
          },
        },
        include: { items: true, billingAddress: true, shippingAddress: true, payments: true },
      });

      // Bestand nur für geführte Lagerware reduzieren
      for (const line of lines) {
        await tx.product.updateMany({
          where: { id: line.productId, stock: { gte: line.quantity } },
          data: { stock: { decrement: line.quantity } },
        });
      }

      if (dto.couponCode && discountNet > 0) {
        await tx.coupon.updateMany({
          where: { code: dto.couponCode.toUpperCase() },
          data: { redemptions: { increment: 1 } },
        });
      }

      return created;
    });

    // 7. Bestätigungen versenden – Fehler dürfen die Bestellung nicht kippen
    void this.mail.sendOrderConfirmation(order).catch((error) => {
      this.logger.error(`Bestätigungsmail für ${order.orderNumber} fehlgeschlagen`, error);
    });
    void this.mail.notifyAdminNewOrder(order).catch(() => undefined);

    return {
      orderNumber: order.orderNumber,
      status: order.status,
      totalGross: order.totalGross,
    };
  }

  /**
   * Sendungsverfolgung für Gäste. Die Kombination aus Bestellnummer und
   * E-Mail-Adresse dient als Nachweis – ohne beides gibt es keine Auskunft.
   */
  async track(orderNumber: string, email: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        orderNumber: orderNumber.toUpperCase().trim(),
        email: email.toLowerCase().trim(),
      },
      include: {
        events: { where: { isInternal: false }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!order) {
      throw new NotFoundException(
        'Zu dieser Kombination aus Bestellnummer und E-Mail-Adresse wurde keine Bestellung gefunden.',
      );
    }

    return {
      orderNumber: order.orderNumber,
      status: order.status,
      statusLabel: statusLabels[order.status],
      placedAt: order.createdAt.toISOString(),
      estimatedDelivery: order.estimatedDelivery?.toISOString(),
      carrier: order.carrier ?? undefined,
      events: order.events.map((event) => ({
        at: event.createdAt.toISOString(),
        label: event.label,
        description: event.description,
      })),
    };
  }

  // ── Adminfunktionen ──────────────────────────────────────────────────────

  async findAllForAdmin(params: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    search?: string;
  }) {
    const { page = 1, limit = 25, status, search } = params;

    const where: Prisma.OrderWhereInput = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { orderNumber: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { billingAddress: { lastName: { contains: search, mode: 'insensitive' } } },
              { billingAddress: { company: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        include: {
          items: true,
          billingAddress: true,
          shippingAddress: true,
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return { items, meta: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async findOneForAdmin(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        billingAddress: true,
        shippingAddress: true,
        payments: { orderBy: { createdAt: 'desc' } },
        events: { orderBy: { createdAt: 'desc' } },
        invoice: true,
      },
    });

    if (!order) throw new NotFoundException('Diese Bestellung existiert nicht.');
    return order;
  }

  /** Ändert den Status und legt einen Verlaufseintrag an. */
  async updateStatus(
    orderNumber: string,
    status: OrderStatus,
    options: { description?: string; carrier?: string; estimatedDelivery?: Date } = {},
  ) {
    const order = await this.findOneForAdmin(orderNumber);

    const updated = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status,
        ...(options.carrier ? { carrier: options.carrier } : {}),
        ...(options.estimatedDelivery ? { estimatedDelivery: options.estimatedDelivery } : {}),
        events: {
          create: {
            status,
            label: statusLabels[status],
            description: options.description ?? this.defaultDescription(status),
          },
        },
      },
      include: { items: true, billingAddress: true, shippingAddress: true, events: true },
    });

    void this.mail.sendStatusUpdate(updated).catch((error) => {
      this.logger.error(`Statusmail für ${orderNumber} fehlgeschlagen`, error);
    });

    return updated;
  }

  /** Kennzahlen für die Adminübersicht. */
  async stats() {
    const [total, open, thisMonth, revenue] = await this.prisma.$transaction([
      this.prisma.order.count(),
      this.prisma.order.count({
        where: {
          status: {
            in: [OrderStatus.EINGEGANGEN, OrderStatus.BEZAHLT, OrderStatus.IN_BEARBEITUNG],
          },
        },
      }),
      this.prisma.order.count({
        where: { createdAt: { gte: new Date(new Date().setDate(1)) } },
      }),
      this.prisma.order.aggregate({
        _sum: { totalGross: true },
        where: { status: { notIn: [OrderStatus.STORNIERT, OrderStatus.ERSTATTET] } },
      }),
    ]);

    return {
      totalOrders: total,
      openOrders: open,
      ordersThisMonth: thisMonth,
      revenueGross: revenue._sum.totalGross ?? 0,
    };
  }

  // ── intern ───────────────────────────────────────────────────────────────

  /**
   * Lieferkosten. Der längste Container bestimmt das Fahrzeug; jede weitere
   * Einheit fährt in derselben Tour mit und wird mit 60 % der Grundpauschale
   * angesetzt. Zubehör fährt kostenfrei mit.
   */
  private calculateShipping(
    postalCode: string,
    lines: { lengthMeters: number; quantity: number; isAccessory: boolean }[],
    orderValueNet: number,
  ): number {
    if (orderValueNet >= FREE_DELIVERY_THRESHOLD_NET) return 0;

    const containers = lines.filter((line) => !line.isAccessory);
    if (containers.length === 0) return 0;

    const maxLength = Math.max(...containers.map((line) => line.lengthMeters));
    const quote = quoteDelivery(postalCode, maxLength, orderValueNet);

    if (!quote) {
      throw new BadRequestException(
        'Für diese Postleitzahl können wir die Lieferkosten nicht berechnen. Bitte kontaktieren Sie uns.',
      );
    }

    const containerCount = containers.reduce((sum, line) => sum + line.quantity, 0);
    const extraUnits = Math.max(0, containerCount - 1);

    return quote.priceNet + Math.round(quote.priceNet * 0.6) * extraUnits;
  }

  private async resolveDiscount(code: string | undefined, subtotalNet: number): Promise<number> {
    if (!code) return 0;

    const coupon = await this.prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    // Ungültige Gutscheine werden stillschweigend ignoriert statt die
    // Bestellung abzubrechen – die Prüfung erfolgt bereits im Checkout.
    if (!coupon || !coupon.isActive) return 0;
    if (coupon.validUntil && coupon.validUntil < new Date()) return 0;
    if (coupon.validFrom > new Date()) return 0;
    if (coupon.maxRedemptions !== null && coupon.redemptions >= coupon.maxRedemptions) return 0;
    if (subtotalNet < coupon.minSubtotalNet) return 0;

    const discount =
      coupon.type === 'PERCENT' ? Math.round((subtotalNet * coupon.value) / 100) : coupon.value;

    // Der Rabatt darf den Warenwert nie übersteigen.
    return Math.min(discount, subtotalNet);
  }

  /**
   * Bestellnummer im Format EMC-JJJJ-NNNNN.
   * Der Zufallsanteil verhindert, dass sich aus der Nummer die Anzahl der
   * Bestellungen ablesen lässt.
   */
  private async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();

    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = `EMC-${year}-${String(randomInt(10000, 99999))}`;
      const exists = await this.prisma.order.findUnique({
        where: { orderNumber: candidate },
        select: { id: true },
      });
      if (!exists) return candidate;
    }

    // Praktisch unerreichbar; Zeitstempel als eindeutiger Notnagel.
    return `EMC-${year}-${Date.now().toString().slice(-8)}`;
  }

  private toAddressData(address: CreateOrderDto['billingAddress']) {
    return {
      firstName: address.firstName.trim(),
      lastName: address.lastName.trim(),
      company: address.company?.trim() || null,
      street: address.street.trim(),
      houseNumber: address.houseNumber.trim(),
      postalCode: address.postalCode.trim(),
      city: address.city.trim(),
      country: address.country ?? 'DE',
      phone: address.phone.trim(),
    };
  }

  private defaultDescription(status: OrderStatus): string {
    const descriptions: Record<OrderStatus, string> = {
      EINGEGANGEN: 'Ihre Bestellung ist bei uns eingegangen.',
      ZAHLUNG_AUSSTEHEND: 'Wir warten auf den Zahlungseingang.',
      BEZAHLT: 'Ihre Zahlung ist eingegangen. Wir bereiten die Auslieferung vor.',
      IN_BEARBEITUNG: 'Ihre Bestellung wird bearbeitet. Wir stimmen den Liefertermin mit Ihnen ab.',
      VERSANDBEREIT: 'Ihr Container ist versandbereit und für die Auslieferung eingeplant.',
      IN_ZUSTELLUNG: 'Ihr Container ist unterwegs. Am Vortag erhalten Sie ein Zeitfenster per SMS.',
      GELIEFERT: 'Ihr Container wurde zugestellt. Vielen Dank für Ihren Auftrag.',
      STORNIERT: 'Die Bestellung wurde storniert.',
      ERSTATTET: 'Der Betrag wurde erstattet.',
    };
    return descriptions[status];
  }
}

export { statusLabels };
