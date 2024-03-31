import { IOrder } from '@webpackages/model';
import { Sku } from '../inventory';
import { ShoppingCart } from './shopping-cart';
import {
  NumberColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Order
  extends TimestampEntity
  implements IOrder<Sku, ShoppingCart>
{
  @OwnerRelation(Sku) sku!: Sku;
  @OwnerRelation(ShoppingCart) shoppingCart!: ShoppingCart;
  @NumberColumn() quantity!: number;
}
