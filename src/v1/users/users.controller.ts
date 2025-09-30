import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import type { PromisfiedPaginatedResponseDto } from 'src/common';
import { ID_PARAM, PaginationDto, Role, RoleGuard } from 'src/common';
import {
  createPaginationInfo,
  createPaginationMeta,
  ResourceNotFoundException,
  ResponseDto,
  safeParseNumber,
} from 'src/common';
import { User, UserRoles } from '../entities';
import { UserDto } from './dto';
import { UsersRoutes } from './users.constants';
import { UsersService } from './users.service';
import { UserDtos } from './users.types';

@Role(UserRoles.admin)
@UseGuards(RoleGuard)
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
  async findOne(@Param(ID_PARAM) id: string): Promise<ResponseDto<User>> {
    const userRes = await this.userService.find(safeParseNumber(id));

    if (userRes === null) {
      throw new ResourceNotFoundException();
    }

    return {
      data: userRes,
    };
  }
}
