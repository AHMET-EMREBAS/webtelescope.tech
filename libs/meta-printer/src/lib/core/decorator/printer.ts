/* eslint-disable @typescript-eslint/no-explicit-any */
import { DecoratorPrinter } from '@webpackages/printer';
import { DecoratorName } from '../../common/decorator-name';
import {
  ColumnOptions,
  PropertyOptions,
  RelationOptions,
} from '@webpackages/meta';
import { ClassName } from '../../common';

export class BasePrinter<T = any> extends DecoratorPrinter {
  constructor(
    protected readonly name: DecoratorName,
    protected readonly options?: T
  ) {
    super({ name, options });
  }
}

export class GenericDecorator<T = any> extends DecoratorPrinter {
  constructor(
    protected readonly className: ClassName,
    protected readonly decoratorOptions?: T
  ) {
    let name = '';
    let options = decoratorOptions;
    switch (className) {
      case ClassName.Query:
      case ClassName.Update:
      case ClassName.Create: {
        name = DecoratorName.Property;
        break;
      }
      case ClassName.Entity: {
        name = DecoratorName.Column;
        break;
      }
      case ClassName.View:
      case ClassName.ICreate:
      case ClassName.IEntity:
      case ClassName.IQuery:
      case ClassName.IUpdate:
      case ClassName.IView:
      default:
    }
    super({ name, options });
  }
}
