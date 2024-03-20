/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseFormValue(value: Record<string, unknown>) {
  return Object.entries(value)
    .map(([key, value]) => {
      try {
        return { [key]: JSON.parse(value as any) };
      } catch (err) {}

      return { [key]: value };
    })
    .reduce((p, c) => {
      return { ...p, ...c };
    });
}
