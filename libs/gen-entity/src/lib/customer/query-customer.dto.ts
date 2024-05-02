import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerDto implements IQueryCustomerDto {
  @Property({}) username?: string;
}
