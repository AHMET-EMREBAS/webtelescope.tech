import { PropertyPrinterFactory } from './property.factory';
const Entity = new PropertyPrinterFactory().Entity();
const Create = new PropertyPrinterFactory().Create();
const Update = new PropertyPrinterFactory().Update();
const Query = new PropertyPrinterFactory().Query();
const ICreate = new PropertyPrinterFactory().ICreate();
const IUpdate = new PropertyPrinterFactory().IUpdate();
const View = new PropertyPrinterFactory().View();
const IView = new PropertyPrinterFactory().IView();
const IQuery = new PropertyPrinterFactory().IQuery();

describe('PropertyPrinter', () => {
  it.each`
    expected                    | printer    | name      | type        | required | modelName
    ${'name?: string;'}         | ${Entity}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${Create}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${Update}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName?: string;'} | ${Query}   | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${ICreate} | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'name?: string;'}         | ${IUpdate} | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName!: string;'} | ${View}    | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName!: string;'} | ${IView}   | ${'name'} | ${'string'} | ${false} | ${'Category'}
    ${'categoryName?: string;'} | ${IQuery}  | ${'name'} | ${'string'} | ${false} | ${'Category'}
  `(
    '$printer.name |  print $expected from $name, $type, $required, $modelName ',
    ({ expected, printer, name, type, required, modelName }) => {
      const result = new printer({ name, type, required, modelName }).print();
      expect(result).toBe(expected);
    }
  );
});
