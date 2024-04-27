export type StringJustify =
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'right'
  | 'left'
  | 'center';

export type ReturnAs = 'words' | 'line';

type JustifyFn = (list: string[]) => string[];
export type FormatStringOptions = {
  content: string;
  justify: StringJustify;
  by?: ReturnAs;
  maxLineLength?: number;
};

export function formatString(options: FormatStringOptions): string[][] {
  let { content, justify, by, maxLineLength } = options;
  justify = justify ?? 'left';
  by = by ?? 'line';
  maxLineLength = maxLineLength ?? 70;
  content = content
    .replace(/\t/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/ {1,}/g, ' ')
    .trim();

  const words = content.split(' ');

  const result: string[][] = [];

  let cline: string[] = [];

  const getLineLength = (list: string[]) => list.join(' ').length;

  for (const w of words) {
    cline.push(w);

    if (getLineLength(cline) >= maxLineLength) {
      result.push(cline);
      cline = [];
    }
  }

  if (cline.length > 0) {
    result.push(cline);
  }

  function justifyCenter(value: string[], maxLength: number) {
    const len = value.join(' ').length;

    const dif = maxLength - len + 4;

    for (let i = 0; i < dif; i++) {
      if (i % 2 == 0) {
        value.push(' ');
      } else {
        value.unshift(' ');
      }
    }

    return value;
  }

  let maxLength: number = 0;

  result.forEach((e) => {
    const nlength = e.join(' ').length;
    maxLength = maxLength < nlength ? nlength : maxLength;
  });
  if (by == 'line') {
    return [...result]
      .map((e) => justifyCenter(e, maxLength))
      .map((e) => [e.join(' ')]);
  } else if (by === 'words') {
    return [...result].map((e) => justifyCenter(e, maxLength));
  }

  return result;
}
