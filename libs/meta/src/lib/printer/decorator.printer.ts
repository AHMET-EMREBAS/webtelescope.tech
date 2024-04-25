import { PropertyOptions } from '../meta';
import { stringify } from '../utils';

export function printDtoPropertyDecorator(options: PropertyOptions) {
  const jsonOptions = stringify(options);
  return `@Property(${jsonOptions})`;
}

export function printEntityColumnDecorator(options: PropertyOptions) {
  const { type, unique } = options;
  const jsonstr = stringify({ type, unique });
  return `@Column(${jsonstr})`;
}
