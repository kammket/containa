import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { JwtPayload } from '../auth.service';

/** Liefert den angemeldeten Administrator aus dem Request. */
export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    return data ? request.user?.[data] : request.user;
  },
);
