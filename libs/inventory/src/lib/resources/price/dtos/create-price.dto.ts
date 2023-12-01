import { IdDto, Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreatePriceDto {
  @Property({ type: 'number', required: true }) price!: number;
  @Property({ type: 'number', required: true }) cost!: number;

  @Property({ type: 'object', required: true, target: IdDto })
  sku!: IdDto;

  @Property({ type: 'object', required: true, target: IdDto })
  priceLevel!: IdDto;
}
