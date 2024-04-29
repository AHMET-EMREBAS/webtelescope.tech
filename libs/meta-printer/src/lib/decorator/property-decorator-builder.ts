import { PropertyOptions, PropertyManager } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common/decorator-name';

export class PropertyDecoratorBuilder {
  constructor(protected readonly optionsManager: PropertyManager) {}

  protected __buildPropertyDecorator(options?: PropertyOptions): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: options,
    });
  }

  CreateProperty(): IPrint {
    return this.__buildPropertyDecorator(this.optionsManager.toCreate());
  }

  UpdateProperty(): IPrint {
    return this.__buildPropertyDecorator(this.optionsManager.toUpdate());
  }

  QueryProperty(): IPrint {
    return this.__buildPropertyDecorator(this.optionsManager.toQuery());
  }

  Column(): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Column,
      options: this.optionsManager.toColumn(),
    });
  }

  ViewColumn(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.ViewColumn });
  }
}
