import { Model, RelationOptions, RelationType } from '@webpackages/meta';
import { ClassType } from '../../common';
import { RelationPrinter } from './printer';

const model: Model = {
  modelName: 'Cat',
  properties: {
    value: { type: 'string', searchable: true },
    some: { type: 'string', searchable: true },
  },
};

const options: RelationOptions = {
  type: RelationType.Many,
  model,
  required: true,
};
describe('Column Printer', () => {
  it.each`
    expected                                                                      | classType           | modelName | name       | options
    ${"@Property({ type: 'ID', required: true, isArray: true }) value!: IDDto[];"} | ${ClassType.CREATE} | ${'Cat'}  | ${'value'} | ${options}
  `(
    '$classType | should print $expected for $options',
    ({ expected, classType, modelName, name, options }) => {
      const result = new RelationPrinter(
        classType,
        modelName,
        name,
        options
      ).print();

      expect(result).toBe(expected);
    }
  );
});
