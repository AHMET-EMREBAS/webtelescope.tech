import { ClassType, IPrinterPickerFactory } from '../common';
import { ClassPrinter } from '../class';
import { ClassNameFactory } from './class-name';
import { Model } from '../__meta';
import { ClassTypeFactory } from './class-type';

/**
 * Pick class printer by {@link ClassType}
 */
export class ClassPrinterFactory
  implements IPrinterPickerFactory<ClassPrinter>
{
  protected __class(classType: ClassType, model: Model): ClassPrinter {
    return new ClassPrinter(
      classType,
      model,
      new ClassNameFactory(model.modelName),
      new ClassTypeFactory()
    );
  }

  Entity(model: Model): ClassPrinter {
    return this.__class(ClassType.Entity, model);
  }

  Update(model: Model): ClassPrinter {
    return this.__class(ClassType.Entity, model);
  }
  IEntity(model: Model): ClassPrinter {
    return this.__class(ClassType.IEntity, model);
  }
  ICreate(model: Model): ClassPrinter {
    return this.__class(ClassType.ICreate, model);
  }
  IUpdate(model: Model): ClassPrinter {
    return this.__class(ClassType.IUpdate, model);
  }
  Query(model: Model): ClassPrinter {
    return this.__class(ClassType.Query, model);
  }
  IQuery(model: Model): ClassPrinter {
    return this.__class(ClassType.IQuery, model);
  }
  IView(model: Model): ClassPrinter {
    return this.__class(ClassType.IView, model);
  }
  View(model: Model): ClassPrinter {
    return this.__class(ClassType.View, model);
  }
}
