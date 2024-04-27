import { ClassPrinter } from './class';
describe('ClassPrinter', () => {
  it.each`
    expected                                                                                       | name         | type
    ${'imports Doc D export class _MyClass_<T,A,B> extends Some implements Other { content }'}     | ${'MyClass'} | ${'class'}
    ${'imports Doc D export interface _MyClass_<T,A,B> extends Some implements Other { content }'} | ${'MyClass'} | ${'interface'}
    ${'imports Doc D export Anything _MyClass_<T,A,B> extends Some implements Other { content }'}  | ${'MyClass'} | ${'Anything'}
  `(
    'should print $expected from $name, $type, $content',
    ({ expected, name, type }) => {
      const result = new ClassPrinter({
        name,
        type,

        importings: {
          print() {
            return 'imports';
          },
        },
        content: {
          print() {
            return 'content';
          },
        },
        docs: {
          print() {
            return 'Doc';
          },
        },
        extending: {
          print() {
            return 'extends Some';
          },
        },

        generics: {
          print() {
            return '<T,A,B>';
          },
        },
        implementing: {
          print() {
            return 'implements Other';
          },
        },
        decorating: {
          print() {
            return 'D';
          },
        },
        namePrefix: '_',
        nameSuffix: '_',
      }).print();

      expect(result).toBe(expected);
    }
  );
});
