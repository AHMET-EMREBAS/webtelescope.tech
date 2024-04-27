import { ClassType, IPrinterPickerFactory } from '../common';
import {
  ClassPropertyPrinter,
  InterfacePropertyPrinter,
  OptionalPropertyPrinter,
  PropertyPrinter,
  QueryPropertyPrinter,
  ViewEntityPropertyPrinter,
} from './property';

export type PropertyPrinterType = typeof PropertyPrinter;

export class PropertyPrinterFactory
  implements IPrinterPickerFactory<PropertyPrinterType>
{
  PickPrinter(classType: ClassType): PropertyPrinterType {
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
  Create(): PropertyPrinterType {
    return ClassPropertyPrinter;
  }

  /**
   * Entity class property printer
   * @returns
   */
  Entity(): PropertyPrinterType {
    return ClassPropertyPrinter;
  }

  /**
   * Update class property printer
   * @returns
   */
  Update(): PropertyPrinterType {
    return OptionalPropertyPrinter;
  }

  /**
   * IEntity class property printer
   * @returns
   */
  IEntity(): PropertyPrinterType {
    return InterfacePropertyPrinter;
  }

  /**
   * ICreate class property printer
   * @returns
   */
  ICreate(): PropertyPrinterType {
    return InterfacePropertyPrinter;
  }

  /**
   * IUpdate class property printer
   * @returns
   */
  IUpdate(): PropertyPrinterType {
    return OptionalPropertyPrinter;
  }

  /**
   * Query class property printer
   * @returns
   */
  Query(): PropertyPrinterType {
    return QueryPropertyPrinter;
  }

  /**
   * IQuery class property printer
   * @returns
   */
  IQuery(): PropertyPrinterType {
    return QueryPropertyPrinter;
  }

  /**
   * IView class property printer
   * @returns
   */
  IView(): PropertyPrinterType {
    return ViewEntityPropertyPrinter;
  }

  /**
   * View class property printer
   * @returns
   */
  View(): PropertyPrinterType {
    return ViewEntityPropertyPrinter;
  }
}
