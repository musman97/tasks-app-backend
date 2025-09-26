export const UsersRoutes = {
  base: 'users',
  byId: ':id',
} as const;

export const ERR_MESSAGE_USER_EXISTS = 'User with this email already exists';
