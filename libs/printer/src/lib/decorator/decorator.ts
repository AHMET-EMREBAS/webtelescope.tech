import { IPrint } from '../interfaces';

export type DecoratorPrinterOptions = {
  name: string;
  options: string;
};

/**
 * Print decorators/annotations
 */
export class DecoratorPrinter implements IPrint {
  constructor(protected decoratorOptions: DecoratorPrinterOptions) {}

  protected name() {
    return this.decoratorOptions.name;
  }

  /**
   * @returns `(` by default
   */
  protected optionsPrefix() {
    return '(';
  }

  /**
   * @returns `)` by default
   */
  protected optionsSuffix() {
    return ')';
  }
  protected options() {
    return this.decoratorOptions.options;
  }

  protected signiture() {
    return '@';
  }

  print(): string {
    return [
      this.signiture(),
      this.name(),
      this.optionsPrefix(),
      this.options(),
      this.optionsSuffix(),
    ].join('');
  }
}
