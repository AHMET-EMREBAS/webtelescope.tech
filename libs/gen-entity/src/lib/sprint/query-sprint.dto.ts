import { Dto, Property, IDDto } from '@webpackages/core';
import { IQuerySprintDto } from '@webpackages/gen-model';
@Dto()
export class QuerySprintDto implements IQuerySprintDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
}
