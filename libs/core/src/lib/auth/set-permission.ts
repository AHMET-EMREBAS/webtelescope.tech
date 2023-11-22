import { SetMetadata } from '@nestjs/common';

export function SetPermission(permission: string) {
  return SetMetadata('PERMISSION', permission);
}
