import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthToken } from './auth-token.decorator';

@ApiTags('Autoryzacja (Auth)')
@Controller('auth') // Wszystkie żądania do /auth trafią tutaj
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register') // Odpowiada na: POST /auth/register
  register(@Body() dto: AuthDto) {
    // Przekazujemy przefiltrowane przez DTO dane prosto do logiki w serwisie
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK) // Domyślnie POST zwraca kod 201 (Created), przy logowaniu lepszy i bardziej poprawny jest 200 (OK)
  @Post('login') // Odpowiada na: POST /auth/login
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('isValid')
  isvalid(@AuthToken() token?: string) {
    return this.authService.isValid(token);
  }
}
