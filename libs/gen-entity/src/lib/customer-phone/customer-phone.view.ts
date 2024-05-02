import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerPhoneView } from '@webpackages/gen-model';
@ViewEntity()
export class CustomerPhoneView implements ICustomerPhoneView {
  @ViewColumn() email!: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
