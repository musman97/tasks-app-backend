import { Controller, Get, Param } from '@nestjs/common';
import { UsersRoutes } from './users.constants';
import { UsersService } from './users.service';
import {
  ResourceNotFoundException,
  ResponseDto,
  safeParseNumber,
} from 'src/common';
import { Users } from './users.types';
import { User } from '../entities';

@Controller(UsersRoutes.base)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<ResponseDto<Users>> {
    return { data: await this.userService.findAll() };
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
