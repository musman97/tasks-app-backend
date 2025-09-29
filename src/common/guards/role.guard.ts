import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/v1/entities';
import { ROLE_KEY } from '../decorators';
import { AuthenticatedRequest } from '../types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.get<UserRole>(
      ROLE_KEY,
      context.getClass(),
    );

    if (!requiredRole) {
      return false;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const role = request?.user?.role ?? '';

    return role === requiredRole;
  }
}
