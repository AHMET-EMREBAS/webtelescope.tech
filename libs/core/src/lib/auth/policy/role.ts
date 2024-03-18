import { SetMetadata } from '@nestjs/common';
import { AuthEnums } from '../enums';

export function RequiredRole(name: string) {
  return SetMetadata(AuthEnums.ROLE, name);
}

export function Administrative() {
  return RequiredRole('admin');
}

export function Superuser() {
  return RequiredRole('superuser');
}
