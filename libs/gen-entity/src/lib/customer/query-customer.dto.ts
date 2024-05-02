import { Dto, Property } from '@webpackages/core';
import { IQueryCustomerDto } from '@webpackages/common';
@Dto()
export class QueryCustomerDto implements IQueryCustomerDto {
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
}
