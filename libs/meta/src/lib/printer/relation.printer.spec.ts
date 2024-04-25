import { RelationOptions } from '../meta';
import { ClassType } from './class-type';

import { printRelation } from './relation.printer';

describe('Relation printer', () => {
  it.each`
    name      | expected               | classType                       | options
    ${'name'} | ${'name!:Category;'}   | ${'entity' as ClassType}        | ${{ type: 'One', target: 'Category', required: true } as RelationOptions}
    ${'name'} | ${'name!:IDDto;'}      | ${'dto' as ClassType}           | ${{ type: 'One', target: 'Category', required: true } as RelationOptions}
    ${'name'} | ${'name:Category;'}    | ${'interface' as ClassType}     | ${{ type: 'One', target: 'Category', required: true } as RelationOptions}
    ${'name'} | ${'name:IID;'}         | ${'dto-interface' as ClassType} | ${{ type: 'One', target: 'Category', required: true } as RelationOptions}
    ${'name'} | ${'name?:Category;'}   | ${'entity' as ClassType}        | ${{ type: 'One', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:IDDto;'}      | ${'dto' as ClassType}           | ${{ type: 'One', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:Category;'}   | ${'interface' as ClassType}     | ${{ type: 'One', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:IID;'}        | ${'dto-interface' as ClassType} | ${{ type: 'One', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:Category[];'} | ${'entity' as ClassType}        | ${{ type: 'Many', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:IDDto[];'}    | ${'dto' as ClassType}           | ${{ type: 'Many', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:Category[];'} | ${'interface' as ClassType}     | ${{ type: 'Many', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:IID[];'}      | ${'dto-interface' as ClassType} | ${{ type: 'Many', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:Category;'}   | ${'entity' as ClassType}        | ${{ type: 'Owner', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:IDDto;'}      | ${'dto' as ClassType}           | ${{ type: 'Owner', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:Category;'}   | ${'interface' as ClassType}     | ${{ type: 'Owner', target: 'Category' } as RelationOptions}
    ${'name'} | ${'name?:IID;'}        | ${'dto-interface' as ClassType} | ${{ type: 'Owner', target: 'Category' } as RelationOptions}
  `(
    'should print $expected from $options for $classType',
    ({ name, expected, classType, options }) => {
      const result = printRelation(classType, name, options);
      expect(expected).toBe(result);
    }
  );
});
