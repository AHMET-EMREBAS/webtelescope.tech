import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserEmailDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserEmailDto implements IQueryUserEmailDto {
  @Property({}) email?: string;
  @Property({ type: 'string' }) userUsername?: string;
}
