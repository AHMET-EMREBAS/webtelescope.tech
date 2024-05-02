import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IOrderView } from '@webpackages/gen-model';
@ViewEntity()
export class OrderView implements IOrderView {
  @ViewColumn() quantity!: number;
  @ViewColumn() discount!: number;
  @ViewColumn() total!: number;
  @ViewColumn() subTotal!: number;
  @ViewColumn() tax!: number;
  @ViewColumn() description!: string;
  @ViewColumn() skuBarcode!: string;
  @ViewColumn() skuSku!: string;
  @ViewColumn() skuName!: string;
  @ViewColumn() skuDescription!: string;
  @ViewColumn() cartDescription!: string;
  @ViewColumn() cartChecked!: boolean;
}
