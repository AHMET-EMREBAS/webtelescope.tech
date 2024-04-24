import { createMetadata } from '../../common';
import {
  deletePermissionName,
  managePermissionName,
  readPermissionName,
  updatePermissionName,
  writePermissionName,
} from './create-permission';

export const [SetPermission, getPermission, getPermissionToken] =
  createMetadata<string>('Permission');

export const [SetRole, getRole, getRoleToken] = createMetadata<string>('Role');

export const [SetPublic, getPublic, getPublicToken] =
  createMetadata<boolean>('Public');

export const [SetScope, getScope, getScopeToken] =
  createMetadata<string>('Scope');

  
export function CanRead(resourceName: string) {
  return SetPermission(readPermissionName(resourceName));
}
export function CanWrite(resourceName: string) {
  return SetPermission(writePermissionName(resourceName));
}
export function CanUpdate(resourceName: string) {
  return SetPermission(updatePermissionName(resourceName));
}
export function CanDelete(resourceName: string) {
  return SetPermission(deletePermissionName(resourceName));
}
export function CanManage(resourceName: string) {
  return SetPermission(managePermissionName(resourceName));
}
