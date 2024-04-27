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

  describe('Doc', () => {
    it('should printn doc', () => {
      const content = `
      /**
       * @description Importing packages, classes, interfaces
       * @returns string
       */
      protected __importings(): string {
        return this.__options.importings?.print() ?? '';
      }

      /**
       * @description Class decorators
       * @returns string
       */
      protected __decorators(): string {
        return this.__options.decorating?.print() ?? '';
      } 
      `;

      const lines = content.split('\n');

      const descriptions = [];
      for (const line of lines) {
        const matches = line.matchAll(/((@description)|(@return)).{0,}/g);

        for (const m of matches) {
          descriptions.push(m[0]);
        }
      }

      console.log(descriptions);
    });
  });
});
