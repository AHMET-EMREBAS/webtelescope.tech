import { CheckoutStatus, ICheckout } from '@webpackages/model';
import {
  BooleanColumn,
  NumberColumn,
  OwnerRelation,
  StringColumn,
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
  @BooleanColumn({ required: false }) taxexempt!: boolean;
  @StringColumn({ required: false }) federalTaxExemptID!: string;
  @StringColumn({ required: false }) stateTaxExemptID!: string;
  @StringColumn({ required: false }) status!: CheckoutStatus;
  @OwnerRelation(ShoppingCart) shoppingCart!: ShoppingCart;
  @OwnerRelation(Customer) customer!: Customer;
  @OwnerRelation(User) employee!: User;
}
