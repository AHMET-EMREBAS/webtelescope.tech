import { ClassPrinter } from './class';
describe('ClassPrinter', () => {
  it.each`
    expected                          | name         | type           | content
    ${'export class MyClass { }'}    | ${'MyClass'} | ${'class'}     | ${undefined}
    ${'export interface MyClass { }'} | ${'MyClass'} | ${'interface'} | ${undefined}
    ${'export Anything MyClass { }'}  | ${'MyClass'} | ${'Anything'}  | ${undefined}
  `(
    'should print $expected from $name, $type, $content',
    ({ expected, name, type, content }) => {
      const result = new ClassPrinter({
        name,
        type,
        content,
      }).print();

      expect(result).toBe(expected);
    }
  );
});
