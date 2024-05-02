import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserPhoneDto } from '@webpackages/gen-model';
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
}
