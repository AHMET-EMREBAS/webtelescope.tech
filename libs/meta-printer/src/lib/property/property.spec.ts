import { PropertyPrinterFactory } from './property.factory';

describe('PropertyPrinter', () => {
  it('should print the property', () => {
    const Create = new PropertyPrinterFactory().Create();
    const Update = new PropertyPrinterFactory().Update();
    const Query = new PropertyPrinterFactory().Query();
    const ICreate = new PropertyPrinterFactory().ICreate();
    const IUpdate = new PropertyPrinterFactory().IUpdate();
    const View = new PropertyPrinterFactory().View();

    expect(new Create({ name: 'some', type: 'string' }).print()).toBe(
      `some?: string;`
    );
    expect(new Update({ name: 'some', type: 'string' }).print()).toBe(
      `some?: string;`
    );
    expect(
      new Query({ name: 'some', type: 'string', modelName: 'Category' }).print()
    ).toBe(`categorySome?: string;`);

    expect(new ICreate({ name: 'some', type: 'string' }).print()).toBe(
      `some?: string;`
    );

    expect(new IUpdate({ name: 'some', type: 'string' }).print()).toBe(
      `some?: string;`
    );
    expect(
      new View({ name: 'some', type: 'string', modelName: 'Category' }).print()
    ).toBe(`categorySome: string;`);
  });
});
