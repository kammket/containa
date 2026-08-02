import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus, { message: 'Bitte wählen Sie einen gültigen Status.' })
  status!: OrderStatus;

  @ApiPropertyOptional({
    description: 'Individueller Text für den Verlaufseintrag und die Kundenmail',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ example: 'Spedition Weber' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  carrier?: string;

  @ApiPropertyOptional({ example: '2026-08-14' })
  @IsOptional()
  @IsDateString({}, { message: 'Bitte geben Sie ein gültiges Datum an.' })
  estimatedDelivery?: string;
}
