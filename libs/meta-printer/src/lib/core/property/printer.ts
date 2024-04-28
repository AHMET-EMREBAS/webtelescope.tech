import {
  ClassType,
  Converter,
  PropertyDecoratorPrinterPicker,
  DocPrinterPicker,
  isPropertyArray,
} from '../../common';

import { PropertyOptions } from '@webpackages/meta';
import {
  ClassType as ExtClassType,
  PropertyPrinter,
} from '@webpackages/printer';

export type NameConverterOptions = {
  classType: ClassType;
  modelName: string;
  propertyName: string;
};

export type ClassTypeConverter = Converter<ClassType, ExtClassType>;
export type TypeConverter = Converter<string, string>;
export type NameConverter = Converter<NameConverterOptions, string>;

export type RequiredConverterOptions = {
  classType: ClassType;
  required?: boolean;
};

export type RequiredConverter = Converter<RequiredConverterOptions, boolean>;

export type PrinterOptions = {
  classType: ClassType;
  modelName: string;
  propertyName: string;
  propertyOptions: PropertyOptions;
  namePrefix?: string;
  nameSuffix?: string;
  typePrefix?: string;
  typeSuffix?: string;
  delimeter?: string;
  nameConverter: NameConverter;
  classTypeConverter: ClassTypeConverter;
  typeConverter: TypeConverter;
  decoratorPicker: PropertyDecoratorPrinterPicker;
  requiredConverter: RequiredConverter;
  docPicker: DocPrinterPicker;
};

export class BasePrinter extends PropertyPrinter {
  constructor(protected readonly options: PrinterOptions) {
    const {
      classType,
      modelName,
      propertyName,
      propertyOptions,
      namePrefix,
      nameSuffix,
      typePrefix,
      typeSuffix,
      delimeter,
      nameConverter,
      typeConverter,
      classTypeConverter,
      decoratorPicker,
      requiredConverter,
      docPicker,
    } = options;

    if (!propertyOptions.type) {
      throw new Error('Property type is required!');
    }
    if (propertyOptions.type === 'object') {
      if (!propertyOptions.objectType) {
        throw new Error('objectType is required!');
      }
    }
    super({
      classType: classTypeConverter(classType),
      name: nameConverter({ classType, modelName, propertyName }),
      type: typeConverter(propertyOptions.type),
      decoratorsPrinter: decoratorPicker({
        classType,
        options: propertyOptions,
      }),
      required: requiredConverter({
        classType,
        required: propertyOptions.required,
      }),
      docsPrinter: docPicker({
        classType,
        options: propertyOptions.description,
      }),
      isArray: isPropertyArray(propertyOptions),
      namePrefix,
      nameSuffix,
      typePrefix,
      typeSuffix,
      delimeter,
    });
  }
}
