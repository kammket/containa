import { Injectable, Logger, UnauthorizedException, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { AdminRole, AdminUser } from '@prisma/client';
import argon2 from 'argon2';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service';

export interface JwtPayload {
  sub: string;
  email: string;
  role: AdminRole;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: { id: string; email: string; name: string; role: AdminRole };
}

/** Nach so vielen Fehlversuchen wird das Konto vorübergehend gesperrt. */
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    void this.warnIfNoAdmin();
  }

  /**
   * Meldet einen Administrator an.
   *
   * Wichtig für die Sicherheit: Bei unbekannter E-Mail wird trotzdem ein
   * Argon2-Vergleich gegen einen Dummy-Hash durchgeführt. Ohne das wäre an der
   * Antwortzeit ablesbar, welche Adressen existieren.
   */
  async login(email: string, password: string, meta: { ip?: string; userAgent?: string }) {
    const user = await this.prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      await this.dummyVerify();
      throw new UnauthorizedException('E-Mail-Adresse oder Passwort ist nicht korrekt.');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutes = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60_000);
      throw new UnauthorizedException(
        `Zu viele Fehlversuche. Das Konto ist noch ${minutes} Minute(n) gesperrt.`,
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Dieses Konto ist deaktiviert.');
    }

    const valid = await argon2.verify(user.passwordHash, password);

    if (!valid) {
      await this.registerFailedAttempt(user);
      throw new UnauthorizedException('E-Mail-Adresse oder Passwort ist nicht korrekt.');
    }

    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
    });

    return this.issueTokens(user, meta);
  }

  /**
   * Tauscht ein Refresh-Token gegen ein neues Tokenpaar.
   *
   * Die Tokens rotieren: Das alte wird beim Einlösen entwertet. Wird ein
   * bereits entwertetes Token erneut vorgelegt, deutet das auf Diebstahl hin –
   * dann werden alle Sitzungen des Kontos beendet.
   */
  async refresh(token: string, meta: { ip?: string; userAgent?: string }): Promise<AuthResult> {
    const tokenHash = this.hashToken(token);

    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!stored) {
      throw new UnauthorizedException('Die Sitzung ist ungültig. Bitte melden Sie sich erneut an.');
    }

    if (stored.revokedAt) {
      this.logger.warn(
        `Bereits eingelöstes Refresh-Token für ${stored.user.email} vorgelegt – alle Sitzungen werden beendet.`,
      );
      await this.revokeAllSessions(stored.userId);
      throw new UnauthorizedException(
        'Die Sitzung wurde aus Sicherheitsgründen beendet. Bitte melden Sie sich erneut an.',
      );
    }

    if (stored.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'Die Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
      );
    }

    if (!stored.user.isActive) {
      throw new UnauthorizedException('Dieses Konto ist deaktiviert.');
    }

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokens(stored.user, meta);
  }

  async logout(token: string) {
    const tokenHash = this.hashToken(token);
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllSessions(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /** Entfernt abgelaufene und entwertete Tokens – täglich per Cronjob. */
  async pruneExpiredTokens() {
    const cutoff = new Date(Date.now() - REFRESH_TOKEN_TTL_MS);
    const { count } = await this.prisma.refreshToken.deleteMany({
      where: { OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { lt: cutoff } }] },
    });
    if (count > 0) this.logger.log(`${count} abgelaufene Refresh-Tokens entfernt`);
    return count;
  }

  static hashPassword(password: string) {
    // Argon2id mit bewusst großzügigen Parametern – Logins sind selten,
    // die zusätzliche Rechenzeit fällt praktisch nicht ins Gewicht.
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19_456,
      timeCost: 2,
      parallelism: 1,
    });
  }

  // ── intern ───────────────────────────────────────────────────────────────

  private async issueTokens(
    user: AdminUser,
    meta: { ip?: string; userAgent?: string },
  ): Promise<AuthResult> {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };

    const accessTtl = this.config.get<string>('JWT_EXPIRES_IN', '15m');
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_SECRET'),
      // jsonwebtoken typisiert expiresIn als Literal-Union ("15m" | …);
      // der Wert stammt aus der Konfiguration und ist deshalb ein String.
      expiresIn: accessTtl as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });

    const refreshToken = randomBytes(48).toString('base64url');

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: this.hashToken(refreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        ipAddress: meta.ip,
        userAgent: meta.userAgent?.slice(0, 255),
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.parseTtlSeconds(accessTtl),
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }

  private async registerFailedAttempt(user: AdminUser) {
    const attempts = user.failedLoginAttempts + 1;
    const shouldLock = attempts >= MAX_FAILED_ATTEMPTS;

    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: shouldLock ? 0 : attempts,
        lockedUntil: shouldLock ? new Date(Date.now() + LOCK_DURATION_MS) : null,
      },
    });

    if (shouldLock) {
      this.logger.warn(`Konto ${user.email} nach ${MAX_FAILED_ATTEMPTS} Fehlversuchen gesperrt.`);
    }
  }

  /** Gleicht die Antwortzeit bei unbekannter E-Mail an einen echten Versuch an. */
  private async dummyVerify() {
    const dummy =
      '$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHR2YWx1ZQ$Vy1WY2h1bmtvZmJ5dGVzZm9ydGltaW5n';
    try {
      await argon2.verify(dummy, 'dummy-password');
    } catch {
      // Erwartet – es geht ausschließlich um die verstrichene Zeit.
    }
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  /** Konstantzeitvergleich für Tokens außerhalb der Datenbank. */
  static safeEqual(a: string, b: string) {
    const bufferA = Buffer.from(a);
    const bufferB = Buffer.from(b);
    if (bufferA.length !== bufferB.length) return false;
    return timingSafeEqual(bufferA, bufferB);
  }

  private parseTtlSeconds(ttl: string): number {
    const match = /^(\d+)([smhd])$/.exec(ttl);
    if (!match) return 900;
    const value = Number(match[1]);
    const unit = match[2];
    const factor = unit === 's' ? 1 : unit === 'm' ? 60 : unit === 'h' ? 3600 : 86400;
    return value * factor;
  }

  private async warnIfNoAdmin() {
    try {
      const count = await this.prisma.adminUser.count();
      if (count === 0) {
        this.logger.warn(
          'Es existiert kein Administrator. Legen Sie einen an mit: npm run db:seed --workspace=@emc/api',
        );
      }
    } catch {
      // Datenbank noch nicht migriert – beim Start unkritisch.
    }
  }
}
