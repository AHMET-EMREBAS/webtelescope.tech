import { Dto, Property } from '@webpackages/core';
import { IQueryUserPhoneDto } from '@webpackages/common';
@Dto()
export class QueryUserPhoneDto implements IQueryUserPhoneDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    autocomplete: 'email',
  })
  email?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) userPassword?: string;
}
