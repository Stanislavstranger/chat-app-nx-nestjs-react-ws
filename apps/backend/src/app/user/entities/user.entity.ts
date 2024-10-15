import { Exclude } from 'class-transformer';
import { IUser, UserRole, UserStatus } from '@./interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  id?: string;
  username: string;
  email: string;
  @Exclude()
  passwordHash?: string;
  profilePicture?: string;
  role: UserRole;
  status?: UserStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Omit<IUser, 'passwordHash'>);
  constructor(user: IUser);

  constructor(user: IUser | Omit<IUser, 'passwordHash'>) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.profilePicture = user.profilePicture || '';
    this.role = user.role || UserRole.USER;
    this.status = user.status || UserStatus.OFFLINE;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if ('passwordHash' in user) {
      this.passwordHash = user.passwordHash;
    }
  }

  public async getPublicProfile(): Promise<Omit<IUser, 'passwordHash'>> {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      profilePicture: this.profilePicture,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async setPassword(password: string): Promise<this> {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
