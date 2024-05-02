import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryPriceLevelDto } from '@webpackages/gen-model';
@Dto()
export class QueryPriceLevelDto implements IQueryPriceLevelDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
}
