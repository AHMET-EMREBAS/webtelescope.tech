import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICart } from '@webpackages/gen-model';
import { Customer } from '../customer/customer.entity';
import { User } from '../user/user.entity';
import { Store } from '../store/store.entity';
@Entity()
export class Cart extends BaseEntity implements ICart<Customer, User, Store> {
  @Column({ type: 'string' }) description?: string;
  /**
   * Is chart checked out or not?
   */ @Column({ type: 'boolean', description: 'Is chart checked out or not?' })
  checked?: boolean;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  customer!: Customer;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  employee!: User;
  @Relation({ relationType: 'Owner', required: true, objectType: Store })
  store!: Store;
}
