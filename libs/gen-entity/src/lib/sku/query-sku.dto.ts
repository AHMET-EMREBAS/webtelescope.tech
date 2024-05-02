import { Dto, Property, IDDto } from '@webpackages/core';
import { IQuerySkuDto } from '@webpackages/gen-model';
@Dto()
export class QuerySkuDto implements IQuerySkuDto {
  @Property({
    type: 'string',
    minLength: 10,
    maxLength: 13,
    inputType: 'text',
    icon: 'barcode',
  })
  barcode?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  sku?: string;
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'string' }) productBarcode?: string;
  @Property({ type: 'string' }) productName?: string;
  @Property({ type: 'string' }) productDescription?: string;
}
