import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  ADMIN_ROLE,
  authCookie,
  authHeader,
  isPublic,
  requiredPermission,
  requiredRole,
} from './auth';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request & { user: User }>();
    const isPublicRoute = isPublic(context, this.reflector);

    if (isPublicRoute) return true;

    const token = authCookie(context) || authHeader(context);

    if (token) {
      const __permission = requiredPermission(context, this.reflector);
      const __role = requiredRole(context, this.reflector);
      const __user = await this.authService.verifyToken(token);

      if (__user) {
        // If user has role or the permission then append user to request and return true
        req.user = __user;

        // If user has "admin" role, then return true;
        if (__user.roles?.find((e) => e.name === ADMIN_ROLE)) {
          return true;
        }

        // if there are required role
        if (__role) {
          // if user does not have the role, then return false
          const hasRole = __user.roles?.find((e) => e.name === __role);
          if (hasRole) {
            return true;
          }
        }

        // if there are required permission
        if (__permission) {
          // if user does not have required permission, then return false
          const hasPermission = __user.roles?.find((e) =>
            e.permissions?.find((p) => p.name === __permission)
          );
          if (hasPermission) {
            return true;
          }
        }

        return false;
      }
      return false;
    }
    return false;
  }
}
