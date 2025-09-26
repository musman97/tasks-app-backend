import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto';
import { ERR_MESSAGE_USER_EXISTS } from './users.constants';
import { UserId, Users } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = !!(await this.userRepo.findOne({
      where: { email: createUserDto.email },
    }));

    if (userExists) {
      throw new BadRequestException(ERR_MESSAGE_USER_EXISTS);
    }

    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findAll(): Promise<Users> {
    return this.userRepo.find();
  }

  async find(id: UserId): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }
}
