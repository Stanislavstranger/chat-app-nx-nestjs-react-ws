import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserModel } from './models/user.models';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  exports: [UserRepository],
  providers: [UserService, UserRepository],
})
export class UserModule {}
