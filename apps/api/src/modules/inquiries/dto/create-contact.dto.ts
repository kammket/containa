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

  @ApiProperty({ example: '+49 221 1234567', description: 'Pflichtfeld für Rückfragen' })
  @IsString({ message: 'Bitte geben Sie Ihre Telefonnummer ein.' })
  @Matches(/^[+0-9()\s./-]{6,25}$/, { message: 'Bitte geben Sie eine gültige Telefonnummer ein.' })
  phone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  // Reihenfolge ist Absicht: class-validator prüft von unten nach oben und
  // meldet mit stopAtFirstError nur den ersten Fehler. Steht @IsString unten,
  // lautet die Meldung bei fehlendem Feld „Bitte geben Sie die Straße ein." –
  // sonst käme die englische Standardmeldung von @MaxLength.
  @ApiProperty({ example: 'Hohenzollernring' })
  @MaxLength(120)
  @MinLength(2, { message: 'Bitte geben Sie die Straße ein.' })
  @IsString({ message: 'Bitte geben Sie die Straße ein.' })
  street!: string;

  @ApiProperty({ example: '42a' })
  @MaxLength(20)
  @MinLength(1, { message: 'Bitte geben Sie die Hausnummer ein.' })
  @IsString({ message: 'Bitte geben Sie die Hausnummer ein.' })
  houseNumber!: string;

  @ApiProperty({ example: '50667' })
  @Matches(/^\d{5}$/, { message: 'Bitte geben Sie eine gültige Postleitzahl ein.' })
  postalCode!: string;

  @ApiProperty({ example: 'Köln' })
  @MaxLength(80)
  @MinLength(2, { message: 'Bitte geben Sie den Ort ein.' })
  @IsString({ message: 'Bitte geben Sie den Ort ein.' })
  city!: string;

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
