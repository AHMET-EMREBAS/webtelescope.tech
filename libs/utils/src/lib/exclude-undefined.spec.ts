import { excludeUndefined } from './exclude-undefined';
describe('Exclude undefined', () => {
  it('should exclude undefined', () => {
    const r = excludeUndefined({ a: undefined, b: 100 });

    const keys = Object.keys(r);
    expect(keys.length).toBe(1);
    expect(keys[0]).toBe('b');
  });

  it('should work', () => {
    const obj = { a: 1, b: 2 };

    for (const key in obj) {
      console.log(key);
    }
  });
});
