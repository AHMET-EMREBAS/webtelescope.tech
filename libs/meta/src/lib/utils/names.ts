export function uppercaseFirst(value: string) {
  const [first, ...rest] = value;
  return first.toUpperCase() + rest.join('');
}

export function toPropertyName(...args: string[]) {
  const [first, ...rest] = args
    .filter((e) => e)
    .map(uppercaseFirst)
    .join('');
  return first.toLowerCase() + rest.join('');
}
