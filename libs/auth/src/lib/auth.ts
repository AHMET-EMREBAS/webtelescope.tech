import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROLE = 'admin';
export const SUBSCRIBER_ROLE = 'subscriber';
export const AUTH_COOKIE_NAME = 'authtoken';
export const AUTH_BEARER_NAME = 'autorization';
export const SET_PERMISSION_TOKEN = Symbol('SET_PERMISSION_TOKEN');
export const SET_PUBLIC_TOKEN = Symbol('SET_PUBLIC_TOKEN');
export const SET_ROLE_TOKEN = Symbol('SET_ROLE_TOKEN');

export interface AuthPayload {
  sub: number;
}

/**
 * Require a permission for request
 * To check user has permission or not use the hasPermission function
 * @param permission
 * @returns
 */
export function SetPermission(permission: string) {
  return SetMetadata(SET_PERMISSION_TOKEN, permission);
}

/**
 * Require a role for request
 * To check user has role or not use the hasRole function
 * @param role
 * @returns
 */
export function SetRole(role: string) {
  return SetMetadata(SET_ROLE_TOKEN, role);
}

/**
 * Mark resource public.
 * To check the resource is public or not use the isPublic function.
 * @returns
 */
export function SetPublic() {
  return SetMetadata(SET_PUBLIC_TOKEN, true);
}

/**
 * Extract token from autorization header
 * @param context
 * @returns
 */
export function authHeader(context: ExecutionContext): string | undefined {
  return context
    .switchToHttp()
    .getRequest<Request>()
    .headers?.authorization?.split(' ')
    .pop();
}

/**
 * Extract token from cookie
 * @param context
 * @returns
 */
export function authCookie(context: ExecutionContext): string {
  return context.switchToHttp().getRequest<Request>().cookies?.[
    AUTH_COOKIE_NAME
  ];
}

/**
 * Get the required permission for the request
 * @param context
 * @param reflector
 * @returns
 */
export function requiredPermission(
  context: ExecutionContext,
  reflector: Reflector
): string | undefined {
  return reflector.getAllAndOverride(SET_PERMISSION_TOKEN, [
    context.getHandler(),
    context.getClass(),
  ]);
}

export function requiredRole(
  context: ExecutionContext,
  reflector: Reflector
): string | undefined {
  return reflector.getAllAndOverride(SET_ROLE_TOKEN, [
    context.getHandler(),
    context.getClass(),
  ]);
}

export function isPublic(
  context: ExecutionContext,
  reflector: Reflector
): boolean {
  return reflector.getAllAndOverride(SET_PUBLIC_TOKEN, [
    context.getHandler(),
    context.getClass(),
  ]);
}

export type ResourceAction = 'read' | 'write' | 'update' | 'delete';

export function createPermission(
  action: ResourceAction,
  resourceName: string
): string {
  return `${action}:${resourceName}`;
}

export function readPermission(resourceName: string) {
  return createPermission('read', resourceName);
}

export function writePermission(resourceName: string) {
  return createPermission('write', resourceName);
}

export function deletePermission(resourceName: string) {
  return createPermission('delete', resourceName);
}

export function updatePermission(resourceName: string) {
  return createPermission('update', resourceName);
}

export function WritePermission(resourceName: string) {
  return SetPermission(writePermission(resourceName));
}

export function ReadPermission(resourceName: string) {
  return SetPermission(readPermission(resourceName));
}

export function UpdatePermission(resourceName: string) {
  return SetPermission(updatePermission(resourceName));
}

export function DeletePermission(resourceName: string) {
  return SetPermission(deletePermission(resourceName));
}
