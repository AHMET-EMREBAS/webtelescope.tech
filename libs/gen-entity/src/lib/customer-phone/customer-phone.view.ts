import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerPhoneView } from '@webpackages/gen-model';
import { CustomerPhone } from './customer-phone.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerPhone.id', 'customerPhoneId')
      .addSelect('customerPhone.phone', 'phone')

      .addSelect('customer.username', 'customerUsername')
      .from(CustomerPhone, 'customerPhone')
      .leftJoin(Customer, 'customer', 'customer.id = customerPhone.customerId');
  },
})
export class CustomerPhoneView implements ICustomerPhoneView {
  @ViewColumn() phone!: string;
  @ViewColumn() customerUsername!: string;
}
