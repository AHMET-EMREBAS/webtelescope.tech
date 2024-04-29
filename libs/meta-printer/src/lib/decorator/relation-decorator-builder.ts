/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RelationManager,
  PropertyOptions,
  orderPropertyOptions,
} from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common';

export class RelationDecoratorBuilder {
  constructor(protected readonly manager: RelationManager) {}

  protected __buildProperty(options?: PropertyOptions): IPrint {
    const { searchable, excludeFromView, update, name, ...rest } =
      options ?? {};
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: orderPropertyOptions(rest as PropertyOptions),
    });
  }

  CreateProperty(): IPrint {
    return this.__buildProperty(this.manager.toCreate());
  }

  UpdateProperty(): IPrint {
    return this.__buildProperty(this.manager.toUpdate());
  }

  QueryProperty(propertyName: string = '?'): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: { type: 'string' },
    });
  }

  EntityRelation(): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Relation,
      options: this.manager.toRelationColumn(),
    });
  }
  ViewColumn() {
    return new DecoratorPrinter({ name: DecoratorName.ViewColumn });
  }
}
