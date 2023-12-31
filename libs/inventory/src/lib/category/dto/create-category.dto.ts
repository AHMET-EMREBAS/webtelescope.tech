import { Exclude } from 'class-transformer';
import { Property, ID } from '@webpackages/core';
@Exclude()
export class CreateCategoryDto {
  @Property({
    name: 'name',
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  })
  name!: string;
}
