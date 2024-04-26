import { ImportPrinter } from './import';
describe('ImportPrinter', () => {
  it.each`
    expected                          | source    | items
    ${"import { Cat } from 'cats';"} | ${'cats'} | ${['Cat']}
  `(
    'should print $expected for $source and $items',
    ({ expected, source, items }) => {
      const result = new ImportPrinter({ source, items }).print();

      expect(result).toBe(expected);
    }
  );
});
