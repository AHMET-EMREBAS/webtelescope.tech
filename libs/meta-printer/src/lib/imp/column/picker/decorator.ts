import { DecoratorPrinter } from '@webpackages/printer';
import {
  ClassType,
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

    case ClassType.ENTITY:
      return new DecoratorPrinter({
        name: 'Column',
        options: stringify({ ...options }),
      });
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
