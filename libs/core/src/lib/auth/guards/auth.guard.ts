/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  ADMIN_ROLE_NAME,
  AUTH_TOKEN_NAME,
  PERMISSION_METADATA_KEY,
  PUBLIC_METADATA_KEY,
} from '@webtelescopetech/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../dto/user-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    // Is route set public?
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If resource is public return true;
    if (isPublic) return true;

    // Get the token from request
    const token = this.extractToken(context);

    // If there is no token, return false
    if (!token) return false;

    const userPayload = this.jwtService.verify(token) as UserPayload;

    if (!userPayload) {
      return false;
    }

    (req as any).user = userPayload;

    const requiredPermission = this.reflector.getAllAndOverride(
      PERMISSION_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );

    // If there is no required permission, then return true
    if (!requiredPermission) {
      return true;
    }

    // If there is permission, user has the permission or not

    for (const role of userPayload.roles) {
      if (role.name == ADMIN_ROLE_NAME) {
        return true;
      }

      for (const permission of role.permissions || []) {
        // If user has the permission, then return true
        if (permission === requiredPermission) {
          return true;
        }
      }
    }

    // If user does not have the permission, then return false
    return false;
  }

  /**
   * Extract token from cookie/authorization header
   * @param context
   * @returns
   */
  extractToken(context: ExecutionContext): string | undefined {
    const req = context.switchToHttp().getRequest<Request>();
    const authCookie = req.cookies?.[AUTH_TOKEN_NAME];

    if (authCookie) {
      return authCookie;
    }

    const authorization = req.headers.authorization;

    if (authorization) {
      const [, token] = authorization.split(' ');
      return token;
    }

    return;
  }
}
