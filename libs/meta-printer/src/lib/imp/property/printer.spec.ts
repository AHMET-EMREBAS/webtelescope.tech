import { ClassType } from '../../common';
import { PropertyPrinter } from './printer';
describe('Column Printer', () => {
  it.each`
    expected                                                              | classType            | modelName | name      | options
    ${"@Property({ type: 'string', isArray: true }) name?: string[];"}    | ${ClassType.CREATE}  | ${'Cat'}  | ${'name'} | ${{ type: 'string', isArray: true }}
    ${"@Property({ type: 'string', required: false }) name?: string;"}    | ${ClassType.UPDATE}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Property({ type: 'string', required: false }) catName?: string;"} | ${ClassType.QUERY}   | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${"@Column({ type: 'string' }) name?: string;"}                       | ${ClassType.ENTITY}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'@ViewColumn() catName!: string;'}                                  | ${ClassType.VIEW}    | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassType.ICREATE} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassType.IUPDATE} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'catName?: string;'}                                                | ${ClassType.IQUERY}  | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'name?: string;'}                                                   | ${ClassType.IENTITY} | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
    ${'catName: string;'}                                                 | ${ClassType.IVIEW}   | ${'Cat'}  | ${'name'} | ${{ type: 'string' }}
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
