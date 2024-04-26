import { ClassType } from './__common';
import { PropertyPrinter } from './property';

describe('Relation Printer', () => {
  it.each`
    expected                                                             | classType
    ${"@Column({ type: 'string', required: true }) category!: string;"}  | ${ClassType.Entity}
    ${"@Property({ type: 'string', required:true }) category!: string;"} | ${ClassType.CreateDto}
  `('should print $expected from $classType ', ({ expected, classType }) => {
    const result = new PropertyPrinter(classType, 'Category', 'category', {
      type: 'string',
      required: true,
    }).print();

    expect(result).toBe(expected);
  });
});
