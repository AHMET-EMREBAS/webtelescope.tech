import { Dto, Property } from '@webpackages/core';
import { IUpdatePriceDto } from '@webpackages/common';
@Dto()
export class UpdatePriceDto implements IUpdatePriceDto {
  /**
   * Price
   */ @Property({ type: 'number', description: 'Price', minimum: 0 })
  price?: number;
  /**
   * Cost
   */ @Property({ type: 'number', description: 'Cost', minimum: 0 })
  cost?: number;
  @Property({ type: 'object', objectType: IDDto }) priceLevel?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) product?: IDDto;
}
