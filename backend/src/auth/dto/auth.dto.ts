import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Hasło musi mieć co najmniej 8 znaków' })
  password: string;
}
