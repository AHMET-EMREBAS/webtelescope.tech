import {
  ExecutionContext,
  Injectable,
  Logger,
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
} from '@webpackages/core';

/**
 * Get resource metadata
 */
@Injectable()
export class AuthMetaService {
  protected readonly logger!: Logger;
  constructor(private readonly reflector: Reflector) {
    this.logger = new Logger(AuthMetaService.name);
  }

  resourceName(ctx: ExecutionContext) {
    const result = getResourceName(this.reflector, ctx);
    this.logger.debug(`Resource Name : ${result}`);
    return result;
  }

  isPublic(ctx: ExecutionContext) {
    const result = isPublicAccess(this.reflector, ctx);
    this.logger.debug(`Is Public Access : ${result}`);
    return result;
  }

  isAuthGuardByPassed(ctx: ExecutionContext) {
    const result = isAuthGuardByPassed(this.reflector, ctx);
    this.logger.debug(`Is AuthGuard Bypassed : ${result}`);
    return result;
  }

  getRequiredScopes(ctx: ExecutionContext) {
    const result = getRequiredScope(this.reflector, ctx);
    this.logger.debug(`Required Scopes : ${result}`);
    return result;
  }

  getRequiredPermissions(ctx: ExecutionContext) {
    const result = getRequiredPermissions(this.reflector, ctx);
    this.logger.debug(`Required Permissions : ${result}`);
    return result;
  }

  getRequiredRoles(ctx: ExecutionContext) {
    const result = getRequiredRoles(this.reflector, ctx);
    this.logger.debug(`Required Permissions : ${result}`);
    return result;
  }

  userPermissionsContainsRequiredPermissions(
    userPermissions: string[],
    requiredPermissions: string[]
  ) {
    if (userPermissions.includes('ADMIN')) {
      this.logger.debug('User has ADMIN role');
      return true;
    }
    for (const rp of requiredPermissions)
      if (!userPermissions.includes(rp)) {
        this.logger.debug(`User does not have the permission ${rp}`);
        return false;
      }

    this.logger.debug(`User has all permissions ${requiredPermissions}`);
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
    for (const rr of roles)
      if (!userRoles.includes(rr)) {
        this.logger.debug(`User does not have the role ${rr}`);
        return false;
      }

    this.logger.debug(`User have all the roles ${roles}`);
    return true;
  }

  userRolesContainsRequiredRolesOrThrow(userRoles: string[], roles: string[]) {
    if (this.userRolesContainRequiredRoles(userRoles, roles)) return true;
    throw new UnauthorizedException('You do not have required role!');
  }

  oAuthHasRequiredScopes(oauthScopes: string[], scopes: string[]): boolean {
    for (const s of scopes)
      if (!oauthScopes.includes(s)) {
        this.logger.debug(`OAuth does not have required scopes ${scopes}`);
        return false;
      }

    this.logger.debug(`OAuth has all required scopes ${scopes}`);
    return true;
  }
}
