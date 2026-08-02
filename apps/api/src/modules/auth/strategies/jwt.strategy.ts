import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';
import type { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * Prüft bei jeder Anfrage gegen die Datenbank, ob das Konto noch aktiv ist.
   * Damit wirkt eine Deaktivierung sofort und nicht erst nach Ablauf des Tokens.
   */
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.prisma.adminUser.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (!user?.isActive) {
      throw new UnauthorizedException('Dieses Konto ist nicht mehr aktiv.');
    }

    return { sub: user.id, email: user.email, role: user.role };
  }
}
