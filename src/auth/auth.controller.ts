import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Param('login') login: string,
    @Param('password') password: string,
  ) {
    const hashedPass = await bcrypt.hash(password, 10);

    return await this.authService.register(login, hashedPass);
  }

  @Post('login')
  async login(
    @Param('login') login: string,
    @Param('password') password: string,
  ) {
    return this.authService.login(login, password);
  }
}
