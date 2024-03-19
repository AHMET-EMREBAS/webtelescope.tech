// @index('./*', f => `export * from '${f.path}'`)

import { createMetadata } from '../../providers';

export const [PublicAccess, isPublicAccess] = createMetadata();
export const [SetPermission, getRequiredPermissions] = createMetadata(false);
export const [SetRole, getRequiredRoles] = createMetadata(false);

