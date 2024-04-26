import { IPrint } from '../interfaces';

export type ImportPrinterOptions = {
  /**
   * Source package or directory
   */
  source: string;

  /**
   * List of items to be imported
   */
  items: string[];
};

export class ImportPrinter implements IPrint {
  constructor(protected readonly importPrinterOptions: ImportPrinterOptions) {}

  /**
   * Import keyword
   * @returns `import`
   */
  protected importKeyWord() {
    return 'import';
  }

  protected fromKeyWord() {
    return 'from ';
  }

  /**
   * @returns `{ ` by default
   */
  protected contentPrefix(): string {
    return ' { ';
  }

  /**
   * @returns ` }` by default
   */
  protected contentSuffix(): string {
    return ' } ';
  }

  /**
   * Items to be imported
   * @returns
   */
  protected content(): string {
    return this.importPrinterOptions.items.join(', ');
  }

  protected source(): string {
    return `'${this.importPrinterOptions.source}'`;
  }

  protected endOfLine() {
    return ';';
  }

  print(): string {
    return [
      this.importKeyWord(),
      this.contentPrefix(),
      this.content(),
      this.contentSuffix(),
      this.fromKeyWord(),
      this.source(),
      this.endOfLine(),
    ].join('');
  }
}
