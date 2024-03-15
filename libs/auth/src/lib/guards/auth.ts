/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role, Session, User } from '@webpackages/entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_NAME } from '@webpackages/common';
import {
  PUBLIC_TOKEN,
  REQUIRED_PERMISSION_TOKEN,
  REQUIRED_ROLE_TOKEN,
} from '../decorators';
import { getTokenFromAutorizationHeader } from '../utils';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGurad implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(Session) private readonly sessionRepo: Repository<Session>
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const handler = ctx.getHandler();
    const resourceClass = ctx.getClass();

    const isPublic = this.reflector.getAllAndOverride(PUBLIC_TOKEN, [
      handler,
      resourceClass,
    ]);

    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest() as Request;
    const token = getTokenFromAutorizationHeader(req);

    if (!token) throw new UnauthorizedException('You do not have a session!');

    const payload = (await this.jwt.verifyAsync(token)) as { sub: number };
    const session = await this.sessionRepo.findOneBy({ id: payload.sub });

    if (session) {
      (req as any).sessionId = session?.id;
      (req as any).user = session.user;

      if (this.isAdmin(session.user)) return true;

      this.verifyRoles(ctx, session.user.roles);
      this.verifyPermissions(ctx, session.user.roles);

      return true;
    }
    throw new UnauthorizedException('You do not have session!');
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
  verifyPermissions(ctx: ExecutionContext, userRoles: Role[]) {
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
  verifyRoles(ctx: ExecutionContext, userRoles: Role[]) {
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
  return applyDecorators(ApiBearerAuth(AUTH_NAME), UseGuards(AuthGurad));
}
