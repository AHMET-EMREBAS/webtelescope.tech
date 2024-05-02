import { Dto, Property, IDDto } from '@webpackages/core';
import { IQuerySkuDto } from '@webpackages/gen-model';
@Dto()
export class QuerySkuDto implements IQuerySkuDto {
  @Property({}) barcode?: string;
  @Property({}) sku?: string;
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) productBarcode?: string;
  @Property({ type: 'string' }) productName?: string;
  @Property({ type: 'string' }) productDescription?: string;
}
