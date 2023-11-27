import { stringify } from './stringify';

describe('Value', () => {
  it.each`
    type         | value                                   | expected                                    | isArray
    ${'string'}  | ${''}                                   | ${`''`}                                     | ${false}
    ${'string'}  | ${'hello'}                              | ${`'hello'`}                                | ${false}
    ${'string'}  | ${'word with space'}                    | ${`'word with space'`}                      | ${false}
    ${'string'}  | ${['first', 'second']}                  | ${`[ 'first', 'second' ]`}                  | ${true}
    ${'number'}  | ${1}                                    | ${'1'}                                      | ${false}
    ${'number'}  | ${[]}                                   | ${`[  ]`}                                   | ${true}
    ${'boolean'} | ${true}                                 | ${'true'}                                   | ${false}
    ${'boolean'} | ${[true]}                               | ${`[ true ]`}                               | ${true}
    ${'date'}    | ${new Date('11/3/2023, 10:37:17 PM')}   | ${`new Date('11/3/2023, 10:37:17 PM')`}     | ${false}
    ${'date'}    | ${[new Date('11/3/2023, 10:37:17 PM')]} | ${`[ new Date('11/3/2023, 10:37:17 PM') ]`} | ${true}
    ${'object'}  | ${{ name: 'hello' }}                    | ${`{ name: 'hello' }`}                      | ${false}
  `('should code $value as $expected', ({ type, value, expected, isArray }) => {
    const result = stringify(value);

    expect(result).toBe(expected);
  });
});
