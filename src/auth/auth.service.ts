import { Injectable, forwardRef, ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Inject } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwtConstants from './constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async createToken(login: string, sub: string) {
    const payload = { login, sub };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.JWT_SECRET_KEY,
        expiresIn: jwtConstants.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.JWT_SECRET_REFRESH_KEY,
        expiresIn: jwtConstants.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    } else throw new ForbiddenException();
  }

  async signup(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  async login(authDto: AuthDto) {
    const { login, password } = authDto;
    const user = await this.validateUser(login, password);
    if (user) {
      return await this.createToken(user.login, user.id);
    }
  }

  async refresh(refreshToken: string) {
    try {
      const { login, sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.JWT_SECRET_REFRESH_KEY,
      });
      return await this.createToken(login, sub);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
