import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateCustomerProfileDto } from '@webpackages/gen-model';
@Dto()
export class CreateCustomerProfileDto implements ICreateCustomerProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
