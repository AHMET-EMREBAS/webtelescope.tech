import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

export class Policy {
  static readonly ACCESS_TOKEN_NAME = 'access-token';
  static readonly PUBLIC_METADATA_KEY = Symbol('PUBLIC_METADATA_KEY');
  static readonly PERMISSION_METADATA_KEY = Symbol('PERMISSION_METADATA_KEY');
  static readonly ROLE_METADATA_KEY = Symbol('ROLE_METADATA_KEY');

  constructor(private readonly resourceName: string) {}

  static Public() {
    return SetMetadata(Policy.PUBLIC_METADATA_KEY, true);
  }

  private __role(name: string) {
    return SetMetadata(Policy.ROLE_METADATA_KEY, name);
  }

  private __permission(name: string) {
    return SetMetadata(
      Policy.PERMISSION_METADATA_KEY,
      `${name}:${this.resourceName}`
    );
  }

  Create() {
    return this.__permission('create');
  }

  Update() {
    return this.__permission('update');
  }

  Delete() {
    return this.__permission('delete');
  }

  Query() {
    return this.__permission('query');
  }

  Admin() {
    return this.__role('Admin');
  }
}

/**
 * Extract access tokenn from request
 */
export const AccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()[Policy.ACCESS_TOKEN_NAME];
  }
);
