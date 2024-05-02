import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICartView } from '@webpackages/gen-model';
import { Cart } from './cart.entity';
import { Customer } from '../customer/customer.entity';
import { User } from '../user/user.entity';
import { Store } from '../store/store.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('cart.id', 'cartId')
      .addSelect('cart.description', 'description')
      .addSelect('cart.checked', 'checked')
      .addSelect('customer.username', 'customerUsername')
      .addSelect('customer.password', 'customerPassword')
      .addSelect('user.username', 'userUsername')
      .addSelect('user.password', 'userPassword')
      .addSelect('store.name', 'storeName')
      .from(Cart, 'cart')
      .leftJoin(Customer, 'customer', 'customer.id = cart.customerId')
      .leftJoin(User, 'user', 'user.id = cart.userId')
      .leftJoin(Store, 'store', 'store.id = cart.storeId');
  },
})
export class CartView implements ICartView {
  @ViewColumn() description!: string;
  /**
   * Is chart checked out or not?
   */
  @ViewColumn() checked!: boolean;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() storeName!: string;
}
