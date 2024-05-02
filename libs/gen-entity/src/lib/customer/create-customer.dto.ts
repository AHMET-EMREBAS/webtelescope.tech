import { Dto, Property } from '@webpackages/core';
import { ICreateCustomerDto } from '@webpackages/common';
@Dto()
export class CreateCustomerDto implements ICreateCustomerDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
  })
  username!: string;
  @Property({
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'password',
  })
  password!: string;
}
