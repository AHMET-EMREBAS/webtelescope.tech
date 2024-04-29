import { ClassName } from '../../common';
import { PropertyPrinter } from './printer';
describe('Column Printer', () => {
  it.each`
    expected                                                              | classType            | modelName | name      | options
    ${"@Property({ type: 'string', isArray: true }) name?: string[];"}    | ${ClassName.Create}  | ${'Cat'}  | ${'name'} | ${{ type: 'string', isArray: true }}
    ${"@Property({ type: 'string', required: false }) name?: string;"}    | ${ClassName.Update}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Property({ type: 'string', required: false }) catName?: string;"} | ${ClassName.Query}   | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Column({ type: 'string' }) name?: string;"}                       | ${ClassName.Entity}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'@ViewColumn() catName!: string;'}                                  | ${ClassName.View}    | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassName.ICreate} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassName.IUpdate} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'catName?: string;'}                                                | ${ClassName.IQuery}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassName.IEntity} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'catName: string;'}                                                 | ${ClassName.IView}   | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
  `(
    '$classType | should print $expected for $options',
    ({ expected, classType, modelName, name, options }) => {
      const result = new PropertyPrinter(
        classType,
        modelName,
        name,
        options
      ).print();

      expect(result).toBe(expected);
    }
  );
});
