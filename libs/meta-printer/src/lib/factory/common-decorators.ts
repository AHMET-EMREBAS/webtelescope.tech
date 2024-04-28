import { ColumnOptions, Model, PropertyOptions } from '../__meta';
import { ClassType, DecoratorName, IPicker } from '../common';
import {
  ClassDecoratorPrinter,
  PropertyDecoratorPrinter,
  ViewEntityDecoratorOptionsPrinter,
} from '../decorator';

/**
 * Provides the available decorators.
 */
export class DecoratorPrinterFactory {
  constructor(protected readonly decoratorOptionsPrinter: IPicker) {}
  ENTITY(model: Model) {
    return new ClassDecoratorPrinter(
      ClassType.Entity,
      DecoratorName.ENTITY,
      model,
      this.decoratorOptionsPrinter
    );
  }

  VIEW_ENTITY(model: Model) {
    return new ViewEntityDecoratorOptionsPrinter(model);
  }

  COLUMN(options: ColumnOptions) {
    return new PropertyDecoratorPrinter(
      ClassType.Entity,
      DecoratorName.COLUMN,
      options,
      this.decoratorOptionsPrinter
    );
  }

  PROPERTY(options: PropertyOptions) {
    return new PropertyDecoratorPrinter(
      ClassType.Create,
      DecoratorName.PROPERTY,
      options,
      this.decoratorOptionsPrinter
    );
  }

  VIEW_COLUMN() {
    return new PropertyDecoratorPrinter(
      ClassType.Create,
      DecoratorName.VIEW_COLUMN
    );
  }

  DTO() {
    return new ClassDecoratorPrinter(ClassType.Create, DecoratorName.DTO);
  }

  MANY(relationName: string) {
    return new PropertyDecoratorPrinter(
      ClassType.Entity,
      DecoratorName.MANY,
      relationName,
      this.decoratorOptionsPrinter
    );
  }

  ONE(relationName: string) {
    return new PropertyDecoratorPrinter(
      ClassType.Entity,
      DecoratorName.ONE,
      relationName,
      this.decoratorOptionsPrinter
    );
  }

  OWNER(relationName: string) {
    return new PropertyDecoratorPrinter(
      ClassType.Entity,
      DecoratorName.OWNER,
      relationName,
      this.decoratorOptionsPrinter
    );
  }
}
