import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CustomerType, InquiryStatus, InquiryType, Prisma } from '@prisma/client';
import { randomInt } from 'node:crypto';

import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateContactDto } from './dto/create-contact.dto';
import type { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class InquiriesService {
  private readonly logger = new Logger(InquiriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  /** Kontaktanfrage aus dem Kontaktformular. */
  async createContact(dto: CreateContactDto) {
    const inquiry = await this.prisma.inquiry.create({
      data: {
        reference: await this.generateReference('ANF'),
        type: InquiryType.KONTAKT,
        name: dto.name.trim(),
        email: dto.email.toLowerCase().trim(),
        phone: dto.phone?.trim(),
        company: dto.company?.trim(),
        postalCode: dto.postalCode?.trim(),
        subject: dto.subject,
        message: dto.message.trim(),
      },
    });

    // Zustellprobleme dürfen die Anfrage nicht verwerfen – sie liegt bereits
    // in der Datenbank und ist im Adminbereich sichtbar.
    void this.mail.sendContactAcknowledgement(inquiry).catch((error) => {
      this.logger.error(`Bestätigung für ${inquiry.reference} fehlgeschlagen`, error);
    });
    void this.mail.notifyAdminInquiry(inquiry).catch(() => undefined);

    return { id: inquiry.id, reference: inquiry.reference };
  }

  /** Angebotsanfrage aus dem Anfrageformular. */
  async createQuote(dto: CreateQuoteDto) {
    const inquiry = await this.prisma.inquiry.create({
      data: {
        reference: await this.generateReference('ANG'),
        type: InquiryType.ANGEBOT,
        name: dto.name.trim(),
        email: dto.email.toLowerCase().trim(),
        phone: dto.phone.trim(),
        company: dto.company?.trim(),
        customerType:
          dto.customerType === 'gewerblich' ? CustomerType.GEWERBLICH : CustomerType.PRIVAT,
        productSlug: dto.productSlug,
        size: dto.size,
        condition: dto.condition,
        quantity: dto.quantity,
        postalCode: dto.postalCode.trim(),
        deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null,
        usage: dto.usage,
        message: dto.message?.trim(),
      },
    });

    void this.mail.sendQuoteAcknowledgement(inquiry).catch((error) => {
      this.logger.error(`Bestätigung für ${inquiry.reference} fehlgeschlagen`, error);
    });
    void this.mail.notifyAdminInquiry(inquiry).catch(() => undefined);

    return { id: inquiry.id, reference: inquiry.reference };
  }

  // ── Adminfunktionen ──────────────────────────────────────────────────────

  async findAll(params: {
    page?: number;
    limit?: number;
    type?: InquiryType;
    status?: InquiryStatus;
    search?: string;
  }) {
    const { page = 1, limit = 25, type, status, search } = params;

    const where: Prisma.InquiryWhereInput = {
      ...(type ? { type } : {}),
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { reference: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { company: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.inquiry.findMany({
        where,
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inquiry.count({ where }),
    ]);

    return { items, meta: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) throw new NotFoundException('Diese Anfrage existiert nicht.');
    return inquiry;
  }

  async updateStatus(id: string, status: InquiryStatus, internalNote?: string) {
    await this.findOne(id);

    return this.prisma.inquiry.update({
      where: { id },
      data: {
        status,
        ...(internalNote !== undefined ? { internalNote } : {}),
        ...(status === InquiryStatus.BEANTWORTET || status === InquiryStatus.GESCHLOSSEN
          ? { handledAt: new Date() }
          : {}),
      },
    });
  }

  /** Zählt offene Anfragen – für den Zähler in der Adminnavigation. */
  async stats() {
    const [newContact, newQuote, total] = await this.prisma.$transaction([
      this.prisma.inquiry.count({
        where: { type: InquiryType.KONTAKT, status: InquiryStatus.NEU },
      }),
      this.prisma.inquiry.count({
        where: { type: InquiryType.ANGEBOT, status: InquiryStatus.NEU },
      }),
      this.prisma.inquiry.count(),
    ]);

    return { newContact, newQuote, newTotal: newContact + newQuote, total };
  }

  // ── intern ───────────────────────────────────────────────────────────────

  private async generateReference(prefix: string): Promise<string> {
    const year = new Date().getFullYear();

    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = `${prefix}-${year}-${String(randomInt(1000, 9999))}`;
      const exists = await this.prisma.inquiry.findUnique({
        where: { reference: candidate },
        select: { id: true },
      });
      if (!exists) return candidate;
    }

    return `${prefix}-${year}-${Date.now().toString().slice(-6)}`;
  }
}
