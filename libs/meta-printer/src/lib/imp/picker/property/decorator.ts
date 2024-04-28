import { DecoratorPrinter } from '@webpackages/printer';
import {
  ClassType,
  EmptyPrinter,
  PrinterPickerOptions,
  PropertyDecoratorPrinterPicker,
} from '../../../common';
import { ColumnOptions, PropertyOptions } from '@webpackages/meta';
import { stringify } from '../../../utils';

export const propertyDecoratorPrinterPicker: PropertyDecoratorPrinterPicker = (
  __options: PrinterPickerOptions<PropertyOptions>
) => {
  const { classType, options } = __options;

  switch (classType) {
    case ClassType.CREATE:
      return new DecoratorPrinter({
        name: 'Property',
        options: stringify({ ...options }),
      });
    case ClassType.UPDATE:
    case ClassType.QUERY:
      return new DecoratorPrinter({
        name: 'Property',
        options: stringify({ ...options, required: false }),
      });

    case ClassType.ENTITY: {
      const { type, unique, required, description } = options;
      return new DecoratorPrinter({
        name: 'Column',
        options: stringify({
          type,
          unique,
          required,
          description,
        } as ColumnOptions),
      });
    }
    case ClassType.ICREATE:
    case ClassType.IENTITY:
    case ClassType.IQUERY:
    case ClassType.IUPDATE:
    case ClassType.IVIEW:
      return EmptyPrinter;
    case ClassType.VIEW:
      return new DecoratorPrinter({ name: 'ViewColumn' });
  }
};
