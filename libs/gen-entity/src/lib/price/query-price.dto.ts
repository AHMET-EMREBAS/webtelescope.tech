import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryPriceDto } from '@webpackages/gen-model';
@Dto()
export class QueryPriceDto implements IQueryPriceDto {
  /**
   * Price
   */
  @Property({ description: 'Price' }) price?: number;
  /**
   * Cost
   */
  @Property({ description: 'Cost' }) cost?: number;
  @Property({ type: 'string' }) priceLevelName?: string;
  @Property({ type: 'string' }) productBarcode?: string;
  @Property({ type: 'string' }) productName?: string;
  @Property({ type: 'string' }) productDescription?: string;
}
