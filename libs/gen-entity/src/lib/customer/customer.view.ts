import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerView } from '@webpackages/gen-model';
import { Customer } from './customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customer.id', 'customerId')
      .addSelect('customer.username', 'username')

      .from(Customer, 'customer');
  },
})
export class CustomerView implements ICustomerView {
  @ViewColumn() username!: string;
}
