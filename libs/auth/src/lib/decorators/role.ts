import { SetMetadata } from '@nestjs/common';

export const REQUIRED_ROLE_TOKEN = Symbol('REQUIRED_ROLE_TOKEN');

export function RequiredRole(permission: string) {
  return SetMetadata(REQUIRED_ROLE_TOKEN, permission);
}
