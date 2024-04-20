import { IQuerySampleDto } from '@webpackages/common';
import { Dto, Property, QueryProperty } from '@webpackages/core';

@Dto()
export class QuerySampleDto implements IQuerySampleDto {
  @Property({ type: 'string' })
  @QueryProperty()
  name?: string;
}
