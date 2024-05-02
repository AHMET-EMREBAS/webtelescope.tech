import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerEmailView } from '@webpackages/gen-model';
@ViewEntity()
export class CustomerEmailView implements ICustomerEmailView {
  @ViewColumn() email!: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
