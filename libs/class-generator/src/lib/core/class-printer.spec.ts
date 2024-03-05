import { CLassPrinter, ClassOptions as CO } from './class-printer';
import { DecoratorPrinter as DP } from './decorator-printer';
import { PropertyPrinter as PP } from './property-printer';
import { ImportPrinter as IP } from './import-printer';
describe('ClassPrinter', () => {
  it.each`
    options                                                                                    | result
    ${{ name: 'A' } as CO}                                                                     | ${`export class A{}`}
    ${{ name: 'A', properties: [new PP({ name: 'name', type: 'string' })] } as CO}             | ${`export class A{name?:string;}`}
    ${{ name: 'A', properties: [new PP({ name: 'name', type: 'string' })] } as CO}             | ${`export class A{name?:string;}`}
    ${{ name: 'A', decorators: [new DP({ name: 'V', options: { m: 100 } })] } as CO}           | ${`@V({m:100})export class A{}`}
    ${{ name: 'A' } as CO}                                                                     | ${`export class A{}`}
    ${{ name: 'A', imports: [new IP({ items: ['B', 'C', 'D'], packageName: 'some' })] } as CO} | ${`import {B, C, D} from 'some';export class A{}`}
  `('$options should print $result', ({ options, result }) => {
    const text = new CLassPrinter(options).print();

    expect(text).toBe(result);
  });
});
