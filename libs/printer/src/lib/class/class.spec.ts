import { ClassPrinter } from './class';
describe('ClassPrinter', () => {
  it.each`
    expected                                         | name         | type           | content
    ${'export class MyClass { // Empty class }'}     | ${'MyClass'} | ${'class'}     | ${'// Empty class'}
    ${'export interface MyClass { // Empty class }'} | ${'MyClass'} | ${'interface'} | ${'// Empty class'}
    ${'export Anything MyClass { }'}  | ${'MyClass'} | ${'Anything'}  | ${''}
  `(
    'should print $expected from $name, $type, $content',
    ({ expected, name, type, content }) => {
      const result = new ClassPrinter({
        name,
        type,
        content,
        exports: true,
      }).print();

      expect(result).toBe(expected);
    }
  );
});
