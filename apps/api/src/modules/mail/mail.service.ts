import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Address, Inquiry, Order, OrderItem } from '@prisma/client';
import { brand, contact, formatPrice } from '@emc/catalog';
import nodemailer, { type Transporter } from 'nodemailer';

import { layout, orderConfirmationBody, statusUpdateBody } from './templates/order.template';
import { contactAcknowledgementBody, quoteAcknowledgementBody } from './templates/inquiry.template';

type OrderWithRelations = Order & {
  items: OrderItem[];
  billingAddress?: Address | null;
  shippingAddress?: Address | null;
};

/**
 * E-Mail-Versand über SMTP.
 *
 * Ist kein SMTP konfiguriert (lokale Entwicklung, CI), wird die E-Mail
 * lediglich protokolliert statt versendet. So bleibt der Bestellprozess auch
 * ohne Mailserver vollständig testbar.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');

    if (!host) {
      this.logger.warn(
        'Kein SMTP_HOST konfiguriert – E-Mails werden nur protokolliert, nicht versendet.',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: this.config.get<number>('SMTP_PORT', 587),
      secure: this.config.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASSWORD'),
      },
      pool: true,
      maxConnections: 3,
    });
  }

  async sendOrderConfirmation(order: OrderWithRelations) {
    await this.send({
      to: order.email,
      subject: `Ihre Bestellung ${order.orderNumber} bei ${brand.name}`,
      html: layout(orderConfirmationBody(order)),
    });
  }

  async sendStatusUpdate(order: OrderWithRelations) {
    await this.send({
      to: order.email,
      subject: `Bestellung ${order.orderNumber} – Statusaktualisierung`,
      html: layout(statusUpdateBody(order)),
    });
  }

  async sendContactAcknowledgement(inquiry: Inquiry) {
    await this.send({
      to: inquiry.email,
      subject: `Ihre Anfrage ${inquiry.reference} ist eingegangen`,
      html: layout(contactAcknowledgementBody(inquiry)),
    });
  }

  async sendQuoteAcknowledgement(inquiry: Inquiry) {
    await this.send({
      to: inquiry.email,
      subject: `Ihre Angebotsanfrage ${inquiry.reference} ist eingegangen`,
      html: layout(quoteAcknowledgementBody(inquiry)),
    });
  }

  /** Interne Benachrichtigung an das Team bei neuer Bestellung. */
  async notifyAdminNewOrder(order: OrderWithRelations) {
    const recipient = this.config.get<string>('ADMIN_NOTIFY_EMAIL') ?? contact.salesEmail;

    const lines = order.items
      .map((item) => `• ${item.quantity} × ${item.name} (${item.sku})`)
      .join('\n');

    await this.send({
      to: recipient,
      subject: `Neue Bestellung ${order.orderNumber} · ${formatPrice(order.totalGross)}`,
      text: [
        `Neue Bestellung: ${order.orderNumber}`,
        `Kunde: ${order.email}`,
        `Betrag: ${formatPrice(order.totalGross)} brutto`,
        `Lieferort: ${order.shippingAddress?.postalCode ?? '–'} ${order.shippingAddress?.city ?? ''}`,
        '',
        'Positionen:',
        lines,
        '',
        order.deliveryNotes ? `Hinweise: ${order.deliveryNotes}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }

  /** Interne Benachrichtigung bei neuer Kontakt- oder Angebotsanfrage. */
  async notifyAdminInquiry(inquiry: Inquiry) {
    const recipient = this.config.get<string>('ADMIN_NOTIFY_EMAIL') ?? contact.salesEmail;
    const isQuote = inquiry.type === 'ANGEBOT';

    await this.send({
      to: recipient,
      subject: `${isQuote ? 'Angebotsanfrage' : 'Kontaktanfrage'} ${inquiry.reference} von ${inquiry.name}`,
      text: [
        `Referenz: ${inquiry.reference}`,
        `Name: ${inquiry.name}`,
        `E-Mail: ${inquiry.email}`,
        inquiry.phone ? `Telefon: ${inquiry.phone}` : '',
        inquiry.company ? `Firma: ${inquiry.company}` : '',
        '',
        isQuote
          ? [
              `Größe: ${inquiry.size}`,
              `Zustand: ${inquiry.condition}`,
              `Anzahl: ${inquiry.quantity}`,
              `PLZ: ${inquiry.postalCode}`,
              inquiry.usage ? `Verwendung: ${inquiry.usage}` : '',
              inquiry.deliveryDate
                ? `Wunschtermin: ${inquiry.deliveryDate.toLocaleDateString('de-DE')}`
                : '',
            ]
              .filter(Boolean)
              .join('\n')
          : `Betreff: ${inquiry.subject}`,
        '',
        inquiry.message ?? '',
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }

  // ── intern ───────────────────────────────────────────────────────────────

  private async send(options: { to: string; subject: string; html?: string; text?: string }) {
    const from = this.config.get<string>('SMTP_FROM') ?? `${brand.name} <${contact.email}>`;

    if (!this.transporter) {
      this.logger.log(
        `[E-Mail nicht versendet – kein SMTP] An: ${options.to} · ${options.subject}`,
      );
      return;
    }

    try {
      await this.transporter.sendMail({
        from,
        replyTo: contact.email,
        ...options,
      });
      this.logger.log(`E-Mail versendet an ${options.to}: ${options.subject}`);
    } catch (error) {
      this.logger.error(`E-Mail an ${options.to} fehlgeschlagen`, error);
      throw error;
    }
  }
}
