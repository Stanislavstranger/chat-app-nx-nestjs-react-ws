import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@./interfaces';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @ApiProperty({ description: 'Username for the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

export class ResponseRegisterDto {
  @ApiProperty({ description: 'Email of the registered user' })
  email: string;
}
