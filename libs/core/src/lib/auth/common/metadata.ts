import { createMetadata } from '../../common';

export const [SetPermission, getPermission, getPermissionToken] =
  createMetadata<string>('Permission');

export const [SetRole, getRole, getRoleToken] = createMetadata<string>('Role');

export const [SetPublic, getPublic, getPublicToken] =
  createMetadata<boolean>('Public');

export const [SetScope, getScope, getScopeToken] =
  createMetadata<string>('Scope');
