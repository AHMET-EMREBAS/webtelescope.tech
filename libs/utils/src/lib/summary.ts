/* eslint-disable @typescript-eslint/no-explicit-any */
export function summary(text: string) {
  const pad = text.length > 10 ? '...' : '';
  return text?.toString().slice(0, 10) + pad;
}

export function summaryObject(obj: Record<string, any>) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}:${summary(value?.toString())}`)
    .join(', ');
}
