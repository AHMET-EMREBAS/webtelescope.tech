import { parseBoolean } from './parse-boolean';
describe('parseBoolean', () => {
  it('should parse string to boolean', () => {
    expect(parseBoolean('true')).toBe(true);
    expect(parseBoolean('false')).toBe(false);
    expect(parseBoolean('true ')).toBe(undefined);
    expect(parseBoolean(' false ')).toBe(undefined);
  });
});
