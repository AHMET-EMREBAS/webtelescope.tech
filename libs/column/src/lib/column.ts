import { Column as Col } from 'typeorm';

export function Column(): PropertyDecorator {
  return Col({ type: 'varchar' });
}
