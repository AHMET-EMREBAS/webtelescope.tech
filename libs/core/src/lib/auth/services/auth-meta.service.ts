import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  getRequiredPermissions,
  getRequiredRoles,
  getRequiredScope,
  getResourceName,
  isAuthGuardByPassed,
  isPublicAccess,
} from '../metadata';

/**
 * Get resource metadata
 */
@Injectable()
export class AuthMetaService {
  constructor(private readonly reflector: Reflector) {}

  resourceName(ctx: ExecutionContext) {
    return getResourceName(this.reflector, ctx);
  }

  getAllAndOverride(ctx: ExecutionContext, key: string | symbol) {
    return this.reflector.getAllAndOverride(key, [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
  }

  getAllAndMerge(ctx: ExecutionContext, key: string | symbol) {
    return this.reflector.getAllAndMerge(key, [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
  }

  isPublic(ctx: ExecutionContext) {
    return isPublicAccess(this.reflector, ctx);
  }

  isAuthGuardByPassed(ctx: ExecutionContext) {
    return isAuthGuardByPassed(this.reflector, ctx);
  }

  getRequiredScopes(ctx: ExecutionContext) {
    return getRequiredScope(this.reflector, ctx);
  }

  getRequiredPermissions(ctx: ExecutionContext) {
    return getRequiredPermissions(this.reflector, ctx);
  }

  getRequiredRoles(ctx: ExecutionContext) {
    return getRequiredRoles(this.reflector, ctx);
  }

  userPermissionsContainsRequiredPermissions(
    userPermissions: string[],
    requiredPermissions: string[]
  ) {
    if (userPermissions.includes('ADMIN')) {
      return true;
    }
    for (const rp of requiredPermissions)
      if (!userPermissions.includes(rp)) return false;
    return true;
  }

  userHasPermissionsContainRequiredPermissionsOrThrow(
    userPermissions: string[],
    permissions: string[]
  ) {
    if (
      this.userPermissionsContainsRequiredPermissions(
        userPermissions,
        permissions
      )
    ) {
      return true;
    }
    throw new UnauthorizedException('You do not have required permissions!');
  }

  userRolesContainRequiredRoles(userRoles: string[], roles: string[]) {
    for (const rr of roles) if (!userRoles.includes(rr)) return false;
    return true;
  }

  userRolesContainsRequiredRolesOrThrow(userRoles: string[], roles: string[]) {
    if (this.userRolesContainRequiredRoles(userRoles, roles)) return true;
    throw new UnauthorizedException('You do not have required role!');
  }

  oAuthHasRequiredScopes(oauthScopes: string[], scopes: string[]): boolean {
    for (const s of scopes) if (!oauthScopes.includes(s)) return false;
    return true;
  }
}
