import { IPrint, DecoratorPrinterOptions } from '../common';

/**
 * Print decorators/annotations
 */
export class DecoratorPrinter implements IPrint {
  constructor(protected optionz: DecoratorPrinterOptions) {}

  /**
   * Decorator name
   */
  protected __name(): string {
    return this.optionz.name;
  }

  /**
   * `@DecoratorName<prefix><options><suffix>`. Default value is `(`
   */
  protected __optionsPrefix(): string {
    return '(';
  }

  /**
   * `@DecoratorName<prefix><options><suffix>` Default value is  `)`
   */
  protected __optionsSuffix(): string {
    return ')';
  }

  /**
   * `@DecoratorName<prefix><options><suffix>`
   */
  protected __options(): string {
    return this.optionz.options ?? '';
  }

  /**
   * Every programming language has its own decorator signiture such us `@`, `#`, `#[]`, `!` . Default value is `'@'`
   */
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
