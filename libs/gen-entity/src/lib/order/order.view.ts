import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IOrderView } from '@webpackages/gen-model';
import { Order } from './order.entity';
import { BaseView } from '@webpackages/core';
import { Sku } from '../sku/sku.entity';
import { Cart } from '../cart/cart.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('order.id', 'id')
      .addSelect('order.quantity', 'quantity')
      .addSelect('order.discount', 'discount')
      .addSelect('order.total', 'total')
      .addSelect('order.subTotal', 'subTotal')
      .addSelect('order.tax', 'tax')
      .addSelect('order.description', 'description')

      .addSelect('sku.barcode', 'skuBarcode')
      .addSelect('sku.sku', 'skuSku')
      .addSelect('sku.name', 'skuName')
      .addSelect('sku.description', 'skuDescription')
      .addSelect('cart.description', 'cartDescription')
      .addSelect('cart.checked', 'cartChecked')
      .from(Order, 'order')
      .leftJoin(Sku, 'sku', 'sku.id = order.skuId')
      .leftJoin(Cart, 'cart', 'cart.id = order.cartId');
  },
})
export class OrderView extends BaseView implements IOrderView {
  @ViewColumn() quantity!: number;
  @ViewColumn() discount!: number;
  @ViewColumn() total!: number;
  @ViewColumn() subTotal!: number;
  @ViewColumn() tax!: number;
  /**
   * Order description or notes
   */
  @ViewColumn() description!: string;
  @ViewColumn() skuBarcode!: string;
  @ViewColumn() skuSku!: string;
  @ViewColumn() skuName!: string;
  @ViewColumn() skuDescription!: string;
  @ViewColumn() cartDescription!: string;
  @ViewColumn() cartChecked!: boolean;
}
