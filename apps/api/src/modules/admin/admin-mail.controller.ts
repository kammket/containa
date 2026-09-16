import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MailService } from '../mail/mail.service';

/**
 * Auskunft über den E-Mail-Versand.
 *
 * Ob eine Benachrichtigung ankommt, hängt an der Umgebung des laufenden
 * Dienstes – am Schlüssel, am Absender, am Empfänger. Geht eine E-Mail nicht
 * hinaus, steht die Ursache im Protokoll des Hosters, an das nicht jeder
 * herankommt. Diese beiden Endpunkte machen dieselbe Auskunft über die API
 * zugänglich, für Administratoren und ohne Geheimnisse preiszugeben.
 */
@ApiTags('Admin – E-Mail')
@ApiBearerAuth('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/mail')
export class AdminMailController {
  constructor(private readonly mail: MailService) {}

  @Get('status')
  @ApiOperation({ summary: 'Konfigurierten Versandweg anzeigen' })
  status() {
    return this.mail.describeTransport();
  }

  @Post('test')
  @ApiOperation({ summary: 'Testnachricht versenden und Ergebnis zurückmelden' })
  sendTest(@Body() body: { to?: string }) {
    return this.mail.sendTestEmail(body?.to);
  }
}
