import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomerEmail } from '@webpackages/gen-model';
import { Customer } from '../customer/customer.entity';
@Entity()
export class CustomerEmail
  extends BaseEntity
  implements ICustomerEmail<Customer>
{
  @Column({ type: 'string' }) email?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  customer!: Customer;
}
