import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInfo, ResourceNotFoundException } from 'src/common';
import { Repository } from 'typeorm';
import { Task, User } from '../entities';
import { UserId } from '../users';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ERR_MESSAGE_NO_TASK_EXISTS } from './task.constants';
import { TaskId } from './task.types';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async findAll({ limit, skip }: PaginationInfo) {
    return this.taskRepo.findAndCount({ skip, take: limit });
  }

  async findAllByUserId(userId: UserId, { skip, limit }: PaginationInfo) {
    return this.taskRepo.findAndCount({
      where: { createdBy: { id: userId } },
      skip,
      take: limit,
    });
  }

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const createdTask = this.taskRepo.create({ ...dto, createdBy: user });
    return this.taskRepo.save(createdTask);
  }

  async update(id: TaskId, userId: UserId, dto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({
      where: { id, createdBy: { id: userId } },
    });

    if (!task) {
      throw new ResourceNotFoundException(ERR_MESSAGE_NO_TASK_EXISTS);
    }

    if (dto.title) {
      task.title = dto.title;
    }
    if (dto.description) {
      task.description = dto.description;
    }
    if (dto.status) {
      task.status = dto.status;
    }
    if (dto.dueDate) {
      task.dueDate = new Date(dto.dueDate);
    }

    return this.taskRepo.save(task);
  }

  delete(id: TaskId) {
    return this.taskRepo.delete({ id });
  }
}
