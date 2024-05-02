import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProductReturnView } from '@webpackages/gen-model';
import { ProductReturn } from './product-return.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('productReturn.id', 'productReturnId')
      .addSelect('productReturn.description', 'description')
      .addSelect('productReturn.quantity', 'quantity')

      .addSelect('order.quantity', 'orderQuantity')
      .addSelect('order.discount', 'orderDiscount')
      .addSelect('order.total', 'orderTotal')
      .addSelect('order.subTotal', 'orderSubTotal')
      .addSelect('order.tax', 'orderTax')
      .addSelect('order.description', 'orderDescription')
      .addSelect('user.username', 'userUsername')
      .from(ProductReturn, 'productReturn')
      .leftJoin(Order, 'order', 'order.id = productReturn.orderId')
      .leftJoin(User, 'user', 'user.id = productReturn.userId');
  },
})
export class ProductReturnView implements IProductReturnView {
  @ViewColumn() description!: string;
  @ViewColumn() quantity!: number;
  @ViewColumn() orderQuantity!: number;
  @ViewColumn() orderDiscount!: number;
  @ViewColumn() orderTotal!: number;
  @ViewColumn() orderSubTotal!: number;
  @ViewColumn() orderTax!: number;
  @ViewColumn() orderDescription!: string;
  @ViewColumn() userUsername!: string;
}
