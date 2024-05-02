import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryPermissionDto } from '@webpackages/gen-model';
@Dto()
export class QueryPermissionDto implements IQueryPermissionDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
}
