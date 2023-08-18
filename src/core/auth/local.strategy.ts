import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginCredentials } from './auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    // super();
  }

  async validate(email: string, password: string) {
    const credentials: LoginCredentials = { email, password };
    const user = this.authService.login(credentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
