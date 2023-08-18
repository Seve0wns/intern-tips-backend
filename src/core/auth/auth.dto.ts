import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentials {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class JwtPayload {
  readonly id: number;
  readonly email: string;
  readonly role: string;
}
