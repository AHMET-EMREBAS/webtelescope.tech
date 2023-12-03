import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { JwtService } from '@nestjs/jwt';
import { AuthTokens } from './metadata';
import { TokenPayload } from './token-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(AuthTokens.PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requiredPermission = this.reflector.getAllAndOverride(
      AuthTokens.PERMISSION,
      [context.getHandler(), context.getClass()]
    );

    const requiredRole = this.reflector.getAllAndOverride(AuthTokens.ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    const token = this.extractToken(context);

    if (!token) return false;

    const tokenPayload = this.jwt.verify(token) as TokenPayload;

    if (!tokenPayload) return false;

    // If user has admin role then return true
    const isAdmin = tokenPayload.roles?.find(
      (e) => e.name === AuthTokens.ADMIN_ROLE
    );
    if (isAdmin) {
      await this.appendUserToRequest(context, tokenPayload);
      return true;
    }

    // If resource require a permission
    if (requiredPermission) {
      if (tokenPayload.roles) {
        for (const role of tokenPayload.roles) {
          if (role.name === AuthTokens.ADMIN_ROLE) {
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
    const token =
      req.headers.authorization?.split(' ').pop() ||
      req.cookies?.[AuthTokens. AUTH_COOKIE_NAME];

    return token;
  }

  async appendUserToRequest(
    context: ExecutionContext,
    tokenPayload: TokenPayload
  ) {
    const req = context.switchToHttp().getRequest();
    req.user = tokenPayload;
  }
}
