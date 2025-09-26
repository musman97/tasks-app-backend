import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto';
import { UserId, Users } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
