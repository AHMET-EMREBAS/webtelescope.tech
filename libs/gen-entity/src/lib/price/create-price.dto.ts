import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreatePriceDto } from '@webpackages/gen-model';
@Dto()
export class CreatePriceDto implements ICreatePriceDto {
  /**
   * Price
   */ @Property({
    type: 'number',
    required: true,
    description: 'Price',
    minimum: 0,
  })
  price!: number;
  /**
   * Cost
   */ @Property({
    type: 'number',
    required: true,
    description: 'Cost',
    minimum: 0,
  })
  cost!: number;
  @Property({ type: 'object', objectType: IDDto, required: true })
  priceLevel!: IDDto;
  @Property({ type: 'object', objectType: IDDto, required: true })
  product!: IDDto;
}
