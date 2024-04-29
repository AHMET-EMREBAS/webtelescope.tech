/* eslint-disable @typescript-eslint/no-unused-vars */
import { RelationManager, PropertyOptions } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common';

export class RelationDecoratorBuilder {
  constructor(protected readonly manager: RelationManager) {}

  protected __buildProperty(options?: PropertyOptions): IPrint {
    const { searchable, excludeFromView, update, required, ...rest } =
      options ?? {};
    return new DecoratorPrinter({
      name: DecoratorName.Property,
      options: { ...rest, required: required ? true : undefined },
    });
  }

  CreateProperty(): IPrint {
    return this.__buildProperty(this.manager.toCreate());
  }

  UpdateProperty(): IPrint {
    return this.__buildProperty(this.manager.toUpdate());
  }

  QueryProperty(): IPrint {
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
