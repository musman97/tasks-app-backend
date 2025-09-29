import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import type { PromisfiedResponseDto } from 'src/common';
import { Public } from 'src/common';
import { UserDto } from '../users';
import {
  AuthRoutes,
  ERR_INVALID_OR_EXPIRED_TOKEN,
  ERR_MESSAGE_INVALID_CREDENTIALS,
  ERR_MESSAGE_USER_EXISTS,
} from './auth.constants';
import { AuthService } from './auth.service';
import { AuthResponseData, RefreshTokensResponse } from './auth.types';
import { LoginDto, RefreshTokensDto } from './dto';
import { RegisterDto } from './dto/register.dto';

@Public()
@Controller(AuthRoutes.base)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthRoutes.register)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
  ): PromisfiedResponseDto<AuthResponseData> {
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
  async login(@Body() dto: LoginDto): PromisfiedResponseDto<AuthResponseData> {
    const loginRes = await this.authService.login(dto);

    if (loginRes.error) {
      throw new BadRequestException(ERR_MESSAGE_INVALID_CREDENTIALS);
    }

    const userDto = UserDto.from(loginRes.user!);

    return {
      data: {
        user: userDto,
        accessToken: loginRes.accessToken ?? '',
        refreshToken: loginRes.refreshToken ?? '',
      },
    };
  }

  @Post(AuthRoutes.refresh)
  async refresh(
    @Body() dto: RefreshTokensDto,
  ): PromisfiedResponseDto<RefreshTokensResponse> {
    const refreshRes = await this.authService.refreshTokens(dto.refreshToken);

    if (refreshRes.error) {
      throw new BadRequestException(ERR_INVALID_OR_EXPIRED_TOKEN);
    }

    return {
      data: {
        accessToken: refreshRes.accessToken ?? '',
        refreshToken: refreshRes.refreshToken ?? '',
      },
    };
  }
}
