import {
  ClassType,
  Converter,
  PropertyDecoratorPrinterPicker,
  PropertyDeocPrinterPicker,
} from '../common';

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
export type PropertyTypeConverter = Converter<string | undefined, string>;
export type NameConverter = Converter<NameConverterOptions, string>;

export type RequiredConverterOptions = {
  classType: ClassType;
  required?: boolean;
};

export type RequiredConverter = Converter<RequiredConverterOptions, boolean>;

export type PropertyPrinterOptions = {
  classType: ClassType;
  modelName: string;
  propertyName: string;
  propertyOptions: PropertyOptions;
  namePrefix?: string;
  nameSuffix?: string;
  typePrefix?: string;
  typeSuffix?: string;
  delimeter?: string;
  propertyNameConverter: NameConverter;
  classTypeConverter: ClassTypeConverter;
  propertyTypeConverter: PropertyTypeConverter;
  decoratorPrinterPicker: PropertyDecoratorPrinterPicker;
  requiredConverter: RequiredConverter;
  docPrinterPicker: PropertyDeocPrinterPicker;
};

export class BasePropertyPrinter extends PropertyPrinter {
  constructor(protected readonly options: PropertyPrinterOptions) {
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
      propertyNameConverter,
      propertyTypeConverter,
      classTypeConverter,
      decoratorPrinterPicker,
      requiredConverter,
      docPrinterPicker,
    } = options;

    super({
      classType: classTypeConverter(classType),
      name: propertyNameConverter({ classType, modelName, propertyName }),
      type: propertyTypeConverter(propertyOptions.type),
      decoratorsPrinter: decoratorPrinterPicker({
        classType,
        options: propertyOptions,
      }),
      required: requiredConverter({
        classType,
        required: propertyOptions.required,
      }),
      docsPrinter: docPrinterPicker({
        classType,
        options: propertyOptions.description,
      }),
      isArray: propertyOptions.isArray,
      namePrefix,
      nameSuffix,
      typePrefix,
      typeSuffix,
      delimeter,
    });
  }
}
