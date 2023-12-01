import { IdDto, Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateQuantityDto {
  @Property({ type: 'integer', required: true, minimum: 0 }) quantity!: string;
  @Property({ type: 'object', required: true, target: IdDto }) sku!: IdDto;
  @Property({ type: 'object', required: true, target: IdDto }) store!: IdDto;
}
