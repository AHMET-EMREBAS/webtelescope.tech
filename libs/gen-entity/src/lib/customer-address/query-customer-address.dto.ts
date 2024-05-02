import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerAddressDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerAddressDto implements IQueryCustomerAddressDto {
  @Property({}) state?: string;
  @Property({}) city?: string;
  @Property({}) street?: string;
  @Property({}) zip?: string;
  @Property({ type: 'string' }) customerUsername?: string;
}
