import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  async signup(authDto: AuthDto): Promise<UserEntity> {
    return;
  }

  async login(authDto: AuthDto): Promise<UserEntity> {
    return;
  }

  refresh(token): Promise<UserEntity> {
    return;
  }
}
