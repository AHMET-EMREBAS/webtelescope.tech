import { PropertyOptions } from '../__meta';
import {
  IPrint,
  RequiredMark,
  PropertyPrinter as __PropertyPrinter,
} from '../__printer';
import {
  ClassType,
  IStringPickerByClassType,
  IPickValuePickerByClassName,
  IPrinterPickerByClassType,
} from '../common';

export type PropertyPrinterOptions = {
  name: IStringPickerByClassType;
  type: IStringPickerByClassType;
  propertyOptions: PropertyOptions;
  classType: ClassType;
  modelName: string;
  isRequired: IPickValuePickerByClassName<RequiredMark>;
  decorators?: IPrinterPickerByClassType;
  docs?: IPrinterPickerByClassType;
  namePrefix?: IStringPickerByClassType;
  nameSuffix?: IStringPickerByClassType;
  typePrefix?: IStringPickerByClassType;
  typeSuffix?: IStringPickerByClassType;
  delimeter?: IStringPickerByClassType;
};
/**
 * Default property printer implementation following interface property syntax
 */
export class PropertyPrinter extends __PropertyPrinter implements IPrint {
  constructor(protected readonly options: PropertyPrinterOptions) {
    const {
      classType,
      decorators,
      docs,
      name,
      propertyOptions,
      type,
      delimeter,
      namePrefix,
      nameSuffix,
      typePrefix,
      typeSuffix,
    } = options;

    super({
      name: name.pick(classType),
      type: type.pick(classType, propertyOptions.type),
      decoratorsPrinter: decorators?.pick(classType, propertyOptions),
      docsPrinter: docs?.pick(classType, propertyOptions),
      isArray: propertyOptions.isArray,
      namePrefix: namePrefix?.pick(classType),
      nameSuffix: nameSuffix?.pick(classType),
      required: propertyOptions.required,
      typePrefix: typePrefix?.pick(classType),
      typeSuffix: typeSuffix?.pick(classType),
      delimeter: delimeter?.pick(classType),
    });
  }

  protected override __isRequired(): RequiredMark {
    return this.options.isRequired.pick(this.options.classType);
  }
}
