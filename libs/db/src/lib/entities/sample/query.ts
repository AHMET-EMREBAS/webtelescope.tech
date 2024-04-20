import { IQuerySampleDto } from '@webpackages/common';
import { Dto, Property, SearchTransformer } from '@webpackages/core';

@Dto()
export class QuerySampleDto implements IQuerySampleDto {
  @Property({ type: 'string' })
  @SearchTransformer()
  name?: string;
}
