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
  createPaginationInfo,
  createPaginationMeta,
  ID_PARAM,
  PaginationDto,
  ResourceNotFoundException,
  Role,
  RoleGuard,
  type PromisfiedPaginatedResponseDto,
  type PromisfiedResponseDto,
} from 'src/common';
import { User, UserRoles } from '../entities';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dto';
import { ERR_MESSAGE_NO_TASK_EXISTS, TaskRoutes } from './task.constants';
import { TaskService } from './task.service';
import { type UserId } from '../users';

@UseGuards(RoleGuard)
@Controller(TaskRoutes.base)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @Role([UserRoles.admin, UserRoles.user])
  async getAll(
    @Query() pagination: PaginationDto,
    @AuthenticatedUser() user: User,
  ): PromisfiedPaginatedResponseDto<TaskDto[]> {
    const { limit, page } = pagination;
    const paginationInfo = createPaginationInfo(page, limit);

    const [tasks, total] = await (user.role === UserRoles.admin
      ? this.taskService.findAll(paginationInfo)
      : this.taskService.findAllByUserId(user.id, paginationInfo));

    return {
      data: TaskDto.fromList(tasks),
      meta: {
        pagination: createPaginationMeta(total, page, limit),
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
