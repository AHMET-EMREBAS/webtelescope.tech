import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerEmailDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerEmailDto implements IQueryCustomerEmailDto {
  @Property({}) email?: string;
  @Property({ type: 'string' }) customerUsername?: string;
}
