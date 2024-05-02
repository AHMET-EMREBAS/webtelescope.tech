import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProductView } from '@webpackages/gen-model';
@ViewEntity()
export class ProductView implements IProductView {
  @ViewColumn() barcode!: string;
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
  @ViewColumn() description!: string;
  @ViewColumn() categoryName!: string;
  @ViewColumn() departmentName!: string;
}
