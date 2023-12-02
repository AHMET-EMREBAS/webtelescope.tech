import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateCategoryDto {
  @Property({ type: 'string', required: true, minLength: 3, maxLength: 50 })
  name!: string;
}
