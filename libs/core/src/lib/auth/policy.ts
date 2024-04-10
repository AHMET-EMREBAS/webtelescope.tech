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

const SCOPE = token('scope');

export function Scope(name: string) {
  return SetMetadata(SCOPE, name);
}

export function PublicAccess() {
  return SetMetadata(PUBLIC, true);
}

export function Permission(permission: string) {
  return SetMetadata(PERMISSION, permission);
}

export function ResouceName(name: string) {
  return SetMetadata(RESOURCE_NAME, name);
}

export function Role(role: string) {
  return SetMetadata(ROLE, role);
}

export function getRequiredScope(reflector: Reflector, context: ExecutionContext) {
  return reflector.getAllAndOverride(SCOPE, [
    context.getClass(),
    context.getHandler(),
  ]);
}

export function isPublicAccess(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(PUBLIC, [
    context.getHandler(),
    context.getClass(),
  ]);
}

export function getRequiredPermissions(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndMerge(PERMISSION, [
    context.getHandler(),
    context.getClass(),
  ]);
}

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

export function createResourcePermissions(resourceName: string) {
  return [
    toPermissionString('WRITE', resourceName),
    toPermissionString('READ', resourceName),
    toPermissionString('UPDATE', resourceName),
    toPermissionString('DELETE', resourceName),
  ];
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
