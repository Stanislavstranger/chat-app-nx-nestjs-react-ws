import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address',
    example: 'your_email@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for your account',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResponseLoginDto {
  @ApiProperty({
    description: 'Access token for your account',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;
}
