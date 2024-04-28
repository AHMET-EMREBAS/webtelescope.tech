import { PropertyOptions } from '../__meta';
import { IPrint } from '../__printer';
import { EmptyPrinter, IPrinterPickerFactory } from '../common';

export class PropertyPrinterFactory implements IPrinterPickerFactory {
  /**
   * Entity class property printer
   * @returns
   */
  Entity(propertyName: string, options: PropertyOptions): IPrint {
    return new EmptyPrinter();
  }

  /**
   * Update class property printer
   * @returns
   */
  Update(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * IEntity class property printer
   * @returns
   */
  IEntity(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * ICreate class property printer
   * @returns
   */
  ICreate(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * IUpdate class property printer
   * @returns
   */
  IUpdate(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * Query class property printer
   * @returns
   */
  Query(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * IQuery class property printer
   * @returns
   */
  IQuery(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * IView class property printer
   * @returns
   */
  IView(): IPrint {
    return new EmptyPrinter();
  }

  /**
   * View class property printer
   * @returns
   */
  View(): IPrint {
    return new EmptyPrinter();
  }
}
