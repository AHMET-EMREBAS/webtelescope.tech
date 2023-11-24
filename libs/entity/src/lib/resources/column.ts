import { Column as __Column, ColumnOptions } from 'typeorm';

/**
 * TypeOrm Column Decorator
 * @param options {ColumnOptions}
 * @returns {PropertyDecorator}
 */
export function Column(options: ColumnOptions): PropertyDecorator {
  return __Column(options);
}
