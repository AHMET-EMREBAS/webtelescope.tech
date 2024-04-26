import { IPrint } from '../interfaces/print';

export type PropertyPrinterOptions = {
  name: string;
  type: string;
  required?: boolean;
};

export class PropertyPrinter implements IPrint {
  constructor(protected readonly options: PropertyPrinterOptions) {}

  /**
   * Delimeter between property name and property type
   * propertyName(delimeter)propertyType
   * @defaultValue `:`
   * @returns string
   */
  delimeter() {
    return ':';
  }

  isRequired() {
    return this.options.required ? '!' : '';
  }
  propertyName() {
    return this.options.name;
  }

  propertyType() {
    return this.options.type;
  }

  print(): string {
    return [this.propertyName(), this.delimeter(), this.propertyType()].join(
      ''
    );
  }
}
