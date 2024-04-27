import { clearSpace } from './clear-space';



export function toLines(content: string, maxLineLength: number): string[] {
  content = clearSpace(content);
  const result: string[] = [];

  const words = content.split(' ');

  let acc = '';
  for (const word of words) {
    if (word.length + acc.length >= maxLineLength - 1) {
      result.push(acc);
      acc = word;
      continue;
    }
    acc += ' ' + word;
  }

  result.push(acc);
  return result.filter((e) => e);
}
