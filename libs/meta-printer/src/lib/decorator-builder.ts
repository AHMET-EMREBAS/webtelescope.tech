import {
  Model,
  PropertyOptions,
  PropertyOptionsManager,
} from '@webpackages/meta';
import { DecoratorPrinter } from '@webpackages/printer';
import { DecoratorName } from './decorator-name';

export class PropertyDecoratorBuilder {
  constructor(protected readonly optionsBuilder: PropertyOptionsManager) {}
  protected __Property(options?: PropertyOptions) {
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: options,
    });
  }

  Create() {
    return this.__Property(this.optionsBuilder.toProperty());
  }

  Update() {
    return this.__Property(this.optionsBuilder.toUpdate());
  }

  Query() {
    return this.__Property(this.optionsBuilder.toQuery());
  }

  Column() {
    return new DecoratorPrinter({
      name: DecoratorName.Column,
      options: this.optionsBuilder.toColumn(),
    });
  }

  ViewColumn() {
    return new DecoratorPrinter({ name: DecoratorName.ViewColumn });
  }

  Dto() {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }

  Entity() {
    return new DecoratorPrinter({ name: DecoratorName.Entity });
  }

  ViewEntity() {
    return new DecoratorPrinter({ name: DecoratorName.ViewEntity });
  }
}

export class ClassDecoratorBuilder {
  constructor(protected readonly modelOptions: Model) {}

  Dto() {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }

  Entity() {
    return new DecoratorPrinter({ name: DecoratorName.Entity });
  }

  ViewEntity() {
    return new DecoratorPrinter({ name: DecoratorName.ViewEntity });
  }
}
