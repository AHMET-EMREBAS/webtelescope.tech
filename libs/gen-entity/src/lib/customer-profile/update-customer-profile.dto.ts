import { Dto, Property } from '@webpackages/core';
import { IUpdateCustomerProfileDto } from '@webpackages/common';
@Dto()
export class UpdateCustomerProfileDto implements IUpdateCustomerProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
