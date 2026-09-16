import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Address, Inquiry, Order, OrderItem } from '@prisma/client';
import { brand, contact, formatPrice } from '@emc/catalog';
import nodemailer, { type Transporter } from 'nodemailer';

import { layout, orderConfirmationBody, statusUpdateBody } from './templates/order.template';
import { contactAcknowledgementBody, quoteAcknowledgementBody } from './templates/inquiry.template';
import {
  adminInquiryNotificationBody,
  adminNewsletterNotificationBody,
  adminOrderNotificationBody,
} from './templates/admin.template';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

type OrderWithRelations = Order & {
  items: OrderItem[];
  billingAddress?: Address | null;
  shippingAddress?: Address | null;
};

/**
 * E-Mail-Versand.
 *
 * Drei Betriebsarten, in dieser Reihenfolge:
 *
 * 1. `RESEND_API_KEY` gesetzt → Versand über die HTTP-API von Resend.
 * 2. sonst `SMTP_HOST` gesetzt → Versand über SMTP.
 * 3. sonst → die E-Mail wird nur protokolliert.
 *
 * Der dritte Fall ist Absicht: Lokale Entwicklung und CI sollen den kompletten
 * Bestell- und Anfragepfad durchlaufen können, ohne dass Zugangsdaten vorliegen
 * oder versehentlich echte E-Mails hinausgehen.
 *
 * Resend spricht reines HTTP, deshalb genügt `fetch` – ein zusätzliches Paket
 * für einen einzigen POST-Aufruf wäre unnötiger Ballast.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;
  private readonly resendApiKey?: string;

  constructor(private readonly config: ConfigService) {
    this.resendApiKey = this.config.get<string>('RESEND_API_KEY')?.trim() || undefined;

    if (this.resendApiKey) {
      this.logger.log(`E-Mail-Versand über Resend, Absender: ${this.from()}`);
      return;
    }

    const host = this.config.get<string>('SMTP_HOST');

    if (!host) {
      this.logger.warn(
        'Weder RESEND_API_KEY noch SMTP_HOST konfiguriert – E-Mails werden nur protokolliert.',
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
    await this.send({
      to: this.adminRecipient(),
      subject: `Neue Bestellung ${order.orderNumber} · ${formatPrice(order.totalGross)}`,
      html: layout(adminOrderNotificationBody(order, this.appUrl())),
      replyTo: order.email,
    });
  }

  /** Interne Benachrichtigung bei neuer Kontakt- oder Angebotsanfrage. */
  async notifyAdminInquiry(inquiry: Inquiry) {
    const isQuote = inquiry.type === 'ANGEBOT';

    await this.send({
      to: this.adminRecipient(),
      subject: `${isQuote ? 'Angebotsanfrage' : 'Kontaktanfrage'} ${inquiry.reference} von ${inquiry.name}`,
      html: layout(adminInquiryNotificationBody(inquiry, this.appUrl())),
      // Antworten gehen direkt an die anfragende Person, nicht an den Shop.
      replyTo: inquiry.email,
    });
  }

  /** Interne Benachrichtigung bei neuer Newsletter-Anmeldung. */
  async notifyAdminNewsletter(email: string) {
    await this.send({
      to: this.adminRecipient(),
      subject: `Neue Newsletter-Anmeldung: ${email}`,
      html: layout(adminNewsletterNotificationBody(email, this.appUrl())),
      replyTo: email,
    });
  }

  // ── intern ───────────────────────────────────────────────────────────────

  private adminRecipient(): string {
    return this.config.get<string>('ADMIN_NOTIFY_EMAIL') ?? contact.salesEmail;
  }

  private appUrl(): string | undefined {
    return this.config.get<string>('APP_URL');
  }

  /**
   * Absender. Muss bei Resend auf einer dort verifizierten Domain liegen,
   * sonst lehnt die API den Versand ab.
   */
  private from(): string {
    return (
      this.config.get<string>('MAIL_FROM') ??
      this.config.get<string>('SMTP_FROM') ??
      `${brand.name} <${contact.email}>`
    );
  }

  private async send(options: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
  }) {
    const { replyTo, ...content } = options;
    const from = this.from();

    if (this.resendApiKey) {
      await this.sendViaResend({ ...content, from, replyTo: replyTo ?? contact.email });
      return;
    }

    if (!this.transporter) {
      this.logger.log(
        `[E-Mail nicht versendet – kein Versandweg] An: ${options.to} · ${options.subject}`,
      );
      return;
    }

    try {
      await this.transporter.sendMail({
        from,
        replyTo: replyTo ?? contact.email,
        ...content,
      });
      this.logger.log(`E-Mail versendet an ${options.to}: ${options.subject}`);
    } catch (error) {
      this.logger.error(`E-Mail an ${options.to} fehlgeschlagen`, error);
      throw error;
    }
  }

  private async sendViaResend(message: {
    from: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
    replyTo: string;
  }) {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: message.from,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        reply_to: message.replyTo,
      }),
      // Ohne Zeitlimit könnte eine hängende Verbindung den Aufrufer blockieren.
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      // Der Fehlertext von Resend benennt die Ursache konkret, etwa eine nicht
      // verifizierte Absenderdomain. Er gehört ins Protokoll.
      const detail = await response.text().catch(() => '');
      this.logger.error(
        `Resend lehnte die E-Mail an ${message.to} ab (HTTP ${response.status}): ${detail}`,
      );
      throw new Error(`Resend antwortete mit HTTP ${response.status}`);
    }

    const result = (await response.json().catch(() => ({}))) as { id?: string };
    this.logger.log(
      `E-Mail versendet an ${message.to}: ${message.subject}${result.id ? ` (Resend-ID ${result.id})` : ''}`,
    );
  }
}
