import { SetMetadata } from '@nestjs/common';
import { PUBLIC_METADATA_KEY } from '@webtelescopetech/common';

/**
 * Set public metadata true for the route
 * @returns {MethodDecorator}
 */
export function PublicResource(): MethodDecorator {
  return SetMetadata(PUBLIC_METADATA_KEY, true);
}
