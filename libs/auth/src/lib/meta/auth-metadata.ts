import { SetMetadata } from '@nestjs/common';

export const PUBLIC = Symbol('Public');
export function Public() {
  return SetMetadata(PUBLIC, true);
}

export const PERMISSION = Symbol('Permission');

export function Permissions(permission: string) {
  return SetMetadata(PERMISSION, permission);
}
