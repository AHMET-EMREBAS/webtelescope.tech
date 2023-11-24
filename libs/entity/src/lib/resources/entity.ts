import { EntityOptions, Entity as __Entity } from 'typeorm';

/**
 * TypeOrm Entity Decorator
 * @param options
 * @returns
 */
export function Entity(options?: EntityOptions) {
  return __Entity(options);
}
