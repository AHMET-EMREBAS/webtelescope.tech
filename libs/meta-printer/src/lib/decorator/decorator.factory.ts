import { ColumnOptions, Model, PropertyOptions } from '../__meta';
import { IPrint } from '../__printer';
import { DecoratorName } from '../common';
import { DecoratorPrinter } from './decorator';
import { DecoratorOptionsPrinterFactory } from './decorator-options.factory';

export class DecoratorPrinterFactory {
  constructor(
    protected readonly optionsFactory: DecoratorOptionsPrinterFactory
  ) {}

  protected CREATE(decoratorName: DecoratorName, optionsPrinter: IPrint) {
    return new DecoratorPrinter(decoratorName, optionsPrinter);
  }

  ENTITY() {
    return this.CREATE(DecoratorName.ENTITY, this.optionsFactory.ENTITY());
  }

  VIEW_ENTITY(model: Model) {
    return this.CREATE(
      DecoratorName.VIEW_ENTITY,
      this.optionsFactory.VIEW_ENTITY(model)
    );
  }

  COLUMN(options: ColumnOptions) {
    return this.CREATE(
      DecoratorName.COLUMN,
      this.optionsFactory.COLUMN(options)
    );
  }

  PROPERTY(options: PropertyOptions) {
    return this.CREATE(
      DecoratorName.PROPERTY,
      this.optionsFactory.PROPERTY(options)
    );
  }

  VIEW_COLUMN() {
    return this.CREATE(
      DecoratorName.VIEW_COLUMN,
      this.optionsFactory.VIEW_COLUMN()
    );
  }

  DTO() {
    return this.CREATE(DecoratorName.DTO, this.optionsFactory.DTO());
  }

  MANY(relationName: string) {
    return this.CREATE(
      DecoratorName.MANY,
      this.optionsFactory.MANY(relationName)
    );
  }

  ONE(relationName: string) {
    return this.CREATE(
      DecoratorName.ONE,
      this.optionsFactory.ONE(relationName)
    );
  }

  OWNER(relationName: string) {
    return this.CREATE(
      DecoratorName.OWNER,
      this.optionsFactory.OWNER(relationName)
    );
  }
}
