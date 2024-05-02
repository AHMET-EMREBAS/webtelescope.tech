import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryQuantityDto } from '@webpackages/gen-model';
@Dto()
export class QueryQuantityDto implements IQueryQuantityDto {
  /**
   * Quantity of the Product-Sku in the store.
   */ @Property({
    type: 'number',
    description: 'Quantity of the Product-Sku in the store.',
    minimum: 0,
  })
  quanitty?: number;
  @Property({ type: 'string' }) skuBarcode?: string;
  @Property({ type: 'string' }) skuSku?: string;
  @Property({ type: 'string' }) skuName?: string;
  @Property({ type: 'string' }) skuDescription?: string;
  @Property({ type: 'string' }) storeName?: string;
}
