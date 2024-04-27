import { toLines } from './to-lines';
describe('to short lines', () => {
  it('should conver long text to short lines', () => {
    const content =
      'I got a very long text here. I want to limit the line length to 20 characters. Would you mind solving this problem for me?';
    const maxLineLength = 20;
    const result = toLines(content, maxLineLength);

    console.log(result);
    for (const line of result) {
      if (line.includes(' ')) {
        expect(line.length).toBeLessThanOrEqual(maxLineLength);
      }
    }
  });
});
