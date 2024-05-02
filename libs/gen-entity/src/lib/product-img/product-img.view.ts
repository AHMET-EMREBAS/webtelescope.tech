import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProductImgView } from '@webpackages/gen-model';
@ViewEntity()
export class ProductImgView implements IProductImgView {
  /**
   * Image url
   */
  @ViewColumn() url!: string;
  @ViewColumn() description!: string;
  @ViewColumn() productBarcode!: string;
  @ViewColumn() productName!: string;
  @ViewColumn() productDescription!: string;
}
