import { InterfacePropertyPrinter, PropertyPrinter } from './property-printer';

describe('Property Printer', () => {
  it('should print the property', () => {
    const propertyText = new PropertyPrinter({
      name: 'some',
      type: 'string',
      required: true,
    }).print();

    expect(propertyText).toBe('some!:string;');
  });

  it('should print the interface property', () => {
    const propertyText = new InterfacePropertyPrinter({
      name: 'some',
      type: 'string',
      required: true,
      isArray:true
    }).print();

    expect(propertyText).toBe('some:string[];');
  });
});
