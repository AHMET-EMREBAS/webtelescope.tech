import { Dto, Property } from '@webpackages/core';
import { IQueryProductReturnDto } from '@webpackages/common';
@Dto()
export class QueryProductReturnDto implements IQueryProductReturnDto {
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'number', minimum: 0 }) quantity?: number;
  @Property({ type: 'string' }) orderQuantity?: number;
  @Property({ type: 'string' }) orderDiscount?: number;
  @Property({ type: 'string' }) orderTotal?: number;
  @Property({ type: 'string' }) orderSubTotal?: number;
  @Property({ type: 'string' }) orderTax?: number;
  @Property({ type: 'string' }) orderDescription?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) userPassword?: string;
}
