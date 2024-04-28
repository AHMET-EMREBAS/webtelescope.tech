import { PropertyOptions } from '../__meta';
import { IPrinterPickerFactory } from '../common';
import { PropertyPrinter } from '../property';

export class PropertyPrinterFactory
  implements IPrinterPickerFactory<PropertyPrinter>
{
  protected __build( propertyName: string, options: PropertyOptions) {
    return new PropertyPrinter({ 
      name:propertyName, 
      type:
    })
  }
  /**
   * Entity class property printer
   * @returns
   */
  Entity(propertyName: string, options: PropertyOptions): PropertyPrinter {
    return new PropertyPrinter({
      name: propertyName,
      type:'string'
    });
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
