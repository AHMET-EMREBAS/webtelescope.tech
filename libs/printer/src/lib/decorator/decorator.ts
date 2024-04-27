import { IPrint ,DecoratorPrinterOptions} from '../common';



/**
 * Print decorators/annotations
 */
export class DecoratorPrinter implements IPrint {
  constructor(protected decoratorPrinterOptions: DecoratorPrinterOptions) {}

  protected __name() {
    return this.decoratorPrinterOptions.name;
  }

  /**
   * @returns `(` by default
   */
  protected __optionsPrefix() {
    return '(';
  }

  /**
   * @returns `)` by default
   */
  protected __optionsSuffix() {
    return ')';
  }
  protected __options() {
    return this.decoratorPrinterOptions.options;
  }

  protected __signiture() {
    return '@';
  }

  print(): string {
    return [
      this.__signiture(),
      this.__name(),
      this.__optionsPrefix(),
      this.__options(),
      this.__optionsSuffix(),
    ].join('');
  }
}
