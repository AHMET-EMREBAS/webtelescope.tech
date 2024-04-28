import { DecoratorPrinter } from './decorator';
import { stringify } from '@webpackages/utils';
describe('DecoratorPrinter', () => {
  it.each`
    expected                                       | name      | options
    ${"@Some({ type: 'string', required: true })"} | ${'Some'} | ${stringify({ type: 'string', required: true })}
  `(
    'should print $expected from $name, $options',
    ({ expected, name, options }) => {
      const result = new DecoratorPrinter({ name, options }).print();
      expect(result).toBe(expected);
    }
  );
});
