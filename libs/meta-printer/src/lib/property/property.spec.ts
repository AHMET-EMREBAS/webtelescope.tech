import { PropertyPrinterFactory } from './property.factory';
const Factory = new PropertyPrinterFactory();

describe('PropertyPrinter', () => {
  it.each`
    expected                    | printer            | name      | type        | required | modelName
    ${'name?: string;'}         | ${Factory.Entity}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${Factory.Update}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName?: string;'} | ${Factory.Query}   | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${Factory.ICreate} | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${Factory.IUpdate} | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName!: string;'} | ${Factory.View}    | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName!: string;'} | ${Factory.IView}   | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName?: string;'} | ${Factory.IQuery}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
  `(
    '$printer.name |  print $expected from $name, $type, $required, $modelName ',
    ({ expected, printer, name, type, required, modelName }) => {
      const result = new printer({ name, type, required, modelName }).print();
      expect(result).toBe(expected);
    }
  );
});
