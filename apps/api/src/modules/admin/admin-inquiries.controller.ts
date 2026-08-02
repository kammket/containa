import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { InquiryStatus, InquiryType } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { JwtPayload } from '../auth/auth.service';
import { InquiriesService } from '../inquiries/inquiries.service';
import { AuditService } from './audit.service';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

/** Kontakt- und Angebotsanfragen aus den Formularen der Website. */
@ApiTags('Admin – Anfragen')
@ApiBearerAuth('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/inquiries')
export class AdminInquiriesController {
  constructor(
    private readonly inquiries: InquiriesService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Anfragen auflisten' })
  @ApiQuery({ name: 'type', enum: InquiryType, required: false })
  @ApiQuery({ name: 'status', enum: InquiryStatus, required: false })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: InquiryType,
    @Query('status') status?: InquiryStatus,
    @Query('search') search?: string,
  ) {
    return this.inquiries.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      type,
      status,
      search,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Anzahl offener Anfragen' })
  stats() {
    return this.inquiries.stats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Anfrage im Detail abrufen' })
  findOne(@Param('id') id: string) {
    return this.inquiries.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Bearbeitungsstatus und interne Notiz pflegen' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInquiryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const inquiry = await this.inquiries.updateStatus(id, dto.status, dto.internalNote);
    await this.audit.log(user.sub, 'UPDATE', 'Inquiry', id, { status: dto.status });
    return inquiry;
  }
}
