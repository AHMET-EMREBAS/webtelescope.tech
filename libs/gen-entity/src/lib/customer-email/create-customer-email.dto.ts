import { Dto, Property } from '@webpackages/core';
import { ICreateCustomerEmailDto } from '@webpackages/common';
@Dto()
export class CreateCustomerEmailDto implements ICreateCustomerEmailDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    icon: 'email',
  })
  email?: string;
  @Property({ type: 'object', objectType: IDDto, required: true })
  ownwer!: IDDto;
}
