import { IShoppingCart } from '@webpackages/model';
import { Customer } from '../customer';
import { OwnerRelation, TimestampEntity } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class ShoppingCart extends TimestampEntity implements IShoppingCart<Customer> {
  @OwnerRelation(Customer) customer!: Customer;
}
