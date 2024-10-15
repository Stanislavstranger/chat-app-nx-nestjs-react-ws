import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMySQLConfig } from './configs/mysql.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/backend.env',
    }),
    TypeOrmModule.forRootAsync(getMySQLConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

TypeOrmModule.forRootAsync(getMySQLConfig());
