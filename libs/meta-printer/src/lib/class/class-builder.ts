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
import { ClassNameBuilder } from '../common';
import { ClassPrinter, ClassType } from '@webpackages/printer';
import { RelationBuilder } from '../relation';

export class ClassBuilder {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly nameBuilder: ClassNameBuilder,
    protected readonly decoratorBuilder: ClassDecoratorBuilder
  ) {}

  protected __modelName() {
    return this.modelManager.modelName();
  }

  protected relationBuilder(options: RelationOptions): RelationBuilder {
    if (!options.name) throw new Error('Relation name is required!');

    const manager = new RelationManager(options);
    const decoratorBuilder = new RelationDecoratorBuilder(manager);
    return new RelationBuilder(
      this.__modelName(),
      options.name,
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

  Entity() {
    return new ClassPrinter({
      name: this.nameBuilder.Entity(),
      type: ClassType.CLASS,
      decoratingString: this.decoratorBuilder.Entity().print(),
      contentString: [
        this.modelManager
          .rawProperties()
          .map((e) => {
            return this.propertyBuilder(e).EntityProperty().print();
          })
          .join('\n'),
        this.modelManager
          .rawRelations()
          .map((e) => {
            return this.relationBuilder(e).EntityProperty().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  View() {
    return '';
  }

  CreateDto() {
    return '';
  }

  UpdateDto() {
    return '';
  }

  QueryDto() {
    return '';
  }

  IEntity() {
    return '';
  }
  IView() {
    return '';
  }
  ICreateDto() {
    return '';
  }
  IUpdateDto() {
    return '';
  }
  IQueryDto() {
    return '';
  }
}
