import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseDto } from 'src/common';
import type { PromisfiedResponseDto } from 'src/common';
import { AuthRoutes } from './auth.constants';
import { RegisterDto } from './dto/register.dto';
import { User } from '../entities';
import { UsersService } from '../users';

@Controller(AuthRoutes.base)
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post(AuthRoutes.register)
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto): PromisfiedResponseDto<User> {
    const createdUser = await this.usersService.create(dto);

    return {
      data: createdUser,
    };
  }

  @Post(AuthRoutes.login)
  login(): ResponseDto {
    return { message: 'Will implement later' };
  }
}
