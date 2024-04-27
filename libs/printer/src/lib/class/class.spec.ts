import { ClassPrinter } from './class';
describe('ClassPrinter', () => {
  it.each`
    expected                                                                           | name         | type           | content
    ${'imports Doc export class MyClass<T,A,B> extends Some implements Other { content }'}     | ${'MyClass'} | ${'class'}     | ${undefined}
    ${'imports Doc export interface MyClass<T,A,B> extends Some implements Other { content }'} | ${'MyClass'} | ${'interface'} | ${undefined}
    ${'imports Doc export Anything MyClass<T,A,B> extends Some implements Other { content }'}  | ${'MyClass'} | ${'Anything'}  | ${undefined}
  `(
    'should print $expected from $name, $type, $content',
    ({ expected, name, type, content }) => {
      const result = new ClassPrinter({
        name,
        type,
        content,
        importsPrinter:{ 
          print(){ 
            return 'imports'
          }

        },

        contentPrinter: {
          print() {
            return 'content';
          },
        },
        docsPrinter: {
          print() {
            return 'Doc';
          },
        },
        extendsPrinter: {
          print() {
            return 'extends Some';
          },
        },

        genericsPrinter: {
          print() {
            return '<T,A,B>';
          },
        },
        implementsPrinter: {
          print() {
            return 'implements Other';
          },
        },
      }).print();

      expect(result).toBe(expected);
    }
  );
});
