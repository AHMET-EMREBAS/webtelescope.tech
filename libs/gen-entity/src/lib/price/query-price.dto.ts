import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryPriceDto } from '@webpackages/gen-model';
@Dto()
export class QueryPriceDto implements IQueryPriceDto {
  /**
   * Price
   */
  @Property({ type: 'number', description: 'Price', minimum: 0 })
  price?: number;
  /**
   * Cost
   */
  @Property({ type: 'number', description: 'Cost', minimum: 0 }) cost?: number;
  @Property({ type: 'string' }) priceLevelName?: string;
  @Property({ type: 'string' }) productBarcode?: string;
  @Property({ type: 'string' }) productName?: string;
  @Property({ type: 'string' }) productDescription?: string;
}
