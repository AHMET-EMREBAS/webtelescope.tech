import { EnumFactory } from './enum';
describe('EnumFactory', () => {
  it('should match enum keys', () => {
    enum AbcEnum {
      A = 'a',
      B = 'b',
      C = 'c',
    }
    const Abc = EnumFactory.create(AbcEnum);
    {
      const result = Abc.matcher<number>('a')
        .is('A', () => 100)
        .done();
      expect(result).toBe(100);
    }
    {
      const result = Abc.matcher<number>('a')
        .is('B', () => 100)
        .done();
      expect(result).toBe(undefined);
    }

    {
      const result = Abc.matcher<number>('a')
        .is('B', () => 200)
        .is('C', () => 300)
        .is('A', () => 100)
        .done();
      expect(result).toBe(100);
    }
  });
});
