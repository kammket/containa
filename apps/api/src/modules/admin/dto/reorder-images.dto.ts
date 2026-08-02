import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class ReorderImagesDto {
  @ApiProperty({
    type: [String],
    description: 'Bild-IDs in gewünschter Reihenfolge; das erste wird zum Titelbild.',
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Bitte geben Sie mindestens eine Bild-ID an.' })
  @ArrayMaxSize(20)
  @IsString({ each: true })
  imageIds!: string[];
}
