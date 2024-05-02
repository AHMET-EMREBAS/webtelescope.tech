import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserProfileDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserProfileDto implements IQueryUserProfileDto {
  @Property({}) firstName?: string;
  @Property({}) lastName?: string;
  @Property({ type: 'string' }) userUsername?: string;
}
