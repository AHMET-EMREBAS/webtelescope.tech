import { PropertyOptions } from '@webpackages/meta';
import { ClassType } from '../../common';
import {
  classTypeConverter,
  requiredConverter,
  nameConverter,
  typeConverter,
} from './converter';
import { decoratorPicker, docPicker } from './picker';
import { BasePrinter } from '../../core/property';

/**
 * @DONE
 *
 */
export class PropertyPrinter extends BasePrinter {
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
      classTypeConverter,
      nameConverter,
      typeConverter,
      requiredConverter,
      decoratorPicker,
      docPicker,
    });
  }
}
