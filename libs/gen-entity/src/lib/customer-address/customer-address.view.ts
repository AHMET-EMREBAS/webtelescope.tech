import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerAddressView } from '@webpackages/gen-model';
import { CustomerAddress } from './customer-address.entity';
import { BaseView } from '@webpackages/core';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerAddress.id', 'id')
      .addSelect('customerAddress.state', 'state')
      .addSelect('customerAddress.city', 'city')
      .addSelect('customerAddress.street', 'street')
      .addSelect('customerAddress.zip', 'zip')

      .addSelect('customer.username', 'customerUsername')
      .from(CustomerAddress, 'customerAddress')
      .leftJoin(
        Customer,
        'customer',
        'customer.id = customerAddress.customerId'
      );
  },
})
export class CustomerAddressView
  extends BaseView
  implements ICustomerAddressView
{
  @ViewColumn() state!: string;
  @ViewColumn() city!: string;
  @ViewColumn() street!: string;
  @ViewColumn() zip!: string;
  @ViewColumn() customerUsername!: string;
}
