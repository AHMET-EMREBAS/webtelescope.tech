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

/**
 * Default property printer implementation following interface property syntax
 */
export class PropertyPrinter extends __PropertyPrinter implements IPrint {
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly propertyOptions: PropertyOptions,
    protected readonly name: IStringPickerByClassType,
    protected readonly type: IStringPickerByClassType,
    protected readonly isRequired: IPickValuePickerByClassName<RequiredMark>,
    protected readonly decorators: IPrinterPickerByClassType,
    protected readonly docs: IPrinterPickerByClassType,
    protected readonly namePrefix?: IStringPickerByClassType,
    protected readonly nameSuffix?: IStringPickerByClassType,
    protected readonly typePrefix?: IStringPickerByClassType,
    protected readonly typeSuffix?: IStringPickerByClassType,
    protected readonly delimeter?: IStringPickerByClassType
  ) {
    super({
      name: name.pick(classType),
      type: type.pick(classType, propertyOptions.type),
      decoratorsPrinter: decorators.pick(classType, propertyOptions),
      docsPrinter: docs.pick(classType, propertyOptions),
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
    return this.isRequired.pick(this.classType);
  }
}
