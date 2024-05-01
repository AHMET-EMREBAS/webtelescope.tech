import {
  ModelManager,
  PropertyOptions,
  PropertyManager,
  RelationManager,
  RelationOptions,
} from '@webpackages/meta';
import { PropertyBuilder } from '../property';
import {
  ClassDecoratorBuilder,
  PropertyDecoratorBuilder,
  RelationDecoratorBuilder,
} from '../decorator';
import { ClassNameBuilder } from '../common-imp';
import { IPrint } from '@webpackages/printer';
import { RelationBuilder } from '../relation';
import { ICoverAllClassTypes } from '../common';
import { ClassImportBuilder } from '../imports';

export class ClassBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly nameBuilder: ClassNameBuilder,
    protected readonly decoratorBuilder: ClassDecoratorBuilder,
    protected readonly importBuilder: ClassImportBuilder
  ) {}
  protected __modelName() {
    return this.modelManager.modelName();
  }

  protected relationBuilder(options: RelationOptions): RelationBuilder {
    if (!options.relationName) throw new Error('Relation name is required!');
    const manager = new RelationManager(options);
    const decoratorBuilder = new RelationDecoratorBuilder(manager);
    return new RelationBuilder(
      this.__modelName(),
      options.relationName,
      manager,
      decoratorBuilder
    );
  }

  protected propertyBuilder(options: PropertyOptions): PropertyBuilder {
    if (!options.name) throw new Error('Propery name is required!');

    const propertyManager = new PropertyManager(options);
    const modelName = this.modelManager.modelName();
    const decoratorBuilder = new PropertyDecoratorBuilder(propertyManager);
    return new PropertyBuilder(
      modelName,
      options.name,
      propertyManager,
      decoratorBuilder
    );
  }

  Entity(): IPrint {
    throw new Error('Method not implemented.');
  }

  View(): IPrint {
    throw new Error('Method not implemented.');
  }

  Create(): IPrint {
    throw new Error('Method not implemented.');
  }

  Update(): IPrint {
    throw new Error('Method not implemented.');
  }

  Query(): IPrint {
    throw new Error('Method not implemented.');
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
