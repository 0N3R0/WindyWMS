import { IsEmail, IsString, MinLength } from 'class-validator';
import { APP_CONSTANTS } from 'src/app.constants';

export class AuthDto {
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  email: string;

  @IsString()
  @MinLength(APP_CONSTANTS.auth.passwordMinLength, { message: 'Hasło musi mieć co najmniej 8 znaków' })
  password: string;
}
