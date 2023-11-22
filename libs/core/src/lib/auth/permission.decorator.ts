import { SetMetadata } from '@nestjs/common';
import { PERMISSION_METADATA_KEY } from '@webtelescopetech/common';

/**
 * Set permission metadata for the route
 * @param permission
 * @returns {MethodDecorator}
 */
export function Permission(permission: string): MethodDecorator {
  return SetMetadata(PERMISSION_METADATA_KEY, permission);
}
