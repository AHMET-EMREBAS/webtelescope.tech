import { Entity as __Entity } from 'typeorm';
import { CombineClassDecorators } from './combine';

/**
 * Decorate entity classes with this decorator to apply required decorator for the entity.
 * @returns {ClassDecorator}
 */
export function Entity(): ClassDecorator {
  return CombineClassDecorators(__Entity());
}
