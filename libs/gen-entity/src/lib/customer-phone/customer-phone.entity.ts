import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomerPhone } from '@webpackages/gen-model';
import { Customer } from '../customer/customer.entity';
@Entity()
export class CustomerPhone
  extends BaseEntity
  implements ICustomerPhone<Customer>
{
  @Column({ type: 'string' }) email?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  ownwer!: Customer;
}
