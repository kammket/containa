import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';

import { SubscribeDto } from './dto/subscribe.dto';
import { NewsletterService } from './newsletter.service';

@ApiTags('Anfragen')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 3_600_000 } })
  @ApiOperation({ summary: 'Newsletter abonnieren (Double-Opt-in)' })
  subscribe(@Body() dto: SubscribeDto, @Req() request: Request) {
    return this.newsletter.subscribe(dto.email, request.ip);
  }

  @Get('confirm')
  @ApiOperation({ summary: 'Newsletteranmeldung bestätigen' })
  confirm(@Query('token') token: string) {
    return this.newsletter.confirm(token);
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Newsletter abbestellen' })
  unsubscribe(@Body() dto: SubscribeDto) {
    return this.newsletter.unsubscribe(dto.email);
  }
}
