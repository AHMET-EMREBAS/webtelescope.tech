import { Model } from '../__meta';
import { ClassPrinter as __ClassPrinter } from '../__printer';
import {
  ClassType,
  INamePickerByClassType,
  IPrinterPickerByClassType,
  IPrinterPickerByClassTypeAndModel,
} from '../common';

/**
 * Implements common class printer operations
 */
export class ClassPrinter extends __ClassPrinter {
  /**
   *
   * @param classType {@link ClassType}
   * @param model {@link Model}
   * @param options {@link ClassPrinterOptions}
   * @param name {@link INamePickerByClassType}
   * @param type {@link INamePickerByClassType}
   * @param extending {@link IPrinterPickerByClassTypeAndModel}
   * @param implementing {@link IPrinterPickerByClassTypeAndModel}
   * @param content {@link IPrinterPickerByClassTypeAndModel}
   * @param decorating {@link IPrinterPickerByClassType}
   * @param generics {@link IPrinterPickerByClassTypeAndModel}
   * @param importings {@link IPrinterPickerByClassTypeAndModel}
   * @param namePrefix {@link INamePickerByClassType}
   * @param nameSuffix {@link INamePickerByClassType}
   * @param docs {@link IPrinterPickerByClassTypeAndModel}
   * @param notExport {@link boolea}
   */
  constructor(
    protected readonly classType: ClassType,
    protected readonly model: Model,
    protected readonly name: INamePickerByClassType,
    protected readonly type: INamePickerByClassType,
    protected readonly extending?: IPrinterPickerByClassTypeAndModel,
    protected readonly implementing?: IPrinterPickerByClassTypeAndModel,
    protected readonly content?: IPrinterPickerByClassTypeAndModel,
    protected readonly decorating?: IPrinterPickerByClassType,
    protected readonly generics?: IPrinterPickerByClassTypeAndModel,
    protected readonly importings?: IPrinterPickerByClassTypeAndModel,
    protected readonly namePrefix?: INamePickerByClassType,
    protected readonly nameSuffix?: INamePickerByClassType,
    protected readonly docs?: IPrinterPickerByClassTypeAndModel,
    protected readonly notExport?: boolean
  ) {
    super({
      name: name.pick(classType),
      type: type.pick(classType),
      extending: extending?.pick(classType, model),
      implementing: implementing?.pick(classType, model),
      decorating: decorating?.pick(classType),
      content: content?.pick(classType, model),
      docs: docs?.pick(classType, model),
      generics: generics?.pick(classType, model),
      importings: importings?.pick(classType, model),
      namePrefix: namePrefix?.pick(classType),
      nameSuffix: namePrefix?.pick(classType),
      notExport,
    });
  }
}
