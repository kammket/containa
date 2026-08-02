import { SetMetadata } from '@nestjs/common';
import type { AdminRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

/** Schränkt einen Endpunkt auf bestimmte Rollen ein. OWNER hat immer Zugriff. */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
