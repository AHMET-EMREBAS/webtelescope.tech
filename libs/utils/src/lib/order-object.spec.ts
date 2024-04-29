import { orderObject } from './order-object';
describe('OrderObject', () => {
  it('should order object', () => {
    const obj = { k: 400, z: 1, b: 100, h: 10, a: 50 };

    const expected = JSON.stringify({ a: 50, z: 1, b: 100, h: 10, k: 400 });
    const result = orderObject(obj, ['a', 'z', 'b', 'h']);

    expect(JSON.stringify(result)).toBe(expected);
  });
});
