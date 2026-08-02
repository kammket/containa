import { Injectable, Logger } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

/** Felder, die niemals ins Änderungsprotokoll gelangen dürfen. */
const REDACTED_FIELDS = ['password', 'passwordHash', 'token', 'secret', 'apiKey'];

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Protokolliert eine administrative Änderung.
   *
   * Fehler beim Protokollieren dürfen die eigentliche Aktion nie scheitern
   * lassen – sie werden geloggt und verworfen.
   */
  async log(
    userId: string | null,
    action: string,
    entity: string,
    entityId?: string,
    changes?: Record<string, unknown>,
    ipAddress?: string,
  ) {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId,
          action,
          entity,
          entityId,
          changes: changes ? (this.redact(changes) as Prisma.InputJsonValue) : undefined,
          ipAddress,
        },
      });
    } catch (error) {
      this.logger.error(`Änderungsprotokoll für ${entity}/${entityId} fehlgeschlagen`, error);
    }
  }

  async findAll(params: { page?: number; limit?: number; entity?: string }) {
    const { page = 1, limit = 50, entity } = params;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        where: entity ? { entity } : {},
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.auditLog.count({ where: entity ? { entity } : {} }),
    ]);

    return { items, meta: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  private redact(changes: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(changes).map(([key, value]) => [
        key,
        REDACTED_FIELDS.some((field) => key.toLowerCase().includes(field.toLowerCase()))
          ? '[entfernt]'
          : value,
      ]),
    );
  }
}
