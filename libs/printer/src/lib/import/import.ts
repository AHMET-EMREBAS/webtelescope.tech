import { IPrint, ImportPrinterOptions } from '../common';

export class ImportPrinter implements IPrint {
  constructor(protected readonly __importPrinterOptions: ImportPrinterOptions) {}

  /**
   * Import keyword
   * @returns `import`
   */
  protected __importKeyWord() {
    return 'import';
  }

  protected __fromKeyWord() {
    return 'from ';
  }

  /**
   * @returns `{ ` by default
   */
  protected __contentPrefix(): string {
    return ' { ';
  }

  /**
   * @returns ` }` by default
   */
  protected __contentSuffix(): string {
    return ' } ';
  }

  /**
   * Items to be imported
   * @returns
   */
  protected __content(): string {
    return this.__importPrinterOptions.items.join(', ');
  }

  protected __source(): string {
    return `'${this.__importPrinterOptions.source}'`;
  }

  protected __endOfLine() {
    return ';';
  }

  print(): string {
    return [
      this.__importKeyWord(),
      this.__contentPrefix(),
      this.__content(),
      this.__contentSuffix(),
      this.__fromKeyWord(),
      this.__source(),
      this.__endOfLine(),
    ].join('');
  }
}
