import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export class AuthActions {
  static readonly READ = 'READ';
  static readonly WRITE = 'WRITE';
  static readonly UPDATE = 'UPDATE';
  static readonly DELETE = 'DELETE';
}

export class AuthTokens {
  /**
   * Api bearer name
   */
  static API_BEARER_NAME = 'authBearer';

  /**
   * Auth cookie name
   */
  static AUTH_COOKIE_NAME = 'authtoken';

  /**
   * Permission metadata token
   */
  static PERMISSION = Symbol('permission');

  /**
   * Role metadata token
   */
  static ROLE = Symbol('role');

  /**
   * Public metadata token
   */
  static PUBLIC = Symbol('public');

  /**
   * Admin role name
   */
  static ADMIN_ROLE = 'admin';

  /**
   * Subscriber name
   */
  static SUBSCRIBER_ROLE = 'subscriber';

  /**
   * Root role name
   */
  static ROOT_ROLE = 'root';
}

export function Public() {
  return SetMetadata(AuthTokens.PUBLIC, true);
}

export class SecurityBuilder {
  /**
   * Resource name
   */
  private readonly RESOURCE = this.entity.name.toUpperCase();

  /**
   * @param entity Entity class
   */
  constructor(private readonly entity: ClassConstructor<unknown>) {}

  /**
   * Public resource
   * @returns
   */
  PUBLIC() {
    return SetMetadata(AuthTokens.PUBLIC, true);
  }

  /**
   * Require read permission
   * @returns
   */
  READ() {
    return SetMetadata(
      AuthTokens.PERMISSION,
      `${AuthActions.READ}:${this.RESOURCE}`
    );
  }

  /**
   * Require write permission
   * @returns
   */
  WRITE() {
    return SetMetadata(
      AuthTokens.PERMISSION,
      `${AuthActions.WRITE}:${this.RESOURCE}`
    );
  }

  /**
   * Require update permission
   * @returns
   */
  UPDATE() {
    return SetMetadata(
      AuthTokens.PERMISSION,
      `${AuthActions.UPDATE}:${this.RESOURCE}`
    );
  }

  /**
   * Require delete permission
   * @returns
   */
  DELETE() {
    return SetMetadata(
      AuthTokens.PERMISSION,
      `${AuthActions.DELETE}:${this.RESOURCE}`
    );
  }

  /**
   * Require admin role
   * @returns
   */
  ADMIN() {
    return SetMetadata(AuthTokens.ROLE, AuthTokens.ADMIN_ROLE);
  }

  /**
   * Require root role
   * @returns
   */
  ROOT() {
    return SetMetadata(AuthTokens.ROLE, AuthTokens.ROOT_ROLE);
  }
}

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user?.id;
  }
);
