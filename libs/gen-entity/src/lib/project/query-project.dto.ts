import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryProjectDto } from '@webpackages/gen-model';
@Dto()
export class QueryProjectDto implements IQueryProjectDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
  @Property({}) description?: string;
}
