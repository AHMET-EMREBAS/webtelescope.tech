import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerPhoneView } from '@webpackages/gen-model';
import { CustomerPhone } from './customer-phone.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerPhone.id', 'customerPhoneId')
      .addSelect('customerPhone.description', 'description')
      .addSelect('customerPhone.checked', 'checked')
      .addSelect('customer.username', 'customerUsername')
      .addSelect('customer.password', 'customerPassword')
      .from(CustomerPhone, 'customerPhone')
      .leftJoin(Customer, 'customer', 'customer.id = customerPhone.customerId');
  },
})
export class CustomerPhoneView implements ICustomerPhoneView {
  @ViewColumn() email!: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
