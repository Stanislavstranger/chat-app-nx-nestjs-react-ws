import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IUser, UserRole, UserStatus } from '@./interfaces';

@Entity()
export class UserModel implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.OFFLINE })
  status?: UserStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}
