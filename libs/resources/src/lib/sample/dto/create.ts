import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateSampleDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30, required: true })
  name!: string;
}
