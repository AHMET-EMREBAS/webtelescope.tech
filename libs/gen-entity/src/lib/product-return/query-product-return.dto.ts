import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryProductReturnDto } from '@webpackages/gen-model';
@Dto()
export class QueryProductReturnDto implements IQueryProductReturnDto {
  @Property({}) description?: string;
  @Property({}) quantity?: number;
  @Property({ type: 'string' }) orderQuantity?: number;
  @Property({ type: 'string' }) orderDiscount?: number;
  @Property({ type: 'string' }) orderTotal?: number;
  @Property({ type: 'string' }) orderSubTotal?: number;
  @Property({ type: 'string' }) orderTax?: number;
  @Property({ type: 'string' }) orderDescription?: string;
  @Property({ type: 'string' }) userUsername?: string;
}
