import { PropertyOptions } from '@webpackages/meta';
import { ClassType, EmptyPrinter } from '../../common';
import { BasePropertyPrinter } from '../../property';
import { classTypeConverter, requiredConverter } from '../converter';
import { propertyDecoratorPrinterPicker } from '../picker/property';

export class PropertyPrinter extends BasePropertyPrinter {
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly propertyOptions: PropertyOptions
  ) {
    super({
      classType,
      modelName,
      propertyName,
      propertyOptions,
      classTypeConverter: classTypeConverter,
      propertyNameConverter: () => '',
      propertyTypeConverter: () => '',
      requiredConverter,
      decoratorPrinterPicker: propertyDecoratorPrinterPicker,
      docPrinterPicker: (...args: any[]) => EmptyPrinter,
    });
  }
}
