import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProductReturnView } from '@webpackages/common';
@ViewEntity()
export class ProductReturnView implements IProductReturnView {
  @ViewColumn() description!: string;
  @ViewColumn() quantity!: number;
  @ViewColumn() orderQuantity!: number;
  @ViewColumn() orderDiscount?: number;
  @ViewColumn() orderTotal!: number;
  @ViewColumn() orderSubTotal!: number;
  @ViewColumn() orderTax!: number;
  @ViewColumn() orderDescription?: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
