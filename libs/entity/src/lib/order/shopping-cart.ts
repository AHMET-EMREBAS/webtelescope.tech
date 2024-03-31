import { IShoppingCart } from '@webpackages/model';
import { Customer } from '../customer';
import { OwnerRelation, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class ShoppingCart
  extends TimestampEntity
  implements IShoppingCart<Customer>
{
  @OwnerRelation(Customer) customer!: Customer;
}
