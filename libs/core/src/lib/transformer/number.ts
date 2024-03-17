import { Transform } from 'class-transformer';

export function NumberTransformer(defaultValue?: number) {
  return Transform(({ value }) => {
    return value ? parseFloat(value) : defaultValue;
  });
}

export function IntegerTransformer(defaultValue?: number) {
  return Transform(({ value }) => {
    return value ? parseInt(value) : defaultValue;
  });
}
