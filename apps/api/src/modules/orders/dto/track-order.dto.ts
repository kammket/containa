import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class TrackOrderDto {
  @ApiProperty({ example: 'EMC-2026-04821' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase().trim() : value))
  @IsString()
  @MinLength(4, { message: 'Bitte geben Sie Ihre Bestellnummer ein.' })
  @MaxLength(32)
  orderNumber!: string;

  @ApiProperty({ example: 'kunde@firma.de' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsEmail({}, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' })
  @MaxLength(255)
  email!: string;
}
