import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  email: string;
}

export class UpdatePasswordDTO {
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  password: string;
}
