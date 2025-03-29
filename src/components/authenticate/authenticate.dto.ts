import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  password: string;

  @ApiProperty({
    description: 'The provider of the user',
    example: 'GOOGLE',
  })
  @IsNotEmpty()
  @IsString()
  provider: 'GOOGLE' | 'EMAIL';

  @ApiProperty({
    description: 'The token of the user',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  providerId: string;
}

export class RegisterDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(55)
  name: string;

  @ApiProperty({
    description: 'The provider of the user',
    example: 'GOOGLE',
  })
  @IsNotEmpty()
  @IsString()
  provider: 'GOOGLE' | 'EMAIL';

  @ApiProperty({
    description: 'The provider id of the user',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  providerId: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @IsOptional()
  @MaxLength(32)
  password: string;
}
