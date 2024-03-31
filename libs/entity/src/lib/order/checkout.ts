import { CheckoutStatus, ICheckout } from '@webpackages/model';
import {
  BooleanColumn,
  NumberColumn,
  OwnerRelation,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from '../auth';
import { Customer } from '../customer';
import { ShoppingCart } from './shopping-cart';

@Entity()
export class Checkout
  extends TimestampEntity
  implements ICheckout<User, Customer, ShoppingCart>
{
  @NumberColumn() total!: number;
  @NumberColumn() subtotal!: number;
  @NumberColumn() tax!: number;
  @BooleanColumn() taxexempt!: boolean;
  @TextColumn() federalTaxExemptID!: string;
  @TextColumn() stateTaxExemptID!: string;
  @TextColumn() status!: CheckoutStatus;
  @OwnerRelation(ShoppingCart) shoppingCart!: ShoppingCart;
  @OwnerRelation(Customer) customer!: Customer;
  @OwnerRelation(User) employee!: User;
}
