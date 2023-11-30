import { PropertyMeta, RelationMeta } from '../../meta';
import { Constructor, Printable } from '../common';

export function toPrintable(
  options: PropertyMeta | RelationMeta,
  printable: Constructor<Printable>
): Printable {
  return new printable(options);
}
