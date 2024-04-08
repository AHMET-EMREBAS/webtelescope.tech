/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session, User } from '@webpackages/entity';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { compareSync } from 'bcrypt';
import {
  getRequiredPermissions,
  getRequiredRoles,
  getResourceName,
  isPublicAccess,
} from './policy';

import { LoginWithCodeDto } from '@webpackages/dto';
import { ICredentials } from '@webpackages/model';
import { AuthEnums } from './enums';

export class BaseAuthService {
  constructor(protected readonly reflector: Reflector) {}

  resourceName(ctx: ExecutionContext) {
    return getResourceName(this.reflector, ctx);
  }

  comparePassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  comparePasswordOrThrow(password: string, hashPassword: string) {
    if (this.comparePassword(password, hashPassword)) return true;

    throw new UnauthorizedException('Wrong password');
  }

  extractToken(ctx: ExecutionContext) {
    const headers = this.request(ctx).headers;
    const bearerToken = headers.authorization ?? undefined;
    const [, token] = bearerToken?.split(' ') ?? [];
    return token;
  }

  extractTokenOrThrow(ctx: ExecutionContext) {
    const token = this.extractToken(ctx);
    if (token) return token;
    throw new UnauthorizedException('You do not have a session!');
  }
  /**
   * Append authorization token to header
   * @param ctx
   * @param token
   */
  appendAuthorizationToken(ctx: ExecutionContext, token: string) {
    this.request(ctx).headers.authorization = token;
  }

  /**
   * Append session to request
   * @param ctx
   * @param session
   */
  appendSessionToRequest(ctx: ExecutionContext, session: Session) {
    (this.request(ctx) as any)[AuthEnums.SESSION] = session;
  }

  getSessionFromRequest(ctx: ExecutionContext): Session {
    return (this.request(ctx) as any)[AuthEnums.SESSION];
  }

  getParamId(ctx: ExecutionContext): string {
    return this.request(ctx).params['id'];
  }

  /**
   * Append user to request
   * @param ctx
   * @param user
   */
  appendUserToRequest(ctx: ExecutionContext, user: User) {
    (this.request(ctx) as any)[AuthEnums.USER] = user;
  }

  extractUsernameFromBody(ctx: ExecutionContext): string | undefined {
    const { username } = this.request(ctx).body;
    if (username) return username;
    return undefined;
  }

  extractUsernameFromBodyOrThrow(ctx: ExecutionContext) {
    const username = this.extractUsernameFromBody(ctx);
    if (username) return username;
    throw new UnauthorizedException('Username is not provided!');
  }

  extractUsernameAndPassworFromBody(
    ctx: ExecutionContext
  ): ICredentials | undefined {
    const { username, password } = this.request(ctx).body;
    if (username && password) return { username, password };
    return undefined;
  }

  extractUsernameAndPassworFromBodyThrow(ctx: ExecutionContext) {
    const credentials = this.extractUsernameAndPassworFromBody(ctx);
    if (credentials) return credentials;
    throw new UnauthorizedException('Username or password is not provided!');
  }

  extractSecurityCodeFromQuery(ctx: ExecutionContext) {
    const { securityCode } = this.request(ctx).query as any as LoginWithCodeDto;
    return securityCode;
  }

  extractSecurityCodeFromQueryOrThrow(ctx: ExecutionContext) {
    const securityCode = this.extractSecurityCodeFromQuery(ctx);

    if (securityCode) return securityCode;
    throw new UnauthorizedException('Security code is not provided!');
  }

  request(ctx: ExecutionContext): Request {
    return ctx.switchToHttp().getRequest() as Request;
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

  requiredPermissions(ctx: ExecutionContext) {
    return getRequiredPermissions(this.reflector, ctx);
  }

  requiredRoles(ctx: ExecutionContext) {
    return getRequiredRoles(this.reflector, ctx);
  }

  userHasPermissions(userPermissions: string[], requiredPermissions: string[]) {
    if (userPermissions.includes('ADMIN')) {
      return true;
    }
    for (const rp of requiredPermissions)
      if (!userPermissions.includes(rp)) return false;
    return true;
  }

  userHasPermissionsOrThrow(userPermissions: string[], permissions: string[]) {
    if (this.userHasPermissions(userPermissions, permissions)) {
      return true;
    }
    throw new UnauthorizedException('You do not have required permissions!');
  }

  userHasRoles(userRoles: string[], roles: string[]) {
    for (const rr of roles) if (!userRoles.includes(rr)) return false;
    return true;
  }

  userHasRolesOrThrow(userRoles: string[], roles: string[]) {
    if (this.userHasRoles(userRoles, roles)) return true;

    throw new UnauthorizedException('You do not have required role!');
  }
}
