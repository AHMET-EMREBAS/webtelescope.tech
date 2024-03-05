import { Printer } from './printer';

export function runPrinters(
  printers?: Printer[],
  delimeter = ' ',
  endText = ' '
) {
  const text = printers?.map((e) => e.print()).join(delimeter);
  return text ? text + endText : '';
}
