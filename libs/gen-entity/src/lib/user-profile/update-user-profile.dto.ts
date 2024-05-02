import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateUserProfileDto } from '@webpackages/gen-model';
@Dto()
export class UpdateUserProfileDto implements IUpdateUserProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
  @Property({ type: 'object', objectType: IDDto }) user?: IDDto;
}
