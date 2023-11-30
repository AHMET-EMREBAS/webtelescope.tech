import { Printable } from './printer';
import { CommonPropertyOptions } from './common-property-options';

export interface IInterfacePropertyPrinter<
  PropertyOptions extends CommonPropertyOptions
> {
  options: PropertyOptions;
  printIsRequired(): string;
  printType(): string;
  print(): string;
}

export interface IClassPropertyPrinter<
  PropertyOptions extends CommonPropertyOptions
> extends IInterfacePropertyPrinter<PropertyOptions> {
  decorators?: Printable[];
  printDecorators(): string;
  print(): string;
}
