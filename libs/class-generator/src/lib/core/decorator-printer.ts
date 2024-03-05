import { codify } from './codify';
import { CommonOptions } from './common-options';
import { Printer } from './printer';

export class DecoratorOptions extends CommonOptions {
  options?: Record<string, unknown>;
}

export class DecoratorPrinter implements Printer {
  constructor(private readonly options: DecoratorOptions) {}
  print(): string {
    const name = this.options.name;
    const options = this.options.options ? codify(this.options.options) : '';

    return `@${name}(${options})`;
  }
}
