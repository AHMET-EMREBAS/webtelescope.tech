export function clearSpace(text: string, space = ' ') {
  return text
    .trim()
    .replace(/\n/g, space)
    .replace(/\t/g, space)
    .replace(/ {2,}/g, space);
}
