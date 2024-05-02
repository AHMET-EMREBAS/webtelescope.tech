import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICustomerContact } from '@webpackages/gen-model';
import { Customer } from '../customer/customer.entity';
@Entity()
export class CustomerContact
  extends BaseEntity
  implements ICustomerContact<Customer>
{
  @Column({ type: 'string' }) state?: string;
  @Column({ type: 'string' }) city?: string;
  @Column({ type: 'string' }) street?: string;
  @Column({ type: 'string' }) zip?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  customer!: Customer;
}
