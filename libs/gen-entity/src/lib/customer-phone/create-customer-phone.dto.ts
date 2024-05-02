import { Dto, Property } from '@webpackages/core';
import { ICreateCustomerPhoneDto } from '@webpackages/common';
@Dto()
export class CreateCustomerPhoneDto implements ICreateCustomerPhoneDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    autocomplete: 'email',
  })
  email?: string;
  @Property({ type: 'object', objectType: IDDto, required: true })
  ownwer!: IDDto;
}
