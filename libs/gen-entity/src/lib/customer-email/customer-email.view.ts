import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerEmailView } from '@webpackages/gen-model';
import { CustomerEmail } from './customer-email.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerEmail.id', 'customerEmailId')
      .addSelect('customerEmail.email', 'email')

      .addSelect('customer.username', 'customerUsername')
      .from(CustomerEmail, 'customerEmail')
      .leftJoin(Customer, 'customer', 'customer.id = customerEmail.customerId');
  },
})
export class CustomerEmailView implements ICustomerEmailView {
  @ViewColumn() email!: string;
  @ViewColumn() customerUsername!: string;
}
