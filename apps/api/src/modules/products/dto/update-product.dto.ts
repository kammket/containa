import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateProductDto } from './create-product.dto';

/**
 * Alle Felder optional. Bilder werden nicht hierüber gepflegt, sondern über
 * die eigenen Endpunkte `/admin/products/:id/images` – so bleibt das Hochladen
 * und Sortieren unabhängig vom Speichern der Stammdaten.
 */
export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['images'] as const),
) {}
