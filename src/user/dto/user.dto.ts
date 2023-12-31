import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsMatch } from 'src/custom-decorators/isMatch.decorator';
import { IsValidPassword } from 'src/custom-decorators/isValidPassword.decorator';

export class UserCreationDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsValidPassword()
  readonly password: string;

  @IsMatch('password')
  readonly password_confirm: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  usarname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class UpdateUserPassDto {
  @IsNotEmpty()
  @IsString()
  old_password: string;

  @IsNotEmpty()
  @IsString()
  @IsValidPassword()
  password: string;

  @IsMatch('password')
  password_confirm: string;
}
