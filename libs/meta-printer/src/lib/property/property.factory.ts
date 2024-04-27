import { Model } from '../__meta';
import { PropertyPrinterOptions } from '../__printer';
import { ClassType } from '../common';
import {
  ClassPropertyPrinter,
  InterfacePropertyPrinter,
  OptionalPropertyPrinter,
  PropertyPrinter,
  QueryPropertyPrinter,
  ViewEntityPropertyPrinter,
} from './property';

type TPropertyPrinter = typeof PropertyPrinter;

export type PropertyFactoryOptions = PropertyPrinterOptions<
  Partial<Pick<Model, 'modelName'>>
>;

export class PropertyPrinterFactory {
  PickPrinter(classType: ClassType): TPropertyPrinter {
    switch (classType) {
      // Class property printer in use
      case ClassType.Create:
      case ClassType.Entity:
        return ClassPropertyPrinter;

      // All properties in the update dto should be optional
      case ClassType.IUpdate:
      case ClassType.Update:
        return OptionalPropertyPrinter;

      // Interfaces
      case ClassType.IEntity:
      case ClassType.ICreate:
        return InterfacePropertyPrinter;

      // In this set all properties will be prefixed with model name
      case ClassType.Query:
      case ClassType.IQuery:
        return QueryPropertyPrinter;

      case ClassType.IView:
      case ClassType.View:
        return ViewEntityPropertyPrinter;
    }
  }

  /**
   * Create class property printer
   * @returns
   */
  Create(): TPropertyPrinter {
    return ClassPropertyPrinter;
  }

  /**
   * Entity class property printer
   * @returns
   */
  Entity(): TPropertyPrinter {
    return ClassPropertyPrinter;
  }

  /**
   * Update class property printer
   * @returns
   */
  Update(): TPropertyPrinter {
    return OptionalPropertyPrinter;
  }

  /**
   * IEntity class property printer
   * @returns
   */
  IEntity(): TPropertyPrinter {
    return InterfacePropertyPrinter;
  }

  /**
   * ICreate class property printer
   * @returns
   */
  ICreate(): TPropertyPrinter {
    return InterfacePropertyPrinter;
  }

  /**
   * IUpdate class property printer
   * @returns
   */
  IUpdate(): TPropertyPrinter {
    return OptionalPropertyPrinter;
  }

  /**
   * Query class property printer
   * @returns
   */
  Query(): TPropertyPrinter {
    return QueryPropertyPrinter;
  }

  /**
   * IQuery class property printer
   * @returns
   */
  IQuery(): TPropertyPrinter {
    return QueryPropertyPrinter;
  }

  /**
   * IView class property printer
   * @returns
   */
  IView(): TPropertyPrinter {
    return ViewEntityPropertyPrinter;
  }

  /**
   * View class property printer
   * @returns
   */
  View(): TPropertyPrinter {
    return ViewEntityPropertyPrinter;
  }
}
