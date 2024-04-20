import { Column as Col, ColumnType } from 'typeorm';

export type ColumnOptions = {
  type: 'string' | 'number' | 'date' | 'boolean';
  unique?: boolean;
};

export function Column({ type, unique }: ColumnOptions) {
  const columnType: ColumnType =
    type === 'boolean' ? 'boolean' : type == 'number' ? 'numeric' : 'varchar';
  return Col({ type: columnType, nullable: true, unique });
}
