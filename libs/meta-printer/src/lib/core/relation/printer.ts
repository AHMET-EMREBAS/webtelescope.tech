import {
  ClassName,
  Converter,
  RelationDecoratorPrinterPicker,
  DocPrinterPicker,
  isRelationArray,
} from '../../common';

import { RelationOptions } from '@webpackages/meta';
import {
  ClassType as ExtClassType,
  PropertyPrinter,
} from '@webpackages/printer';

export type NameConverterOptions = {
  classType: ClassName;
  modelName: string;
  relationName: string;
};

export type TypeConverterOptions = {
  classType: ClassName;
  type: string;
};
export type TypeConverter = Converter<TypeConverterOptions, string>;

export type ClassTypeConverter = Converter<ClassName, ExtClassType>;
export type NameConverter = Converter<NameConverterOptions, string>;

export type RequiredConverterOptions = {
  classType: ClassName;
  required?: boolean;
};

export type RequiredConverter = Converter<RequiredConverterOptions, boolean>;

export type PrinterOptions = {
  classType: ClassName;
  modelName: string;
  relationName: string;
  relationOptions: RelationOptions;
  namePrefix?: string;
  nameSuffix?: string;
  typePrefix?: string;
  typeSuffix?: string;
  delimeter?: string;
  nameConverter: NameConverter;
  classTypeConverter: ClassTypeConverter;
  requiredConverter: RequiredConverter;
  typeConverter: TypeConverter;
  decoratorPicker: RelationDecoratorPrinterPicker;
  docPicker: DocPrinterPicker;
};

export class BasePrinter extends PropertyPrinter {
  constructor(protected readonly options: PrinterOptions) {
    const {
      classType,
      modelName,
      relationName,
      relationOptions,
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

    if (!relationOptions.type) {
      throw new Error('Relation type is required!');
    }

    if (!relationOptions.model) {
      throw new Error('Model is required');
    }

    super({
      classType: classTypeConverter(classType),
      name: nameConverter({
        classType,
        modelName,
        relationName,
      }),
      type: typeConverter({
        classType,
        type: relationOptions.model.modelName,
      }),
      decoratorsPrinter: decoratorPicker({
        classType,
        options: relationOptions,
      }),
      required: requiredConverter({
        classType,
        required: relationOptions.required,
      }),
      docsPrinter: docPicker({
        classType,
        options: relationOptions.description,
      }),
      isArray: isRelationArray(relationOptions),
      namePrefix,
      nameSuffix,
      typePrefix,
      typeSuffix,
      delimeter,
    });
  }
}
