import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@emccontainer.com' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsEmail({}, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' })
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: '••••••••••••' })
  @IsString({ message: 'Bitte geben Sie Ihr Passwort ein.' })
  @MinLength(8, { message: 'Das Passwort muss mindestens 8 Zeichen lang sein.' })
  @MaxLength(128, { message: 'Das Passwort darf höchstens 128 Zeichen lang sein.' })
  password!: string;
}
