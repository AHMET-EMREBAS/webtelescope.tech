import { Dto, Property } from '@webpackages/core';
import { IUpdateUserProfileDto } from '@webpackages/common';
@Dto()
export class UpdateUserProfileDto implements IUpdateUserProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
