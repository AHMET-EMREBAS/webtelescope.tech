import { Exclude } from 'class-transformer';
import { Property, ID } from '@webpackages/core';
import { Category } from '../category';
@Exclude()
export class CreateSampleDto {
  @Property({
    name: 'name',
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  })
  name!: string;
  @Property({ type: 'object', target: ID, isArray: false })
  category?: ID;
}
