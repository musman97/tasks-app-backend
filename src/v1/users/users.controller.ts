import { Controller, Get, Param, Query } from '@nestjs/common';
import type { PromisfiedPaginatedResponseDto } from 'src/common';
import { PaginationDto } from 'src/common';
import {
  createPaginationInfo,
  createPaginationMeta,
  ResourceNotFoundException,
  ResponseDto,
  safeParseNumber,
} from 'src/common';
import { User } from '../entities';
import { UserDto } from './dto';
import { UsersRoutes } from './users.constants';
import { UsersService } from './users.service';
import { UserDtos } from './users.types';

@Controller(UsersRoutes.base)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
  ): PromisfiedPaginatedResponseDto<UserDtos> {
    const [allUsers, totalItems] = await this.userService.findAllPaginated(
      createPaginationInfo(pagination.page, pagination.limit),
    );

    return {
      data: UserDto.fromList(allUsers),
      meta: {
        pagination: createPaginationMeta(
          totalItems,
          pagination.page,
          pagination.limit,
        ),
      },
    };
  }

  @Get(UsersRoutes.byId)
  async findOne(
    @Param(UsersRoutes.byId) id: string,
  ): Promise<ResponseDto<User>> {
    const userRes = await this.userService.find(safeParseNumber(id));

    if (userRes === null) {
      throw new ResourceNotFoundException();
    }

    return {
      data: userRes,
    };
  }
}
