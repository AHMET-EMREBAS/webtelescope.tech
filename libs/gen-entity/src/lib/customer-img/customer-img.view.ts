import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerImgView } from '@webpackages/gen-model';
import { CustomerImg } from './customer-img.entity';
import { Customer } from '../customer/customer.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerImg.id', 'customerImgId')
      .addSelect('customerImg.url', 'url')
      .addSelect('customerImg.description', 'description')

      .addSelect('customer.username', 'customerUsername')
      .from(CustomerImg, 'customerImg')
      .leftJoin(Customer, 'customer', 'customer.id = customerImg.customerId');
  },
})
export class CustomerImgView implements ICustomerImgView {
  /**
   * Image url
   */
  @ViewColumn() url!: string;
  @ViewColumn() description!: string;
  @ViewColumn() customerUsername!: string;
}
