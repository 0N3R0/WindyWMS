import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; // <-- Importujemy ConfigService
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_CONSTANTS } from '../app.constants';

@Module({
  imports: [
    // Używamy registerAsync, które czeka na pełen start aplikacji
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService], // Wstrzykujemy serwis konfiguracyjny z @nestjs/config
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: APP_CONSTANTS.auth.jwtExpirationSeconds },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
