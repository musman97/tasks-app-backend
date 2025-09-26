import { Injectable } from '@nestjs/common';
import { UsersService } from '../users';
import { JwtPayload } from './auth.types';
import { RegisterDto } from './dto';
import { hashString } from 'src/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config';
import { JWT_REFRESH_EXPIRES_IN } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = !!(await this.usersService.findByEmail(dto.email));

    if (userExists) {
      return {
        error: true,
      };
    }

    const hashedPassword = await hashString(dto.password);
    const userToCreate = {
      ...dto,
      password: hashedPassword,
    } satisfies RegisterDto;

    const createdUser = await this.usersService.create(userToCreate);

    const payload: JwtPayload = {
      sub: createdUser.id,
      username: createdUser.email,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtSecrets.refreshSecret,
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    createdUser.refreshToken = await hashString(refreshToken);

    await this.usersService.save(createdUser);

    return { user: createdUser, accessToken, refreshToken };
  }

  async validate(payload: JwtPayload) {
    return this.usersService.find(payload.sub);
  }
}
