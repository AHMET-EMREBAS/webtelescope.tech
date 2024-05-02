import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerProfileView } from '@webpackages/gen-model';
@ViewEntity()
export class CustomerProfileView implements ICustomerProfileView {
  @ViewColumn() firstName!: string;
  @ViewColumn() lastName!: string;
}
