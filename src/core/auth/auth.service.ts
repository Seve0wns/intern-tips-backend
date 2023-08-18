import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { LoginCredentials } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(credentials: LoginCredentials) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = await this.userService.checkCredentials(credentials);
        const token = await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        });
        console.log(payload);
        resolve({ token });
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }
  async test() {
    return await this.jwtService.signAsync({
      sub: 'testuserid',
      username: 'testuser',
    });
  }
  async validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({ code: 401, message: 'Invalid JWT.' });
      }
    });
  }
}
