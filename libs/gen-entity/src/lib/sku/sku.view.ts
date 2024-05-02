import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISkuView } from '@webpackages/gen-model';
@ViewEntity()
export class SkuView implements ISkuView {
  @ViewColumn() barcode!: string;
  @ViewColumn() sku!: string;
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
  @ViewColumn() description!: string;
  @ViewColumn() productBarcode!: string;
  @ViewColumn() productName!: string;
  @ViewColumn() productDescription!: string;
}
