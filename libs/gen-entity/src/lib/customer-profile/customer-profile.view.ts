import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerProfileView } from '@webpackages/gen-model';
import { CustomerProfile } from './customer-profile.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('customerProfile.id', 'customerProfileId')
      .addSelect('customerProfile.description', 'description')
      .addSelect('customerProfile.checked', 'checked')

      .from(CustomerProfile, 'customerProfile');
  },
})
export class CustomerProfileView implements ICustomerProfileView {
  @ViewColumn() firstName!: string;
  @ViewColumn() lastName!: string;
}
