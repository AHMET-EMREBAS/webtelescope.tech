import { IPrint } from '../common';

/**
 * Generic printer options
 */
export type GenericPrinterOptions = {
  /**
   * Generic items
   */
  items?: string[];

  /**
   * Generic item
   */
  item?: string;
};

/**
 * Print generics
 */
export class GenericPrinter implements IPrint {
  constructor(
    protected readonly extendsPrinterOptions: GenericPrinterOptions
  ) {}

  /**
   * Defines the delimeter between the generic items. Default value is ', '
   */
  protected __delimeter(): string {
    return ', ';
  }

  /**
   * Defines prefix for generic statement. Default value is '<'
   */
  protected __prefix(): string {
    return '<';
  }

  /**
   * Defines suffix for generic statement. Default value is '>'
   */
  protected __suffix(): string {
    return '>';
  }

  /**
   * Print generic items
   */
  protected __items(): string {
    return this.extendsPrinterOptions.items?.join(this.__delimeter()) ?? '';
  }

  /**
   * Print generic item
   */
  protected __item(): string {
    return this.extendsPrinterOptions.item ?? '';
  }

  /**
   * Print the generics
   */
  print(): string {
    if (this.__items()) {
      return [
        this.__prefix(),
        this.__items(),
        this.__item(),
        this.__suffix(),
      ].join(' ');
    }
    return '';
  }
}
