import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ISale } from '@webpackages/gen-model';
import { Cart } from '../cart/cart.entity';
import { Customer } from '../customer/customer.entity';
@Entity()
export class Sale extends BaseEntity implements ISale<Cart, Customer> {
  @Column({ type: 'number', required: true }) total!: number;
  @Column({ type: 'number', required: true }) subtotal!: number;
  @Column({ type: 'number', required: true }) tax!: number;
  @Column({ type: 'number' }) discount?: number;
  @Relation({ relationType: 'Owner', required: true, objectType: Cart })
  cart!: Cart;
  @Relation({ relationType: 'Owner', required: true, objectType: Customer })
  customer!: Customer;
}
