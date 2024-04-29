/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropertyOptions,
  PropertyManager,
  orderPropertyOptions,
} from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common/decorator-name';
import { INamedBuilder } from '../common';

export class PropertyDecoratorBuilder implements INamedBuilder<IPrint> {
  constructor(protected readonly optionsManager: PropertyManager) {}

  protected __buildPropertyDecorator(options?: PropertyOptions): IPrint {
    const { searchable, update, excludeFromView, name, ...__options } =
      options ?? {};
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: orderPropertyOptions(__options as PropertyOptions),
    });
  }

  Create(): IPrint {
    return this.__buildPropertyDecorator(this.optionsManager.toCreate());
  }

  Update(): IPrint {
    return this.__buildPropertyDecorator(this.optionsManager.toUpdate());
  }

  Query(): IPrint {
    return this.__buildPropertyDecorator(this.optionsManager.toQuery());
  }

  Entity(): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Column,
      options: this.optionsManager.toColumn(),
    });
  }

  View(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.ViewColumn });
  }

  IEntity(): IPrint {
    throw new Error('Method not implemented.');
  }
  IView(): IPrint {
    throw new Error('Method not implemented.');
  }
  ICreate(): IPrint {
    throw new Error('Method not implemented.');
  }
  IUpdate(): IPrint {
    throw new Error('Method not implemented.');
  }
  IQuery(): IPrint {
    throw new Error('Method not implemented.');
  }
}
