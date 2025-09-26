import { Controller, Post } from '@nestjs/common';
import { ResponseDto } from 'src/common';
import { AuthRoutes } from './auth.constants';

@Controller(AuthRoutes.base)
export class AuthController {
  @Post(AuthRoutes.login)
  login(): ResponseDto {
    return { message: 'Will implement later' };
  }
}
