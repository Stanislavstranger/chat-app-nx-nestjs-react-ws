import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const getJWTConfig = (): JwtModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_TOKEN_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIRE_TIME') },
  }),
});
