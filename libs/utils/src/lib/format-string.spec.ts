import { formatString } from './format-string';

describe('FormatString', () => {
  it('formatString', () => {
    const result = formatString({
      content:
        'Hi, how you doing? I am trying to write a function that justifys, aligns, limits the line count.',
      maxLineLength: 30,
      justify: 'center',
      by: 'line',
    });
    console.log(result);
  });
});
