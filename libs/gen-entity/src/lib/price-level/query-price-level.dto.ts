import { Dto, Property } from '@webpackages/core';
import { IQueryPriceLevelDto } from '@webpackages/common';
@Dto()
export class QueryPriceLevelDto implements IQueryPriceLevelDto {
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
