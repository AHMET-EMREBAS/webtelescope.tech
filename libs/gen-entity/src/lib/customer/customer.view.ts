import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerView } from '@webpackages/gen-model';
import { Customer } from './customer.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customer.id', 'id')
      .addSelect('customer.username', 'username')

      .from(Customer, 'customer');
  },
})
export class CustomerView extends BaseView implements ICustomerView {
  @ViewColumn() username!: string;
}
