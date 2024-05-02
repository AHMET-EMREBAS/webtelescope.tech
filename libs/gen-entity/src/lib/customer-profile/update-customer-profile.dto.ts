import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateCustomerProfileDto } from '@webpackages/gen-model';
@Dto()
export class UpdateCustomerProfileDto implements IUpdateCustomerProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
