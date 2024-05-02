import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerEmailView } from '@webpackages/common';
@ViewEntity()
export class CustomerEmailView implements ICustomerEmailView {
  @ViewColumn() email?: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
