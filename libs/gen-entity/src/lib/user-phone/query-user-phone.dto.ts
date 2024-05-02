import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserPhoneDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserPhoneDto implements IQueryUserPhoneDto {
  @Property({}) phone?: string;
  @Property({ type: 'string' }) userUsername?: string;
}
