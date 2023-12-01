import { IdDto, Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateOrderDto {
  @Property({ type: 'object', isArray: true, required: true, target: IdDto })
  items!: IdDto[];

  @Property({ type: 'object', required: true, target: IdDto })
  priceLevel!: IdDto;

  @Property({ type: 'object', required: true, target: IdDto })
  customer!: IdDto;
}
