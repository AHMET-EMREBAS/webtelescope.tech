import { DecoratorPrinter } from './decorator';

describe('DecoratorPrinter', () => {
  it.each`
    expected          | name       | options
    ${'@Hello(true)'} | ${'Hello'} | ${'true'}
    ${'@ Hello ( true )'} | ${' Hello '} | ${' true '}
  `(
    'should print $expected from $name, $options',
    ({ expected, name, options }) => {
      const result = new DecoratorPrinter({ name, options }).print();
      expect(result).toBe(expected);
    }
  );
});
