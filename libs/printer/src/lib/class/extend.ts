import { IPrint } from '../common';

export type ExtendPrinterOptions = {
  items?: string[];
  item?: string;
};
export class ExtendPrinter implements IPrint {
  constructor(protected readonly extendsPrinterOptions: ExtendPrinterOptions) {}

  /**
   *
   * @returns `' '`
   */
  protected __joinBy() {
    return ' ';
  }
  /**
   *
   * @returns `', '`
   */
  protected __delimeter() {
    return ', ';
  }
  /**
   *
   * @returns `'extends'`
   */
  protected __keyword() {
    return 'extends';
  }

  protected __items() {
    return this.extendsPrinterOptions.items?.join(this.__delimeter()) ?? '';
  }
  protected __item() {
    return this.extendsPrinterOptions.item;
  }

  print(): string {
    return [this.__keyword(), this.__items(), this.__item()].join(
      this.__joinBy()
    );
  }
}
