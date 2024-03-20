import { Property } from '../types';
import { IPrint } from './print';
export type PropertyPrinterOptions = {
  name: string;
  property: Property;
  isArray?: boolean;
  unique?: boolean;
  required?: boolean;
  isInterface?: boolean;
};
export class PropertyPrinter implements IPrint {
  constructor(private readonly options: PropertyPrinterOptions) {}

  private isRequired() {
    const isInterface = this.options.isInterface;
    const requiredMark = this.options.required ? (isInterface ? '' : '!') : '?';
    return requiredMark;
  }

  type() {
    const type = this.options.property.validation.type;

    const isArray = this.options.isArray ? '[]' : '';
    return (
      (type === 'date' || type === 'datetime'
        ? 'Date'
        : type === 'integer' || type === 'number'
        ? 'number'
        : type === 'object'
        ? this.options.property.validation.target
        : type) + isArray
    );
  }

  print(): string {
    return `${this.options.name}${this.isRequired()}${this.type()};`;
  }
}
