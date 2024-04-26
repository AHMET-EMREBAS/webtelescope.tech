import { IPrint } from '../common';

export type ClsasPrinterOptions = {
  name: string;
  type: string;
  content?: string;
  exports?: boolean;
};

/**
 * Print class class defination
 */
export class ClassPrinter implements IPrint {
  constructor(protected readonly clsasPrinterOptions: ClsasPrinterOptions) {}

  /**
   * @returns `export` by default
   */
  protected exportDef() {
    return 'export';
  }

  /**
   * @returns class name
   */
  protected name() {
    return this.clsasPrinterOptions.name;
  }

  /**
   * @returns class type class, interface, struct.
   */
  protected type() {
    return this.clsasPrinterOptions.type;
  }

  /**
   * Override this method if the content prefix in your programming syntax is different.
   * @returns `{` by default
   */
  protected contentPrefix() {
    return '{';
  }

  /**
   * Override this method if the content suffix in your programming syntax is different.
   * @returns `}` by default
   */
  protected contentSuffix() {
    return '}';
  }

  protected content() {
    return this.clsasPrinterOptions.content ?? '';
  }

  print(): string {
    return [
      this.clsasPrinterOptions.exports ? this.exportDef() : '',
      this.type(),
      this.name(),
      this.contentPrefix(),
      this.content(),
      this.contentSuffix(),
    ]
      .filter((e) => e != '' && e != undefined)
      .join(' ');
  }
}
