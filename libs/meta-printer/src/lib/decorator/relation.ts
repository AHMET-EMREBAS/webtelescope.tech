/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RelationManager,
  PropertyOptions,
  orderPropertyOptions,
} from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common-imp';
import { ICoverAllClassTypes } from '../common';

/**
 * Provides relation decorators
 */
export class RelationDecoratorBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(protected readonly manager: RelationManager) {}

  protected __buildProperty(options?: PropertyOptions): IPrint {
    const { searchable, excludeFromView, update, propertyName: name, ...rest } =
      options ?? {};
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: orderPropertyOptions(rest as PropertyOptions),
    });
  }

  Create(): IPrint {
    return this.__buildProperty(this.manager.toCreate());
  }

  Update(): IPrint {
    return this.__buildProperty(this.manager.toUpdate());
  }

  Query(propertyName: string = '?'): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: { type: 'string' },
    });
  }

  Entity(): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Relation,
      options: this.manager.toRelationColumn(),
    });
  }

  View() {
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
