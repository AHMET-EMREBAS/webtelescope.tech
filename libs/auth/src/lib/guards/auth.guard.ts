/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SessionService } from '../session.service';
import { Role, User } from '@webpackages/entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACCESS_TOKEN_NAME} from '@webpackages/common'
export const PUBLIC_TOKEN = Symbol('Public Resource');

/**
 * Define public resource
 * @returns
 */
export function Public() {
  return SetMetadata(PUBLIC_TOKEN, true);
}

export const REQUIRED_PERMISSION_TOKEN = Symbol('REQUIRED_PERMISSION_TOKEN');

export function RequiredPermission(permission: string) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, permission);
}

export const REQUIRED_ROLE_TOKEN = Symbol('REQUIRED_ROLE_TOKEN');

export function RequiredRole(permission: string) {
  return SetMetadata(REQUIRED_ROLE_TOKEN, permission);
}

/**
 * Get sesion id
 * @returns
 */
export const SessionId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().sessionId;
  }
);

/**
 * Get sesion id
 * @returns
 */
export const UserData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as User;
  }
);

@Injectable()
export class AuthGurad implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
    private readonly sessionService: SessionService
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const handler = ctx.getHandler();
    const resourceClass = ctx.getClass();

    const isPublic = this.reflector.getAllAndOverride(PUBLIC_TOKEN, [
      handler,
      resourceClass,
    ]);

    if (isPublic) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest() as Request;
    const token = this.extractToken(req);

    const payload = (await this.jwt.verifyAsync(token)) as { sub: number };
    const session = await this.sessionService.getSession(payload.sub);
    if (session) {
      (req as any).sessionId = session?.id;
      (req as any).user = session.user;

      if (this.isAdmin(session.user)) return true;

      this.checkUserHasRolesOrThrow(ctx, session.user.roles);
      this.checkUserHasPermissionsOrThrow(ctx, session.user.roles);

      return true;
    }
    throw new UnauthorizedException('You do not have session!');
  }

  extractToken(req: Request) {
    const [name, token] = req.headers.authorization?.split(' ') ?? [];
    if (name === 'Bearer' && token) {
      return token;
    }

    throw new UnauthorizedException('Access token is not provided!');
  }

  isAdmin(user: User) {
    return user.roles.find((e) =>
      [
        'admin',
        'root',
        'king',
        'fbi',
        'cia',
        'president',
        'mom',
        'dad',
      ].includes(e.name.toLowerCase())
    );
  }

  getMeta<K extends string>(
    context: ExecutionContext,
    key: string | symbol,
    type: K = 'override' as K
  ): K extends 'merge' ? string[] : string {
    const h = context.getHandler();
    const c = context.getClass();
    if (type === 'override') {
      return this.reflector.getAllAndOverride(key, [h, c]) as K extends 'merge'
        ? string[]
        : string;
    } else {
      return this.reflector.getAllAndMerge(key, [h, c]) as K extends 'merge'
        ? string[]
        : string;
    }
  }

  /**
   * User should must have each permission
   * @param ctx
   * @param userRoles
   * @returns
   */
  checkUserHasPermissionsOrThrow(ctx: ExecutionContext, userRoles: Role[]) {
    const permissions = this.getMeta(ctx, REQUIRED_PERMISSION_TOKEN, 'merge');

    if (permissions.length > 0)
      for (const p of permissions) {
        const foundPermission = userRoles.find((e) => {
          const found = e.permissions.find(
            (permission) => permission.name.toLowerCase() === p.toLowerCase()
          );
          return !!found;
        });

        if (!foundPermission) {
          throw new UnauthorizedException(
            'You do not have the required permission for this operation!'
          );
        }
      }

    return true;
  }

  /**
   * User must have each role
   * @param ctx
   * @param userRoles
   * @returns
   */
  checkUserHasRolesOrThrow(ctx: ExecutionContext, userRoles: Role[]) {
    const __roles = this.getMeta(ctx, REQUIRED_ROLE_TOKEN, 'merge');

    if (__roles.length > 0)
      if (__roles)
        for (const r of __roles) {
          const foundRole = userRoles.find(
            (userRole) => userRole.name.toLowerCase() === r.toLowerCase()
          );

          if (!foundRole)
            throw new UnauthorizedException(
              'You do not have the requried role for this operation!'
            );
        }

    return true;
  }
}

/**
 * Check authorization from authorization header.
 * @returns
 */
export function Auth() {
  return applyDecorators(ApiBearerAuth(ACCESS_TOKEN_NAME), UseGuards(AuthGurad));
}
