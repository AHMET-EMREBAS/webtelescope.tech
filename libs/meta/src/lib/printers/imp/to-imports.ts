import { Constructor, Printable } from '../common';

export function toImports(
  properties: { target?: string }[],
  printable: Constructor<Printable>
): Printable[] {
  const targets = Array.from(
    new Set(properties.filter((e) => e.target).map((e) => e.target))
  );
  return targets.map((e) => new printable(e));
}
