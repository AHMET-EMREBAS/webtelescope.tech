import { RelationProperty } from '../meta';
import { ClassType } from './class-type';

import { printRelation } from './relation.printer';

describe('Relation printer', () => {
  it.each`
    name      | expected               | classType                       | options
    ${'name'} | ${'name!:Category;'}   | ${'entity' as ClassType}        | ${{ type: 'One', target: 'Category', requried: true } as RelationProperty}
    ${'name'} | ${'name!:IDDto;'}      | ${'dto' as ClassType}           | ${{ type: 'One', target: 'Category', requried: true } as RelationProperty}
    ${'name'} | ${'name:Category;'}    | ${'interface' as ClassType}     | ${{ type: 'One', target: 'Category', requried: true } as RelationProperty}
    ${'name'} | ${'name:IID;'}         | ${'dto-interface' as ClassType} | ${{ type: 'One', target: 'Category', requried: true } as RelationProperty}
    ${'name'} | ${'name?:Category;'}   | ${'entity' as ClassType}        | ${{ type: 'One', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:IDDto;'}      | ${'dto' as ClassType}           | ${{ type: 'One', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:Category;'}   | ${'interface' as ClassType}     | ${{ type: 'One', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:IID;'}        | ${'dto-interface' as ClassType} | ${{ type: 'One', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:Category[];'} | ${'entity' as ClassType}        | ${{ type: 'Many', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:IDDto[];'}    | ${'dto' as ClassType}           | ${{ type: 'Many', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:Category[];'} | ${'interface' as ClassType}     | ${{ type: 'Many', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:IID[];'}      | ${'dto-interface' as ClassType} | ${{ type: 'Many', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:Category;'}   | ${'entity' as ClassType}        | ${{ type: 'Owner', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:IDDto;'}      | ${'dto' as ClassType}           | ${{ type: 'Owner', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:Category;'}   | ${'interface' as ClassType}     | ${{ type: 'Owner', target: 'Category' } as RelationProperty}
    ${'name'} | ${'name?:IID;'}        | ${'dto-interface' as ClassType} | ${{ type: 'Owner', target: 'Category' } as RelationProperty}
  `(
    'should print $expected from $options for $classType',
    ({ name, expected, classType, options }) => {
      const result = printRelation(classType, name, options);
      expect(expected).toBe(result);
    }
  );
});
