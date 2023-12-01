import { IdDto, Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateSkuDto {
  @Property({ type: 'string', required: true }) sku!: string;
  @Property({ type: 'string', required: true }) barcode!: string;
  @Property({ type: 'object', required: true, target: IdDto }) product!: IdDto;
}
