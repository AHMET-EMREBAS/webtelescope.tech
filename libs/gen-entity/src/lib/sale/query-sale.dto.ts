import { Dto, Property } from '@webpackages/core';
import { IQuerySaleDto } from '@webpackages/common';
@Dto()
export class QuerySaleDto implements IQuerySaleDto {
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  total?: number;
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  subtotal?: number;
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  tax?: number;
  @Property({ type: 'number', minimum: 0 }) discount?: number;
  @Property({ type: 'string' }) cartDescription?: string;
  @Property({ type: 'string' }) cartChecked?: boolean;
  @Property({ type: 'string' }) customerUsername?: string;
  @Property({ type: 'string' }) customerPassword?: string;
}
