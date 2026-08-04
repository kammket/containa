import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { JwtPayload } from './auth.service';

const REFRESH_COOKIE = 'emc_refresh';

@ApiTags('Admin – Authentifizierung')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // Deutlich strenger als der globale Standard: 5 Versuche in 5 Minuten.
  @Throttle({ default: { limit: 5, ttl: 300_000 } })
  @ApiOperation({ summary: 'Administrator anmelden' })
  @ApiResponse({ status: 200, description: 'Anmeldung erfolgreich' })
  @ApiResponse({ status: 401, description: 'Zugangsdaten ungültig oder Konto gesperrt' })
  async login(
    @Body() dto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.auth.login(dto.email, dto.password, {
      ip: request.ip,
      userAgent: request.get('user-agent') ?? undefined,
    });

    this.setRefreshCookie(response, result.refreshToken);

    // Das Refresh-Token geht ausschließlich als HttpOnly-Cookie raus,
    // damit es für JavaScript – und damit für XSS – unerreichbar bleibt.
    return {
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
      user: result.user,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 30, ttl: 300_000 } })
  @ApiOperation({ summary: 'Zugriffstoken erneuern' })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const token = request.cookies?.[REFRESH_COOKIE] as string | undefined;
    if (!token) {
      throw new UnauthorizedException('Keine gültige Sitzung. Bitte melden Sie sich an.');
    }

    const result = await this.auth.refresh(token, {
      ip: request.ip,
      userAgent: request.get('user-agent') ?? undefined,
    });

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
      user: result.user,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Abmelden und Sitzung beenden' })
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const token = request.cookies?.[REFRESH_COOKIE] as string | undefined;
    if (token) await this.auth.logout(token);

    response.clearCookie(REFRESH_COOKIE, this.cookieOptions());
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('admin')
  @ApiOperation({ summary: 'Angemeldeten Administrator abfragen' })
  me(@CurrentUser() user: JwtPayload) {
    return { id: user.sub, email: user.email, role: user.role };
  }

  private setRefreshCookie(response: Response, token: string) {
    response.cookie(REFRESH_COOKIE, token, {
      ...this.cookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private cookieOptions() {
    const isProduction = this.config.get<string>('NODE_ENV') === 'production';

    return {
      httpOnly: true,
      secure: isProduction,
      /**
       * In Produktion läuft die API auf einer anderen Domain als die
       * Storefront (Railway gegenüber der Shopdomain). Für den Browser ist der
       * Aufruf damit „cross-site": Einen Cookie mit `SameSite=Lax` speichert er
       * in dieser Lage gar nicht erst. Die Anmeldung sah trotzdem erfolgreich
       * aus, weil das Access-Token im Antwortkörper steht – nach dessen
       * Ablauf nach 15 Minuten schlug aber jede Erneuerung fehl und damit
       * jede Änderung im Adminbereich.
       *
       * `None` verlangt zwingend `Secure`, weshalb lokal ohne HTTPS weiterhin
       * `Lax` gilt. Dort liegen Storefront und API ohnehin auf localhost und
       * sind damit same-site.
       */
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
      path: '/api/v1/auth',
      signed: false,
    };
  }
}
