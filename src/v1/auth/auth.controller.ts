import { Controller, Post } from '@nestjs/common';
import { ResponseDto } from 'src/common';
import { AuthEndpoints } from './auth.constants';

@Controller(AuthEndpoints.base)
export class AuthController {
  @Post(AuthEndpoints.login)
  login(): ResponseDto {
    return { message: 'Will implement later' };
  }
}
