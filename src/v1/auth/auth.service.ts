import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { bCryptCompare, bCryptHashStringWithSalt } from 'src/common';
import { ConfigService } from 'src/config';
import { User } from '../entities';
import { UserId, UsersService } from '../users';
import { JWT_REFRESH_EXPIRES_IN } from './auth.constants';
import { JwtPayload } from './auth.types';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private createJwtToken(userId: UserId, email: string) {
    const payload: JwtPayload = {
      sub: userId,
      username: email,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtSecrets.refreshSecret,
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(user: User, refreshToken: string) {
    user.refreshToken = await bCryptHashStringWithSalt(refreshToken);
    await this.usersService.save(user);
  }

  async register(dto: RegisterDto) {
    const userExists = !!(await this.usersService.findByEmail(dto.email));

    if (userExists) {
      return {
        error: true,
      };
    }

    const hashedPassword = await bCryptHashStringWithSalt(dto.password);
    const userToCreate = {
      ...dto,
      password: hashedPassword,
    } satisfies RegisterDto;

    const createdUser = await this.usersService.create(userToCreate);

    const { accessToken, refreshToken } = this.createJwtToken(
      createdUser.id,
      createdUser.email,
    );

    await this.updateRefreshToken(createdUser, refreshToken);

    return { user: createdUser, accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      return {
        error: true,
      };
    }

    const isPasswordEqual = await bCryptCompare(dto.password, user.password);

    if (!isPasswordEqual) {
      return {
        error: true,
      };
    }

    const { accessToken, refreshToken } = this.createJwtToken(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.jwtSecrets.refreshSecret,
      });

      const user = await this.usersService.find(payload.sub);

      if (!user || !user.refreshToken) {
        return { error: true };
      }

      const isRefreshTokenMatching = await bCryptCompare(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenMatching) {
        return { error: true };
      }

      const { accessToken, refreshToken: newRefreshToken } =
        this.createJwtToken(user.id, user.email);

      await this.updateRefreshToken(user, newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      this.logger.error(error);

      return { error: true };
    }
  }

  async validate(payload: JwtPayload) {
    return this.usersService.find(payload.sub);
  }
}
