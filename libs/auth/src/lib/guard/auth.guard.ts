import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ADMIN_ROLE_NAME, PERMISSION, PUBLIC, ROLE } from '../meta';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../dtos';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requiredPermission = this.reflector.getAllAndOverride(PERMISSION, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredRole = this.reflector.getAllAndOverride(ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    const token = this.extractToken(context);

    if (!token) return false;

    const tokenPayload = this.jwt.verify(token) as TokenPayload;

    if (!tokenPayload) return false;

    // If user has admin role then return true
    const isAdmin = tokenPayload.roles.find((e) => e.name === ADMIN_ROLE_NAME);
    if (isAdmin) return true;

    // If resource require a permission
    if (requiredPermission) {
      if (tokenPayload.roles) {
        for (const role of tokenPayload.roles) {
          if (role.name === ADMIN_ROLE_NAME) {
            return true;
          }
          if (role.permissions) {
            for (const permit of role.permissions) {
              if (permit.name === requiredPermission) {
                return true;
              }
            }
          }
        }
      }
      return false;

      // If resource requires a role
    } else if (requiredRole) {
      if (tokenPayload.roles) {
        for (const role of tokenPayload.roles) {
          if (role.name === requiredRole) {
            return true;
          }
        }
      }
      return false;
    }

    return true;
  }

  extractToken(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split(' ');

      return token;
    }

    return;
  }
}
