/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPrint } from './print';

export type DecoratorPrinterOptions = {
  name: string;
  options?: Record<string, any>;
};

export class DecoratorPrinter implements IPrint {
  constructor(private readonly options: DecoratorPrinterOptions) {}

  decoratorOptions() {
    if (this.options.options) {
      return JSON.stringify(this.options.options);
    }
    return '';
  }
  print(): string {
    return `@${this.options.name}(${this.decoratorOptions()})`;
  }
}
