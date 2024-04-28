import {
  ClassType,
  Converter,
  PropertyDecoratorPrinterPicker,
  DocPrinterPicker,
  isColumnArray,
} from '../../common';

import { ColumnOptions } from '@webpackages/meta';
import {
  ClassType as ExtClassType,
  PropertyPrinter,
} from '@webpackages/printer';

export type NameConverterOptions = {
  classType: ClassType;
  modelName: string;
  columnName: string;
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
  columnName: string;
  columnOptions: ColumnOptions;
  namePrefix?: string;
  nameSuffix?: string;
  typePrefix?: string;
  typeSuffix?: string;
  delimeter?: string;
  nameConverter: NameConverter;
  typeConverter: TypeConverter;
  classTypeConverter: ClassTypeConverter;
  requiredConverter: RequiredConverter;
  decoratorPicker: PropertyDecoratorPrinterPicker;
  docPicker: DocPrinterPicker;
};

export class BasePrinter extends PropertyPrinter {
  constructor(protected readonly options: PrinterOptions) {
    const {
      classType,
      modelName,
      columnName,
      columnOptions,
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

    if (!columnOptions.type) {
      throw new Error('Column type is required!');
    }
    if (columnOptions.type === 'object') {
      if (!columnOptions.objectType) {
        throw new Error('objectType is required!');
      }
    }
    super({
      classType: classTypeConverter(classType),
      name: nameConverter({ classType, modelName, columnName }),
      type: typeConverter(columnOptions.type),
      decoratorsPrinter: decoratorPicker({
        classType,
        options: columnOptions,
      }),
      required: requiredConverter({
        classType,
        required: columnOptions.required,
      }),
      docsPrinter: docPicker({
        classType,
        options: columnOptions.description,
      }),
      isArray: isColumnArray(columnOptions),
      namePrefix,
      nameSuffix,
      typePrefix,
      typeSuffix,
      delimeter,
    });
  }
}
