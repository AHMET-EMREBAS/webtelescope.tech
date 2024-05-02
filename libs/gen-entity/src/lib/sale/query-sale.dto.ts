import { Dto, Property, IDDto } from '@webpackages/core';
import { IQuerySaleDto } from '@webpackages/gen-model';
@Dto()
export class QuerySaleDto implements IQuerySaleDto {
  @Property({}) total?: number;
  @Property({}) subtotal?: number;
  @Property({}) tax?: number;
  @Property({}) discount?: number;
  @Property({ type: 'string' }) cartDescription?: string;
  @Property({ type: 'string' }) cartChecked?: boolean;
  @Property({ type: 'string' }) customerUsername?: string;
}
