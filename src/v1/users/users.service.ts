import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInfo } from 'src/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto';
import { UserId, Users } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);

    const createdUser = await this.userRepo.save(user);

    return createdUser;
  }

  async save(user: User) {
    return this.userRepo.save(user);
  }

  async findAll(): Promise<Users> {
    return this.userRepo.find();
  }

  async findAllPaginated({
    limit,
    skip,
  }: PaginationInfo): Promise<[Users, number]> {
    return this.userRepo.findAndCount({ skip, take: limit });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async find(id: UserId): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }
}
