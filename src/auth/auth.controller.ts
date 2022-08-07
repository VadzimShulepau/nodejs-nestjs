import { Controller, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async register(
    @Param('login') login: string,
    @Param('password') password: string,
  ) {
    const hashedPass = await bcrypt.hash(password, 10);

    return await this.authService.singup(login, hashedPass);
  }

  @Post('login')
  async login(
    @Param('login') login: string,
    @Param('password') password: string,
  ) {
    return this.authService.login(login, password);
  }

  @Put('refresh')
  async refresh(
    @Param('login') login: string,
    @Param('password') password: string,
  ) {
    return this.authService.refresh(login, password);
  }
}
