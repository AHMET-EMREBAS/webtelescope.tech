import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerEmailView } from '@webpackages/gen-model';
import { CustomerEmail } from './customer-email.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerEmail.id', 'customerEmailId')
      .addSelect('customerEmail.description', 'description')
      .addSelect('customerEmail.checked', 'checked')
      .addSelect('customer.username', 'customerUsername')
      .addSelect('customer.password', 'customerPassword')
      .from(CustomerEmail, 'customerEmail')
      .leftJoin(Customer, 'customer', 'customer.id = customerEmail.customerId');
  },
})
export class CustomerEmailView implements ICustomerEmailView {
  @ViewColumn() email!: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
