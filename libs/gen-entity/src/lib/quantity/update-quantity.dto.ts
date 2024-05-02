import { Dto, Property } from '@webpackages/core';
import { IUpdateQuantityDto } from '@webpackages/common';
@Dto()
export class UpdateQuantityDto implements IUpdateQuantityDto {
  /**
   * Quantity of the Product-Sku in the store.
   */ @Property({
    type: 'number',
    description: 'Quantity of the Product-Sku in the store.',
    minimum: 0,
  })
  quanitty?: number;
  @Property({ type: 'object', objectType: IDDto }) sku?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) store?: IDDto;
}
