import { Dto, Property } from '@webpackages/core';
import { IQueryUserEmailDto } from '@webpackages/common';
@Dto()
export class QueryUserEmailDto implements IQueryUserEmailDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    icon: 'email',
  })
  email?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) userPassword?: string;
}
