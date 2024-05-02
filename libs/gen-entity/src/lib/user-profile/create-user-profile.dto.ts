import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateUserProfileDto } from '@webpackages/gen-model';
@Dto()
export class CreateUserProfileDto implements ICreateUserProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
  @Property({ type: 'object', objectType: IDDto, required: true }) user!: IDDto;
}
