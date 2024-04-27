import { DocPrinterOptions, IPrint } from '../common';

export class DocPritner implements IPrint {
  constructor(protected readonly __docPrinterOptions: DocPrinterOptions) {}

  /**
   * Check the document/comment is inline or multiline
   */
  protected __isInline(): boolean {
    return this.__docPrinterOptions.inline == true;
  }

  /**
   * Documentation content
   */
  protected __content(): string {
    return this.__docPrinterOptions.content;
  }

  protected __inlineDoc(): string {
    return `// ${this.__content().split('\n').join(' ')}`;
  }

  protected __multiLineDoc(): string {
    const content = this.__content()
      .split('\n')
      .map((e) => ` * ${e}`)
      .join('\n');
    return `/**\n${content}\n */`;
  }

  print(): string {
    if (this.__content())
      if (this.__isInline()) {
        return this.__inlineDoc();
      } else {
        return this.__multiLineDoc();
      }

    return '';
  }
}
