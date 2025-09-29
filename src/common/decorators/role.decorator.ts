import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../v1/entities';

export const ROLE_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
