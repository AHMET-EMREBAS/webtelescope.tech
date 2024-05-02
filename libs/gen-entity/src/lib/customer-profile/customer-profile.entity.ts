import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomerProfile } from '@webpackages/gen-model';
import { Customer } from '../customer/customer.entity';
@Entity()
export class CustomerProfile
  extends BaseEntity
  implements ICustomerProfile<Customer>
{
  @Column({ type: 'string' }) firstName?: string;
  @Column({ type: 'string' }) lastName?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  customer!: Customer;
}
