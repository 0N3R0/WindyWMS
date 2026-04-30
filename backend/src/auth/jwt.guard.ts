import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Dobieramy się do obiektu Request z frameworka Express
    const request = context.switchToHttp().getRequest();

    // 2. Wyciągamy token z nagłówka (Authorization: Bearer <token>)
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Brak tokenu autoryzacyjnego');
    }

    try {
      // 3. Weryfikujemy token (czy klucz się zgadza, czy nie wygasł)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // 4. Przypisujemy odkodowane dane (id, email, rola) do obiektu żądania
      // Dzięki temu w kontrolerze będziemy mogli napisać np. request.user.id
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Nieprawidłowy lub wygasły token');
    }

    // 5. Zwracamy true - pozwalamy na wykonanie żądania!
    return true;
  }

  // Funkcja pomocnicza do parsowania nagłówka
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
