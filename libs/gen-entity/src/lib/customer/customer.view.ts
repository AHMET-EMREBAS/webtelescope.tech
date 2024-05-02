import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerView } from '@webpackages/gen-model';
import { Customer } from './customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customer.id', 'customerId')
      .addSelect('customer.description', 'description')
      .addSelect('customer.checked', 'checked')

      .from(Customer, 'customer');
  },
})
export class CustomerView implements ICustomerView {
  @ViewColumn() username!: string;
  @ViewColumn() password!: string;
}
