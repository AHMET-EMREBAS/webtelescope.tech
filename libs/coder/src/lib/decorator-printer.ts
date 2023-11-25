/* eslint-disable @typescript-eslint/no-explicit-any */
import { toPrintable } from '@webpackages/util';
import { Printable } from './printable';

export class DecoratorOptions {
  name!: string;
  options!: Record<string, any>;

  constructor(options: DecoratorOptions) {
    Object.assign(this, options);
  }
}

export class DecoratorPrinter implements Printable {
  constructor(protected options: DecoratorOptions) {}
  print() {
    return `@${this.options.name}(${toPrintable(this.options.options)})`;
  }
}
