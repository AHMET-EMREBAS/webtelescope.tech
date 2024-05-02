import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserProfileDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserProfileDto implements IQueryUserProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
