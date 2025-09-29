import { SetMetadata } from '@nestjs/common';
import { UserRole, UserRoles } from '../../v1/entities';

export type RoleMetadata =
  | UserRole
  | [typeof UserRoles.admin, typeof UserRoles.user];

export const ROLE_KEY = 'role';
export const Role = (roleMetadata: RoleMetadata) =>
  SetMetadata(ROLE_KEY, roleMetadata);
