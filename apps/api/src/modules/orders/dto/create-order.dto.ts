import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  Equals,
  IsArray,
  IsBoolean,
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
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Bitte geben Sie Ihren Vornamen ein.' })
  @MaxLength(80)
  firstName!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Bitte geben Sie Ihren Nachnamen ein.' })
  @MaxLength(80)
  lastName!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Bitte geben Sie die Straße ein.' })
  @MaxLength(120)
  street!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Bitte geben Sie die Hausnummer ein.' })
  @MaxLength(20)
  houseNumber!: string;

  @ApiProperty({ example: '50667' })
  @Matches(/^\d{5}$/, { message: 'Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.' })
  postalCode!: string;

  @ApiProperty({ example: 'Köln' })
  @IsString()
  @MinLength(2, { message: 'Bitte geben Sie den Ort ein.' })
  @MaxLength(80)
  city!: string;

  @ApiPropertyOptional({ default: 'DE' })
  @IsOptional()
  @IsIn(['DE', 'AT', 'CH'], {
    message: 'Wir liefern nach Deutschland, Österreich und in die Schweiz.',
  })
  country?: string;

  @ApiProperty({ example: '+49 221 1234567' })
  @Matches(/^[+0-9()\s./-]{6,25}$/, {
    message: 'Bitte geben Sie eine gültige Telefonnummer ein.',
  })
  phone!: string;
}

export class OrderItemDto {
  @ApiProperty({ example: 'EMC-20DC-U-5010' })
  @IsString()
  @MaxLength(64)
  sku!: string;

  @ApiProperty({ example: '20-fuss-seecontainer-gebraucht-blau' })
  @IsString()
  @MaxLength(120)
  slug!: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 99 })
  @IsInt({ message: 'Die Menge muss eine ganze Zahl sein.' })
  @Min(1, { message: 'Die Menge muss mindestens 1 betragen.' })
  @Max(99, { message: 'Bitte fordern Sie für mehr als 99 Einheiten ein Angebot an.' })
  quantity!: number;
}

/**
 * Bestelleingabe.
 *
 * Preise werden bewusst **nicht** entgegengenommen – der Server ermittelt sie
 * aus der Datenbank. Der Client übermittelt nur, was bestellt wird.
 */
export class CreateOrderDto {
  @ApiProperty({ example: 'kunde@firma.de' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsEmail({}, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' })
  @MaxLength(255)
  email!: string;

  @ApiProperty({ enum: ['privat', 'gewerblich'] })
  @IsIn(['privat', 'gewerblich'], {
    message: 'Bitte wählen Sie aus, ob Sie privat oder gewerblich bestellen.',
  })
  customerType!: 'privat' | 'gewerblich';

  @ApiPropertyOptional({ example: 'DE327845192' })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase().replace(/\s/g, '') : value,
  )
  @Matches(/^DE\d{9}$/, {
    message: 'Bitte geben Sie eine gültige deutsche USt-IdNr. an (Format: DE123456789).',
  })
  vatId?: string;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress!: AddressDto;

  @ApiProperty({ default: true })
  @IsBoolean()
  shippingSameAsBilling!: boolean;

  @ApiPropertyOptional({ type: AddressDto })
  @ValidateIf((dto: CreateOrderDto) => !dto.shippingSameAsBilling)
  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress?: AddressDto;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ArrayMinSize(1, { message: 'Der Warenkorb ist leer.' })
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @ApiProperty({ enum: ['banktransfer', 'sepa', 'invoice'] })
  @IsIn(['banktransfer', 'sepa', 'invoice'], {
    message: 'Bitte wählen Sie eine gültige Zahlungsart.',
  })
  paymentMethod!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(40)
  couponCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(600)
  deliveryNotes?: string;

  @ApiProperty({ description: 'Zustimmung zu den AGB – zwingend erforderlich' })
  @Equals(true, { message: 'Bitte akzeptieren Sie die AGB, um fortzufahren.' })
  acceptsTerms!: boolean;

  @ApiProperty({ description: 'Kenntnisnahme der Widerrufsbelehrung' })
  @Equals(true, {
    message: 'Bitte bestätigen Sie die Kenntnisnahme der Widerrufsbelehrung.',
  })
  acceptsWithdrawal!: boolean;
}
