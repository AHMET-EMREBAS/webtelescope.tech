/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropertyOptions, PropertyManager } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common/decorator-name';
import { excludeFalse } from '@webpackages/utils';

export class PropertyDecoratorBuilder {
  constructor(protected readonly optionsManager: PropertyManager) {}

  protected __buildPropertyDecorator(options?: PropertyOptions): IPrint {
    const { searchable, update, excludeFromView, required, ...__options } =
      options ?? {};
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: excludeFalse(__options),
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
