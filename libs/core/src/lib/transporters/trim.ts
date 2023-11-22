import { Transform } from 'class-transformer';

export function TrimTransformer() {
  return Transform(({ value }) => {
    return value && value.trim();
  });
}
