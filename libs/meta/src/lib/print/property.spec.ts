import { ClassType } from './__common';
import { PropertyPrinter } from './property';

describe('Relation Printer', () => {
  it.each`
    expected                                                          | classTypes
    ${"@Column({ type: 'string', required: true }) name!: string;"}   | ${[ClassType.Entity]}
    ${'@ViewColumn() categoryName!: string;'}                         | ${[ClassType.View]}
    ${"@Property({ type: 'string', required: true }) name!: string;"} | ${[ClassType.CreateDto]}
    ${"@Property({ type: 'string', required: true }) name?: string;"} | ${[ClassType.UpdateDto, ClassType.QueryDto]}
    ${'name: string;'}                                                | ${[ClassType.IEntity, ClassType.ICreateDto]}
    ${'categoryName: string;'}                                        | ${[ClassType.IView]}
    ${'name?: string;'}                                               | ${[ClassType.IQueryDto]}
  `('$classTypes | should print $expected  ', ({ expected, classTypes }) => {
    for (const classType of classTypes) {
      const result = new PropertyPrinter(classType, 'Category', 'name', {
        type: 'string',
        required: true,
      }).print();
      expect(result).toBe(expected);
    }
  });
});
