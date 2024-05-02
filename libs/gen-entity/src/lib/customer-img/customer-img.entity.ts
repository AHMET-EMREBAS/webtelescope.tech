import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomerImg } from '@webpackages/gen-model';
import { Customer } from '../customer/customer.entity';
@Entity()
export class CustomerImg extends BaseEntity implements ICustomerImg<Customer> {
  /**
   * Image url
   */ @Column({ type: 'string', required: true, description: 'Image url' })
  url!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  owner!: Customer;
}
