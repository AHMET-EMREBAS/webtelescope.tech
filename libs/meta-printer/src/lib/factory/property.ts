import { IPrinterPickerFactory } from '../common';
import { PropertyPrinter } from '../property';

export class PropertyPrinterFactory
  implements IPrinterPickerFactory<PropertyPrinter>
{
  /**
   * Entity class property printer
   * @returns
   */
  Entity(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * Update class property printer
   * @returns
   */
  Update(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * IEntity class property printer
   * @returns
   */
  IEntity(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * ICreate class property printer
   * @returns
   */
  ICreate(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * IUpdate class property printer
   * @returns
   */
  IUpdate(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * Query class property printer
   * @returns
   */
  Query(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * IQuery class property printer
   * @returns
   */
  IQuery(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * IView class property printer
   * @returns
   */
  IView(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }

  /**
   * View class property printer
   * @returns
   */
  View(): PropertyPrinter {
    return new PropertyPrinter({ type: 'string', name: 'some' });
  }
}
