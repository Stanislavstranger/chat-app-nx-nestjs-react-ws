import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { THIS_USER_NOT_FOUND } from './constants/user.constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly logger = new Logger(UserService.name);

  async findAll() {
    const allUsers = await this.userRepository.findAllUsers();
    this.logger.log(`Find all users`);
    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      this.logger.error(`This user not found: ${user}`);
      throw new NotFoundException(THIS_USER_NOT_FOUND);
    }
    const profile = await new UserEntity(user).getPublicProfile();
    this.logger.log(`Return user with id: ${profile.id}`);
    return { profile };
  }

  async remove(id: string) {
    await this.userRepository.deleteUser(id);
    this.logger.log(`Delete user with id: ${id}`);
    return;
  }
}
