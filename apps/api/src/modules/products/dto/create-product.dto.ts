import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Availability, ProductCondition } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class ProductImageDto {
  @ApiProperty({ example: 'emc/products/20ft-used-blau-front' })
  @IsString()
  @MaxLength(255)
  publicId!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/…/20ft-used-blau-front.jpg' })
  @IsString()
  @MaxLength(1000)
  url!: string;

  @ApiProperty({ example: '20 Fuß Seecontainer gebraucht – Frontansicht' })
  @IsString()
  @MinLength(3, { message: 'Der Alt-Text muss mindestens 3 Zeichen lang sein.' })
  @MaxLength(255)
  alt!: string;

  @ApiPropertyOptional({ default: 1200 })
  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @ApiPropertyOptional({ default: 900 })
  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class CreateProductDto {
  @ApiProperty({ example: '20-fuss-seecontainer-gebraucht-blau' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Der Slug darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten.',
  })
  @MaxLength(120)
  slug!: string;

  @ApiProperty({ example: 'EMC-20DC-U-5010' })
  @IsString({ message: 'Bitte geben Sie eine Artikelnummer an.' })
  @MaxLength(64)
  sku!: string;

  @ApiProperty({ example: '20 Fuß Seecontainer gebraucht – Enzianblau' })
  @IsString()
  @MinLength(3, { message: 'Der Produktname muss mindestens 3 Zeichen lang sein.' })
  @MaxLength(180)
  name!: string;

  @ApiProperty({ example: 'Geprüft wind- und wasserdicht, sofort verfügbar.' })
  @IsString()
  @MinLength(10, { message: 'Bitte geben Sie einen kurzen Verkaufstext an.' })
  @MaxLength(300)
  tagline!: string;

  @ApiProperty({ type: [String], description: 'Beschreibungsabsätze' })
  @IsArray()
  @ArrayMinSize(1, { message: 'Bitte geben Sie mindestens einen Beschreibungsabsatz an.' })
  @ArrayMaxSize(20)
  @IsString({ each: true })
  description!: string[];

  @ApiProperty({ type: [String], description: 'Kernvorteile als Aufzählung' })
  @IsArray()
  @ArrayMaxSize(15)
  @IsString({ each: true })
  highlights!: string[];

  @ApiProperty({ enum: ProductCondition })
  @IsEnum(ProductCondition, { message: 'Bitte wählen Sie einen gültigen Zustand.' })
  condition!: ProductCondition;

  @ApiProperty({ example: '20ft', description: '8ft | 10ft | 20ft | 40ft | 45ft | sonder' })
  @IsString()
  @MaxLength(16)
  size!: string;

  @ApiPropertyOptional({ enum: Availability, default: Availability.AUF_LAGER })
  @IsOptional()
  @IsEnum(Availability)
  availability?: Availability;

  @ApiProperty({ example: 119000, description: 'Nettopreis in Cent' })
  @IsInt({ message: 'Der Preis muss als ganzzahliger Centbetrag angegeben werden.' })
  @Min(1, { message: 'Der Preis muss größer als 0 sein.' })
  @Max(100_000_000)
  priceNet!: number;

  @ApiPropertyOptional({ example: 145000, description: 'Streichpreis netto in Cent' })
  @IsOptional()
  @IsInt()
  @Min(0)
  compareAtNet?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ default: 3 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(365)
  leadTimeDaysMin?: number;

  @ApiPropertyOptional({ default: 7 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(365)
  leadTimeDaysMax?: number;

  @ApiPropertyOptional({ default: 12 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  warrantyMonths?: number;

  @ApiProperty({ example: 6058, description: 'Außenlänge in Millimetern' })
  @IsInt()
  @Min(1)
  lengthMm!: number;

  @ApiProperty({ example: 2438, description: 'Außenbreite in Millimetern' })
  @IsInt()
  @Min(1)
  widthMm!: number;

  @ApiProperty({ example: 2591, description: 'Außenhöhe in Millimetern' })
  @IsInt()
  @Min(1)
  heightMm!: number;

  @ApiPropertyOptional({ description: 'Technische Daten als JSON' })
  @IsOptional()
  specs?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Zeilen der Spezifikationstabelle als JSON' })
  @IsOptional()
  specRows?: unknown[];

  @ApiPropertyOptional({ description: 'Produktspezifische FAQs als JSON' })
  @IsOptional()
  faqs?: unknown[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isBestseller?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ maxLength: 70 })
  @IsOptional()
  @IsString()
  @MaxLength(70, { message: 'Der SEO-Titel sollte höchstens 70 Zeichen lang sein.' })
  seoTitle?: string;

  @ApiPropertyOptional({ maxLength: 175 })
  @IsOptional()
  @IsString()
  @MaxLength(175, { message: 'Die Meta-Description sollte höchstens 175 Zeichen lang sein.' })
  seoDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  focusKeyword?: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Nebenkeywords für die interne Verlinkung',
    example: ['Seecontainer kaufen', 'Lagercontainer 20 Fuß'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(15)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  secondaryKeywords?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'Begriffe, unter denen die Instant-Suche das Produkt findet',
    example: ['20 Fuß Container gebraucht', '20ft Seecontainer'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(25)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  keywords?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'Kuratierte verwandte Produkte als Slugs. Leer: automatisch aus der Kategorie.',
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  relatedSlugs?: string[];

  @ApiProperty({ type: [String], example: ['20-fuss-container', 'gebrauchte-container'] })
  @IsArray()
  @ArrayMinSize(1, { message: 'Bitte ordnen Sie das Produkt mindestens einer Kategorie zu.' })
  @IsString({ each: true })
  categorySlugs!: string[];

  @ApiPropertyOptional({ description: 'Primärkategorie; Standard ist die erste der Liste.' })
  @IsOptional()
  @IsString()
  primaryCategory?: string;

  @ApiPropertyOptional({ type: [ProductImageDto] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images?: ProductImageDto[];
}
