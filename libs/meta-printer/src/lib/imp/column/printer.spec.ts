import { ClassType } from '../../common';
import { ColumnPrinter } from './printer';
describe('Column Printer', () => {
  it.each`
    expected                                                              | classType            | modelName | name      | options
    ${"@Property({ type: 'string' }) name?: string;"}                     | ${ClassType.CREATE}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Property({ type: 'string',\nrequired: false }) name?: string;"}    | ${ClassType.UPDATE}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Property({ type: 'string',\nrequired: false }) catName?: string;"} | ${ClassType.QUERY}   | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Column({ type: 'string' }) name?: string;"}                       | ${ClassType.ENTITY}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassType.IENTITY} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassType.ICREATE} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
  `(
    '$classType | should print $expected for $options',
    ({ expected, classType, modelName, name, options }) => {
      const result = new ColumnPrinter(
        classType,
        modelName,
        name,
        options
      ).print();

      expect(result).toBe(expected);
    }
  );
});
