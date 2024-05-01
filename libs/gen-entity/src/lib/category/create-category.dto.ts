import { Dto, Property } from '@webpackages/core';
import { ICreateCategoryDto } from '@webpackages/gen-model';
@Dto()
export class CreateCategoryDto implements ICreateCategoryDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  })
  name!: string;
}
