import { SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export class AuthActions {
  static readonly READ = 'READ';
  static readonly WRITE = 'WRITE';
  static readonly UPDATE = 'UPDATE';
  static readonly DELETE = 'DELETE';
}

export class AuthTokens {
  static API_BEARER_NAME = 'authBearer';
  static PERMISSION = Symbol('permission');
  static ROLE = Symbol('role');
  static PUBLIC = Symbol('public');
  static ADMIN_ROLE = 'admin';
  static ROOT_ROLE = 'root';
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
