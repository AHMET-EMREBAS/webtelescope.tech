import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateCustomerDto } from '@webpackages/gen-model';
@Dto()
export class UpdateCustomerDto implements IUpdateCustomerDto {
  @Property({
    type: 'string',
    unique: true,
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
