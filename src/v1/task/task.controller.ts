import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  AuthenticatedUser,
  AuthenticatedUserId,
  createPaginationMeta,
  ID_PARAM,
  ResourceNotFoundException,
  Role,
  RoleGuard,
  type PromisfiedPaginatedResponseDto,
  type PromisfiedResponseDto,
} from 'src/common';
import { User, UserRoles } from '../entities';
import { type UserId } from '../users';
import { CreateTaskDto, FilterTaskDto, TaskDto, UpdateTaskDto } from './dto';
import { ERR_MESSAGE_NO_TASK_EXISTS, TaskRoutes } from './task.constants';
import { TaskService } from './task.service';

@UseGuards(RoleGuard)
@Controller(TaskRoutes.base)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @Role([UserRoles.admin, UserRoles.user])
  async getAll(
    @Query() filters: FilterTaskDto,
    @AuthenticatedUser() user: User,
  ): PromisfiedPaginatedResponseDto<TaskDto[]> {
    const [tasks, total] = await this.taskService.findAll(filters, user);

    return {
      data: TaskDto.fromList(tasks),
      meta: {
        pagination: createPaginationMeta(total, filters.page, filters.limit),
      },
    };
  }

  @Post()
  @Role(UserRoles.user)
  async create(
    @Body() dto: CreateTaskDto,
    @AuthenticatedUser() user: User,
  ): PromisfiedResponseDto<TaskDto> {
    const createdTask = await this.taskService.create(dto, user);

    return { data: TaskDto.from(createdTask), statusCode: HttpStatus.CREATED };
  }

  @Patch(TaskRoutes.byId)
  @Role(UserRoles.user)
  async update(
    @Param(ID_PARAM) id: string,
    @Body() dto: UpdateTaskDto,
    @AuthenticatedUserId() userId: UserId,
  ): PromisfiedResponseDto<TaskDto> {
    const updatedTask = await this.taskService.update(id, userId, dto);

    return { data: TaskDto.from(updatedTask) };
  }

  @Delete(TaskRoutes.byId)
  @Role(UserRoles.admin)
  async delete(@Param(ID_PARAM) id: string): PromisfiedResponseDto {
    const deleteRes = await this.taskService.delete(id);

    if ((deleteRes.affected ?? 0) > 0) {
      return {};
    }

    throw new ResourceNotFoundException(ERR_MESSAGE_NO_TASK_EXISTS);
  }
}
