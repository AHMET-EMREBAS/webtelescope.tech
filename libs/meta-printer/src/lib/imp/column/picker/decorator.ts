import {
  ClassName,
  ColumnDecoratorPrinterPicker,
  ColumnDecoratorPrinterPickerOptions,
  EmptyPrinter,
} from '../../../common';
import { Decorators } from '../../../core/decorator';

export const decoratorPicker: ColumnDecoratorPrinterPicker = (
  __options: ColumnDecoratorPrinterPickerOptions
) => {
  const { classType, options } = __options;

  switch (classType) {
    case ClassName.Entity:
      return Decorators.Column(options);
    case ClassName.ICreate:
    case ClassName.IEntity:
    case ClassName.IQuery:
    case ClassName.IUpdate:
    case ClassName.IView:
      return EmptyPrinter;
    case ClassName.View:
      return Decorators.ViewColumn();
  }

  return EmptyPrinter;
};
