import { RelationOptions } from '@webpackages/meta';
import { ClassType } from '../../common';
import {
  classTypeConverter,
  requiredConverter,
  nameConverter,
  typeConverter,
} from './converter';
import { decoratorPicker, docPicker } from './picker';
import { BasePrinter } from '../../core/relation';

/**
 * @DONE
 *
 */
export class RelationPrinter extends BasePrinter {
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly relationName: string,
    protected readonly relationOptions: RelationOptions
  ) {
    super({
      classType,
      modelName,
      relationName,
      relationOptions,
      classTypeConverter,
      nameConverter,
      typeConverter,
      requiredConverter,
      decoratorPicker,
      docPicker,
    });
  }
}
