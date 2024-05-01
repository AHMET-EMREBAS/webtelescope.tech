import { Dto, Property } from '@webpackages/core';
import { IUpdateCategoryDto } from '@webpackages/gen-model';
@Dto()
export class UpdateCategoryDto implements IUpdateCategoryDto {
  @Property({ type: 'string', unique: true, minLength: 3, maxLength: 30 })
  name?: string;
}
