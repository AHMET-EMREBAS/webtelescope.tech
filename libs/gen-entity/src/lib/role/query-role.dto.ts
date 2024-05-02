import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryRoleDto } from '@webpackages/gen-model';
@Dto()
export class QueryRoleDto implements IQueryRoleDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) permissionName?: string;
}
