import { EntityOptions, Entity as __Entity } from 'typeorm';

export function Entity(options?: EntityOptions) {
  return __Entity(options);
}
