import { SetMetadata } from '@nestjs/common';

export const REQUIRED_PERMISSION_TOKEN = Symbol('REQUIRED_PERMISSION_TOKEN');

export function RequiredPermission(permission: string) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, permission);
}
