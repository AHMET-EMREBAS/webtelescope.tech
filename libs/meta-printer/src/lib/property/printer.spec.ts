import { BasePropertyPrinter } from './printer';
import { ClassType, Converter, PrinterPicker } from '../common';

const propertyNameConverter: Converter<any, any> = () => 'Name';
const requiredConverter: Converter<any, any> = () => 'Required';
const classTypeConverter: Converter<any, any> = () => 'ClassType';
const propertyTypeConverter: Converter<any, any> = () => 'PropertyType';

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
    }).print();

    console.log(result);
  });
});
