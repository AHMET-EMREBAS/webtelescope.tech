import { PropertyOptions } from '../meta';
import { clearSpace } from '../utils';
import { ClassType } from './class-type';
import { printProperty } from './property.printer';
describe('PropertyPrinter', () => {
  it.each`
    name      | expected              | classType                   | options
    ${'name'} | ${'name?:string;'}    | ${'interface' as ClassType} | ${{ type: 'string' } as PropertyOptions}
    ${'name'} | ${'name:string;'}     | ${'interface' as ClassType} | ${{ type: 'string', required: true } as PropertyOptions}
    ${'name'} | ${'name?:string[];'}  | ${'interface' as ClassType} | ${{ type: 'string', isArray: true } as PropertyOptions}
    ${'name'} | ${'name?:string;'}    | ${'dto' as ClassType}       | ${{ type: 'string' } as PropertyOptions}
    ${'name'} | ${'name!:string;'}    | ${'dto' as ClassType}       | ${{ type: 'string', required: true } as PropertyOptions}
    ${'name'} | ${'name?:string[];'}  | ${'entity' as ClassType}    | ${{ type: 'string', isArray: true } as PropertyOptions}
    ${'num'}  | ${'num?:number;'}     | ${'interface' as ClassType} | ${{ type: 'number' } as PropertyOptions}
    ${'num'}  | ${'num:number;'}      | ${'interface' as ClassType} | ${{ type: 'number', required: true } as PropertyOptions}
    ${'num'}  | ${'num?:number[];'}   | ${'interface' as ClassType} | ${{ type: 'number', isArray: true } as PropertyOptions}
    ${'num'}  | ${'num?:number;'}     | ${'dto' as ClassType}       | ${{ type: 'number' } as PropertyOptions}
    ${'num'}  | ${'num!:number;'}     | ${'dto' as ClassType}       | ${{ type: 'number', required: true } as PropertyOptions}
    ${'num'}  | ${'num?:number[];'}   | ${'entity' as ClassType}    | ${{ type: 'number', isArray: true } as PropertyOptions}
    ${'dv'}   | ${'dv?:Date;'}        | ${'interface' as ClassType} | ${{ type: 'date' } as PropertyOptions}
    ${'dv'}   | ${'dv:Date;'}         | ${'interface' as ClassType} | ${{ type: 'date', required: true } as PropertyOptions}
    ${'dv'}   | ${'dv?:Date[];'}      | ${'interface' as ClassType} | ${{ type: 'date', isArray: true } as PropertyOptions}
    ${'dv'}   | ${'dv?:Date;'}        | ${'dto' as ClassType}       | ${{ type: 'date' } as PropertyOptions}
    ${'dv'}   | ${'dv!:Date;'}        | ${'dto' as ClassType}       | ${{ type: 'date', required: true } as PropertyOptions}
    ${'dv'}   | ${'dv?:Date[];'}      | ${'entity' as ClassType}    | ${{ type: 'date', isArray: true } as PropertyOptions}
    ${'bool'} | ${'bool?:boolean;'}   | ${'interface' as ClassType} | ${{ type: 'boolean' } as PropertyOptions}
    ${'bool'} | ${'bool:boolean;'}    | ${'interface' as ClassType} | ${{ type: 'boolean', required: true } as PropertyOptions}
    ${'bool'} | ${'bool?:boolean[];'} | ${'interface' as ClassType} | ${{ type: 'boolean', isArray: true } as PropertyOptions}
    ${'bool'} | ${'bool?:boolean;'}   | ${'dto' as ClassType}       | ${{ type: 'boolean' } as PropertyOptions}
    ${'bool'} | ${'bool!:boolean;'}   | ${'dto' as ClassType}       | ${{ type: 'boolean', required: true } as PropertyOptions}
    ${'bool'} | ${'bool?:boolean[];'} | ${'entity' as ClassType}    | ${{ type: 'boolean', isArray: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any;'}        | ${'interface' as ClassType} | ${{ type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj:any;'}         | ${'interface' as ClassType} | ${{ type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any[];'}      | ${'interface' as ClassType} | ${{ type: 'object', isArray: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any;'}        | ${'dto' as ClassType}       | ${{ type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj!:any;'}        | ${'dto' as ClassType}       | ${{ type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:any[];'}      | ${'dto' as ClassType}       | ${{ type: 'object', isArray: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc;'}        | ${'interface' as ClassType} | ${{ objectType: 'Abc', type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj:Abc;'}         | ${'interface' as ClassType} | ${{ objectType: 'Abc', type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc[];'}      | ${'interface' as ClassType} | ${{ objectType: 'Abc', type: 'object', isArray: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc;'}        | ${'dto' as ClassType}       | ${{ objectType: 'Abc', type: 'object' } as PropertyOptions}
    ${'obj'}  | ${'obj!:Abc;'}        | ${'dto' as ClassType}       | ${{ objectType: 'Abc', type: 'object', required: true } as PropertyOptions}
    ${'obj'}  | ${'obj?:Abc[];'}      | ${'entity' as ClassType}    | ${{ objectType: 'Abc', type: 'object', isArray: true } as PropertyOptions}
  `(
    'should print $expected from $options for an $classType',
    ({ name, expected, classType, options }) => {
      const result = clearSpace(printProperty(classType, name, options));
      expect(result).toBe(clearSpace(expected));
    }
  );
});
