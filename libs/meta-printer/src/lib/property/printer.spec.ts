import {
  BasePropertyPrinter,
  ClassTypeConverter,
  NameConverter,
  NameConverterOptions,
  PropertyTypeConverter,
  RequiredConverter,
  RequiredConverterOptions,
} from './printer';
import { ClassType as PClassType } from '@webpackages/printer';
import { ClassType, PrinterPicker } from '../common';

const propertyNameConverter: NameConverter = (
  options: NameConverterOptions
) => {
  expect(options.classType).toBeDefined();
  expect(options.modelName).toBeDefined();
  expect(options.propertyName).toBeDefined();
  return 'Name';
};
const requiredConverter: RequiredConverter = (
  options: RequiredConverterOptions
) => {
  expect(options).toBeDefined();
  expect(options.classType).toBeDefined();
  return true;
};
const classTypeConverter: ClassTypeConverter = (type: ClassType) => {
  expect(type).toBeDefined();
  return PClassType.CLASS;
};
const propertyTypeConverter: PropertyTypeConverter = (type: string) => {
  expect(type).toBeDefined();
  return 'string';
};

const docPrinterPicker: PrinterPicker<any> = () => {
  return {
    print() {
      return '-Document-';
    },
  };
};

const decoratorPrinterPicker: PrinterPicker<any> = () => {
  return {
    print() {
      return '-Decorator-';
    },
  };
};

describe('Printer', () => {
  it('print', () => {
    const result = new BasePropertyPrinter({
      classType: ClassType.ENTITY,
      propertyName: 'username',
      modelName: 'User',
      propertyOptions: {},
      propertyNameConverter,
      requiredConverter,
      classTypeConverter,
      decoratorPrinterPicker,
      propertyTypeConverter,
      docPrinterPicker,
      namePrefix: '__P__',
      nameSuffix: '__S__',
      typePrefix: '__TP__',
      typeSuffix: '__TS__',
    }).print();

    console.log(result);
  });
});
