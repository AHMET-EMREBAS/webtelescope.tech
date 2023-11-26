import { SetMetadata } from '@nestjs/common';

export const PUBLIC = Symbol('Public');

/**
 * Make route public
 * @returns
 */
export function Public() {
  return SetMetadata(PUBLIC, true);
}

export const PERMISSION = Symbol('Permission');

/**
 * Protect route by permission
 * @param permission
 * @returns
 */
export function SetPermission(permission: string) {
  return SetMetadata(PERMISSION, permission);
}

export const ROLE = Symbol('Role');

/**
 * Protect route by role
 * @param role
 * @returns
 */
export function SetRole(role: string) {
  return SetMetadata(ROLE, role);
}

export const ADMIN_ROLE_NAME = 'admin';
