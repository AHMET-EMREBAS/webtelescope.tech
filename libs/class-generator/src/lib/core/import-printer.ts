import { Printer } from './printer';

export class ImportPrinterOptions {
  items!: string[];
  packageName!: string;
}

export class ImportPrinter implements Printer {
  constructor(protected readonly options: ImportPrinterOptions) {}

  print(): string {
    if (this.options.items.length > 0) {
      const items = [...new Set(this.options.items)].map((e) => e).join(', ');
      return `import {${items}} from '${this.options.packageName}';`;
    }
    return '';
  }
}
