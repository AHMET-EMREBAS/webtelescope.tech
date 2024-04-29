import { PropertyOptions, RelationManager } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common';

export class RelationDecoratorBuilder {
  constructor(protected readonly optionsManager: RelationManager) {}

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

  QueryProperties(): IPrint[] {
    return this.optionsManager.toQuery().map(this.__buildPropertyDecorator);
  }

  EntityRelation(): IPrint {
    return new DecoratorPrinter({
      name: DecoratorName.Relation,
      options: this.optionsManager.toColumn(),
    });
  }

  ViewColumns(): IPrint[] {
    return this.optionsManager.toViews()
    return new DecoratorPrinter({ name: DecoratorName.ViewColumn });
  }
}
