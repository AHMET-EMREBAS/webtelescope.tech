import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserDto implements IQueryUserDto {
  @Property({}) username?: string;
  @Property({ type: 'string' }) roleName?: string;
  @Property({ type: 'string' }) roleDescription?: string;
  @Property({ type: 'string' }) userDepartmentName?: string;
}
