import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import type { PromisfiedResponseDto } from 'src/common';
import { ResponseDto } from 'src/common';
import { UserDto } from '../users';
import { ERR_MESSAGE_USER_EXISTS } from '../users/users.constants';
import { AuthRoutes } from './auth.constants';
import { AuthService } from './auth.service';
import { RegisterResponseData } from './auth.types';
import { RegisterDto } from './dto/register.dto';

@Controller(AuthRoutes.base)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthRoutes.register)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
  ): PromisfiedResponseDto<RegisterResponseData> {
    const registerRes = await this.authService.register(dto);

    if (registerRes.error) {
      throw new BadRequestException(ERR_MESSAGE_USER_EXISTS);
    }

    const userDto = UserDto.from(registerRes.user!);

    return {
      data: {
        user: userDto,
        accessToken: registerRes.accessToken ?? '',
        refreshToken: registerRes.refreshToken ?? '',
      },
    };
  }

  @Post(AuthRoutes.login)
  login(): ResponseDto {
    return { message: 'Will implement later' };
  }
}
