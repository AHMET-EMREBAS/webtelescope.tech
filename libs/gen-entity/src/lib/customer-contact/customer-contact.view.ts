import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerContactView } from '@webpackages/gen-model';
@ViewEntity()
export class CustomerContactView implements ICustomerContactView {
  @ViewColumn() state!: string;
  @ViewColumn() city!: string;
  @ViewColumn() street!: string;
  @ViewColumn() zip!: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
