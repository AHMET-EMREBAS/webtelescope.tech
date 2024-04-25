import { PropertyOptions } from '../meta';
import { stringify } from '../utils';

/**
 * Dto property options contains entire options.
 * @param options 
 * @returns 
 */
export function printDtoPropertyDecorator(options: PropertyOptions) {
  const o = stringify(options);
  return `@Property(${o})`;
}

export function printEntityColumnDecorator(options: PropertyOptions) {
  const { type, unique } = options;
  const o = stringify({ type, unique });
  return `@Column(${o})`;
}
