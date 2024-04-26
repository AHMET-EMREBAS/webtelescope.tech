import { RelationType } from '../meta';
import { ClassType } from './__common';
import { RelationPrinter } from './relation';
describe('Relation Printer', () => {
  it.each`
    expected                                                                             | propertyName    | classType               | relationType          | required
    ${'@One(Category)category!:Category;'}                                               | ${'category'}   | ${ClassType.Entity}     | ${RelationType.One}   | ${true}
    ${'@Many(Category)category!:Category[];'}                                            | ${'category'}   | ${ClassType.Entity}     | ${RelationType.Many}  | ${true}
    ${'@Owner(Category)category!:Category;'}                                             | ${'category'}   | ${ClassType.Entity}     | ${RelationType.Owner} | ${true}
    ${'category:Category;'}                                                              | ${'category'}   | ${ClassType.IEntity}    | ${RelationType.One}   | ${true}
    ${'category:Category[];'}                                                            | ${'category'}   | ${ClassType.IEntity}    | ${RelationType.Many}  | ${true}
    ${'category:Category;'}                                                              | ${'category'}   | ${ClassType.IEntity}    | ${RelationType.Owner} | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true })category!:IDDto;"}   | ${'category'}   | ${ClassType.CreateDto}  | ${RelationType.One}   | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true })category!:IDDto[];"} | ${'category'}   | ${ClassType.CreateDto}  | ${RelationType.Many}  | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true })category!:IDDto;"}   | ${'category'}   | ${ClassType.CreateDto}  | ${RelationType.Owner} | ${true}
    ${'category:IID;'}                                                                   | ${'category'}   | ${ClassType.ICreateDto} | ${RelationType.One}   | ${true}
    ${'category:IID[];'}                                                                 | ${'category'}   | ${ClassType.ICreateDto} | ${RelationType.Many}  | ${true}
    ${'category:IID;'}                                                                   | ${'category'}   | ${ClassType.ICreateDto} | ${RelationType.Owner} | ${true}
    ${'category?:IID;'}                                                                  | ${'category'}   | ${ClassType.IUpdateDto} | ${RelationType.One}   | ${true}
    ${'category?:IID[];'}                                                                | ${'category'}   | ${ClassType.IUpdateDto} | ${RelationType.Many}  | ${true}
    ${'category?:IID;'}                                                                  | ${'category'}   | ${ClassType.IUpdateDto} | ${RelationType.Owner} | ${true}
    ${'@One(Category)category?:Category;'}                                               | ${'category'}   | ${ClassType.Entity}     | ${RelationType.One}   | ${false}
    ${'@Many(Category)category!:Category[];'}                                            | ${'category'}   | ${ClassType.Entity}     | ${RelationType.Many}  | ${true}
    ${'@Many(Category)categories?:Category[];'}                                          | ${'categories'} | ${ClassType.Entity}     | ${RelationType.Many}  | ${false}
    ${'@Owner(Category)category!:Category;'}                                             | ${'category'}   | ${ClassType.Entity}     | ${RelationType.Owner} | ${true}
  `(
    'should print $expected from  $propertyName, $classType, $relationType, $required ',
    ({ expected, propertyName, classType, relationType, required }) => {
      const result = new RelationPrinter(classType, propertyName, {
        type: relationType,
        model: {
          modelName: 'Category',
          properties: { name: { type: 'string' } },
        },
        required,
      }).print();

      expect(result).toBe(expected);
    }
  );
});
