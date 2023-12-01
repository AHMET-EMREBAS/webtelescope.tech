import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { Permission, Role, User } from './resources';
import {
  ADMIN_ROLE,
  authCookie,
  authHeader,
  isPublic,
  requiredPermission,
  requiredRole,
} from './auth';

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

    // If there is a token then, verify the token
    if (token) {
      const __requiredPermission = requiredPermission(context, this.reflector);
      const __requiredRole = requiredRole(context, this.reflector);
      const __user = await this.authService.verifyToken(token);

      // Verified user token
      if (__user) {
        // If user has role or the permission then append user to request and return true
        req.user = __user;

        // If user has "admin" role, then return true;
        if (__user.roles?.find((e: Role) => e.name === ADMIN_ROLE)) {
          return true;
        }

        // if there are required role
        if (__requiredRole) {
          // if user does not have the role, then return false
          const userHasRole = __user.roles?.find(
            (e: Role) => e.name === __requiredRole
          );
          if (userHasRole) {
            return true;
          }
          return false;
          // if there are required permission
        } else if (__requiredPermission) {
          // if user does not have required permission, then return false
          const userHasPermission = __user.roles?.find((e: Role) =>
            e.permissions?.find(
              (p: Permission) => p.name === __requiredPermission
            )
          );
          if (userHasPermission) {
            return true;
          }
          return false;
        }
        // If there is no required role or permission, then return true;
        return true;
      }
      return false;
    }
    // If there is no token, then return false
    return false;
  }
}
