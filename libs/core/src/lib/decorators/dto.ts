import { CombineClassDecorators } from './combine';
import { Exclude } from 'class-transformer';

/**
 * Decorate Data Transfer Object with this decorator which decorate the class with required decorators.
 * @returns {ClassDecorator}
 */
export function Dto(): ClassDecorator {
  return CombineClassDecorators(Exclude());
}
