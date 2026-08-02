import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CreateContactDto } from './dto/create-contact.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { InquiriesService } from './inquiries.service';

@ApiTags('Anfragen')
@Controller()
export class InquiriesController {
  constructor(private readonly inquiries: InquiriesService) {}

  @Post('contact')
  @HttpCode(HttpStatus.CREATED)
  // Formulare sind ein beliebtes Spam-Ziel: 5 Einsendungen pro Stunde je IP.
  @Throttle({ default: { limit: 5, ttl: 3_600_000 } })
  @ApiOperation({ summary: 'Kontaktanfrage senden' })
  @ApiResponse({ status: 201, description: 'Anfrage gespeichert' })
  createContact(@Body() dto: CreateContactDto) {
    return this.inquiries.createContact(dto);
  }

  @Post('quotes')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 3_600_000 } })
  @ApiOperation({ summary: 'Angebotsanfrage senden' })
  @ApiResponse({ status: 201, description: 'Anfrage gespeichert, Referenz wird zurückgegeben' })
  createQuote(@Body() dto: CreateQuoteDto) {
    return this.inquiries.createQuote(dto);
  }
}
