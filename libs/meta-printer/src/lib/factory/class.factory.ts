import { ClassType, IPrinterPickerFactory } from '../common';
import { ClassPrinter } from '../class';

export type ClassPrinterType = typeof ClassPrinter;

/**
 * Pick class printer by {@link ClassType}
 */
export class ClassPrinterFactory
  implements IPrinterPickerFactory<ClassPrinterType>
{
  PickPrinter(classType: ClassType): ClassPrinterType {
    switch (classType) {
      // Class property printer in use
      case ClassType.Create:
      case ClassType.Entity:
        throw new Error();

      // All properties in the update dto should be optional
      case ClassType.IUpdate:
      case ClassType.Update:
        throw new Error();

      // Interfaces
      case ClassType.IEntity:
      case ClassType.ICreate:
        throw new Error();

      // In this set all properties will be prefixed with model name
      case ClassType.Query:
      case ClassType.IQuery:
        throw new Error();

      case ClassType.IView:
      case ClassType.View:
        throw new Error();
    }
  }

  Create(): typeof ClassPrinter {
    throw new Error();
  }
  Entity(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  Update(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  IEntity(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  ICreate(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  IUpdate(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  Query(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  IQuery(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  IView(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
  View(): typeof ClassPrinter {
    throw new Error('Method not implemented.');
  }
}
