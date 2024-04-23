import { CustomDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { v4 } from 'uuid';

/**
 * @index 0 is to set metadata
 * @index 1 is to get metadata
 * @index 2 is to get token
 */
export type MetadataHandlers<T> = [
  (value?: T) => CustomDecorator,
  (reflector: Reflector, context: ExecutionContext) => T,
  () => string
];

/**
 * SetMetadata helper
 * @param prefix
 * @return index 0 is to set metadata
 * @return index 1 is to get metadata
 * @return index 2 is to get token
 * @returns MetadataHandlers {@link MetadataHandlers}
 */
export function createMetadata<T>(prefix: string): MetadataHandlers<T> {
  const key = prefix + v4();
  return [
    <T>(value?: T) => SetMetadata(key, value ?? true),
    (reflector: Reflector, context: ExecutionContext) => {
      return reflector.getAllAndOverride(key, [
        context.getClass(),
        context.getHandler(),
      ]);
    },
    () => key,
  ];
}
