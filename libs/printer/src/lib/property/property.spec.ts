import {
  ClassPropertyPrinter as CPR,
  InterfacePropertyPrinter as IPP,
} from './property';
describe('PropertyPrinter', () => {
  it.each`
    printer | expected            | name       | type        | required
    ${CPR}  | ${'some!:string;'}  | ${'some'}  | ${'string'} | ${true}
    ${CPR}  | ${'other?:number;'} | ${'other'} | ${'number'} | ${false}
    ${CPR}  | ${'other?:xyz;'}    | ${'other'} | ${'xyz'}    | ${false}
    ${IPP}  | ${'some:string;'}   | ${'some'}  | ${'string'} | ${true}
    ${IPP}  | ${'other?:number;'} | ${'other'} | ${'number'} | ${false}
    ${IPP}  | ${'other?:xyz;'}    | ${'other'} | ${'xyz'}    | ${false}
  `(
    '$printer.name should print $expected from $name, $type, $required',
    ({ printer, expected, name, type, required }) => {
      const result = new printer({ name, type, required }).print();

      expect(result).toBe(expected);
    }
  );
});
