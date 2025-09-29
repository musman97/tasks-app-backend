import { Injectable } from '@nestjs/common';
import { PaginationInfo } from 'src/common';
import { Repository } from 'typeorm';
import { Task } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async findAll({ limit, skip }: PaginationInfo) {
    return this.taskRepo.findAndCount({ skip, take: limit });
  }
}
