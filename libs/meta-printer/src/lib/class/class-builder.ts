import {
  ModelManager,
  PropertyOptions,
  PropertyManager,
} from '@webpackages/meta';
import { PropertyBuilder } from '../property';
import { PropertyDecoratorBuilder } from '../decorator';
import { ClassNameBuilder } from '../common';
import { ClassPrinter, ClassType } from '@webpackages/printer';

export class ClassBuilder {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly classNameBuilder: ClassNameBuilder
  ) {}

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
      name: this.classNameBuilder.Entity(),
      type: ClassType.CLASS,
      content: this.modelManager.rawProperties().map((e) => {
        return this.propertyBuilder(e).EntityProperty();
      }),
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
