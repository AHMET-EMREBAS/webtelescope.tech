import { ClassType } from '../../common';
import { ColumnPrinter } from './printer';
describe('Column Printer', () => {
  it.each`
    expected                                        | classType           | modelName  | name      | options
    ${"@Property({ type: 'string' }) name?: string;"} | ${ClassType.CREATE} | ${'Model'} | ${'name'} | ${{ type: 'string' }}
  `(
    'should print $expected from $classType, $modelName, $name, $options',
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
