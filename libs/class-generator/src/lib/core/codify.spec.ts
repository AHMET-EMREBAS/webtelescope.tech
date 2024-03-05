import { codify } from './codify';

describe('Codify', () => {
  it('should codify the object', () => {
    class A {}
    expect(codify({ name: 'some', cls: A })).toBe(`{name:'some',cls:A}`);
  });
});
