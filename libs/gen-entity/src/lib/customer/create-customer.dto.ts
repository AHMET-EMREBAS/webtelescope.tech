import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateCustomerDto } from '@webpackages/gen-model';
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
