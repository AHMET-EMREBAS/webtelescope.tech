import { DecoratorPrinter } from '@webpackages/printer';
import {
  ClassName,
  EmptyPrinter,
  PropertyDecoratorPrinterPicker,
  PropertyDecoratorPrinterPickerOptions,
} from '../../../common';
import { stringify } from '../../../utils';

export const decoratorPicker: PropertyDecoratorPrinterPicker = (
  __options: PropertyDecoratorPrinterPickerOptions
) => {
  const { classType, options } = __options;
  switch (classType) {
    case ClassName.Create:
      return new DecoratorPrinter({
        name: 'Property',
        options: stringify({ ...options }),
      });
    case ClassName.Update:
    case ClassName.Query:
      return new DecoratorPrinter({
        name: 'Property',
        options: stringify({ ...options, required: false }),
      });
    case ClassName.Entity:
      throw new Error(
        'You should use the dedicated colum printer for printing entity columns!'
      );
    case ClassName.ICreate:
    case ClassName.IEntity:
    case ClassName.IQuery:
    case ClassName.IUpdate:
    case ClassName.IView:
      return EmptyPrinter;
    case ClassName.View:
      return new DecoratorPrinter({ name: 'ViewColumn' });
  }
};
