import { ClassType } from './__common';
import { PropertyPrinter } from './property';

describe('Relation Printer', () => {
  it.each`
    expected                                                                            | classTypes
    ${"@Column({ type: 'string', required: true }) name!: string;"}                     | ${[ClassType.Entity]}
    ${'@ViewColumn() categoryName!: string;'}                                           | ${[ClassType.View]}
    ${"@Property({ type: 'string', required: true, description: 'd' }) name!: string;"} | ${[ClassType.CreateDto]}
    ${"@Property({ type: 'string', description: 'd' }) name?: string;"}                 | ${[ClassType.UpdateDto]}
    ${'name: string;'}                                                                  | ${[ClassType.IEntity, ClassType.ICreateDto]}
    ${'categoryName: string;'}                                                          | ${[ClassType.IView]}
    ${"@Property({ type: 'string', description: 'd' }) categoryName?: string;"}         | ${[ClassType.QueryDto]}
    ${'categoryName?: string;'}                                                         | ${[ClassType.IQueryDto]}
  `('$classTypes | should print $expected  ', ({ expected, classTypes }) => {
    for (const classType of classTypes) {
      const result = new PropertyPrinter(classType, 'Category', 'name', {
        type: 'string',
        required: true,
        description: 'd',
      }).print();
      expect(result).toBe(expected);
    }
  });
});
