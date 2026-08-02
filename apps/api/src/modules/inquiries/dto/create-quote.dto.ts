import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Bitte geben Sie Ihren Namen ein.' })
  @MaxLength(120)
  name!: string;

  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsEmail({}, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' })
  @MaxLength(255)
  email!: string;

  @ApiProperty({ description: 'Für Rückfragen zur Zufahrt zwingend erforderlich' })
  @Matches(/^[+0-9()\s./-]{6,25}$/, { message: 'Bitte geben Sie eine gültige Telefonnummer ein.' })
  phone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @ApiProperty({ enum: ['privat', 'gewerblich'] })
  @IsIn(['privat', 'gewerblich'])
  customerType!: 'privat' | 'gewerblich';

  @ApiPropertyOptional({ description: 'Slug des angefragten Produkts, falls vorhanden' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  productSlug?: string;

  @ApiProperty({ example: '20ft' })
  @IsString()
  @MaxLength(32)
  size!: string;

  @ApiProperty({ example: 'gebraucht' })
  @IsString()
  @MaxLength(32)
  condition!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1, { message: 'Bitte geben Sie mindestens 1 Container an.' })
  @Max(50)
  quantity!: number;

  @ApiProperty({ example: '50667' })
  @Matches(/^\d{5}$/, { message: 'Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.' })
  postalCode!: string;

  @ApiPropertyOptional({ example: '2026-09-15' })
  @IsOptional()
  @IsDateString({}, { message: 'Bitte geben Sie ein gültiges Datum an.' })
  deliveryDate?: string;

  @ApiPropertyOptional({ example: 'Lager / Materialdepot' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  usage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  message?: string;
}
