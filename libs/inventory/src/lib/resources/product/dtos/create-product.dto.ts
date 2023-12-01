import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateProductDto {
  @Property({ type: 'string', required: true, minLength: 3, maxLength: 50 })
  name!: string;

  @Property({ type: 'string', maxLength: 400 })
  description!: string;
}
