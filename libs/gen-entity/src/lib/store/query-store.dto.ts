import { Dto, Property } from '@webpackages/core';
import { IQueryStoreDto } from '@webpackages/common';
@Dto()
export class QueryStoreDto implements IQueryStoreDto {
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
