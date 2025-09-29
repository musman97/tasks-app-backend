export const AuthRoutes = {
  base: 'auth',
  login: 'login',
  register: 'register',
  refresh: 'refresh',
} as const;

export const JWT_EXPIRES_IN = '15m';
export const JWT_REFRESH_EXPIRES_IN = '7d';

export const ERR_MESSAGE_USER_EXISTS = 'User with this email already exists';
export const ERR_MESSAGE_INVALID_CREDENTIALS = 'Incorrect email or password';
export const ERR_INVALID_OR_EXPIRED_TOKEN = 'Invalid or expired token';
