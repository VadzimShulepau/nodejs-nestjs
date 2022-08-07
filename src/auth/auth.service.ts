import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  private async findOne(login: string): Promise<UserEntity> {
    const user = this.userRepository.findOneBy({ login });

    if (!user) {
      throw new BadRequestException('not found user');
    }
    return user;
  }

  async register(login: string, password: string): Promise<UserEntity> {
    const newUser = new UserEntity(login, password);
    return this.userRepository.save(newUser);
  }

  async login(login: string, password: string): Promise<UserEntity> {
    const user = await this.findOne(login);
    const userPass = await bcrypt.compare(password, user.password);

    if (!userPass) {
      throw new BadRequestException('invalid password');
    }

    const payload = { login: user.login, id: user.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };

    const jwt = await this.jwtService.signAsync({ id: user.id });

    return user;
  }
}
