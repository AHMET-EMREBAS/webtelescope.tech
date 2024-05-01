import { Dto, Property } from '@webpackages/core';
import { ICreateProductDto } from '@webpackages/gen-model';
@Dto()
export class CreateProductDto implements ICreateProductDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  })
  name!: string;
  @Property({ type: 'string', maxLength: 600 }) description?: string;
}
