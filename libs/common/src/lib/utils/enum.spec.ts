import { EnumFactory } from './enum';
describe('EnumFactory', () => {
  it('should match enum keys', () => {
    enum Abc {
      A = 'a',
      B = 'b',
      C = 'c',
    }

    const AbcMatcher = EnumFactory.create(Abc);

    const result = AbcMatcher.matcher<number>(Abc.A)
      .is('A', () => 1)
      .is('B', () => 2)
      .done('DONE')
      .get();

    expect(result).toBe(1);
  });
});
