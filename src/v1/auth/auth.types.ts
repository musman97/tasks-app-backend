import { UserId } from '../users';
import { UserDto } from '../users';

export interface JwtPayload {
  username: string;
  sub: UserId;
}

export interface RegisterResponseData {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
