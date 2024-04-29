import { DecoratorPrinter } from '@webpackages/printer';
import { DecoratorName } from './decorator-name';
import { PropertyOptions, PropertyOptionsManager } from '@webpackages/meta';

export function ColumnDecorator(options: PropertyOptions) {
  return new DecoratorPrinter({
    name: DecoratorName.Column,
    options: new PropertyOptionsManager(options).toColumn(),
  });
}
