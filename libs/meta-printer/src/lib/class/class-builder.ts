import {
  ModelManager,
  PropertyOptions,
  PropertyManager,
  RelationOptions,
} from '@webpackages/meta';
import { PropertyBuilder } from '../property/property-builder';
import { PropertyDecoratorBuilder } from '../decorator';
import { ClassNameBuilder } from '../common';

export class ClassBuilder {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly classNameBuilder: ClassNameBuilder
  ) {}


  protected getRelationBuilder(relationName:string, options:RelationOptions){ 
    return new RelationBuilder();
  }

  protected getPropertyBuilder(propertyName: string, options: PropertyOptions) {
    const optionsManager = new PropertyManager(options);
    const modelName = this.modelManager.modelName();
    const decoratorBuilder = new PropertyDecoratorBuilder(optionsManager);
    return new PropertyBuilder(
      modelName,
      propertyName,
      optionsManager,
      decoratorBuilder
    );
  }

  protected getPropertyBuilderList(): PropertyBuilder[] {
    return this.modelManager.propertiesAsList().map((e) => {
      return this.getPropertyBuilder(e.name, e);
    });
  }

  protected getRelationBuilderList(): PropertyBuilder[] {
    return this.modelManager.relationsAsList().map((e) => {
      return this.getPropertyBuilder(e.name, e);
    });
  }

  Entity() {
    return '';
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
