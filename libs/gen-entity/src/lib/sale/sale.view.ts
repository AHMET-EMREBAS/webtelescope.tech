import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISaleView } from '@webpackages/common';
@ViewEntity()
export class SaleView implements ISaleView {
  @ViewColumn() total!: number;
  @ViewColumn() subtotal!: number;
  @ViewColumn() tax!: number;
  @ViewColumn() discount?: number;
  @ViewColumn() cartDescription?: string;
  @ViewColumn() cartChecked?: boolean;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
