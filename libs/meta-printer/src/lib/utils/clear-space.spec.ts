import { clearSpace } from './clear-space';
describe('Clear Space', () => {
  it('should clear space', () => {
    const expected = 'text go';
    const result = clearSpace('        text                       go         ');
    expect(result).toBe(expected);
  });
});
