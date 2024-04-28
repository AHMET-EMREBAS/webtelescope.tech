import { IPrint } from '../common';

export type ImplementPrinterOptions = {
  items?: string[];
  item?: string;
};
export class ImplementPrinter implements IPrint {
  constructor(
    protected readonly extendsPrinterOptions: ImplementPrinterOptions
  ) {}

  /**
   * Defines delimeter between implementing items
   */
  protected __delimeter(): string {
    return ', ';
  }

  /**
   * Define join-delimeter between part of implements. Default value is " " (single space)
   */
  protected __jonBy(): string {
    return ' ';
  }

  /**
   * Defines the keyword used for implement. Default value is 'implements'
   */
  protected __keyword(): string {
    return 'implements';
  }

  /**
   * Print implementing items
   */
  protected __items(): string {
    return this.extendsPrinterOptions.items?.join(', ') ?? '';
  }

  /**
   * Print implementing item
   */
  protected __item(): string {
    return this.extendsPrinterOptions.item ?? '';
  }

  /**
   * Print implements
   */
  print(): string {
    return [this.__keyword(), this.__items(), this.__item()].join(
      this.__jonBy()
    );
  }
}
