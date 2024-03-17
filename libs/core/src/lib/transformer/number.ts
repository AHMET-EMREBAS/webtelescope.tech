import { Transform } from 'class-transformer';

export function NumberTransformer() {
  return Transform(({ value }) => {
    return value ? parseFloat(value) : null;
  });
}

export function IntegerTransformer() {
  return Transform(({ value }) => {
    return value ? parseInt(value) : null;
  });
}
