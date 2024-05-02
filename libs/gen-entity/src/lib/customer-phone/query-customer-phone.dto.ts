import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerPhoneDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerPhoneDto implements IQueryCustomerPhoneDto {
  @Property({}) phone?: string;
  @Property({ type: 'string' }) customerUsername?: string;
}
