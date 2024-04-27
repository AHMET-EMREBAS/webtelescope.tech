import { IPrint } from '../common';

export type GenericPrinterOptions = {
  items?: string[];
  item?: string;
};

export class GenericPrinter implements IPrint {
  constructor(
    protected readonly extendsPrinterOptions: GenericPrinterOptions
  ) {}

  /**
   *
   * @returns `', '`
   */
  protected __delimeter() {
    return ', ';
  }

  /**
   * @returns `'<'`
   */
  protected __prefix() {
    return '<';
  }

  /**
   * @returns `'>'`
   */
  protected __suffix() {
    return '>';
  }

  protected __items() {
    return this.extendsPrinterOptions.items?.join(this.__delimeter()) ?? '';
  }

  protected __item() {
    return this.extendsPrinterOptions.item;
  }

  print(): string {
    return [
      this.__prefix(),
      this.__items(),
      this.__item(),
      this.__suffix(),
    ].join(' ');
  }
}
