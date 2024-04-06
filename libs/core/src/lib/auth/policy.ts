import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { v4 } from 'uuid';

export function token(prefix: string) {
  return `${prefix}_${v4()}`;
}
const RESOURCE_NAME = token('resource-name');
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

export function ResouceName(name: string) {
  return SetMetadata(RESOURCE_NAME, name);
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

export function getResourceName(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(RESOURCE_NAME, [
    context.getClass(),
    context.getHandler(),
  ]);
}

export class PermissionActionClass {
  readonly READ = 'READ';
  readonly WRITE = 'WRITE';
  readonly UPDATE = 'UPDATE';
  readonly DELETE = 'DELETE';
}

export const PermissionAction = new PermissionActionClass();

export type PermissionActionType = keyof PermissionActionClass;

export const PermissionActionlist = Object.keys(
  PermissionAction
) as PermissionActionType[];

/**
 * Convert resource name and action into permission string
 * @param action
 * @param resourceName
 * @returns
 */
export function toPermissionString(
  action: PermissionActionType,
  resourceName: string
) {
  return `${action.toUpperCase()}:${resourceName.toUpperCase()}`;
}

/**
 * Write permission
 * @param resourceName
 * @returns
 */
export function CanWrite(resourceName: string) {
  return Permission(toPermissionString('WRITE', resourceName));
}

/**
 * Update permission
 * @param resourceName
 * @returns
 */
export function CanUpdate(resourceName: string) {
  return Permission(toPermissionString('UPDATE', resourceName));
}

/**
 * Delete permission
 * @param resourceName
 * @returns
 */
export function CanDelete(resourceName: string) {
  return Permission(toPermissionString('DELETE', resourceName));
}

/**
 * Read permission
 * @param resourceName
 * @returns
 */
export function CanRead(resourceName: string) {
  return Permission(toPermissionString('READ', resourceName));
}

/**
 * Admin ROle
 * @returns
 */
export function IsAdmin() {
  return Role('ADMIN');
}
