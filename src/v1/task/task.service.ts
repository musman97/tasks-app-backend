import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { calculateSkip, ResourceNotFoundException } from 'src/common';
import { Repository } from 'typeorm';
import { Task, User } from '../entities';
import { UserId } from '../users';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { ERR_MESSAGE_NO_TASK_EXISTS } from './task.constants';
import { TaskId } from './task.types';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  private logger: Logger = new Logger(TaskService.name);

  async findAll(filters: FilterTaskDto, user: User) {
    const entityNameAlias = 'task';
    const queryBuilder = this.taskRepo.createQueryBuilder(entityNameAlias);

    if (filters.search) {
      queryBuilder.andWhere(
        `${entityNameAlias}.title ILIKE :search OR ${entityNameAlias}.description ILIKE :search`,
        { search: `%${filters.search}%` },
      );
    }
    if (filters.status) {
      queryBuilder.andWhere('task.status = :status', {
        status: filters.status,
      });
    }
    if (filters.dueDate) {
      const dateOnly = filters.dueDate.split('T')?.[0] ?? '';
      queryBuilder.andWhere(`DATE(${entityNameAlias}.dueDate) = :dueDate`, {
        dueDate: dateOnly,
      });
    }
    if (user.role === 'user') {
      queryBuilder.andWhere(`${entityNameAlias}.createdById = :userId`, {
        userId: user.id,
      });
    }

    queryBuilder.addOrderBy(
      filters.sortBy
        ? `${entityNameAlias}.${filters.sortBy}`
        : `${entityNameAlias}.title`,
      (filters.orderBy ?? 'ASC').toUpperCase() as 'ASC' | 'DESC',
    );

    const { page, limit } = filters;
    const skip = calculateSkip(page, limit);

    queryBuilder.skip(skip).take(limit);

    return queryBuilder.getManyAndCount();
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
