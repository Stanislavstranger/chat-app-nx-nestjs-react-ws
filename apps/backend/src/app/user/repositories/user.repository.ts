import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { THIS_USER_NOT_FOUND } from '../constants/user.constants';
import { IUser } from '@./interfaces';
import { UserModel } from '../models/user.models';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>
  ) {}

  async createUser(user: Partial<UserModel>): Promise<UserModel> {
    const newUser = this.userModel.create(user);
    return this.userModel.save(newUser).then();
  }

  async updateUser(id: string, updateData: Partial<UserModel>): Promise<void> {
    await this.userModel.update(id, updateData);
  }

  async findAllUsers(): Promise<UserModel[]> {
    return this.userModel.find().then((users) => users);
  }

  async findUserByEmail(email: string): Promise<Omit<IUser, 'passwordHash'>> {
    return this.userModel.findBy({ email }).then((user) => user[0]);
  }

  async findUserById(id: string): Promise<Omit<IUser, 'passwordHash'>> {
    const user = await this.userModel.findBy({ id }).then((user) => user[0]);

    if (!user) throw new NotFoundException(THIS_USER_NOT_FOUND);

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(THIS_USER_NOT_FOUND);
    }
  }
}
