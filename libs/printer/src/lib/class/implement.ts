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
   * Delimeter between implemented Interfaces.
   * @returns
   */
  protected __delimeter() {
    return ', ';
  }

  /**
   * default value is " " (single space)
   * @returns
   */
  protected __jonBy() {
    return ' ';
  }

  /**
   * @returns implements keyword 
   */
  protected __keyword() {
    return 'implements';
  }

  protected __items() {
    return this.extendsPrinterOptions.items?.join(', ') ?? '';
  }
  protected __item() {
    return this.extendsPrinterOptions.item;
  }

  print(): string {
    return [this.__keyword(), this.__items(), this.__item()].join(
      this.__jonBy()
    );
  }
}
