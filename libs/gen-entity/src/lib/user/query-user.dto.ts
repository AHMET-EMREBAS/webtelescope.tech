import { Dto, Property } from '@webpackages/core';
import { IQueryUserDto } from '@webpackages/common';
@Dto()
export class QueryUserDto implements IQueryUserDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
  })
  username?: string;
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'password',
  })
  password?: string;
  @Property({ type: 'string' }) roleName?: string;
  @Property({ type: 'string' }) roleDescription?: string;
  @Property({ type: 'string' }) departmentName?: string;
}
