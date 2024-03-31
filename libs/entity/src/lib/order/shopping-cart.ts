import { IShoppingCart } from '@webpackages/model';
import { OwnerRelation, TimestampEntity, Entity } from '@webpackages/typeorm';
import { Customer } from '../customer';

@Entity()
export class ShoppingCart
  extends TimestampEntity
  implements IShoppingCart<Customer>
{
  @OwnerRelation(Customer) customer!: Customer;
}
