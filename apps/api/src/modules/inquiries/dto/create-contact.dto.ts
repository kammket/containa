import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Michael Kaufmann' })
  @IsString()
  @MinLength(2, { message: 'Bitte geben Sie Ihren Namen ein.' })
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'kontakt@firma.de' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsEmail({}, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' })
  @MaxLength(255)
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^[+0-9()\s./-]{6,25}$/, { message: 'Bitte geben Sie eine gültige Telefonnummer ein.' })
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @ApiProperty({ example: '50667' })
  @Matches(/^\d{5}$/, { message: 'Bitte geben Sie eine gültige Postleitzahl ein.' })
  postalCode!: string;

  @ApiProperty({ example: 'Produktberatung' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  subject!: string;

  @ApiProperty()
  @IsString()
  @MinLength(20, { message: 'Bitte beschreiben Sie Ihr Anliegen in mindestens 20 Zeichen.' })
  @MaxLength(4000)
  message!: string;
}
