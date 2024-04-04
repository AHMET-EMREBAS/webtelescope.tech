import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { v4 } from 'uuid';

export function token(prefix: string) {
  return `${prefix}_${v4()}`;
}
const PUBLIC = token('public');
const PERMISSION = token('permission');
const ROLE = token('permission');

export function PublicAccess() {
  return SetMetadata(PUBLIC, true);
}

/**
 * When resource method/controller decorated with this decorator,
 * User must have the provided permission to access this resource
 * @param permission
 * @returns
 */
export function Permission(permission: string) {
  return SetMetadata(PERMISSION, permission);
}

/**
 * When resource method/controller decorated with this decorator,
 * User must have the provided role to access this resource
 * @param role
 * @returns
 */
export function Role(role: string) {
  return SetMetadata(ROLE, role);
}

/**
 * Check the resouce is marked as public
 * @param reflector
 * @param context
 * @returns
 */
export function isPublicAccess(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(PUBLIC, [
    context.getHandler(),
    context.getClass(),
  ]);
}

/**
 * Get required permission for the resource
 * @param reflector
 * @param context
 * @returns
 */
export function getRequiredPermissions(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndMerge(PERMISSION, [
    context.getHandler(),
    context.getClass(),
  ]);
}

/**
 * Get required roles for the resource
 * @param reflector
 * @param context
 * @returns
 */
export function getRequiredRoles(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndMerge(ROLE, [
    context.getHandler(),
    context.getClass(),
  ]);
}

/**
 * Convert resource name and action into permission string
 * @param action
 * @param resourceName
 * @returns
 */
export function toPermissionString(action: string, resourceName: string) {
  return `${action.toUpperCase()}:${resourceName.toUpperCase()}`;
}

/**
 * Write permission
 * @param resourceName
 * @returns
 */
export function CanWrite(resourceName: string) {
  return Permission(toPermissionString('write', resourceName));
}

/**
 * Update permission
 * @param resourceName
 * @returns
 */
export function CanUpdate(resourceName: string) {
  return Permission(toPermissionString('update', resourceName));
}

/**
 * Delete permission
 * @param resourceName
 * @returns
 */
export function CanDelete(resourceName: string) {
  return Permission(toPermissionString('delete', resourceName));
}

/**
 * Read permission
 * @param resourceName
 * @returns
 */
export function CanRead(resourceName: string) {
  return Permission(toPermissionString('read', resourceName));
}

/**
 * Admin ROle
 * @returns
 */
export function IsAdmin() {
  return Role('ADMIN');
}
