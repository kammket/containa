import { Injectable, Logger } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  /**
   * Double-Opt-in nach § 7 UWG: Die Anmeldung wird erst nach Bestätigung
   * über den Link in der E-Mail wirksam.
   *
   * Die Antwort ist bewusst immer gleich – ob eine Adresse bereits eingetragen
   * ist, darf sich nicht aus der Antwort ablesen lassen.
   */
  async subscribe(email: string, ipAddress?: string) {
    const normalized = email.toLowerCase().trim();
    const confirmToken = randomBytes(32).toString('base64url');

    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: normalized },
    });

    if (existing?.confirmedAt && !existing.unsubscribedAt) {
      return { status: 'pending' };
    }

    await this.prisma.newsletterSubscriber.upsert({
      where: { email: normalized },
      create: { email: normalized, confirmToken, ipAddress },
      update: { confirmToken, unsubscribedAt: null },
    });

    // TODO Betrieb: Bestätigungsmail mit diesem Token an die Anmeldeadresse
    // versenden. Ohne sie kann niemand bestätigen, die Anmeldung bleibt offen.
    this.logger.log(`Bestätigungslink für ${normalized} erzeugt`);

    // Die interne Benachrichtigung hängt nicht an der Bestätigung: Sie meldet,
    // dass sich jemand eingetragen hat. Ein Zustellfehler darf die Anmeldung
    // nicht verwerfen – sie steht bereits in der Datenbank.
    void this.mail.notifyAdminNewsletter(normalized).catch((error) => {
      this.logger.error(`Benachrichtigung zu ${normalized} fehlgeschlagen`, error);
    });

    return { status: 'pending' };
  }

  async confirm(token: string) {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { confirmToken: token },
    });

    if (!subscriber) return { status: 'invalid' };

    await this.prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: { confirmedAt: new Date(), confirmToken: null },
    });

    return { status: 'confirmed' };
  }

  async unsubscribe(email: string) {
    await this.prisma.newsletterSubscriber.updateMany({
      where: { email: email.toLowerCase().trim() },
      data: { unsubscribedAt: new Date() },
    });
    return { status: 'unsubscribed' };
  }
}
