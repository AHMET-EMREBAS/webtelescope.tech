import {
  ModelManager,
  PropertyOptions,
  PropertyManager,
  RelationManager,
  RelationOptions,
} from '@webpackages/meta';
import { PropertyBuilder } from '../property';
import {
  PropertyDecoratorBuilder,
  RelationDecoratorBuilder,
} from '../decorator';
import { ClassNameBuilder } from '../common-imp';
import { ClassPrinter, ClassType, IPrint } from '@webpackages/printer';
import { RelationBuilder } from '../relation';
import { ICoverAllClassTypes } from '../common';

export class ClassBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly nameBuilder: ClassNameBuilder,
    protected readonly decoratorBuilder: ICoverAllClassTypes<IPrint>,
    protected readonly importBuilder: ICoverAllClassTypes<IPrint>,
    protected readonly extendingBuilder: ICoverAllClassTypes<IPrint>,
    protected readonly implementingBuilder: ICoverAllClassTypes<IPrint>,
    protected readonly genericsBuilder: ICoverAllClassTypes<IPrint>
  ) {}

  protected __modelName() {
    return this.modelManager.modelName();
  }

  protected relationBuilder(options: RelationOptions): RelationBuilder {
    if (!options.name) throw new Error('Relation name is required!');
    const manager = new RelationManager(options);
    const decoratorBuilder = new RelationDecoratorBuilder(manager);
    return new RelationBuilder(
      options.model.modelName,
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
      decorating: this.decoratorBuilder.Entity(),
      importings: this.importBuilder.Entity(),
      extending: this.extendingBuilder.Entity(),
      implementing: this.implementingBuilder.Entity(),
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
      decorating: this.decoratorBuilder.View(),
      importings: this.importBuilder.View(),
      extending: this.extendingBuilder.View(),
      implementing: this.implementingBuilder.View(),
      contentString: [
        this.modelManager
          .propertiesList()
          .filter((e) => e.searchable != false)
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
      decorating: this.decoratorBuilder.Create(),
      importings: this.importBuilder.Create(),
      extending: this.extendingBuilder.Create(),
      implementing: this.implementingBuilder.Create(),
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
      decorating: this.decoratorBuilder.Update(),
      importings: this.importBuilder.Update(),
      extending: this.extendingBuilder.Update(),
      implementing: this.implementingBuilder.Update(),
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
      decorating: this.decoratorBuilder.Query(),
      importings: this.importBuilder.Query(),
      extending: this.extendingBuilder.Query(),
      implementing: this.implementingBuilder.Query(),
      contentString: [
        this.modelManager
          .propertiesList()
          .filter((e) => e.searchable != false)
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
      classType: ClassType.INTERFACE,
      decorating: this.decoratorBuilder.IEntity(),
      importings: this.importBuilder.IEntity(),
      extending: this.extendingBuilder.IEntity(),
      implementing: this.implementingBuilder.IEntity(),
      generics: this.genericsBuilder.IEntity(),
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
      classType: ClassType.INTERFACE,
      decorating: this.decoratorBuilder.IView(),
      importings: this.importBuilder.IView(),
      extending: this.extendingBuilder.IView(),
      implementing: this.implementingBuilder.IView(),
      contentString: [
        this.modelManager
          .propertiesList()
          .filter((e) => e.searchable != false)
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
      classType: ClassType.INTERFACE,
      decorating: this.decoratorBuilder.ICreate(),
      importings: this.importBuilder.ICreate(),
      extending: this.extendingBuilder.ICreate(),
      implementing: this.implementingBuilder.ICreate(),
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
      classType: ClassType.INTERFACE,
      decorating: this.decoratorBuilder.IUpdate(),
      importings: this.importBuilder.IUpdate(),
      extending: this.extendingBuilder.IUpdate(),
      implementing: this.implementingBuilder.IUpdate(),
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
      classType: ClassType.INTERFACE,
      decorating: this.decoratorBuilder.IQuery(),
      importings: this.importBuilder.IQuery(),
      extending: this.extendingBuilder.IQuery(),
      implementing: this.implementingBuilder.IQuery(),
      contentString: [
        this.modelManager
          .propertiesList()
          .filter((e) => e.searchable != false)
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
