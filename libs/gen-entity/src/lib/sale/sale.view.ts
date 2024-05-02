import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISaleView } from '@webpackages/gen-model';
import { Sale } from './sale.entity';
import { Cart } from '../cart/cart.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('sale.id', 'saleId')
      .addSelect('sale.total', 'total')
      .addSelect('sale.subtotal', 'subtotal')
      .addSelect('sale.tax', 'tax')
      .addSelect('sale.discount', 'discount')

      .addSelect('cart.description', 'cartDescription')
      .addSelect('cart.checked', 'cartChecked')
      .addSelect('customer.username', 'customerUsername')
      .from(Sale, 'sale')
      .leftJoin(Cart, 'cart', 'cart.id = sale.cartId')
      .leftJoin(Customer, 'customer', 'customer.id = sale.customerId');
  },
})
export class SaleView implements ISaleView {
  @ViewColumn() total!: number;
  @ViewColumn() subtotal!: number;
  @ViewColumn() tax!: number;
  @ViewColumn() discount!: number;
  @ViewColumn() cartDescription!: string;
  @ViewColumn() cartChecked!: boolean;
  @ViewColumn() customerUsername!: string;
}