import { UserId } from '../users';
import { UserDto } from '../users';

export interface JwtPayload {
  username: string;
  sub: UserId;
}

export interface AuthResponseData {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokensResponse {
  accessToken: string;
  refreshToken: string;
}
