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
    console.log(options);
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
    if (!options.propertyName) throw new Error('Propery name is required!');

    const propertyManager = new PropertyManager(options);
    const modelName = this.modelManager.modelName();
    const decoratorBuilder = new PropertyDecoratorBuilder(propertyManager);
    return new PropertyBuilder(
      modelName,
      options.propertyName,
      propertyManager,
      decoratorBuilder
    );
  }

  Entity(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.Entity(),
      type: ClassType.CLASS,
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
      name: this.nameBuilder.View(),
      type: ClassType.CLASS,
    });
  }

  Create(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.Create(),
      type: ClassType.CLASS,
    });
  }

  Update(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.Update(),
      type: ClassType.CLASS,
    });
  }

  Query(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.Query(),
      type: ClassType.CLASS,
    });
  }

  IEntity(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.IEntity(),
      type: ClassType.INTERFACE,
    });
  }

  IView(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.IView(),
      type: ClassType.INTERFACE,
    });
  }

  ICreate(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.ICreate(),
      type: ClassType.INTERFACE,
    });
  }

  IUpdate(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.IUpdate(),
      type: ClassType.INTERFACE,
    });
  }

  IQuery(): IPrint {
    return new ClassPrinter({
      name: this.nameBuilder.IQuery(),
      type: ClassType.INTERFACE,
    });
  }
}
