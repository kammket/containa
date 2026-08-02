import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Schützt Adminendpunkte. Erwartet ein gültiges Bearer-Token. */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
