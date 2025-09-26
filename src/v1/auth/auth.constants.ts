export const AuthRoutes = {
  base: 'auth',
  login: 'login',
  register: 'register',
} as const;

export const JWT_EXPIRES_IN = '15m';
export const JWT_REFRESH_EXPIRES_IN = '7d';
