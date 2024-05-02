import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IQuantityView } from '@webpackages/gen-model';
import { Quantity } from './quantity.entity';
import { BaseView } from '@webpackages/core';
import { Sku } from '../sku/sku.entity';
import { Store } from '../store/store.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('quantity.id', 'id')
      .addSelect('quantity.quanitty', 'quanitty')

      .addSelect('sku.barcode', 'skuBarcode')
      .addSelect('sku.sku', 'skuSku')
      .addSelect('sku.name', 'skuName')
      .addSelect('sku.description', 'skuDescription')
      .addSelect('store.name', 'storeName')
      .from(Quantity, 'quantity')
      .leftJoin(Sku, 'sku', 'sku.id = quantity.skuId')
      .leftJoin(Store, 'store', 'store.id = quantity.storeId');
  },
})
export class QuantityView extends BaseView implements IQuantityView {
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
