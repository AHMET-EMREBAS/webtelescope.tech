import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserAddressDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserAddressDto implements IQueryUserAddressDto {
  @Property({}) state?: string;
  @Property({}) city?: string;
  @Property({}) street?: string;
  @Property({}) zip?: string;
  @Property({ type: 'string' }) userUsername?: string;
}
