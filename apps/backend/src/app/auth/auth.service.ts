import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { THIS_USER_ALREADY_REGISTERED } from '../user/constants/user.constants';
import { UserEntity } from '../user/entities/user.entity';
import { RegisterDto, ResponseRegisterDto } from './dto/register.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { INCORRECT_LOGIN_OR_PASSWORD } from './constants/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, ResponseLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async register(createUserDto: RegisterDto): Promise<ResponseRegisterDto> {
    const oldUser = await this.userRepository.findUserByEmail(
      createUserDto.email
    );

    if (oldUser) {
      this.logger.error(`This user already registered: ${oldUser}`);
      throw new BadRequestException(THIS_USER_ALREADY_REGISTERED);
    }

    const newUserEntity = await new UserEntity({
      ...createUserDto,
    }).setPassword(createUserDto.password);

    const newUser = await this.userRepository.createUser(newUserEntity);

    this.logger.log(`User created: ${newUser}`);
    return { email: newUser.email };
  }

  async validateUser({ email, password }: LoginDto): Promise<{
    id: string;
  }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      this.logger.error(`Incorrect login or password: ${user}`);
      throw new BadRequestException(INCORRECT_LOGIN_OR_PASSWORD);
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      this.logger.error(`Incorrect login or password: ${isCorrectPassword}`);
      throw new BadRequestException(INCORRECT_LOGIN_OR_PASSWORD);
    }
    this.logger.log(`User validated: ${user}`);
    return { id: user.id };
  }

  async login(id: string): Promise<ResponseLoginDto> {
    const user = await this.userRepository.findUserById(String(id));
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    this.logger.log(`User logged in: ${user}`);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
