import { Dto, Property } from '@webpackages/core';
import { ICreateUserProfileDto } from '@webpackages/common';
@Dto()
export class CreateUserProfileDto implements ICreateUserProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
