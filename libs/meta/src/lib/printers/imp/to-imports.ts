import { Constructor, Printable } from '../common';

export function toImports(
  properties: { target?: Constructor }[],
  printable: Constructor<Printable>
): Printable[] {
  const targets = Array.from(
    new Set(properties.filter((e) => e.target).map((e) => e.target?.name))
  );
  return targets.map((e) => new printable(e));
}
