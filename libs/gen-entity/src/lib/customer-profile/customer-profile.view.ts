import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerProfileView } from '@webpackages/gen-model';
import { CustomerProfile } from './customer-profile.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerProfile.id', 'customerProfileId')
      .addSelect('customerProfile.firstName', 'firstName')
      .addSelect('customerProfile.lastName', 'lastName')

      .addSelect('customer.username', 'customerUsername')
      .from(CustomerProfile, 'customerProfile')
      .leftJoin(
        Customer,
        'customer',
        'customer.id = customerProfile.customerId'
      );
  },
})
export class CustomerProfileView implements ICustomerProfileView {
  @ViewColumn() firstName!: string;
  @ViewColumn() lastName!: string;
  @ViewColumn() customerUsername!: string;
}
