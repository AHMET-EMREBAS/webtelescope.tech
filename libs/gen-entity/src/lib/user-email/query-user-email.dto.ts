import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserEmailDto } from '@webpackages/gen-model';
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
