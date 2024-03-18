import { SetMetadata } from '@nestjs/common';
import { AuthEnums } from '../enums';

export type OperationNames = 'create' | 'update' | 'delete' | 'read';

export function createPermission(
  resourceName: string,
  operation: OperationNames
) {
  return `${operation}:${resourceName}`.toLowerCase();
}

export function RequiredPermission(name: string) {
  return SetMetadata(AuthEnums.PERMISSION, name);
}

export function CanCreate(resourceName: string) {
  return RequiredPermission(createPermission(resourceName, 'create'));
}

export function CanUpdate(resourceName: string) {
  return RequiredPermission(createPermission(resourceName, 'update'));
}

export function CanRead(resourceName: string) {
  return RequiredPermission(createPermission(resourceName, 'read'));
}

export function CanDelete(resourceName: string) {
  return RequiredPermission(createPermission(resourceName, 'delete'));
}
