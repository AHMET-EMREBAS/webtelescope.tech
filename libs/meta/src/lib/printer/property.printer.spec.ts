import { PropertyOptions } from '../meta';
import { printProperty } from './property.printer';
describe('PropertyPrinter', () => {
  it('should print interface property', () => {
    const expected = 'name:string;';
    const result = printProperty('interface', 'name', { required: true });
    expect(result).toBe(expected);
  });

  it.each`
    name      | expected             | classType      | options
    ${'name'} | ${'name?:string;'}   | ${'interface'} | ${{ type: 'string' } as PropertyOptions}
    ${'name'} | ${'name:string;'}    | ${'interface'} | ${{ type: 'string', required: true } as PropertyOptions}
    ${'name'} | ${'name?:string[];'} | ${'interface'} | ${{ type: 'string', isArray: true } as PropertyOptions}
    ${'name'} | ${'name?:string;'}   | ${'class'}     | ${{ type: 'string' } as PropertyOptions}
    ${'name'} | ${'name!:string;'}   | ${'class'}     | ${{ type: 'string', required: true } as PropertyOptions}
    ${'name'} | ${'name?:string[];'} | ${'class'}     | ${{ type: 'string', isArray: true } as PropertyOptions}
   
    ${'num'}  | ${'num?:number;'}    | ${'interface'} | ${{ type: 'number' } as PropertyOptions}
    ${'num'}  | ${'num:number;'}     | ${'interface'} | ${{ type: 'number', required: true } as PropertyOptions}
    ${'num'}  | ${'num?:number[];'}  | ${'interface'} | ${{ type: 'number', isArray: true } as PropertyOptions}
    ${'num'}  | ${'num?:number;'}    | ${'class'}     | ${{ type: 'number' } as PropertyOptions}
    ${'num'}  | ${'num!:number;'}    | ${'class'}     | ${{ type: 'number', required: true } as PropertyOptions}
    ${'num'}  | ${'num?:number[];'}  | ${'class'}     | ${{ type: 'number', isArray: true } as PropertyOptions}

    ${'dv'}  | ${'dv?:Date;'}    | ${'interface'} | ${{ type: 'date' } as PropertyOptions}
    ${'dv'}  | ${'dv:Date;'}     | ${'interface'} | ${{ type: 'date', required: true } as PropertyOptions}
    ${'dv'}  | ${'dv?:Date[];'}  | ${'interface'} | ${{ type: 'date', isArray: true } as PropertyOptions}
    ${'dv'}  | ${'dv?:Date;'}    | ${'class'}     | ${{ type: 'date' } as PropertyOptions}
    ${'dv'}  | ${'dv!:Date;'}    | ${'class'}     | ${{ type: 'date', required: true } as PropertyOptions}
    ${'dv'}  | ${'dv?:Date[];'}  | ${'class'}     | ${{ type: 'date', isArray: true } as PropertyOptions}

    ${'bool'}  | ${'bool?:boolean;'}    | ${'interface'} | ${{ type: 'boolean' } as PropertyOptions}
    ${'bool'}  | ${'bool:boolean;'}     | ${'interface'} | ${{ type: 'boolean', required: true } as PropertyOptions}
    ${'bool'}  | ${'bool?:boolean[];'}  | ${'interface'} | ${{ type: 'boolean', isArray: true } as PropertyOptions}
    ${'bool'}  | ${'bool?:boolean;'}    | ${'class'}     | ${{ type: 'boolean' } as PropertyOptions}
    ${'bool'}  | ${'bool!:boolean;'}    | ${'class'}     | ${{ type: 'boolean', required: true } as PropertyOptions}
    ${'bool'}  | ${'bool?:boolean[];'}  | ${'class'}     | ${{ type: 'boolean', isArray: true } as PropertyOptions}

    ${'obj'}  | ${'obj?:any;'}    | ${'interface'} | ${{ type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj:any;'}     | ${'interface'} | ${{ type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any[];'}  | ${'interface'} | ${{ type: 'object', isArray: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any;'}    | ${'class'}     | ${{ type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj!:any;'}    | ${'class'}     | ${{ type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any[];'}  | ${'class'}     | ${{ type: 'object', isArray: true } as PropertyOptions}

    ${'obj'}  | ${'obj?:Abc;'}    | ${'interface'} | ${{ objectType:'Abc', type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj:Abc;'}     | ${'interface'} | ${{ objectType:'Abc', type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc[];'}  | ${'interface'} | ${{ objectType:'Abc', type: 'object', isArray: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc;'}    | ${'class'}     | ${{ objectType:'Abc', type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj!:Abc;'}    | ${'class'}     | ${{ objectType:'Abc', type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc[];'}  | ${'class'}     | ${{ objectType:'Abc', type: 'object', isArray: true } as PropertyOptions}
  `(
    'should print $expected from $options for an $classType',
    ({ name, expected, classType, options }) => {
      const result = printProperty(classType, name, options);

      expect(result).toBe(expected);
    }
  );

  it('should print class property', () => {
    const expected = 'name:string;';
    const result = printProperty('interface', 'name', { required: true });
    expect(result).toBe(expected);
  });
});
