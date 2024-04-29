import { PropertyOptions } from '@webpackages/meta';
import { DecoratorName } from './decorator-name';
import { DecoratorPrinter } from '@webpackages/printer';
import { stringify } from '@webpackages/utils';

export function PropertyDecorator(options: PropertyOptions) {
  return new DecoratorPrinter({
    name: DecoratorName.Property,
    options: stringify({ ...options }),
  });
}

export class PropertyDecorators {
  static Create(options: PropertyOptions) {
    return PropertyDecorator(options);
  }

  static Update(options: PropertyOptions) {
    return PropertyDecorator({ ...options, required: false });
  }
  
  static Query(options: PropertyOptions) {
    return PropertyDecorator({ ...options, required: false });
  }
}

export function ColumnDecorator(options: PropertyOptions) {
  return new DecoratorPrinter({});
}
export function RelationDecorator(options: PropertyOptions) {
  return new DecoratorPrinter({});
}
