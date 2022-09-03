import { UserEntity } from './entities/user.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private async passwordToHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { login, password } = createUserDto;

    const hashPassword = await this.passwordToHash(password);

    const newUser = new UserEntity(login, hashPassword);
    const user = this.userRepository.create(newUser);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findOneByLogin(login: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ login });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdatePasswordDto,
  ): Promise<UserEntity | undefined> {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new ForbiddenException('password is wrong');

    const hashPassword = await this.passwordToHash(newPassword);

    await this.userRepository.update(id, { password: hashPassword });

    return await this.findOne(id);
  }

  async remove(id: string): Promise<UserEntity | undefined> {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepository.remove(user);
      return user;
    } else throw new NotFoundException('user not found');
  }
}
