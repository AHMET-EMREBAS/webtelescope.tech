import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISkuView } from '@webpackages/gen-model';
import { Sku } from './sku.entity';
import { Product } from '../product/product.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('sku.id', 'skuId')
      .addSelect('sku.description', 'description')
      .addSelect('sku.checked', 'checked')
      .addSelect('product.barcode', 'productBarcode')
      .addSelect('product.name', 'productName')
      .addSelect('product.description', 'productDescription')
      .from(Sku, 'sku')
      .leftJoin(Product, 'product', 'product.id = sku.productId');
  },
})
export class SkuView implements ISkuView {
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
