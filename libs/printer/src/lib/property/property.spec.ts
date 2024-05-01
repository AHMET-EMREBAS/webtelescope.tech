import { ClassType } from '../common';
import {
  ClassPropertyPrinter as CPR,
  InterfacePropertyPrinter as IPP,
} from './property';
describe('PropertyPrinter', () => {
  it.each`
    printer | expected              | propertyName | type        | required | isArray
    ${CPR}  | ${'some!: string[];'} | ${'some'}    | ${'string'} | ${true}  | ${true}
    ${CPR}  | ${'some!: string;'}   | ${'some'}    | ${'string'} | ${true}  | ${false}
    ${CPR}  | ${'other?: number;'}  | ${'other'}   | ${'number'} | ${false} | ${false}
    ${CPR}  | ${'other?: xyz;'}     | ${'other'}   | ${'xyz'}    | ${false} | ${false}
    ${IPP}  | ${'some: string;'}    | ${'some'}    | ${'string'} | ${true}  | ${false}
    ${IPP}  | ${'other?: number;'}  | ${'other'}   | ${'number'} | ${false} | ${false}
    ${IPP}  | ${'other?: xyz;'}     | ${'other'}   | ${'xyz'}    | ${false} | ${false}
  `(
    '$printer.name should print $expected from $propertyName, $type, $required',
    ({ printer, expected, propertyName, type, required, isArray }) => {
      const result = new printer({
        propertyName,
        type,
        required,
        isArray,
      }).print();

      expect(result).toBe(expected);
    }
  );

  it.each`
    expected                 | namePrefix | nameSuffix | typePrefix | typeSuffix
    ${'__name$!: string;'}   | ${'__'}    | ${'$'}     | ${''}      | ${''}
    ${'__name$!: TstringT;'} | ${'__'}    | ${'$'}     | ${'T'}     | ${'T'}
  `(
    'should print $expected from { namePrefix:$namePrefix, nameSuffix:$nameSuffix, typePrefix:$typePrefix, typeSuffix:$typeSuffix, } options',
    ({ expected, namePrefix, nameSuffix, typePrefix, typeSuffix }) => {
      const result = new CPR({
        propertyName: 'name',
        classType: ClassType.CLASS,
        type: 'string',
        required: true,
        namePrefix,
        nameSuffix,
        typePrefix,
        typeSuffix,
      }).print();

      expect(result).toBe(expected);
    }
  );
});
