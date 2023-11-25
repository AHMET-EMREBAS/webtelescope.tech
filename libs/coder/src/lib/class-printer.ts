import { ClassOrInterface } from './class-type';
import { Printable } from './printable';

export class ClassPrinterOptions {
  name!: string;
  classType?: ClassOrInterface;
  extend?: string[];
  implements?: string[];
}

export class ClassPrinter implements Printable {
  constructor(
    protected options: ClassPrinterOptions,
    protected properties?: Printable[],
    protected decorators?: Printable[]
  ) {}

  protected extend(): string {
    if (this.options.extend) {
      return `extends ${this.options.extend.join(', ')}`;
    }
    return '';
  }

  protected implement(): string {
    if (this.options.implements) {
      return `implements ${this.options.implements.join(', ')}`;
    }
    return '';
  }

  protected printDecorators(): string {
    if (this.decorators && this.decorators.length > 0) {
      const result = this.decorators.map((e) => e.print()).join('\n');
      return `${result}\n`;
    }
    return '';
  }

  protected printProperties(): string {
    if (this.properties) {
      return this.properties.map((e) => e.print()).join('\n');
    }
    return '';
  }

  protected classType() {
    if (this.options.classType === 'interface') {
      return 'interface';
    }
    return 'class';
  }

  print(): string {
    return `${this.printDecorators()}export ${this.classType()} ${
      this.options.name
    } ${this.extend()} ${this.implement()} {\n${this.printProperties()}\n}`;
  }
}
