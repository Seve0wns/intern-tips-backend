import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './localAuth.guard';

@Controller('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return req.user;
  }

  @Post('test')
  async test() {
    // console.log(process.env.JWT_SECRET);
    // console.log(this.configService.get<string>('JWT_SECRET'));
    return await this.authService.test();
  }
}
