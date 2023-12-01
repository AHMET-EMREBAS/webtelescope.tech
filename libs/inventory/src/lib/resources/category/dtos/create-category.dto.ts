import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateCategoryDto {
  @Property({ type: 'string', required: true }) name!: string;
}
