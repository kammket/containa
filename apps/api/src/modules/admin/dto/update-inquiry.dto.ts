import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InquiryStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateInquiryDto {
  @ApiProperty({ enum: InquiryStatus })
  @IsEnum(InquiryStatus, { message: 'Bitte wählen Sie einen gültigen Status.' })
  status!: InquiryStatus;

  @ApiPropertyOptional({ description: 'Nur intern sichtbar' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  internalNote?: string;
}
