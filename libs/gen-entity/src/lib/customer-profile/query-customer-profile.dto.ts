import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerProfileDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerProfileDto implements IQueryCustomerProfileDto {
  @Property({}) firstName?: string;
  @Property({}) lastName?: string;
  @Property({ type: 'string' }) customerUsername?: string;
}
