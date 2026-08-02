import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import type { Address, Invoice, Order, OrderItem } from '@prisma/client';
import { address as companyAddress, bank, brand, contact, formatPrice, legal } from '@emc/catalog';
import PDFDocument from 'pdfkit';

import { PrismaService } from '../prisma/prisma.service';

type OrderWithRelations = Order & {
  items: OrderItem[];
  billingAddress: Address | null;
  invoice: Invoice | null;
};

/** Zahlungsziel für Rechnungskauf in Tagen. */
const PAYMENT_TERM_DAYS = 14;

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Liefert die Rechnung zu einer Bestellung und legt sie an, falls sie noch
   * nicht existiert. Rechnungsnummern werden fortlaufend und lückenlos
   * vergeben – das verlangen die GoBD.
   */
  async getOrCreate(orderNumber: string) {
    const order = (await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true, billingAddress: true, invoice: true },
    })) as OrderWithRelations | null;

    if (!order) throw new NotFoundException('Diese Bestellung existiert nicht.');
    if (order.invoice) return order.invoice;

    const netAmount = order.subtotalNet - order.discountNet + order.shippingNet;

    return this.prisma.invoice.create({
      data: {
        invoiceNumber: await this.nextInvoiceNumber(),
        orderId: order.id,
        dueAt: new Date(Date.now() + PAYMENT_TERM_DAYS * 24 * 60 * 60 * 1000),
        netAmount,
        vatAmount: order.vatAmount,
        grossAmount: order.totalGross,
      },
    });
  }

  /** Erzeugt das Rechnungs-PDF als Buffer. */
  async renderPdf(orderNumber: string): Promise<{ buffer: Buffer; filename: string }> {
    const order = (await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true, billingAddress: true, invoice: true },
    })) as OrderWithRelations | null;

    if (!order) throw new NotFoundException('Diese Bestellung existiert nicht.');

    const invoice = order.invoice ?? (await this.getOrCreate(orderNumber));
    const buffer = await this.buildPdf(order, invoice);

    return { buffer, filename: `Rechnung-${invoice.invoiceNumber}.pdf` };
  }

  // ── intern ───────────────────────────────────────────────────────────────

  /**
   * Fortlaufende Rechnungsnummer im Format RE-JJJJ-NNNN.
   *
   * Anders als bei Bestellnummern ist Zufall hier unzulässig: Rechnungsnummern
   * müssen nach GoBD lückenlos und nachvollziehbar aufsteigend sein.
   */
  private async nextInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `RE-${year}-`;

    const last = await this.prisma.invoice.findFirst({
      where: { invoiceNumber: { startsWith: prefix } },
      orderBy: { invoiceNumber: 'desc' },
      select: { invoiceNumber: true },
    });

    const lastSequence = last ? Number(last.invoiceNumber.slice(prefix.length)) : 0;
    return `${prefix}${String(lastSequence + 1).padStart(4, '0')}`;
  }

  private buildPdf(order: OrderWithRelations, invoice: Invoice): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const navy = '#111d2e';
      const grey = '#6b7280';
      const left = 50;
      const right = 545;

      // Kopf
      doc.fillColor(navy).fontSize(20).font('Helvetica-Bold').text('EMC Container', left, 50);
      doc
        .fillColor(grey)
        .fontSize(8)
        .font('Helvetica')
        .text('Seecontainer für Deutschland', left, 74);

      doc
        .fontSize(8)
        .text(brand.legalName, right - 200, 50, { width: 200, align: 'right' })
        .text(companyAddress.street, { width: 200, align: 'right' })
        .text(`${companyAddress.postalCode} ${companyAddress.city}`, { width: 200, align: 'right' })
        .text(contact.phoneDisplay, { width: 200, align: 'right' })
        .text(contact.email, { width: 200, align: 'right' });

      // Anschriftenfeld
      const billing = order.billingAddress;
      doc.fillColor('#000000').fontSize(9).font('Helvetica');
      let y = 140;

      if (billing) {
        if (billing.company) {
          doc.text(billing.company, left, y);
          y += 13;
        }
        doc.text(`${billing.firstName} ${billing.lastName}`, left, y);
        y += 13;
        doc.text(`${billing.street} ${billing.houseNumber}`, left, y);
        y += 13;
        doc.text(`${billing.postalCode} ${billing.city}`, left, y);
      }

      // Rechnungskopf
      doc.fillColor(navy).fontSize(16).font('Helvetica-Bold').text('Rechnung', left, 230);

      doc.fillColor('#000000').fontSize(9).font('Helvetica');
      const metaY = 230;
      doc.text(`Rechnungsnummer: ${invoice.invoiceNumber}`, right - 200, metaY, {
        width: 200,
        align: 'right',
      });
      doc.text(`Rechnungsdatum: ${invoice.issuedAt.toLocaleDateString('de-DE')}`, {
        width: 200,
        align: 'right',
      });
      doc.text(`Bestellnummer: ${order.orderNumber}`, { width: 200, align: 'right' });
      doc.text(`Bestelldatum: ${order.createdAt.toLocaleDateString('de-DE')}`, {
        width: 200,
        align: 'right',
      });
      if (order.vatId) {
        doc.text(`USt-IdNr. Kunde: ${order.vatId}`, { width: 200, align: 'right' });
      }

      // Positionstabelle
      y = 300;
      doc.rect(left, y, right - left, 20).fill('#f3f4f6');
      doc.fillColor(navy).fontSize(8).font('Helvetica-Bold');
      doc.text('Pos.', left + 6, y + 6);
      doc.text('Bezeichnung', left + 40, y + 6);
      doc.text('Menge', 360, y + 6, { width: 40, align: 'right' });
      doc.text('Einzelpreis', 405, y + 6, { width: 65, align: 'right' });
      doc.text('Gesamt', 475, y + 6, { width: 64, align: 'right' });

      y += 26;
      doc.font('Helvetica').fillColor('#000000').fontSize(9);

      order.items.forEach((item, index) => {
        doc.text(String(index + 1), left + 6, y);
        doc.text(item.name, left + 40, y, { width: 310 });
        doc
          .fontSize(7)
          .fillColor(grey)
          .text(`Art.-Nr. ${item.sku}`, left + 40, y + 11);
        doc.fontSize(9).fillColor('#000000');
        doc.text(String(item.quantity), 360, y, { width: 40, align: 'right' });
        doc.text(formatPrice(item.priceNet), 405, y, { width: 65, align: 'right' });
        doc.text(formatPrice(item.lineNet), 475, y, { width: 64, align: 'right' });

        y += 30;
        doc
          .strokeColor('#e5e7eb')
          .lineWidth(0.5)
          .moveTo(left, y - 8)
          .lineTo(right, y - 8)
          .stroke();
      });

      // Summen
      y += 10;
      const sumLabel = 380;
      const sumValue = 475;

      const line = (label: string, value: string, bold = false) => {
        doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(bold ? 11 : 9);
        doc.text(label, sumLabel, y, { width: 90, align: 'right' });
        doc.text(value, sumValue, y, { width: 64, align: 'right' });
        y += bold ? 20 : 15;
      };

      line('Zwischensumme:', formatPrice(order.subtotalNet));
      if (order.discountNet > 0) line('Rabatt:', `− ${formatPrice(order.discountNet)}`);
      line('Lieferung:', order.shippingNet === 0 ? 'kostenlos' : formatPrice(order.shippingNet));
      line('Nettobetrag:', formatPrice(invoice.netAmount));
      line('zzgl. 19 % MwSt.:', formatPrice(order.vatAmount));

      doc.strokeColor(navy).lineWidth(1).moveTo(sumLabel, y).lineTo(right, y).stroke();
      y += 8;
      doc.fillColor(navy);
      line('Gesamtbetrag:', formatPrice(order.totalGross), true);

      // Zahlungshinweis
      y += 20;
      doc.fillColor('#000000').font('Helvetica').fontSize(9);
      doc.text(
        `Zahlbar bis ${invoice.dueAt.toLocaleDateString('de-DE')} ohne Abzug auf folgendes Konto:`,
        left,
        y,
      );
      y += 15;
      doc.fontSize(8).fillColor(grey);
      doc.text(`${bank.accountHolder} · ${bank.bankName}`, left, y);
      y += 11;
      doc.text(`IBAN ${bank.iban} · BIC ${bank.bic}`, left, y);
      y += 11;
      doc.text(`Verwendungszweck: ${invoice.invoiceNumber}`, left, y);

      // Fußzeile
      //
      // `lineBreak: false` verhindert, dass ein Umbruch eine zweite Seite
      // erzeugt; die Startposition ist so gewählt, dass zwei Zeilen innerhalb
      // des Satzspiegels bleiben.
      doc.fontSize(7).fillColor(grey);
      doc.text(
        `${brand.legalName} · ${companyAddress.street} · ${companyAddress.postalCode} ${companyAddress.city} · ` +
          `Geschäftsführer: ${legal.managingDirector}`,
        left,
        756,
        { width: right - left, align: 'center', lineBreak: false },
      );
      doc.text(
        `${legal.registerCourt} ${legal.registerNumber} · USt-IdNr. ${legal.vatId} · ` +
          `${contact.phoneDisplay} · ${contact.email}`,
        left,
        767,
        { width: right - left, align: 'center', lineBreak: false },
      );

      doc.end();
    });
  }
}
