import { DecoratorPrinter } from './decorator';
describe('DecoratorPrinter', () => {
  it.each`
    expected                                       | name      | options
    ${"@Some({ type: 'string', required: true })"} | ${'Some'} | ${{ type: 'string', required: true }}
  `(
    'should print $expected from $name, $options',
    ({ expected, name, options }) => {
      const result = new DecoratorPrinter({ name, options }).print();
      expect(result).toBe(expected);
    }
  );
});
