import { Injectable, forwardRef } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Inject } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) return user;
  }

  async signup(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  async login(authDto: AuthDto) {
    const { login, password } = authDto;
    const user = await this.validateUser(login, password);
    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async refresh(token: string): Promise<UserEntity> {
    return;
  }
}
