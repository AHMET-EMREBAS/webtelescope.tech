import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IOrderView } from '@webpackages/gen-model';
import { Order } from './order.entity';
import { Sku } from '../sku/sku.entity';
import { Cart } from '../cart/cart.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('order.id', 'orderId')
      .addSelect('order.description', 'description')
      .addSelect('order.checked', 'checked')
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
export class OrderView implements IOrderView {
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
