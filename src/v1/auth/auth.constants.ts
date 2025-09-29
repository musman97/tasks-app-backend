export const AuthRoutes = {
  base: 'auth',
  login: 'login',
  register: 'register',
} as const;

export const JWT_EXPIRES_IN = '15m';
export const JWT_REFRESH_EXPIRES_IN = '7d';
export const ERR_MESSAGE_USER_EXISTS = 'User with this email already exists';
