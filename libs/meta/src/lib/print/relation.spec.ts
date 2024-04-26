import { RelationType } from '../meta';
import { ClassType } from './__common';
import { RelationPrinter } from './relation';
describe('Relation Printer', () => {
  it.each`
    expected                                                                             | classType               | relationType          | required
    ${'@One(Category)category!:Category;'}                                               | ${ClassType.Entity}     | ${RelationType.One}   | ${true}
    ${'@Many(Category)category!:Category[];'}                                            | ${ClassType.Entity}     | ${RelationType.Many}  | ${true}
    ${'@Owner(Category)category!:Category;'}                                             | ${ClassType.Entity}     | ${RelationType.Owner} | ${true}
    ${'category:Category;'}                                                              | ${ClassType.IEntity}    | ${RelationType.One}   | ${true}
    ${'category:Category[];'}                                                            | ${ClassType.IEntity}    | ${RelationType.Many}  | ${true}
    ${'category:Category;'}                                                              | ${ClassType.IEntity}    | ${RelationType.Owner} | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true })category!:IDDto;"}   | ${ClassType.CreateDto}  | ${RelationType.One}   | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true })category!:IDDto[];"} | ${ClassType.CreateDto}  | ${RelationType.Many}  | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true })category!:IDDto;"}   | ${ClassType.CreateDto}  | ${RelationType.Owner} | ${true}
    ${'category:IID;'}                                                                   | ${ClassType.ICreateDto} | ${RelationType.One}   | ${true}
    ${'category:IID[];'}                                                                 | ${ClassType.ICreateDto} | ${RelationType.Many}  | ${true}
    ${'category:IID;'}                                                                   | ${ClassType.ICreateDto} | ${RelationType.Owner} | ${true}
    ${'category?:IID;'}                                                                  | ${ClassType.IUpdateDto} | ${RelationType.One}   | ${true}
    ${'category?:IID[];'}                                                                | ${ClassType.IUpdateDto} | ${RelationType.Many}  | ${true}
    ${'category?:IID;'}                                                                  | ${ClassType.IUpdateDto} | ${RelationType.Owner} | ${true}
    ${'@One(Category)category?:Category;'}                                               | ${ClassType.Entity}     | ${RelationType.One}   | ${false}
    ${'@Many(Category)category!:Category[];'}                                            | ${ClassType.Entity}     | ${RelationType.Many}  | ${true}
    ${'@Many(Category)category?:Category[];'}                                            | ${ClassType.Entity}     | ${RelationType.Many}  | ${false}
    ${'@Owner(Category)category!:Category;'}                                             | ${ClassType.Entity}     | ${RelationType.Owner} | ${true}
  `(
    'should print $expected from  $classType, $relationType, $required ',
    ({ expected, classType, relationType, required }) => {
      const result = new RelationPrinter(
        classType,
        'Category',
        'category',
        relationType,
        required
      ).print();

      expect(result).toBe(expected);
    }
  );
});
