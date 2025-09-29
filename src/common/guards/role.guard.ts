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
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const role = request?.user?.role ?? '';

    if (!requiredRole) {
      return false;
    }

    return role === requiredRole;
  }
}
