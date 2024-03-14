import { Time } from './time';

describe('time', () => {
  it('should work', () => {
    expect(Time.day(1)).toBe(1000 * 60 * 60 * 24);
  });
});
