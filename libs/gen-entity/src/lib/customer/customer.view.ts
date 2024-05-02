import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerView } from '@webpackages/gen-model';
@ViewEntity()
export class CustomerView implements ICustomerView {
  @ViewColumn() username!: string;
  @ViewColumn() password!: string;
}
