import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { APP_CONSTANTS } from 'src/app.constants';

@Injectable()
export class AuthService {
  // Wstrzykujemy bazę danych (Prisma) oraz generator tokenów (JwtService)
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  async register(dto: AuthDto) {
    // 1. Sprawdzamy czy użytkownik już istnieje
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) throw new BadRequestException(APP_CONSTANTS.auth.messages.errors.EMAIL_TAKEN);

    // 2. Hashujemy hasło
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Zapisujemy w bazie danych
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    return this.signToken(user.id, user.email, user.role);
  }

  async login(dto: AuthDto) {
    // 1. Sprawdzamy czy email istnieje
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException(APP_CONSTANTS.auth.messages.errors.USER_NOT_FOUND);

    // 2. Porównujemy przysłane hasło z hashem w bazie
    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new UnauthorizedException(APP_CONSTANTS.auth.messages.errors.INVALID_CREDENTIALS);

    // 3. Wystawiamy token JWT
    return this.signToken(user.id, user.email, user.role);
  }

  async isValid(token?: string) {
    if (!token) {
      return { valid: false };
    }

    try {
      await this.jwt.verifyAsync(token, {
        secret: this.config.get<string>('JWT_SECRET'), // Teraz zadziała!
      });
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }

  // Funkcja pomocnicza "pakująca" dane użytkownika w szyfrowany token
  private async signToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role, }; // 'sub' to standard JWT oznaczający identyfikator podmiotu (Subject)
    const token = await this.jwt.signAsync(payload);

    return { access_token: token };
  }
}
