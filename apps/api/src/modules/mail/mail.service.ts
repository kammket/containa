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

  /**
   * Liest einen Wert aus der Umgebung und entfernt umschließende
   * Anführungszeichen.
   *
   * In einer .env-Datei sind Anführungszeichen üblich und werden vom Parser
   * entfernt; trägt man denselben Wert in der Oberfläche eines Hosters ein,
   * bleiben sie Teil des Werts. Ein Absender `"EMC Container <…>"` wird von
   * Resend abgelehnt – ein Fehler, der schwer zu sehen ist, weil er erst beim
   * Versand auftritt.
   */
  private setting(key: string): string | undefined {
    const value = this.config.get<string>(key)?.trim();
    if (!value) return undefined;
    return value.replace(/^(['"])(.*)\1$/s, '$2').trim() || undefined;
  }

  constructor(private readonly config: ConfigService) {
    this.resendApiKey = this.setting('RESEND_API_KEY');

    if (this.resendApiKey) {
      this.logger.log(`E-Mail-Versand über Resend, Absender: ${this.from()}`);
      return;
    }

    const host = this.setting('SMTP_HOST');

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
      from: this.notificationFrom(),
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
      from: this.notificationFrom(),
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
      from: this.notificationFrom(),
      html: layout(adminNewsletterNotificationBody(email, this.appUrl())),
      replyTo: email,
    });
  }

  // ── intern ───────────────────────────────────────────────────────────────

  private adminRecipient(): string {
    return this.setting('ADMIN_NOTIFY_EMAIL') ?? contact.salesEmail;
  }

  private appUrl(): string | undefined {
    return this.setting('APP_URL');
  }

  /**
   * Zustand des Versandwegs – ohne Geheimnisse.
   *
   * Dient der Fehlersuche im Betrieb: Ob eine E-Mail hinausgeht, entscheidet
   * sich in der Umgebung des laufenden Dienstes. Ohne diese Auskunft bleibt
   * als Erklärung für eine ausbleibende Nachricht nur Raten.
   */
  describeTransport() {
    return {
      mode: this.resendApiKey ? 'resend' : this.transporter ? 'smtp' : 'log',
      from: this.from(),
      notificationFrom: this.notificationFrom(),
      adminRecipient: this.adminRecipient(),
      resendKeyConfigured: Boolean(this.resendApiKey),
      resendKeyHint: this.resendApiKey ? `${this.resendApiKey.slice(0, 5)}…` : null,
      appUrl: this.appUrl() ?? null,
    };
  }

  /**
   * Verschickt eine Testnachricht und meldet den tatsächlichen Ausgang zurück,
   * statt ihn nur zu protokollieren.
   */
  async sendTestEmail(to?: string) {
    const recipient = to?.trim() || this.adminRecipient();
    try {
      await this.send({
        to: recipient,
        subject: 'Testnachricht aus dem Adminbereich',
        html: layout(
          '<p style="margin:0;font-size:15px;line-height:1.6;color:#212529;">' +
            'Diese Nachricht wurde aus dem Adminbereich ausgelöst. Kommt sie an, ' +
            'funktionieren Zugangsdaten, Absenderdomain und Zustellung.</p>',
        ),
      });
      return { ok: true, ...this.describeTransport() };
    } catch (error) {
      return {
        ok: false,
        ...this.describeTransport(),
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Absender. Muss bei Resend auf einer dort verifizierten Domain liegen,
   * sonst lehnt die API den Versand ab.
   */
  private from(): string {
    return (
      this.setting('MAIL_FROM') ?? this.setting('SMTP_FROM') ?? `${brand.name} <${contact.email}>`
    );
  }

  /**
   * Absender der internen Benachrichtigungen.
   *
   * Bewusst **nicht** dieselbe Adresse wie der Empfänger: Läuft eine Nachricht
   * von `contact@` an `contact@`, sieht das Postfach eine Mail von einem selbst.
   * Etliche Programme beantworten sie dann an den Empfänger statt an
   * `Reply-To` – die Antwort ginge an das eigene Postfach statt an die
   * Kundschaft. Eine eigene Absenderadresse auf derselben Domain vermeidet das;
   * ein Postfach dafür ist nicht nötig, die Domainverifizierung genügt.
   */
  private notificationFrom(): string {
    const configured = this.setting('MAIL_FROM_NOTIFICATIONS');
    if (configured) return configured;

    const domain = this.from().match(/@([^>\s]+)/)?.[1];
    return domain ? `${brand.name} Benachrichtigung <benachrichtigung@${domain}>` : this.from();
  }

  private async send(options: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
    from?: string;
  }) {
    const { replyTo, from: fromOverride, ...content } = options;
    const from = fromOverride ?? this.from();

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
