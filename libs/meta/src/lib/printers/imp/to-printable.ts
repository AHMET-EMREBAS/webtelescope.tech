import { CommonPropertyOptions, Constructor, Printable } from '../common';

export function toPrintable(
  options: CommonPropertyOptions,
  printable: Constructor<Printable>
): Printable {
  return new printable(options);
}
