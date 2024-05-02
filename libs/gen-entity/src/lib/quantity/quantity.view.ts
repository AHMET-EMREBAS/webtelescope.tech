import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IQuantityView } from '@webpackages/gen-model';
@ViewEntity()
export class QuantityView implements IQuantityView {
  /**
   * Quantity of the Product-Sku in the store.
   */
  @ViewColumn() quanitty!: number;
  @ViewColumn() skuBarcode!: string;
  @ViewColumn() skuSku!: string;
  @ViewColumn() skuName!: string;
  @ViewColumn() skuDescription!: string;
  @ViewColumn() storeName!: string;
}
