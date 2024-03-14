import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export const RESOURCE_NAME = Symbol('RESOURCE_NAME');

export function ResourceName(name: string) {
  return SetMetadata(RESOURCE_NAME, name);
}

export function getResourceName(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(RESOURCE_NAME, [
    context.getHandler(),
    context.getClass(),
  ]);
}
