import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryStoreDto } from '@webpackages/gen-model';
@Dto()
export class QueryStoreDto implements IQueryStoreDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
}
