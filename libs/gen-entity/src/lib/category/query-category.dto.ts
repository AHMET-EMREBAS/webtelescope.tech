import { Dto, Property } from '@webpackages/core';
import { IQueryCategoryDto } from '@webpackages/common';
@Dto()
export class QueryCategoryDto implements IQueryCategoryDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
