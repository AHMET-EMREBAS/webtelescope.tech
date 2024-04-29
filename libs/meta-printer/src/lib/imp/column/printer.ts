import { ColumnOptions } from '@webpackages/meta';
import { ClassName } from '../../common';
import {
  classTypeConverter,
  requiredConverter,
  nameConverter,
  typeConverter,
} from './converter';
import { decoratorPicker, docPicker } from './picker';
import { BasePrinter } from '../../core/column';

export class ColumnPrinter extends BasePrinter {
  constructor(
    protected readonly classType: ClassName,
    protected readonly modelName: string,
    protected readonly columnName: string,
    protected readonly columnOptions: ColumnOptions
  ) {
    super({
      classType,
      modelName,
      columnName,
      columnOptions,
      classTypeConverter,
      nameConverter,
      typeConverter,
      requiredConverter,
      decoratorPicker,
      docPicker,
    });
  }
}
