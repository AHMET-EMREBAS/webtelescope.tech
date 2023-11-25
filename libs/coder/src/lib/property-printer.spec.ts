import { ClassPropertyPrinter } from './property-printer';
import { DecoratorPrinter } from './decorator-printer';

describe('property printer', () => {
  it('should print property', () => {
    const property = new ClassPropertyPrinter({ name: 'name', type: 'string' }, [
      new DecoratorPrinter({ name: 'Property', options: { type: 'string' } }),
    ]);

    expect(property.print()).toBe(`@Property({type:'string'})\nname?:string;`);
  });
});
