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
import { ClassPrinter, ClassType, IPrint } from '@webpackages/printer';
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

  Entity(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.Entity(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).Entity().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).Entity().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  View(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.View(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).View().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).View().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  Create(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.Create(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).Create().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).Create().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  Update(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.Update(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).Update().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).Update().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  Query(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.Query(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).Query().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).Query().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  IEntity(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.IEntity(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).IEntity().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).IEntity().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  IView(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.IView(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).IView().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).IView().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  ICreate(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.ICreate(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).ICreate().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).ICreate().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  IUpdate(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.IUpdate(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).IUpdate().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).IUpdate().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }

  IQuery(): IPrint {
    return new ClassPrinter({
      className: this.nameBuilder.IQuery(),
      classType: ClassType.CLASS,
      contentString: [
        this.modelManager
          .propertiesList()
          .map((e) => {
            return this.propertyBuilder(e).IQuery().print();
          })
          .join('\n'),
        this.modelManager
          .relationsList()
          .map((e) => {
            return this.relationBuilder(e).IQuery().print();
          })
          .join('\n'),
      ].join('\n'),
    });
  }
}
