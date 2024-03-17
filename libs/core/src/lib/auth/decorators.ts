import {
  ExecutionContext,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { AuthGuard, LocalGuard } from './guards';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { SessionCheckerGuard } from './guards/session-checker';

export type PermissionAction = 'read' | 'write' | 'update' | 'delete';

export function createPermission(
  action: PermissionAction,
  resourceName: string
) {
  return `${action.toLowerCase()}:${resourceName.toLowerCase()}`;
}

export class Policy {
  static readonly BASIC_AUTH_NAME = 'basic-auth';
  static readonly BEARER_AUTH_NAME = 'access-token';
  static readonly PUBLIC_METADATA_KEY = Symbol('PUBLIC_METADATA_KEY');
  static readonly PERMISSION_METADATA_KEY = Symbol('PERMISSION_METADATA_KEY');
  static readonly ROLE_METADATA_KEY = Symbol('ROLE_METADATA_KEY');

  constructor(private readonly resourceName: string) {}

  /**
   * Api Local Auth (username and password)
   * @returns
   */
  static Local() {
    return applyDecorators(
      ApiBasicAuth(),
      this.Public(),
      UseGuards(LocalGuard)
    );
  }

  /**
   * Api Bearer Auth
   * @returns
   */
  static Auth() {
    return applyDecorators(
      ApiBearerAuth(this.BEARER_AUTH_NAME),
      UseGuards(AuthGuard)
    );
  }

  static SessionChecker() {
    return applyDecorators(
      ApiBearerAuth(this.BEARER_AUTH_NAME),
      UseGuards(SessionCheckerGuard)
    );
  }
  /**
   * Make resource public
   * @returns
   */
  static Public() {
    return SetMetadata(Policy.PUBLIC_METADATA_KEY, true);
  }

  /**
   * Require role
   * @param name
   * @returns
   */
  private __role(name: string) {
    return SetMetadata(Policy.ROLE_METADATA_KEY, name);
  }

  /**
   * Require permission
   * @param name
   * @returns
   */
  private __permission(name: PermissionAction) {
    return SetMetadata(
      Policy.PERMISSION_METADATA_KEY,
      createPermission(name, this.resourceName)
    );
  }

  /**
   * Require WRITE permission
   * @returns
   */
  Create() {
    return this.__permission('write');
  }

  /**
   * Require UPDATE permission
   * @returns
   */
  Update() {
    return this.__permission('update');
  }

  /**
   * Require DELETE permission
   * @returns
   */
  Delete() {
    return this.__permission('delete');
  }

  /**
   * Require QUERY permission
   * @returns
   */
  Query() {
    return this.__permission('read');
  }

  /**
   * Require Admin role
   * @returns
   */
  Admin() {
    return this.__role('Admin');
  }
}

/**
 * Extract access tokenn from request
 */
export const AccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()[Policy.BEARER_AUTH_NAME];
  }
);

export const USER_SESSION_NAME = 'userSession';

export const UserSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()[USER_SESSION_NAME];
  }
);

export const UserSessionId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()?.[USER_SESSION_NAME]?.id;
  }
);

export const UserRoles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()?.[USER_SESSION_NAME]?.user?.roles;
  }
);
