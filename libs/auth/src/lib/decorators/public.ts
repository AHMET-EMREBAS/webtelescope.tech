import { SetMetadata } from '@nestjs/common';

export const PUBLIC_TOKEN = Symbol('Public Resource');

/**
 * Define public resource
 * @returns
 */
export function Public() {
  return SetMetadata(PUBLIC_TOKEN, true);
}
