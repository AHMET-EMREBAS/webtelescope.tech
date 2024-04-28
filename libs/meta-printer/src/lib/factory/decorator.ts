import { ColumnOptions, Model, PropertyOptions } from '../__meta';
import { IPrint } from '../__printer';
import { DecoratorName } from '../common';
import {
  DecoratorOptionsPrinter,
  DecoratorPrinter,
  ViewEntityDecoratorOptionsPrinter,
} from '../decorator';

export class DecoratorPrinterFactory {
  protected __build(
    decoratorName: DecoratorName,
    options?: ColumnOptions | PropertyOptions | string,
    optionsPrinter?: IPrint
  ) {
    const ___optionsPrinter = options
      ? new DecoratorOptionsPrinter(options)
      : optionsPrinter
      ? optionsPrinter
      : undefined;

    return new DecoratorPrinter(decoratorName, ___optionsPrinter);
  }

  ENTITY() {
    return this.__build(DecoratorName.ENTITY);
  }

  VIEW_ENTITY(model: Model) {
    return this.__build(
      DecoratorName.VIEW_ENTITY,
      undefined,
      new ViewEntityDecoratorOptionsPrinter(model)
    );
  }

  COLUMN(options: ColumnOptions) {
    return this.__build(DecoratorName.COLUMN, options);
  }

  PROPERTY(options: PropertyOptions) {
    return this.__build(DecoratorName.PROPERTY, options);
  }

  VIEW_COLUMN() {
    return this.__build(DecoratorName.VIEW_COLUMN);
  }

  DTO(options: PropertyOptions) {
    return this.__build(DecoratorName.DTO, options);
  }

  MANY(relationName: string) {
    return this.__build(DecoratorName.MANY, relationName);
  }

  ONE(relationName: string) {
    return this.__build(DecoratorName.ONE, relationName);
  }

  OWNER(relationName: string) {
    return this.__build(DecoratorName.OWNER, relationName);
  }
}
