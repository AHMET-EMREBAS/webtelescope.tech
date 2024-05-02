import { Dto, Property } from '@webpackages/core';
import { ICreateCategoryDto } from '@webpackages/common';
@Dto()
export class CreateCategoryDto implements ICreateCategoryDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name!: string;
}
