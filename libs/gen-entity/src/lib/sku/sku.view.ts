import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISkuView } from '@webpackages/gen-model';
import { Sku } from './sku.entity';
import { BaseView } from '@webpackages/core';
import { Product } from '../product/product.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('sku.id', 'id')
      .addSelect('sku.barcode', 'barcode')
      .addSelect('sku.sku', 'sku')
      .addSelect('sku.name', 'name')
      .addSelect('sku.description', 'description')

      .addSelect('product.barcode', 'productBarcode')
      .addSelect('product.name', 'productName')
      .addSelect('product.description', 'productDescription')
      .from(Sku, 'sku')
      .leftJoin(Product, 'product', 'product.id = sku.productId');
  },
})
export class SkuView extends BaseView implements ISkuView {
  @ViewColumn() barcode!: string;
  @ViewColumn() sku!: string;
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
  @ViewColumn() description!: string;
  @ViewColumn() productBarcode!: string;
  @ViewColumn() productName!: string;
  @ViewColumn() productDescription!: string;
}
