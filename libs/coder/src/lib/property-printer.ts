/* eslint-disable @typescript-eslint/no-explicit-any */

import { Printable } from './printable';

export type PropertyType =
  | 'string'
  | 'number'
  | 'integer'
  | 'date'
  | 'boolean'
  | 'object';

export class PropertyOptions {
  name!: string;
  type!: PropertyType;
  required?: boolean;
  isArray?: boolean;
  target?: string;

  constructor(options: PropertyOptions) {
    Object.assign(this, options);
  }
}

export class ClassPropertyPrinter implements Printable {
  constructor(
    protected options: PropertyOptions,
    protected decorators?: Printable[]
  ) {}

  protected isRequired(): string {
    return this.options.required === true ? `!` : '?';
  }

  protected type(): string {
    switch (this.options.type) {
      case 'string':
        return 'string';
      case 'object':
        return `${this.options.target}`;
      case 'boolean':
        return 'boolean';
      case 'integer':
      case 'number':
        return 'number';
      case 'date':
        return 'Date';
    }
  }

  protected printDecorators(): string {
    if (this.decorators && this.decorators.length > 0) {
      const result = this.decorators.map((e) => e.print()).join('\n');
      return `${result}\n`;
    }
    return '';
  }

  protected isArray(): string {
    return this.options.isArray === true ? '[]' : '';
  }

  print(): string {
    return `${this.printDecorators()}${
      this.options.name
    }${this.isRequired()}:${this.type()}${this.isArray()};`;
  }
}

export class InterfacePropertyPrinter extends ClassPropertyPrinter {
  override isRequired(): string {
    return this.options.required === true ? '' : '?';
  }
}
