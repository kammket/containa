import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AdminRole } from '@prisma/client';

import { ROLES_KEY } from '../decorators/roles.decorator';
import type { JwtPayload } from '../auth.service';

/**
 * Rollenprüfung. Wird kein `@Roles()` gesetzt, genügt eine gültige Anmeldung.
 * OWNER darf alles, was EDITOR darf – daher die zusätzliche Sonderprüfung.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<AdminRole[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<{ user?: JwtPayload }>();
    const user = request.user;

    if (!user) throw new ForbiddenException('Keine Berechtigung für diesen Bereich.');
    if (user.role === 'OWNER') return true;
    if (required.includes(user.role)) return true;

    throw new ForbiddenException('Ihre Rolle erlaubt diese Aktion nicht.');
  }
}
