import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.types';
import type { User } from '../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecrets.secret,
    });
  }

  validate(payload: JwtPayload): Promise<User | null> {
    return this.authService.validate(payload);
  }
}
