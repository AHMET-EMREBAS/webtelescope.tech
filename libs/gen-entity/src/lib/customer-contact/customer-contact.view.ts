import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerContactView } from '@webpackages/gen-model';
import { CustomerContact } from './customer-contact.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerContact.id', 'customerContactId')
      .addSelect('customerContact.state', 'state')
      .addSelect('customerContact.city', 'city')
      .addSelect('customerContact.street', 'street')
      .addSelect('customerContact.zip', 'zip')

      .addSelect('customer.username', 'customerUsername')
      .from(CustomerContact, 'customerContact')
      .leftJoin(
        Customer,
        'customer',
        'customer.id = customerContact.customerId'
      );
  },
})
export class CustomerContactView implements ICustomerContactView {
  @ViewColumn() state!: string;
  @ViewColumn() city!: string;
  @ViewColumn() street!: string;
  @ViewColumn() zip!: string;
  @ViewColumn() customerUsername!: string;
}
