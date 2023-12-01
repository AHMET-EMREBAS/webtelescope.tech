import { IdDto, Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateStoreDto {
  @Property({ type: 'string', maxLength: 50, required: true })
  name!: string;

  @Property({ type: 'object', required: true, target: IdDto })
  priceLevel!: IdDto;
}
