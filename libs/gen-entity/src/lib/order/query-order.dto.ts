import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryOrderDto } from '@webpackages/gen-model';
@Dto()
export class QueryOrderDto implements IQueryOrderDto {
  @Property({}) quantity?: number;
  @Property({}) discount?: number;
  @Property({}) total?: number;
  @Property({}) subTotal?: number;
  @Property({}) tax?: number;
  /**
   * Order description or notes
   */
  @Property({ description: 'Order description or notes' }) description?: string;
  @Property({ type: 'string' }) skuBarcode?: string;
  @Property({ type: 'string' }) skuSku?: string;
  @Property({ type: 'string' }) skuName?: string;
  @Property({ type: 'string' }) skuDescription?: string;
  @Property({ type: 'string' }) cartDescription?: string;
  @Property({ type: 'string' }) cartChecked?: boolean;
}
