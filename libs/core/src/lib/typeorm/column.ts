import { Column as Col, ColumnType, ViewColumn as _ViewColumn } from 'typeorm';

export type ColumnOptions = {
  type: 'string' | 'number' | 'date' | 'boolean';
  unique?: boolean;
  required?: boolean;
  description?: string;
};

export function Column({ type, unique, description }: ColumnOptions) {
  const columnType: ColumnType =
    type === 'boolean' ? 'boolean' : type == 'number' ? 'numeric' : 'varchar';
  return Col({
    type: columnType,
    nullable: true,
    unique,
    comment: description ?? 'Please add some comments here!',
  });
}

export function ViewColumn() {
  return _ViewColumn();
}
