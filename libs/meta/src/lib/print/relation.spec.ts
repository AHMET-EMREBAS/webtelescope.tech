import { RelationType } from '../meta';
import { clearSpace } from '../utils';
import { ClassType } from './__common';
import { RelationPrinter } from './relation';
describe('Relation Printer', () => {
  it.each`
    expected                                                                               | classType               | relationType          | required
    ${'@One(Category) category!: Category;'}                                               | ${ClassType.Entity}     | ${RelationType.One}   | ${true}
    ${'@Many(Category) category?: Category[];'}                                            | ${ClassType.Entity}     | ${RelationType.Many}  | ${false}
    ${'@Owner(Category) category!: Category;'}                                             | ${ClassType.Entity}     | ${RelationType.Owner} | ${true}
    ${'category: TCategory;'}                                                              | ${ClassType.IEntity}    | ${RelationType.One}   | ${true}
    ${'category: TCategory[];'}                                                            | ${ClassType.IEntity}    | ${RelationType.Many}  | ${true}
    ${'category: TCategory;'}                                                              | ${ClassType.IEntity}    | ${RelationType.Owner} | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true }) category!: IDDto;"}   | ${ClassType.CreateDto}  | ${RelationType.One}   | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true }) category!: IDDto[];"} | ${ClassType.CreateDto}  | ${RelationType.Many}  | ${true}
    ${"@Property({ type:'object', objectType:IDDto, required:true }) category!: IDDto;"}   | ${ClassType.CreateDto}  | ${RelationType.Owner} | ${true}
    ${'category: IID;'}                                                                    | ${ClassType.ICreateDto} | ${RelationType.One}   | ${true}
    ${'category: IID[];'}                                                                  | ${ClassType.ICreateDto} | ${RelationType.Many}  | ${true}
    ${'category: IID;'}                                                                    | ${ClassType.ICreateDto} | ${RelationType.Owner} | ${true}
    ${'category?: IID;'}                                                                   | ${ClassType.IUpdateDto} | ${RelationType.One}   | ${true}
    ${'category?: IID[];'}                                                                 | ${ClassType.IUpdateDto} | ${RelationType.Many}  | ${true}
    ${'category?: IID;'}                                                                   | ${ClassType.IUpdateDto} | ${RelationType.Owner} | ${true}
    ${''}                                                                                  | ${ClassType.View}       | ${RelationType.Owner} | ${true}
    ${''}                                                                                  | ${ClassType.IView}      | ${RelationType.Owner} | ${true}
    ${''}                                                                                  | ${ClassType.IQueryDto}  | ${RelationType.Owner} | ${true}
    ${''}                                                                                  | ${ClassType.QueryDto}   | ${RelationType.Owner} | ${true}
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

      expect(clearSpace(result)).toBe(expected);
    }
  );

  it.each`
    expected                                    | classType
    ${"import { Category } from '../category'"} | ${ClassType.Entity}
  `('should print $expected from  $classType', ({ expected, classType }) => {
    const result = new RelationPrinter(
      classType,
      'Category',
      'category',
      RelationType.Many,
      true
    ).importing();

    expect(clearSpace(result)).toBe(expected);
  });
});
