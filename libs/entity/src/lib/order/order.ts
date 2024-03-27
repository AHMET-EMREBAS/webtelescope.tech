import { IOrder } from '@webpackages/model';
import { Entity } from 'typeorm';
import { Sku } from '../inventory';
import { ShoppingCart } from './shopping-cart';
import { NumberColumn, OwnerRelation, TimestampEntity } from '../common';

@Entity()
export class Order
  extends TimestampEntity
  implements IOrder<Sku, ShoppingCart>
{
  @OwnerRelation(Sku) sku!: Sku;
  @OwnerRelation(ShoppingCart) shoppingCart!: ShoppingCart;
  @NumberColumn() quantity!: number;
}
