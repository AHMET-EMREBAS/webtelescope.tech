import {
  printEntity,
  printColumn,
  printEntityImport,
  printColumnDefinition,
  printColumnType,
} from './print-entity';
import { PropertyDefinition as PD, PropertyType, RelationType } from '../type';

describe('Print Entity', () => {
  it.each`
    type                         | result
    ${'Text' as PropertyType}    | ${'string'}
    ${'Boolean' as PropertyType} | ${'boolean'}
    ${'Date' as PropertyType}    | ${'Date'}
    ${'Number' as PropertyType}  | ${'number'}
    ${'Record' as PropertyType}  | ${'Record<string,unkown>'}
    ${'' as PropertyType}        | ${'any'}
  `('should print the property type $result for $type', ({ type, result }) => {
    const property: PD = {
      type: type,
    };
    expect(printColumnType(property)).toBe(result);
  });

  it.each`
    type                       | target        | result
    ${'One' as RelationType}   | ${'Category'} | ${'Category'}
    ${'Many' as RelationType}  | ${'Category'} | ${'Category[]'}
    ${'Owner' as RelationType} | ${'Category'} | ${'Category'}
  `(
    'should print relation property type $result for the type $type, and the target $target',
    ({ type, target, result }) => {
      const property: PD = {
        type: type,
        target,
      };
      expect(printColumnType(property)).toBe(result);
    }
  );

  it.each`
    name          | options                                      | result
    ${'name'}     | ${{} as PD}                                  | ${'name?:any;'}
    ${'name'}     | ${{ type: 'Text' } as PD}                    | ${'name?:string;'}
    ${'some'}     | ${{ type: 'Number', required: true } as PD}  | ${'some!:number;'}
    ${'category'} | ${{ type: 'One', target: 'Category' } as PD} | ${'category?:Category;'}
    ${'user'}     | ${{ type: 'Owner', target: 'User' } as PD}   | ${'user!:User;'}
  `(
    'should print property defination $result from $options',
    ({ name, options, result }) => {
      const text = printColumnDefinition(name, options);
      expect(text).toBe(result);
    }
  );
  it.each`
    name          | options                                      | result
    ${'name'}     | ${{} as PD}                                  | ${'@undefinedColumn()name?:any;'}
    ${'name'}     | ${{ type: 'Text' } as PD}                    | ${'@TextColumn()name?:string;'}
    ${'some'}     | ${{ type: 'Number', required: true } as PD}  | ${'@NumberColumn({required:true})some!:number;'}
    ${'category'} | ${{ type: 'One', target: 'Category' } as PD} | ${'@One(Category)category?:Category;'}
    ${'user'}     | ${{ type: 'Owner', target: 'User' } as PD}   | ${'@Owner(User)user!:User;'}
  `(
    'should print entity column $result from $options',
    ({ name, options, result }) => {
      const text = printColumn(name, options);
      expect(text).toBe(result);
    }
  );
  it.each`
    options                                      | result
    ${{} as PD}                                  | ${''}
    ${{ type: 'Text' } as PD}                    | ${''}
    ${{ type: 'Number', required: true } as PD}  | ${''}
    ${{ type: 'One', target: 'Category' } as PD} | ${`import{Category}from'./../../category';`}
    ${{ type: 'Owner', target: 'User' } as PD}   | ${`import{User}from'./../../user';`}
  `(
    'should print model import $result from $options',
    ({ options, result }) => {
      const text = printEntityImport(options);
      expect(text).toBe(result);
    }
  );

  it('should print entity', () => {
    const entity = printEntity('category', {
      properties: { name: { type: 'Text', required: true, unique: true } },
    });

    expect(entity).toBe(
      `import{Entity,BaseEntity,TextColumn}from'@webpackages/core';@Entity()export class Category extends BaseEntity{@TextColumn({required:true,unique:true})name!:string;}`
    );
  });
});
