import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  createPaginationInfo,
  createPaginationMeta,
  PaginationDto,
  Role,
  RoleGuard,
  type PromisfiedPaginatedResponseDto,
} from 'src/common';
import { TaskRoutes } from './task.constants';
import { TaskService } from './task.service';
import { Tasks } from './task.types';
import { UserRoles } from '../entities';

@UseGuards(RoleGuard)
@Controller(TaskRoutes.base)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @Role(UserRoles.admin)
  async getAll(
    @Query() pagination: PaginationDto,
  ): PromisfiedPaginatedResponseDto<Tasks> {
    const { limit, page } = pagination;
    const paginationInfo = createPaginationInfo(limit, page);

    const [tasks, total] = await this.taskService.findAll(paginationInfo);

    return {
      data: tasks,
      meta: {
        pagination: createPaginationMeta(total, page, limit),
      },
    };
  }
}
