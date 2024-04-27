import { DocPrinterOptions, IPrint } from '../common';

export class DocPritner implements IPrint {
  constructor(protected readonly __docPrinterOptions: DocPrinterOptions) {}

  protected __isInline() {
    return this.__docPrinterOptions.inline == true;
  }

  protected __content() {
    return this.__docPrinterOptions.content;
  }

  protected __inlineDoc() {
    return `// ${this.__content().split('\n').join(' ')}`;
  }

  protected __multiLineDoc() {
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
