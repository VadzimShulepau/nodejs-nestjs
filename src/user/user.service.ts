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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { login, password } = createUserDto;

    const newUser = new UserEntity(login, password);
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

  async update(
    id: string,
    updateUserDto: UpdatePasswordDto,
  ): Promise<UserEntity | undefined> {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    if (user.password !== oldPassword)
      throw new ForbiddenException('password is wrong');

    await this.userRepository.update(id, { password: newPassword });

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
